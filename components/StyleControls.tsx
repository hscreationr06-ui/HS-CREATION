import React from 'react';
import { StyleOptions, RestyleIntensity, LightingMood, ColorTone, TextureStyle } from '../types';

interface StyleControlsProps {
  options: StyleOptions;
  setOptions: React.Dispatch<React.SetStateAction<StyleOptions>>;
  isLoading: boolean;
}

const defaultDescription = "A [adjective, e.g., vibrant, moody, dreamy] scene with a focus on [element, e.g., ethereal lighting, rich textures].";

const presets: { [key: string]: StyleOptions } = {
  'Anime': {
    description: "A vibrant and dynamic anime-style illustration with clean lines, cel shading, and expressive characters.",
    intensity: RestyleIntensity.High,
    lighting: LightingMood.SoftDaylight,
    color: ColorTone.Vivid,
    texture: TextureStyle.DigitalArt,
    influence: "Modern Anime, Makoto Shinkai"
  },
  'Ghibli': {
    description: "A whimsical and heartwarming scene in the style of Studio Ghibli, featuring lush, painted backgrounds, soft lighting, and a nostalgic feel.",
    intensity: RestyleIntensity.Medium,
    lighting: LightingMood.SoftDaylight,
    color: ColorTone.Pastel,
    texture: TextureStyle.Watercolor,
    influence: "Studio Ghibli, Hayao Miyazaki"
  },
  'Pixel Art': {
    description: "A retro 16-bit pixel art scene with a limited color palette and blocky details, reminiscent of classic video games.",
    intensity: RestyleIntensity.High,
    lighting: LightingMood.SoftDaylight,
    color: ColorTone.Vivid,
    texture: TextureStyle.DigitalArt,
    influence: "16-bit video games"
  },
  'Watercolor': {
    description: "A delicate and translucent watercolor painting with soft edges, bleeding colors, and a light, airy feel.",
    intensity: RestyleIntensity.Medium,
    lighting: LightingMood.SoftDaylight,
    color: ColorTone.Pastel,
    texture: TextureStyle.Watercolor,
    influence: "J. M. W. Turner"
  },
  'Calligraphy': {
    description: "An elegant ink wash painting (Sumi-e) with expressive, calligraphic brushstrokes, minimalist composition, and a focus on form and movement.",
    intensity: RestyleIntensity.High,
    lighting: LightingMood.CinematicShadows,
    color: ColorTone.Desaturated,
    texture: TextureStyle.Sketch,
    influence: "Japanese Sumi-e"
  },
  'Oil Painting': {
    description: "A rich and textured oil painting with visible, thick brushstrokes (impasto), deep colors, and a classic, timeless quality.",
    intensity: RestyleIntensity.Medium,
    lighting: LightingMood.CinematicShadows,
    color: ColorTone.Warm,
    texture: TextureStyle.OilPainting,
    influence: "Impressionism, Van Gogh"
  },
  'Sketch': {
    description: "A detailed pencil or charcoal sketch with strong cross-hatching, clear shading, and a focus on form and contour.",
    intensity: RestyleIntensity.Medium,
    lighting: LightingMood.SoftDaylight,
    color: ColorTone.Desaturated,
    texture: TextureStyle.Sketch,
    influence: "Leonardo da Vinci"
  }
};


const StyleControls: React.FC<StyleControlsProps> = ({ options, setOptions, isLoading }) => {
  const handleInputChange = <K extends keyof StyleOptions,>(key: K, value: StyleOptions[K]) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  const applyPreset = (preset: StyleOptions) => {
    setOptions(preset);
  };

  const renderSelect = (id: string, label: string, value: string, enumObject: object) => (
    <div>
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-300">{label}</label>
      <select
        id={id}
        value={value}
        onChange={(e) => handleInputChange(id as keyof StyleOptions, e.target.value)}
        disabled={isLoading}
        className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
      >
        {Object.entries(enumObject).map(([key, val]) => (
          <option key={key} value={val}>{val.charAt(0).toUpperCase() + val.slice(1)}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="space-y-6 w-full">
       <div>
        <label className="block mb-2 text-sm font-medium text-gray-300">Quick Styles</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {Object.entries(presets).map(([name, presetOptions]) => (
            <button
              key={name}
              type="button"
              onClick={() => applyPreset(presetOptions)}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50"
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-gray-700" />
      
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-200">Customization</h3>
        <p className="text-sm text-gray-400 mb-4">
          Use a quick style as a starting point, or create your own from scratch below.
        </p>
      </div>

      <div>
        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-300">Your Imagination (Style Description)</label>
        <textarea
          id="description"
          rows={3}
          value={options.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          disabled={isLoading}
          placeholder={defaultDescription}
          className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
        ></textarea>
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-300">Restyle Intensity</label>
        <div className="grid grid-cols-3 gap-2 rounded-lg bg-gray-700 p-1">
          {Object.values(RestyleIntensity).map(intensity => (
            <button
              key={intensity}
              type="button"
              onClick={() => handleInputChange('intensity', intensity)}
              disabled={isLoading}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500
              ${options.intensity === intensity ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`}
            >
              {intensity.charAt(0).toUpperCase() + intensity.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderSelect('lighting', 'Lighting Mood', options.lighting, LightingMood)}
        {renderSelect('color', 'Color Tone', options.color, ColorTone)}
        {renderSelect('texture', 'Texture Style', options.texture, TextureStyle)}
        <div>
          <label htmlFor="influence" className="block mb-2 text-sm font-medium text-gray-300">Art Influence (Optional)</label>
          <input
            type="text"
            id="influence"
            value={options.influence}
            onChange={(e) => handleInputChange('influence', e.target.value)}
            disabled={isLoading}
            placeholder="e.g., Van Gogh, Cyberpunk"
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
          />
        </div>
      </div>
    </div>
  );
};

export default StyleControls;