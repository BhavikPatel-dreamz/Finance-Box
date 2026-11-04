<?php
/**
 * Plugin Name: Financebox CF7 form fields
 * Description: Exposes Contact Form 7 field lists to the headless frontend (GET /wp-json/financebox/v1/forms/{id}) and tells it when a form is saved.
 * Version: 1.0.0
 *
 * Install: copy this file to wp-content/mu-plugins/ (or paste its body into the Financebox Headless plugin).
 *
 * Optional, in wp-config.php, so saving a form updates the site immediately
 * (without them, changes appear within a few minutes):
 *   define( 'FINANCEBOX_FRONTEND_URL', 'https://your-frontend.example' );
 *   define( 'FINANCEBOX_REVALIDATE_SECRET', 'same value as REVALIDATE_SECRET' );
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'rest_api_init', function () {
	register_rest_route( 'financebox/v1', '/forms/(?P<id>\d+)', array(
		'methods'             => 'GET',
		// Public: returns only what the rendered form shows anyway (field names, placeholders, options).
		'permission_callback' => '__return_true',
		'callback'            => 'financebox_cf7_form_fields',
	) );
} );

function financebox_cf7_form_fields( WP_REST_Request $request ) {
	if ( ! function_exists( 'wpcf7_contact_form' ) ) {
		return new WP_Error( 'financebox_cf7_missing', 'Contact Form 7 is not active.', array( 'status' => 404 ) );
	}

	$form = wpcf7_contact_form( (int) $request['id'] );
	if ( ! $form ) {
		return new WP_Error( 'financebox_form_not_found', 'Form not found.', array( 'status' => 404 ) );
	}

	// Text of <label>Some text [text* field-name …]</label> in the form template, by field name.
	$labels   = array();
	$template = (string) $form->prop( 'form' );
	if ( preg_match_all( '/<label[^>]*>\s*([^<\[]+?)\s*(?:<br\s*\/?>\s*)?\[[a-z_]+\*?\s+([A-Za-z][\w-]*)/i', $template, $matches, PREG_SET_ORDER ) ) {
		foreach ( $matches as $match ) {
			$labels[ $match[2] ] = trim( wp_strip_all_tags( $match[1] ) );
		}
	}

	$supported = array( 'text', 'email', 'tel', 'url', 'number', 'range', 'date', 'textarea', 'select', 'checkbox', 'radio', 'acceptance' );
	$fields    = array();
	$submit    = '';

	foreach ( $form->scan_form_tags() as $tag ) {
		if ( 'submit' === $tag->basetype ) {
			$submit = (string) reset( $tag->values );
			continue;
		}
		if ( empty( $tag->name ) || ! in_array( $tag->basetype, $supported, true ) ) {
			continue; // hidden, file, quiz, captcha and plugin tags are not rendered by the frontend.
		}

		$type        = 'range' === $tag->basetype ? 'number' : $tag->basetype;
		$has_choices = in_array( $type, array( 'select', 'checkbox', 'radio' ), true );
		$placeholder = '';
		if ( ! $has_choices && ( $tag->has_option( 'placeholder' ) || $tag->has_option( 'watermark' ) ) ) {
			$placeholder = (string) reset( $tag->values );
		}

		if ( 'acceptance' === $type ) {
			$label = trim( wp_strip_all_tags( (string) $tag->content ) );
		} else {
			$label = $placeholder ? $placeholder : ( isset( $labels[ $tag->name ] ) ? $labels[ $tag->name ] : '' );
		}

		$max_length = $tag->get_maxlength_option();

		$fields[] = array(
			'name'      => $tag->name,
			'type'      => $type,
			'label'     => $label,
			'required'  => 'acceptance' === $type ? ! $tag->has_option( 'optional' ) : $tag->is_required(),
			// Values CF7 expects on submit (pipes "Label|value" are resolved by CF7 itself).
			'options'   => $has_choices ? array_values( array_map( 'strval', $tag->values ) ) : array(),
			'multiple'  => ( 'checkbox' === $type && ! $tag->has_option( 'exclusive' ) ) || ( 'select' === $type && $tag->has_option( 'multiple' ) ),
			'maxLength' => $max_length ? (int) $max_length : null,
		);
	}

	return rest_ensure_response( array(
		'id'          => (string) $form->id(),
		'title'       => $form->title(),
		'fields'      => $fields,
		'submitLabel' => $submit,
	) );
}

// Expire the frontend's cached copy of a form as soon as it is saved.
add_action( 'wpcf7_after_save', function ( $contact_form ) {
	if ( ! defined( 'FINANCEBOX_FRONTEND_URL' ) || ! defined( 'FINANCEBOX_REVALIDATE_SECRET' ) ) {
		return;
	}
	wp_remote_post( untrailingslashit( FINANCEBOX_FRONTEND_URL ) . '/api/revalidate', array(
		'timeout'  => 5,
		'blocking' => false,
		'headers'  => array(
			'Content-Type'        => 'application/json',
			'x-revalidate-secret' => FINANCEBOX_REVALIDATE_SECRET,
		),
		'body'     => wp_json_encode( array( 'type' => 'form', 'formId' => (string) $contact_form->id() ) ),
	) );
} );
