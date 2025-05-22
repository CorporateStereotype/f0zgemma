
import React, { useState, useEffect, useCallback } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Section from './Section';
import { Agent, FlowState, FormulaItem } from '../types';
import { createInitialAgent, simulateAgentStep, allocateResources } from '../services/f0zLogic';
import { NUM_AGENTS, FORMULAS_DATA } from '../constants';
import { PlayIcon, ResetIcon } from './Icons';
import FormulaDisplayCard from './FormulaDisplayCard';

interface AgentCardProps {
  agent: Agent;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  const flowStateColor = agent.flowState === FlowState.FLOW ? 'text-green-400' : 'text-yellow-400';
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-primary-500/30">
      <h4 className="text-lg font-semibold text-primary-300 mb-2">Agent {agent.id}</h4>
      <p className="text-sm text-gray-400">Flow State: <span className={`font-medium ${flowStateColor}`}>{agent.flowState}</span></p>
      <p className="text-sm text-gray-400">Engagement: <span className="font-medium text-blue-400">{agent.engagement}</span></p>
      <p className="text-sm text-gray-400">Performance: <span className="font-medium text-teal-400">{agent.currentPerformance.toFixed(3)}</span></p>
      <p className="text-sm text-gray-400">Complexity: <span className="font-medium text-orange-400">{agent.currentTaskComplexity.toFixed(3)}</span></p>
      <p className="text-sm text-gray-400">Resources: <span className="font-medium text-purple-400">{agent.resourceAllocation.toFixed(2)}</span></p>
      <div className="mt-2">
        <p className="text-xs text-gray-500">Performance History (last 5):</p>
        <div className="flex space-x-1 mt-1">
          {agent.performanceHistory.slice(-5).map((p, i) => (
            <span key={i} className="text-xs bg-gray-700 px-1.5 py-0.5 rounded-full text-gray-300">{p.toFixed(2)}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

interface AgentSimulationTabProps {
  onExplainFormula: (title: string, formulaText: string) => void;
}

const AgentSimulationTab: React.FC<AgentSimulationTabProps> = ({ onExplainFormula }) => {
  const [agents, setAgents] = useState<Agent[]>(() => 
    Array.from({ length: NUM_AGENTS }, (_, i) => createInitialAgent(`A-${i + 1}`))
  );
  const [simulationStep, setSimulationStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const runSimulationStep = useCallback(() => {
    setAgents(prevAgents => {
      const updatedAgents = prevAgents.map(agent => simulateAgentStep(agent));
      return allocateResources(updatedAgents);
    });
    setSimulationStep(prev => prev + 1);
  }, []);

  const resetSimulation = () => {
    setAgents(Array.from({ length: NUM_AGENTS }, (_, i) => createInitialAgent(`A-${i + 1}`)));
    setSimulationStep(0);
    setIsSimulating(false);
  };

  useEffect(() => {
    // Fix: Changed type of intervalId from NodeJS.Timeout to number
    let intervalId: number;
    if (isSimulating) {
      intervalId = setInterval(runSimulationStep, 1500);
    }
    return () => clearInterval(intervalId);
  }, [isSimulating, runSimulationStep]);
  
  const agentConceptFormulas = React.useMemo(() => FORMULAS_DATA.filter(f => f.category === "Core Agent Concepts" || f.category === "Core ZSG Systems"), []);

  const chartData = agents.map(agent => ({
    name: agent.id,
    Resources: parseFloat(agent.resourceAllocation.toFixed(2)), // Ensure number for chart
    Engagement: agent.engagement,
  }));

  return (
    <div className="animate-fadeIn">
      <Section title="Agent Simulation Dashboard">
        <div className="mb-6 flex space-x-4">
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className={`px-4 py-2 rounded-md font-medium flex items-center transition-colors ${
              isSimulating 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            <PlayIcon className="mr-2" /> {isSimulating ? 'Pause Simulation' : 'Start Simulation'}
          </button>
          <button
            onClick={runSimulationStep}
            disabled={isSimulating}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md font-medium flex items-center transition-colors disabled:opacity-50"
          >
            <PlayIcon className="mr-2" /> Step Forward
          </button>
          <button
            onClick={resetSimulation}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md font-medium flex items-center transition-colors"
          >
            <ResetIcon className="mr-2" /> Reset
          </button>
        </div>
        <p className="text-gray-400 mb-6">Simulation Step: <span className="font-semibold text-primary-400">{simulationStep}</span></p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {agents.map(agent => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </Section>

      <Section title="Resource Allocation & Engagement Overview">
         <div className="h-96 w-full bg-gray-800 p-4 rounded-lg shadow-lg">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                    <XAxis dataKey="name" tick={{ fill: '#A0AEC0' }} />
                    <YAxis yAxisId="left" orientation="left" stroke="#A0AEC0" tick={{ fill: '#A0AEC0' }} />
                    <YAxis yAxisId="right" orientation="right" stroke="#A0AEC0" tick={{ fill: '#A0AEC0' }} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#2D3748', border: '1px solid #4A5568', borderRadius: '0.5rem' }}
                        labelStyle={{ color: '#E2E8F0' }}
                        itemStyle={{ color: '#CBD5E0' }}
                    />
                    <Legend wrapperStyle={{ color: '#A0AEC0' }} />
                    <Bar yAxisId="left" dataKey="Resources" fill="#8884d8" name="Allocated Resources" />
                    <Bar yAxisId="right" dataKey="Engagement" fill="#82ca9d" name="Engagement Level" />
                </BarChart>
            </ResponsiveContainer>
        </div>
      </Section>
      
      <Section title="Core Agent & ZSG System Formulas">
        {agentConceptFormulas.map(item => (
          <FormulaDisplayCard key={item.id} formulaItem={item} onExplain={onExplainFormula} />
        ))}
      </Section>
    </div>
  );
};

export default AgentSimulationTab;