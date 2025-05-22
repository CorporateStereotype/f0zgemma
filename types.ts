
export enum FlowState {
  IDLE = 'idle',
  FLOW = 'flow',
}

export interface Agent {
  id: string;
  flowState: FlowState;
  engagement: number;
  performanceHistory: number[]; // Max 10 items
  currentTaskComplexity: number;
  currentPerformance: number;
  resourceAllocation: number;
}

export interface StabInput {
  value: number;
  epsilon: number;
}

export interface ComplexStabInput {
  real: number;
  imag:
 
number;
  epsilon: number;
}

export interface VarStabInput {
  data: number[];
  epsilon: number;
}

export interface FormulaItem {
  id: string;
  title: string;
  formulaText: string;
  category: string;
}

// Add process.env types
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_KEY: string;
    }
  }
}
