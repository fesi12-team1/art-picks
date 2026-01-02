export const BREAKPOINTS = {
  mobile: 0,
  tablet: 744,
  laptop: 1200,
  desktop: 1400,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;
