
export enum RestyleIntensity {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}

export enum LightingMood {
  SoftDaylight = 'soft daylight',
  CinematicShadows = 'cinematic shadows',
  NeonNight = 'neon night',
  GoldenHour = 'golden hour',
}

export enum ColorTone {
  Warm = 'warm',
  Cool = 'cool',
  Pastel = 'pastel',
  Vivid = 'vivid',
  Desaturated = 'desaturated',
}

export enum TextureStyle {
  Smooth = 'smooth',
  Watercolor = 'watercolor',
  OilPainting = 'oil painting',
  Sketch = 'sketch',
  DigitalArt = 'digital art',
}

export interface StyleOptions {
  description: string;
  intensity: RestyleIntensity;
  lighting: LightingMood;
  color: ColorTone;
  texture: TextureStyle;
  influence: string;
}
