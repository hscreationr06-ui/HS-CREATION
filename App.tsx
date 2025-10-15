
import React, { useState, useCallback } from 'react';
import { StyleOptions, RestyleIntensity, LightingMood, ColorTone, TextureStyle } from './types';
import { restyleImage } from './services/geminiService';

import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import StyleControls from './components/StyleControls';
import ImageDisplay from './components/ImageDisplay';
import Spinner from './components/Spinner';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [restyledImageUrl, setRestyledImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [styleOptions, setStyleOptions] = useState<StyleOptions>({
    description: "A dreamy, ethereal scene with a focus on soft, glowing light.",
    intensity: RestyleIntensity.Medium,
    lighting: LightingMood.SoftDaylight,
    color: ColorTone.Pastel,
    texture: TextureStyle.DigitalArt,
    influence: "Studio Ghibli",
  });

  const handleImageUpload = useCallback((file: File) => {
    setOriginalImage(file);
    setRestyledImageUrl(null);
    setError(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleSubmit = async () => {
    if (!originalImage) {
      setError("Please upload an image first.");
      return;
    }
    setError(null);
    setIsLoading(true);
    setRestyledImageUrl(null);

    try {
      const generatedImageUrl = await restyleImage(originalImage, styleOptions);
      setRestyledImageUrl(generatedImageUrl);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <main className="container mx-auto px-4 py-8">
        <Header />

        <div className="max-w-4xl mx-auto mt-8 bg-gray-800/50 p-6 md:p-8 rounded-2xl shadow-2xl border border-gray-700">
          <div className="grid grid-cols-1 gap-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-purple-400">1. Upload Your Image</h2>
              <ImageUploader onImageUpload={handleImageUpload} imageUrl={originalImageUrl} />
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-purple-400">2. Define Your Style</h2>
              <StyleControls options={styleOptions} setOptions={setStyleOptions} isLoading={isLoading} />
            </section>
            
            <section className="flex flex-col items-center">
              <button
                onClick={handleSubmit}
                disabled={!originalImage || isLoading}
                className="w-full md:w-1/2 flex items-center justify-center text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              >
                {isLoading ? <><Spinner /> <span className="ml-2">Restyling...</span></> : 'Restyle Image'}
              </button>
              {error && <p className="mt-4 text-red-400 text-center">{error}</p>}
            </section>
          </div>
        </div>

        <ImageDisplay originalImageUrl={originalImageUrl} restyledImageUrl={restyledImageUrl} isLoading={isLoading} />
      </main>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Powered by Google Gemini. Built for creativity.</p>
      </footer>
    </div>
  );
};

export default App;
