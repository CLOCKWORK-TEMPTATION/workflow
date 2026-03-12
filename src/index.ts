// ============================================================
// Product Lifecycle Workflow Agent
// 7 Phases: حدد → وضح → خطط → المهام → حلل → افحص → تنفيذ
// Programmatic API
// ============================================================

export { createWorkflowAgent, createPhaseAgent } from "./agents/create-agents.js";
export { PHASES, PHASE_FLOW, WORKFLOW_DOCUMENTS, getPhaseById, getDocById, getPhaseDocuments, getNextPhase, getPrevPhase } from "./config/documents.js";
export { getModelConfig, getModelString } from "./config/models.js";
export { ORCHESTRATOR_PROMPT, AGENT_PROMPTS } from "./prompts/system.js";
export { docxTools } from "./tools/docx-tools.js";
export { searchTools } from "./tools/search-tools.js";
export { workflowTools } from "./tools/workflow-tools.js";
export type {
  PhaseId,
  DocStatus,
  WorkflowDocument,
  PhaseDefinition,
  ProjectContext,
  PhaseResult,
  WorkflowState,
} from "./types/index.js";

// ============================================================
// Quick usage example:
//
// import { createWorkflowAgent } from "product-lifecycle-agent";
//
// const agent = createWorkflowAgent();
// const result = await agent.invoke({
//   messages: [{
//     role: "user",
//     content: "نفّذ الوركفلو الكامل لمشروع: تطبيق إدارة المهام بالـ AI"
//   }]
// });
// ============================================================
