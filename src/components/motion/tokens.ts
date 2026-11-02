export const MOTION_EASINGS = {
  // Smooth, luxurious ease-out curve allowing viewers to clearly track and appreciate the motion
  premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
  // Subtle spring for micro-interactions and tactile feedback
  spring: 'cubic-bezier(0.34, 1.4, 0.64, 1)',
  // Smooth symmetric transition for fades and color shifts
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

export const MOTION_DURATIONS = {
  fast: 300,    // button hover, micro-interactions
  normal: 650,  // cards, dropdowns, accordions
  slow: 850,    // standard scroll reveal (visibly smooth and graceful)
  hero: 950,    // hero load sequence
} as const;

export const MOTION_DISTANCES = {
  sm: 16, // small badges, text hints
  md: 32, // standard cards, paragraphs
  lg: 44, // hero headlines, large media
} as const;

export const MOTION_STAGGER = {
  fast: 90,
  normal: 140,
  slow: 200,
} as const;
