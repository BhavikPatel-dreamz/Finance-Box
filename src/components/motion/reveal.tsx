'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { MOTION_DURATIONS, MOTION_EASINGS, MOTION_DISTANCES, MOTION_STAGGER } from './tokens';

export type RevealPreset =
  | 'fade-in'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'scale-up';

export interface RevealProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  preset?: RevealPreset;
  delay?: number; // ms
  duration?: number; // ms
  distance?: number; // px
  immediate?: boolean;
  as?: keyof React.JSX.IntrinsicElements;
  style?: React.CSSProperties;
}

// Global observer instance cache for performance
export function useInView(
  ref: React.RefObject<HTMLElement | null>,
  options?: {
    threshold?: number;
    rootMargin?: string;
    immediate?: boolean;
    once?: boolean;
  }
) {
  const [isInView, setIsInView] = useState(false);
  const immediate = options?.immediate ?? false;
  const once = options?.once ?? true;

  useEffect(() => {
    if (immediate) {
      // Trigger on next tick for smooth entry
      const timer = setTimeout(() => setIsInView(true), 20);
      return () => clearTimeout(timer);
    }

    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) {
            observer.unobserve(node);
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      {
        threshold: options?.threshold ?? 0.1,
        rootMargin: options?.rootMargin ?? '0px 0px -40px 0px',
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, immediate, once, options?.threshold, options?.rootMargin]);

  return isInView;
}

export function Reveal({
  children,
  id,
  className = '',
  preset = 'slide-up',
  delay = 0,
  duration = MOTION_DURATIONS.slow,
  distance = MOTION_DISTANCES.md,
  immediate = false,
  as: Tag = 'div',
  style: userStyle = {},
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const inView = useInView(ref, { immediate });

  useEffect(() => {
    setMounted(true);
  }, []);

  const getInitialTransform = () => {
    switch (preset) {
      case 'slide-up':
        return `translateY(${distance}px)`;
      case 'slide-down':
        return `translateY(-${distance}px)`;
      case 'slide-left':
        return `translateX(${distance}px)`;
      case 'slide-right':
        return `translateX(-${distance}px)`;
      case 'scale-up':
        return 'scale(0.96)';
      case 'fade-in':
      default:
        return 'none';
    }
  };

  const isVisible = !mounted ? true : inView;

  const motionStyle: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'none' : getInitialTransform(),
    transitionProperty: 'opacity, transform',
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: MOTION_EASINGS.premium,
    transitionDelay: `${delay}ms`,
    willChange: isVisible ? 'auto' : 'opacity, transform',
    ...userStyle,
  };

  const Component = Tag as any;

  return (
    <Component ref={ref} id={id} className={className} style={motionStyle}>
      {children}
    </Component>
  );
}

// ---------------------------------------------------------------------------
// Stagger Group Context & Components
// ---------------------------------------------------------------------------

interface StaggerContextValue {
  isInView: boolean;
  staggerDelay: number;
}

const StaggerContext = createContext<StaggerContextValue>({
  isInView: false,
  staggerDelay: MOTION_STAGGER.normal,
});

export interface StaggerGroupProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  staggerDelay?: number;
  immediate?: boolean;
  as?: keyof React.JSX.IntrinsicElements;
  style?: React.CSSProperties;
}

export function StaggerGroup({
  children,
  id,
  className = '',
  staggerDelay = MOTION_STAGGER.normal,
  immediate = false,
  as: Tag = 'div',
  style: userStyle = {},
}: StaggerGroupProps) {
  const ref = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const inView = useInView(ref, { immediate });

  useEffect(() => {
    setMounted(true);
  }, []);

  const Component = Tag as any;
  const active = !mounted ? true : inView;

  return (
    <StaggerContext.Provider value={{ isInView: active, staggerDelay }}>
      <Component ref={ref} id={id} className={className} style={userStyle}>
        {children}
      </Component>
    </StaggerContext.Provider>
  );
}

export interface StaggerItemProps {
  children: React.ReactNode;
  index: number;
  className?: string;
  preset?: RevealPreset;
  duration?: number;
  distance?: number;
  baseDelay?: number;
  as?: keyof React.JSX.IntrinsicElements;
  style?: React.CSSProperties;
}

export function StaggerItem({
  children,
  index,
  className = '',
  preset = 'slide-up',
  duration = MOTION_DURATIONS.slow,
  distance = MOTION_DISTANCES.md,
  baseDelay = 0,
  as: Tag = 'div',
  style: userStyle = {},
}: StaggerItemProps) {
  const { isInView, staggerDelay } = useContext(StaggerContext);

  const getInitialTransform = () => {
    switch (preset) {
      case 'slide-up':
        return `translateY(${distance}px)`;
      case 'slide-down':
        return `translateY(-${distance}px)`;
      case 'slide-left':
        return `translateX(${distance}px)`;
      case 'slide-right':
        return `translateX(-${distance}px)`;
      case 'scale-up':
        return 'scale(0.96)';
      case 'fade-in':
      default:
        return 'none';
    }
  };

  const delay = baseDelay + index * staggerDelay;

  const motionStyle: React.CSSProperties = {
    opacity: isInView ? 1 : 0,
    transform: isInView ? 'none' : getInitialTransform(),
    transitionProperty: 'opacity, transform',
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: MOTION_EASINGS.premium,
    transitionDelay: `${delay}ms`,
    willChange: isInView ? 'auto' : 'opacity, transform',
    ...userStyle,
  };

  const Component = Tag as any;

  return (
    <Component className={className} style={motionStyle}>
      {children}
    </Component>
  );
}
