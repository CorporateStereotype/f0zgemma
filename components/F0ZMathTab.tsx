
import React, { useState, useMemo } from 'react';
import Section from './Section';
import { stab, complexStab, varStab } from '../services/f0zLogic';
import { StabInput, ComplexStabInput, VarStabInput, FormulaItem } from '../types';
import { DEFAULT_EPSILON, FORMULAS_DATA } from '../constants';
import FormulaDisplayCard from './FormulaDisplayCard';

interface F0ZMathTabProps {
  onExplainFormula: (title: string, formulaText: string) => void;
}

const F0ZMathTab: React.FC<F0ZMathTabProps> = ({ onExplainFormula }) => {
  const [stabInput, setStabInput] = useState<StabInput>({ value: 1.5, epsilon: DEFAULT_EPSILON });
  const [stabResult, setStabResult] = useState<number>(stab(1.5, DEFAULT_EPSILON));

  const [complexStabInput, setComplexStabInput] = useState<ComplexStabInput>({ real: 0.001, imag: -2, epsilon: DEFAULT_EPSILON });
  const [complexStabResult, setComplexStabResult] = useState<{real: number, imag: number}>(complexStab(0.001, -2, DEFAULT_EPSILON));

  const [varStabInputStr, setVarStabInputStr] = useState<string>("1, 2, 3, 4, 5");
  const [varStabEpsilon, setVarStabEpsilon] = useState<number>(DEFAULT_EPSILON);
  const [varStabResult, setVarStabResult] = useState<number | string>('');

  const handleStabChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newInputs = { ...stabInput, [name]: parseFloat(value) };
    setStabInput(newInputs);
    setStabResult(stab(newInputs.value, newInputs.epsilon));
  };
  
  const handleComplexStabChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newInputs = { ...complexStabInput, [name]: parseFloat(value) };
    setComplexStabInput(newInputs);
    setComplexStabResult(complexStab(newInputs.real, newInputs.imag, newInputs.epsilon));
  };

  const handleVarStabDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVarStabInputStr(e.target.value);
    try {
      const dataArray = e.target.value.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
      if (dataArray.length > 0) {
        setVarStabResult(varStab(dataArray, varStabEpsilon));
      } else {
        setVarStabResult("Invalid data or empty array");
      }
    } catch {
      setVarStabResult("Error parsing data");
    }
  };

  const handleVarStabEpsilonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEpsilon = parseFloat(e.target.value);
    setVarStabEpsilon(newEpsilon);
     try {
      const dataArray = varStabInputStr.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
      if (dataArray.length > 0) {
        setVarStabResult(varStab(dataArray, newEpsilon));
      } else {
         setVarStabResult(varStab([], newEpsilon)); // For consistency, stab(0, epsilon)
      }
    } catch {
      setVarStabResult("Error parsing data");
    }
  };
  
  React.useEffect(() => { // Calculate initial varStab result
    handleVarStabDataChange({ target: { value: varStabInputStr } } as React.ChangeEvent<HTMLInputElement>);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const mathFormulas = useMemo(() => FORMULAS_DATA.filter(f => f.category === "F0Z Mathematical Foundations"), []);

  const inputClass = "bg-gray-700 text-white p-2 rounded-md w-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors";
  const labelClass = "block text-sm font-medium text-gray-300 mb-1";

  return (
    <div className="animate-fadeIn">
      <Section title="Interactive F0Z Functions">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Stab Function */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-primary-300 mb-3">Stabilization Function (stab)</h3>
            <div className="mb-3">
              <label htmlFor="stabValue" className={labelClass}>Input Value (x):</label>
              <input type="number" name="value" id="stabValue" value={stabInput.value} onChange={handleStabChange} className={inputClass} step="any" />
            </div>
            <div className="mb-3">
              <label htmlFor="stabEpsilon" className={labelClass}>Epsilon (ε):</label>
              <input type="number" name="epsilon" id="stabEpsilon" value={stabInput.epsilon} onChange={handleStabChange} className={inputClass} step="any" min="0"/>
            </div>
            <p className="text-gray-300">Result: <strong className="text-primary-400">{stabResult.toPrecision(6)}</strong></p>
          </div>

          {/* Complex Stab Function */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-primary-300 mb-3">Complex Stabilization (complex_stab)</h3>
            <div className="mb-3">
              <label htmlFor="complexReal" className={labelClass}>Real Part (a):</label>
              <input type="number" name="real" id="complexReal" value={complexStabInput.real} onChange={handleComplexStabChange} className={inputClass} step="any"/>
            </div>
            <div className="mb-3">
              <label htmlFor="complexImag" className={labelClass}>Imaginary Part (b):</label>
              <input type="number" name="imag" id="complexImag" value={complexStabInput.imag} onChange={handleComplexStabChange} className={inputClass} step="any"/>
            </div>
             <div className="mb-3">
              <label htmlFor="complexEpsilon" className={labelClass}>Epsilon (ε):</label>
              <input type="number" name="epsilon" id="complexEpsilon" value={complexStabInput.epsilon} onChange={handleComplexStabChange} className={inputClass} step="any" min="0"/>
            </div>
            <p className="text-gray-300">Result: <strong className="text-primary-400">{complexStabResult.real.toPrecision(4)} + {complexStabResult.imag.toPrecision(4)}i</strong></p>
          </div>

          {/* Stabilized Variance */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-primary-300 mb-3">Stabilized Variance (Var_stab)</h3>
            <div className="mb-3">
              <label htmlFor="varStabData" className={labelClass}>Data (comma-separated):</label>
              <input type="text" id="varStabData" value={varStabInputStr} onChange={handleVarStabDataChange} className={inputClass} placeholder="e.g., 1,2,0.5,3"/>
            </div>
            <div className="mb-3">
              <label htmlFor="varStabEpsilon" className={labelClass}>Epsilon (ε_sys):</label>
              <input type="number" id="varStabEpsilon" value={varStabEpsilon} onChange={handleVarStabEpsilonChange} className={inputClass} step="any" min="0"/>
            </div>
            <p className="text-gray-300">Result: <strong className="text-primary-400">{typeof varStabResult === 'number' ? varStabResult.toPrecision(6) : varStabResult}</strong></p>
          </div>
        </div>
      </Section>
      <Section title="F0Z Mathematical Foundation Formulas">
        {mathFormulas.map(item => (
          <FormulaDisplayCard key={item.id} formulaItem={item} onExplain={onExplainFormula} />
        ))}
      </Section>
    </div>
  );
};

export default F0ZMathTab;
