
import React from 'react';
import Section from './Section';
import { FORMULAS_DATA } from '../constants';
import { FormulaItem } from '../types';
import FormulaDisplayCard from './FormulaDisplayCard';

interface AdvancedConceptsTabProps {
  onExplainFormula: (title: string, formulaText: string) => void;
}

const AdvancedConceptsTab: React.FC<AdvancedConceptsTabProps> = ({ onExplainFormula }) => {
  const computationalFormulas = React.useMemo(() => FORMULAS_DATA.filter(f => f.category === "Computational Agents"), []);
  const quantumFormulas = React.useMemo(() => FORMULAS_DATA.filter(f => f.category === "Quantum Components"), []);

  return (
    <div className="animate-fadeIn">
      <Section title="Computational Agents">
        <p className="text-gray-300 mb-6">
          This section outlines formulas related to F0Z Computational Layers, including forward/backward passes and weight updates.
          These concepts are foundational for agents that learn and adapt through computational processes similar to neural networks,
          but with specific F0Z stabilization mechanisms.
        </p>
        {computationalFormulas.map(item => (
          <FormulaDisplayCard key={item.id} formulaItem={item} onExplain={onExplainFormula} />
        ))}
      </Section>

      <Section title="Quantum Components">
        <p className="text-gray-300 mb-6">
          Explore formulas pertaining to Quantum State Stabilization, Measurement Probabilities, Quantum Q-Functions (VQC),
          and Curiosity Rewards within the F0Z framework. These highlight the integration of quantum mechanical principles
          for potentially enhanced computational capabilities or novel agent behaviors.
        </p>
        {quantumFormulas.map(item => (
          <FormulaDisplayCard key={item.id} formulaItem={item} onExplain={onExplainFormula} />
        ))}
      </Section>
    </div>
  );
};

export default AdvancedConceptsTab;
