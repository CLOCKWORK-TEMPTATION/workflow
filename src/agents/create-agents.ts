import { createDeepAgent, type SubAgent } from "deepagents";
import { getModelString } from "../config/models.js";
import {
  ORCHESTRATOR_PROMPT,
  AGENT_PROMPTS,
} from "../prompts/system.js";
import { docxTools } from "../tools/docx-tools.js";
import { searchTools } from "../tools/search-tools.js";
import { workflowTools } from "../tools/workflow-tools.js";

// ============================================================
// Create 7 specialized subagents (one per phase)
// حدد → وضح → خطط → المهام → حلل → افحص → تنفيذ
// ============================================================

function createSubagents(): SubAgent[] {
  const model = getModelString();

  return [
    // 1. وكيل التحديد (Phase 1: حدد - docs 01-03)
    {
      name: "define-agent",
      description:
        "وكيل التحديد - مرحلة 'حدد': وضع إطار الهوية والهدف بدقة (فرضية التأسيس، الاستراتيجية، PR-FAQ)",
      system_prompt: AGENT_PROMPTS["define-agent"],
      tools: [...docxTools, ...searchTools],
      model,
    },

    // 2. وكيل التوضيح (Phase 2: وضح - docs 04-08)
    {
      name: "clarify-agent",
      description:
        "وكيل التوضيح - مرحلة 'وضح': توفير السياق والمحددات والقيود (بحث السوق، الموجز، OKRs، الشخصيات، خريطة الرحلة)",
      system_prompt: AGENT_PROMPTS["clarify-agent"],
      tools: [...docxTools, ...searchTools],
      model,
    },

    // 3. وكيل التخطيط (Phase 3: خطط - docs 09-12)
    {
      name: "plan-agent",
      description:
        "وكيل التخطيط - مرحلة 'خطط': بناء هيكل منطقي متسلسل (خارطة الطريق، الباكلوج، DoR، DoD)",
      system_prompt: AGENT_PROMPTS["plan-agent"],
      tools: [...docxTools],
      model,
    },

    // 4. وكيل المهام (Phase 4: المهام - docs 13-18)
    {
      name: "tasks-agent",
      description:
        "وكيل المهام - مرحلة 'المهام': تفتيت الخطة لأجزاء مستقلة (البنية، التصميم التقني، البيانات، API، قواعد البرمجة، إعادة الهيكلة)",
      system_prompt: AGENT_PROMPTS["tasks-agent"],
      tools: [...docxTools],
      model,
    },

    // 5. وكيل التحليل (Phase 5: حلل - docs 19-22)
    {
      name: "analyze-agent",
      description:
        "وكيل التحليل - مرحلة 'حلل': تقييم المعطيات واكتشاف نقاط الضعف (الاختبار، الأمان، إمكانية الوصول، التحليلات)",
      system_prompt: AGENT_PROMPTS["analyze-agent"],
      tools: [...docxTools],
      model,
    },

    // 6. وكيل الفحص (Phase 6: افحص - doc 23)
    {
      name: "inspect-agent",
      description:
        "وكيل الفحص - مرحلة 'افحص': المراجعة الذاتية لاكتشاف الثغرات والتناقضات (خطة النشر والإصدار)",
      system_prompt: AGENT_PROMPTS["inspect-agent"],
      tools: [...docxTools],
      model,
    },

    // 7. وكيل التنفيذ (Phase 7: تنفيذ - docs 24-25)
    {
      name: "execute-agent",
      description:
        "وكيل التنفيذ - مرحلة 'تنفيذ': إنتاج المخرجات النهائية خطوة بخطوة (الاستجابة للحوادث، مراجعة ما بعد الإطلاق)",
      system_prompt: AGENT_PROMPTS["execute-agent"],
      tools: [...docxTools],
      model,
    },
  ];
}

// ============================================================
// Create the main orchestrator deep agent
// ============================================================
export function createWorkflowAgent() {
  const model = getModelString();
  const subagents = createSubagents();

  const agent = createDeepAgent({
    model,
    systemPrompt: ORCHESTRATOR_PROMPT,
    tools: [...workflowTools, ...docxTools, ...searchTools],
    subagents,
  });

  return agent;
}

// ============================================================
// Create a single-phase agent (for targeted execution)
// ============================================================
export function createPhaseAgent(agentName: string) {
  const model = getModelString();
  const prompt = AGENT_PROMPTS[agentName];

  if (!prompt) {
    throw new Error(`Unknown agent: ${agentName}`);
  }

  // define-agent and clarify-agent need search tools for market research
  const needsSearch = agentName === "define-agent" || agentName === "clarify-agent";
  const tools = needsSearch
    ? [...docxTools, ...searchTools]
    : [...docxTools];

  const agent = createDeepAgent({
    model,
    systemPrompt: prompt,
    tools,
  });

  return agent;
}
