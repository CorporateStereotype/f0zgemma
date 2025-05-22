
import { Agent, FlowState } from '../types';
import { MAX_HISTORY_LENGTH, DEFAULT_EPSILON, BASE_RESOURCE_PER_AGENT, TOTAL_RESOURCES } from '../constants';

// --- F0Z Mathematical Foundations ---

export const stab = (x: number, epsilon: number): number => {
  const sign = Math.sign(x) || 1; // sign(0) defaults to 1
  if (Math.abs(x) < epsilon) {
    return sign * epsilon;
  }
  return x;
};

export const complexStab = (real: number, imag: number, epsilon: number): { real: number; imag: number } => {
  return {
    real: stab(real, epsilon),
    imag: stab(imag, epsilon),
  };
};

export const varStab = (data: number[], epsilon: number): number => {
  if (data.length === 0) return stab(0, epsilon);
  const mean = data.reduce((acc, val) => acc + val, 0) / data.length;
  const variance = data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / data.length;
  return stab(variance, epsilon);
};

// --- Core Agent Concepts ---

// Simplified FlowStateOptimizer logic
// In a real scenario, weights would be learned. Here we use fixed logic.
const flowStateOptimizerPredict = (complexity: number, performance: number, stability: number): FlowState => {
  // Example heuristic: if performance is high and stable, or complexity is low, prefer 'flow'
  const flowScore = performance * 2 + stability - complexity;
  const idleScore = -performance - stability + complexity * 0.5;

  // Simple decision rule (not softmax as in original for brevity)
  return flowScore > idleScore ? FlowState.FLOW : FlowState.IDLE;
};


export const adjustAgentState = (agent: Agent): Agent => {
  const { performanceHistory, currentTaskComplexity, currentPerformance } = agent;
  
  let stability = 1.0;
  if (performanceHistory.length > 0) {
    const variance = varStab(performanceHistory, DEFAULT_EPSILON);
    stability = 1 / (variance + DEFAULT_EPSILON); // Add epsilon to avoid division by zero
  }

  const newFlowState = flowStateOptimizerPredict(currentTaskComplexity, currentPerformance, stability);
  
  const newEngagement = newFlowState === FlowState.FLOW 
    ? Math.min(agent.engagement + 1, 10) // Cap engagement
    : Math.max(0, agent.engagement - 1);

  const newHistory = [...performanceHistory, currentPerformance];
  if (newHistory.length > MAX_HISTORY_LENGTH) {
    newHistory.shift();
  }

  return {
    ...agent,
    flowState: newFlowState,
    engagement: newEngagement,
    performanceHistory: newHistory,
  };
};

export const createInitialAgent = (id: string): Agent => ({
  id,
  flowState: FlowState.IDLE,
  engagement: 0,
  performanceHistory: [],
  currentTaskComplexity: Math.random(),
  currentPerformance: Math.random() * 0.5, // Start with moderate performance
  resourceAllocation: BASE_RESOURCE_PER_AGENT,
});


// --- Core ZSG Systems ---

export const allocateResources = (agents: Agent[]): Agent[] => {
  const activeAgents = agents.filter(agent => agent.engagement > 0);
  
  if (activeAgents.length === 0) {
    const equalShare = TOTAL_RESOURCES / agents.length;
    return agents.map(agent => ({ ...agent, resourceAllocation: Math.max(0, equalShare) }));
  }

  const totalPerformance = activeAgents.reduce((sum, agent) => {
    const lastPerf = agent.performanceHistory.length > 0 ? agent.performanceHistory[agent.performanceHistory.length - 1] : 0;
    return sum + Math.max(0.01, lastPerf); // Ensure non-zero performance for division
  }, 0);
  
  const totalBaseResources = agents.length * BASE_RESOURCE_PER_AGENT;
  const extraResources = TOTAL_RESOURCES - totalBaseResources;

  return agents.map(agent => {
    let allocation = BASE_RESOURCE_PER_AGENT;
    if (agent.engagement > 0 && totalPerformance > 0) {
      const lastPerf = agent.performanceHistory.length > 0 ? agent.performanceHistory[agent.performanceHistory.length - 1] : 0;
      allocation += extraResources * (Math.max(0.01, lastPerf) / totalPerformance);
    }
    // Clamp allocation to avoid negative or excessively large values
    // R_min, R_max can be dynamic, here simplified.
    const R_min = BASE_RESOURCE_PER_AGENT * 0.5;
    const R_max = TOTAL_RESOURCES * 0.8; // An agent shouldn't take almost all resources
    return { ...agent, resourceAllocation: Math.max(R_min, Math.min(allocation, R_max)) };
  });
};

export const simulateAgentStep = (agent: Agent): Agent => {
  // Simulate new task complexity and performance for next step
  const newComplexity = Math.random(); // 0 to 1
  // Performance can be influenced by current engagement, flow state, and randomness
  let performanceFactor = 0.5; // Base
  if (agent.flowState === FlowState.FLOW) performanceFactor += 0.3;
  if (agent.engagement > 5) performanceFactor += 0.2;
  
  const newPerformance = Math.max(0, Math.min(1, (performanceFactor + (Math.random() - 0.5) * 0.4) - newComplexity * 0.3));

  const updatedAgent = {
    ...agent,
    currentTaskComplexity: newComplexity,
    currentPerformance: newPerformance,
  };
  return adjustAgentState(updatedAgent);
};
