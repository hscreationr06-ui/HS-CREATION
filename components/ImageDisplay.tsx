
import React from 'react';
import Spinner from './Spinner';

interface ImageDisplayProps {
  originalImageUrl: string | null;
  restyledImageUrl: string | null;
  isLoading: boolean;
}

const ImageCard: React.FC<{ imageUrl: string | null; title: string; isLoading?: boolean; isPlaceholder?: boolean }> = ({ imageUrl, title, isLoading = false, isPlaceholder = false }) => {
  return (
    <div className="w-full bg-gray-800 rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col">
      <h3 className="text-lg font-semibold text-center py-3 bg-gray-700">{title}</h3>
      <div className="p-4 flex-1 flex items-center justify-center min-h-[300px] md:min-h-[400px]">
        {isLoading ? (
          <div className="flex flex-col items-center gap-4">
            <Spinner />
            <p className="text-gray-400">Restyling your image...</p>
          </div>
        ) : imageUrl ? (
          <img src={imageUrl} alt={title} className="max-w-full max-h-full object-contain rounded-md" />
        ) : (
          <div className={`text-center text-gray-500 ${isPlaceholder ? '' : 'hidden'}`}>
            <p>{isPlaceholder ? "Your restyled image will appear here." : ""}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ImageDisplay: React.FC<ImageDisplayProps> = ({ originalImageUrl, restyledImageUrl, isLoading }) => {
  if (!originalImageUrl) return null;

  return (
    <div className="mt-8 w-full">
      <div className="flex flex-col md:flex-row gap-8">
        <ImageCard imageUrl={originalImageUrl} title="Original" />
        <ImageCard imageUrl={restyledImageUrl} title="Restyled" isLoading={isLoading} isPlaceholder={!restyledImageUrl && !isLoading}/>
      </div>
    </div>
  );
};

export default ImageDisplay;
