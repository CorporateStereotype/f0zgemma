
import React from 'react';
import { CloseIcon } from './Icons';

interface GeminiExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  explanation: string;
  isLoading: boolean;
}

const GeminiExplanationModal: React.FC<GeminiExplanationModalProps> = ({
  isOpen,
  onClose,
  title,
  explanation,
  isLoading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-[100]">
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-primary-400">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="overflow-y-auto flex-grow pr-2">
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
              <p className="ml-3 text-gray-300">Fetching explanation from Gemini...</p>
            </div>
          ) : (
            <div className="prose prose-invert prose-sm md:prose-base max-w-none whitespace-pre-wrap text-gray-300">
              {explanation.split('\\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
              ))}
            </div>
          )}
        </div>
         <div className="mt-6 text-right">
            <button
                onClick={onClose}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors"
            >
                Close
            </button>
        </div>
      </div>
    </div>
  );
};

export default GeminiExplanationModal;
