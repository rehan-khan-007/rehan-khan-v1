export const DURATION = {
  micro: 0.12,
  standard: 0.32,
  scene: 1.4, // ceiling
} as const;

export const STAGGER = 0.07;

export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_STANDARD: [number, number, number, number] = [0.65, 0, 0.35, 1];
