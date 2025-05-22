
import React from 'react';
import { FormulaItem } from '../types';
import { InfoIcon } from './Icons';

interface FormulaDisplayCardProps {
  formulaItem: FormulaItem;
  onExplain: (title: string, formulaText: string) => void;
}

const FormulaDisplayCard: React.FC<FormulaDisplayCardProps> = ({ formulaItem, onExplain }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-4">
      <div className="flex justify-between items-start">
        <h4 className="text-lg font-semibold text-primary-300 mb-2">{formulaItem.title}</h4>
        <button
            onClick={() => onExplain(formulaItem.title, formulaItem.formulaText)}
            className="flex items-center text-sm px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors"
            title={`Explain: ${formulaItem.title}`}
        >
            <InfoIcon className="mr-1.5" /> Explain
        </button>
      </div>
      <pre className="bg-gray-900 p-3 rounded-md text-gray-300 text-xs sm:text-sm whitespace-pre-wrap overflow-x-auto">
        {formulaItem.formulaText.trim()}
      </pre>
    </div>
  );
};

export default FormulaDisplayCard;
