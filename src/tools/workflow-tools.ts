import { tool } from "langchain";
import { z } from "zod";
import * as fs from "fs";
import * as path from "path";
import { WORKFLOW_DOCUMENTS, PHASES, PHASE_FLOW, getPhaseById, getNextPhase } from "../config/documents.js";

// ============================================================
// Tool: Get workflow status (7 phases view)
// ============================================================
export const getWorkflowStatus = tool(
  async ({ outputDir }: { outputDir: string }) => {
    const dir = path.resolve(outputDir);
    const status: string[] = [];
    const phaseLabels: Record<string, string> = {
      define: "1️⃣",
      clarify: "2️⃣",
      plan: "3️⃣",
      tasks: "4️⃣",
      analyze: "5️⃣",
      inspect: "6️⃣",
      execute: "7️⃣",
    };

    for (const phase of PHASES) {
      const docs = WORKFLOW_DOCUMENTS.filter((d) => d.phase === phase.id);
      const completed = docs.filter((d) => fs.existsSync(path.join(dir, d.filename))).length;
      const total = docs.length;
      const pct = Math.round((completed / total) * 100);
      const label = phaseLabels[phase.id] || "•";

      status.push(`\n## ${label} ${phase.nameAr} (${phase.name}) [${pct}%]`);
      status.push(`   الهدف: ${phase.objective}`);
      
      for (const doc of docs) {
        const filePath = path.join(dir, doc.filename);
        const exists = fs.existsSync(filePath);
        const icon = exists ? "✅" : "⬜";
        status.push(`  ${icon} [${String(doc.id).padStart(2, "0")}] ${doc.titleAr}`);
      }
    }

    return status.join("\n");
  },
  {
    name: "get_workflow_status",
    description: "Get the current status of all 25 workflow documents across 7 phases (حدد→وضح→خطط→المهام→حلل→افحص→تنفيذ)",
    schema: z.object({
      outputDir: z.string().describe("Output directory to check"),
    }),
  }
);

// ============================================================
// Tool: Check phase transition criteria
// ============================================================
export const checkPhaseTransition = tool(
  async ({
    phaseId,
    outputDir,
  }: {
    phaseId: string;
    outputDir: string;
  }) => {
    const phase = getPhaseById(phaseId);
    if (!phase) return `Phase not found: ${phaseId}`;

    const dir = path.resolve(outputDir);
    const docs = WORKFLOW_DOCUMENTS.filter((d) => d.phase === phaseId);
    const completedDocs = docs.filter((d) => fs.existsSync(path.join(dir, d.filename)));
    const allExist = completedDocs.length === docs.length;

    const nextPhase = getNextPhase(phaseId);

    const result = [
      `## فحص المرحلة: ${phase.nameAr} (${phase.name})`,
      `الهدف: ${phase.objective}`,
      `الوثائق: ${docs.length} | مكتملة: ${completedDocs.length}`,
      "",
      "### معايير الانتقال:",
      ...phase.transitionCriteria.map((c) => `  - [ ] ${c}`),
      "",
    ];

    if (allExist) {
      result.push("✅ جميع الوثائق موجودة");
      if (nextPhase) {
        result.push(`➡️ يمكن الانتقال للمرحلة التالية: "${nextPhase.nameAr}" (${nextPhase.name})`);
        result.push(`   الهدف التالي: ${nextPhase.objective}`);
      } else {
        result.push("🎉 هذه آخر مرحلة - الوركفلو مكتمل!");
      }
    } else {
      const missing = docs.filter((d) => !fs.existsSync(path.join(dir, d.filename)));
      result.push("⚠️ وثائق ناقصة:");
      for (const doc of missing) {
        result.push(`  ⬜ [${String(doc.id).padStart(2, "0")}] ${doc.titleAr}`);
      }
      result.push("\n❌ لا يمكن الانتقال - أكمل الوثائق الناقصة أولاً");
    }

    return result.join("\n");
  },
  {
    name: "check_phase_transition",
    description: "Check if a phase's documents are complete and ready for transition to the next phase",
    schema: z.object({
      phaseId: z.string().describe("Phase ID (define, clarify, plan, tasks, analyze, inspect, execute)"),
      outputDir: z.string().describe("Output directory"),
    }),
  }
);

// ============================================================
// Tool: Get phase documents info with flow context
// ============================================================
export const getPhaseInfo = tool(
  async ({ phaseId }: { phaseId: string }) => {
    const phase = getPhaseById(phaseId);
    if (!phase) return `Phase not found: ${phaseId}`;

    const docs = WORKFLOW_DOCUMENTS.filter((d) => d.phase === phaseId);
    const nextPhase = getNextPhase(phaseId);

    const info = [
      `## ${phase.nameAr} (${phase.name})`,
      `الوكيل: ${phase.agentName}`,
      `الهدف التقني: ${phase.objective}`,
      `التطبيق العملي: ${phase.promptGuidance}`,
      "",
    ];

    // Input from previous phases
    if (phase.inputFrom && phase.inputFrom.length > 0) {
      info.push("### المدخلات من:");
      for (const inputId of phase.inputFrom) {
        const inputPhase = getPhaseById(inputId);
        if (inputPhase) {
          info.push(`  ← ${inputPhase.nameAr} (${inputPhase.name})`);
        }
      }
      info.push("");
    }

    info.push("### الوثائق:");
    for (const d of docs) {
      const deps = d.dependsOn.length > 0 ? d.dependsOn.join(", ") : "لا شيء";
      info.push(
        `  ${String(d.id).padStart(2, "0")}. ${d.titleAr} (${d.title}) - يعتمد على: [${deps}]`
      );
    }
    info.push("");

    info.push("### معايير الانتقال:");
    for (const c of phase.transitionCriteria) {
      info.push(`  - ${c}`);
    }

    // Output to next phase
    if (nextPhase) {
      info.push("");
      info.push(`### المخرجات تغذي:`);
      info.push(`  → ${nextPhase.nameAr} (${nextPhase.name}): ${nextPhase.objective}`);
    }

    return info.join("\n");
  },
  {
    name: "get_phase_info",
    description: "Get detailed info about a specific phase including its objective, documents, and flow connections",
    schema: z.object({
      phaseId: z.string().describe("Phase ID (define, clarify, plan, tasks, analyze, inspect, execute)"),
    }),
  }
);

// ============================================================
// Tool: Get the full workflow flow summary
// ============================================================
export const getWorkflowFlow = tool(
  async () => {
    const flow: string[] = [
      "## مسار الوركفلو - 7 مراحل",
      "",
    ];

    for (let i = 0; i < PHASE_FLOW.length; i++) {
      const phase = getPhaseById(PHASE_FLOW[i]);
      if (!phase) continue;

      const docs = WORKFLOW_DOCUMENTS.filter((d) => d.phase === phase.id);
      const arrow = i < PHASE_FLOW.length - 1 ? "  ↓" : "  ✅";

      flow.push(`${i + 1}. **${phase.nameAr}** (${phase.name}) - ${docs.length} وثائق`);
      flow.push(`   الهدف: ${phase.objective}`);
      flow.push(`   التطبيق: "${phase.promptGuidance}"`);
      flow.push(arrow);
    }

    return flow.join("\n");
  },
  {
    name: "get_workflow_flow",
    description: "Get a summary of the full 7-phase workflow flow with objectives and connections",
    schema: z.object({}),
  }
);

export const workflowTools = [
  getWorkflowStatus,
  checkPhaseTransition,
  getPhaseInfo,
  getWorkflowFlow,
];
