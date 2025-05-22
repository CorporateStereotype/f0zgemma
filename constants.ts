
import { FormulaItem } from './types';

export const DEFAULT_EPSILON = 1e-5;
export const MAX_HISTORY_LENGTH = 10;
export const NUM_AGENTS = 3;
export const TOTAL_RESOURCES = 100;
export const BASE_RESOURCE_PER_AGENT = TOTAL_RESOURCES * 0.1 / NUM_AGENTS; // ensure sum of base is less than total

export const GEMINI_MODEL_NAME = "gemini-2.5-flash-preview-04-17";

export const FORMULAS_DATA: FormulaItem[] = [
  { 
    id: "stab_func",
    title: "Stabilization Function (stab)",
    category: "F0Z Mathematical Foundations",
    formulaText: `stab(x, ε) = 
  if |x| < ε: sign(x) * ε
  otherwise: x
(with sign(0) ∈ {1, -1} context-dependent)

For complex z = a + bi:
stab(z, ε) = stab(a, ε) + i * stab(b, ε)`
  },
  {
    id: "var_stab_func",
    title: "Stabilized Variance (Var_stab)",
    category: "F0Z Mathematical Foundations",
    formulaText: `Var_stab(X) = stab(E[(X - E[X])^2], ε_sys)
where ε_sys scales with dataset size.`
  },
  {
    id: "grad_stab_func",
    title: "Stabilized Gradient (∇_stab)",
    category: "F0Z Mathematical Foundations",
    formulaText: `∇_stab f(x) = stab(∇f(x), ε_sys) (element-wise)`
  },
  {
    id: "corr_stab_func",
    title: "Stabilized Correlation (Corr_stab)",
    category: "F0Z Mathematical Foundations",
    formulaText: `Corr_stab(X, Y) = stab(Cov(X,Y) / sqrt(Var_stab(X) * Var_stab(Y) + ε), ε_final)`
  },
  {
    id: "agent_state",
    title: "Agent State (S_i(t))",
    category: "Core Agent Concepts",
    formulaText: `S_i(t) = {F_i(t), E_i(t), H_i(t), D_i(t)}
F_i(t) ∈ {idle, flow}: Flow state
E_i(t) ∈ N: Engagement level
H_i(t) = [P_1, ..., P_t]: Performance history
D_i(t): Domain-specific data`
  },
  {
    id: "flow_optimizer",
    title: "Flow State Optimizer",
    category: "Core Agent Concepts",
    formulaText: `Input features: f_t = (C_t, P_t, Stab_t)
where Stab_t = 1 / (Var_stab(H_i(t)[-N:]) + ε)
Scores: Score_idle = g_idle(f_t), Score_flow = g_flow(f_t)
Action probabilities: p_t = softmax([Score_idle, Score_flow])
Action selection: a_t = argmax(w_t ⊙ p_t)
Weight update: w_(t+1) = normalize(clamp((1-η)w_t + η*target(Reward_t, a_t), w_min, w_max))
Reward: Reward_t = P_current - α * C_task`
  },
  {
    id: "iterative_workflow",
    title: "Iterative Workflow",
    category: "Core Agent Concepts",
    formulaText: `For k ∈ {1, ..., K_max}:
  R_k = Agent.execute_task(T_k)
  P_k = Evaluate(R_k, C_task)
  H_i(t) ← H_i(t) ∪ {P_k}
  Agent.adjust_flow_state(C_task, P_k)
  T_(k+1) = AdaptTask(T_k, R_k, P_k)`
  },
  {
    id: "resource_allocation",
    title: "Resource Allocation",
    category: "Core ZSG Systems",
    formulaText: `Active agents: A_active = {i | E_i(t) > 0}
Total performance: P_total = Σ_{i ∈ A_active} H_i(t)[-1]
Resource allocation for agent j (Alloc_j):
  if j ∈ A_active: R_base + R_extra * (H_j(t)[-1] / P_total)
  otherwise: R_base
with R_extra = R_total - Σ R_base, clamped to [R_min, R_max].`
  },
  {
    id: "task_assignment",
    title: "Task Assignment",
    category: "Core ZSG Systems",
    formulaText: `Capable agents: A_capable = {i | CanHandle(Agent_i, T_type)}
Selected agent: j* = argmin_{j ∈ A_capable} Load(Agent_j)
Load update: Load(Agent_j*) ← Load(Agent_j*) ± C_T (before/after execution)`
  },
  {
    id: "f0z_layer_fwd_bwd",
    title: "F0Z Layer Forward/Backward Pass",
    category: "Computational Agents",
    formulaText: `Forward:
  pre_activation = a_(l-1) * W_l + b_l
  a_l = σ(stab(pre_activation, ε))
Backward:
  δ_l = ∂L / ∂a_l
  δ_pre,l = δ_l ⊙ σ'(stab(pre_activation, ε))
  ∂L / ∂W_l = a_(l-1)^T * δ_pre,l
  ∂L / ∂b_l = Σ_rows δ_pre,l
Weight update:
  W_l ← W_l - η * stab(∂L / ∂W_l, ε_grad)
  b_l ← b_l - η * stab(∂L / ∂b_l, ε_grad)`
  },
  {
    id: "quantum_state_stab",
    title: "Quantum State Stabilization",
    category: "Quantum Components",
    formulaText: `|ψ_stab⟩ = stab(|ψ⟩, ε) (element-wise on amplitudes)`
  },
  {
    id: "quantum_measurement",
    title: "Measurement Probability",
    category: "Quantum Components",
    formulaText: `P(i) = stab(|⟨i|ψ⟩|^2, ε_p)
m ~ P ⇒ |ψ_post⟩ = |m⟩`
  },
  {
    id: "quantum_q_function",
    title: "Quantum Q-Function (VQC)",
    category: "Quantum Components",
    formulaText: `Q_stab(s, a) = stab(⟨ψ(s,a)|O|ψ(s,a)⟩, ε_q)
|ψ(s,a)⟩ = VQC(θ) * U_entangle * R_z(θ(s,a)) * H^⊗N |0⟩`
  },
  {
    id: "curiosity_reward",
    title: "Curiosity Reward",
    category: "Quantum Components",
    formulaText: `R_int = η_c * ||Predictor(emb(s)) - emb(s')||^2
θ_pred ← θ_pred - η_p * ∇_θ MSE
θ_q ← θ_q - η_q * ∇_θ (Q_stab(s,a) - Target)^2`
  }
];

export const KEY_NOTATIONS = `
Key Notation Summary:
- Stabilization (stab): Applied element-wise to prevent numerical instability.
- Flow Control: Agent decisions governed by softmax-weighted heuristics and resource constraints.
- Quantum Integration: Stabilized quantum state manipulation and hybrid classical-quantum learning.
- Adaptive Learning: F0Z gradients and variances regulate optimization dynamics.
`;
