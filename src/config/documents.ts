import type { WorkflowDocument, PhaseDefinition } from "../types/index.js";

// ============================================================
// All 25 workflow documents mapped to 7 phases
// (حدد → وضح → خطط → المهام → حلل → افحص → تنفيذ)
// ============================================================
export const WORKFLOW_DOCUMENTS: WorkflowDocument[] = [
  // ──────────────────────────────────────────────────────────
  // Phase 1: حدد (Define) - تحديد الهوية والهدف
  // Docs 01-03
  // ──────────────────────────────────────────────────────────
  { id: 1,  filename: "01-Founding-Hypothesis.docx",                  title: "Founding Hypothesis",                  titleAr: "فرضية التأسيس",                         phase: "define",   status: "not_started", dependsOn: [] },
  { id: 2,  filename: "02-Product-Strategy.docx",                     title: "Product Strategy",                     titleAr: "استراتيجية المنتج",                      phase: "define",   status: "not_started", dependsOn: [1] },
  { id: 3,  filename: "03-PR-FAQ-Document.docx",                      title: "PR-FAQ Document",                      titleAr: "وثيقة البيان الصحفي",                    phase: "define",   status: "not_started", dependsOn: [2] },

  // ──────────────────────────────────────────────────────────
  // Phase 2: وضح (Clarify) - السياق والمحددات والقيود
  // Docs 04-08
  // ──────────────────────────────────────────────────────────
  { id: 4,  filename: "04-Market-Research-Competitive-Analysis.docx",  title: "Market Research & Competitive Analysis", titleAr: "بحث السوق والتحليل التنافسي",           phase: "clarify",  status: "not_started", dependsOn: [2] },
  { id: 5,  filename: "05-Product-Brief-AI-Development.docx",         title: "Product Brief for AI Development",     titleAr: "موجز المنتج لتطوير AI",                 phase: "clarify",  status: "not_started", dependsOn: [2, 4] },
  { id: 6,  filename: "06-OKRs.docx",                                 title: "OKRs",                                 titleAr: "الأهداف والنتائج الرئيسية",              phase: "clarify",  status: "not_started", dependsOn: [2, 5] },
  { id: 7,  filename: "07-User-Research-Personas.docx",               title: "User Research & Personas",             titleAr: "بحث المستخدم والشخصيات",                phase: "clarify",  status: "not_started", dependsOn: [4, 6] },
  { id: 8,  filename: "08-Customer-Journey-Map.docx",                 title: "Customer Journey Map",                 titleAr: "خريطة رحلة العميل",                     phase: "clarify",  status: "not_started", dependsOn: [7] },

  // ──────────────────────────────────────────────────────────
  // Phase 3: خطط (Plan) - بناء الهيكل المنطقي المتسلسل
  // Docs 09-12
  // ──────────────────────────────────────────────────────────
  { id: 9,  filename: "09-Product-Roadmap.docx",                      title: "Product Roadmap",                      titleAr: "خارطة طريق المنتج",                     phase: "plan",     status: "not_started", dependsOn: [6, 8] },
  { id: 10, filename: "10-Product-Backlog-User-Stories.docx",         title: "Product Backlog & User Stories",        titleAr: "سجل المنتج وقصص المستخدمين",            phase: "plan",     status: "not_started", dependsOn: [9, 7] },
  { id: 11, filename: "11-Definition-of-Ready.docx",                  title: "Definition of Ready",                  titleAr: "تعريف الجاهزية",                        phase: "plan",     status: "not_started", dependsOn: [10] },
  { id: 12, filename: "12-Definition-of-Done.docx",                   title: "Definition of Done",                   titleAr: "تعريف الإنجاز",                         phase: "plan",     status: "not_started", dependsOn: [10] },

  // ──────────────────────────────────────────────────────────
  // Phase 4: المهام (Tasks) - تفتيت الخطة لأجزاء مستقلة
  // Docs 13-18
  // ──────────────────────────────────────────────────────────
  { id: 13, filename: "13-App-Architecture-Plan.docx",                title: "App Architecture Plan",                titleAr: "خطة بنية التطبيق",                      phase: "tasks",    status: "not_started", dependsOn: [5, 10] },
  { id: 14, filename: "14-Technical-Design-Document.docx",            title: "Technical Design Document",            titleAr: "وثيقة التصميم التقني",                  phase: "tasks",    status: "not_started", dependsOn: [13] },
  { id: 15, filename: "15-Data-Dictionary-Catalog.docx",              title: "Data Dictionary & Catalog",            titleAr: "قاموس وكتالوج البيانات",                phase: "tasks",    status: "not_started", dependsOn: [14] },
  { id: 16, filename: "16-API-Documentation.docx",                    title: "API Documentation",                    titleAr: "توثيق واجهة البرمجة",                   phase: "tasks",    status: "not_started", dependsOn: [14] },
  { id: 17, filename: "17-AI-Coding-Rules-Standards.docx",            title: "AI Coding Rules & Standards",          titleAr: "قواعد ومعايير البرمجة بالـ AI",          phase: "tasks",    status: "not_started", dependsOn: [13] },
  { id: 18, filename: "18-Refactoring-Plan.docx",                     title: "Refactoring Plan",                     titleAr: "خطة إعادة الهيكلة",                     phase: "tasks",    status: "not_started", dependsOn: [14] },

  // ──────────────────────────────────────────────────────────
  // Phase 5: حلل (Analyze) - تقييم المعطيات واكتشاف نقاط الضعف
  // Docs 19-22
  // ──────────────────────────────────────────────────────────
  { id: 19, filename: "19-Testing-Strategy-QA-Plan.docx",             title: "Testing Strategy & QA Plan",           titleAr: "استراتيجية الاختبار وضمان الجودة",       phase: "analyze",  status: "not_started", dependsOn: [12, 14] },
  { id: 20, filename: "20-Product-Security-Assessment.docx",          title: "Product Security Assessment",          titleAr: "تقييم أمان المنتج",                     phase: "analyze",  status: "not_started", dependsOn: [13, 14] },
  { id: 21, filename: "21-Accessibility-Compliance-Checklist.docx",   title: "Accessibility Compliance Checklist",   titleAr: "قائمة فحص إمكانية الوصول",              phase: "analyze",  status: "not_started", dependsOn: [14] },
  { id: 22, filename: "22-Analytics-Tracking-Plan.docx",              title: "Analytics Tracking Plan",              titleAr: "خطة تتبع التحليلات",                    phase: "analyze",  status: "not_started", dependsOn: [6, 8] },

  // ──────────────────────────────────────────────────────────
  // Phase 6: افحص (Inspect) - المراجعة النهائية واكتشاف الثغرات
  // Doc 23
  // ──────────────────────────────────────────────────────────
  { id: 23, filename: "23-Deployment-Release-Plan.docx",              title: "Deployment & Release Plan",            titleAr: "خطة النشر والإصدار",                    phase: "inspect",  status: "not_started", dependsOn: [19, 20, 21] },

  // ──────────────────────────────────────────────────────────
  // Phase 7: تنفيذ (Execute) - إنتاج المخرجات النهائية
  // Docs 24-25
  // ──────────────────────────────────────────────────────────
  { id: 24, filename: "24-Incident-Response-Plan.docx",               title: "Incident Response Plan",               titleAr: "خطة الاستجابة للحوادث",                 phase: "execute",  status: "not_started", dependsOn: [13, 23] },
  { id: 25, filename: "25-Post-Launch-Review-Retrospective.docx",     title: "Post-Launch Review & Retrospective",   titleAr: "مراجعة ما بعد الإطلاق",                 phase: "execute",  status: "not_started", dependsOn: [22, 23] },
];

// ============================================================
// Phase definitions - 7 مراحل مترابطة
// ============================================================
export const PHASES: PhaseDefinition[] = [
  {
    id: "define",
    name: "Define",
    nameAr: "حدد",
    agentName: "define-agent",
    objective: "وضع إطار الهوية (Persona) والهدف الرئيسي للمهمة بدقة خالية من التأويل.",
    promptGuidance: "دورك هو [الدور المحدد]. الهدف: إنجاز [المهمة] بدقة وبدون أي غموض.",
    documents: [1, 2, 3],
    transitionCriteria: [
      "فرضية التأسيس مكتملة وواضحة بدون أي غموض",
      "الاستراتيجية تحدد الهوية والاتجاه بدقة",
      "PR-FAQ يعكس الهدف الرئيسي بوضوح",
    ],
    outputTo: ["clarify"],
  },
  {
    id: "clarify",
    name: "Clarify",
    nameAr: "وضح",
    agentName: "clarify-agent",
    objective: "توفير السياق، المحددات، شكل المخرجات، وأي قيود صارمة (Constraints).",
    promptGuidance: "المخرجات لازم تكون في [الشكل المحدد]، التزم بالأسلوب [الأسلوب]، ويُمنع تماماً [القيود].",
    documents: [4, 5, 6, 7, 8],
    transitionCriteria: [
      "بحث السوق يوفر سياق كامل ومحدد",
      "الموجز يحدد القيود والمحددات بوضوح",
      "OKRs تحدد شكل المخرجات المتوقعة",
      "شخصيات المستخدمين مكتملة (3 على الأقل)",
      "خريطة الرحلة توضح كل نقاط التماس والقيود",
    ],
    inputFrom: ["define"],
    outputTo: ["plan"],
  },
  {
    id: "plan",
    name: "Plan",
    nameAr: "خطط",
    agentName: "plan-agent",
    objective: "إجبار النموذج على بناء هيكل منطقي متسلسل قبل الشروع في الحل.",
    promptGuidance: "قبل كتابة أي كود/نص، حط خطة عمل متسلسلة للخطوات اللي هتمشي عليها.",
    documents: [9, 10, 11, 12],
    transitionCriteria: [
      "خارطة الطريق تعكس هيكل متسلسل ومنطقي",
      "الباكلوج مرتب حسب الأولوية والتسلسل",
      "DoR و DoD يضمنوا جودة كل خطوة",
    ],
    inputFrom: ["clarify"],
    outputTo: ["tasks"],
  },
  {
    id: "tasks",
    name: "Tasks",
    nameAr: "المهام",
    agentName: "tasks-agent",
    objective: "تفتيت الخطة لأجزاء صغيرة ومستقلة لتجنب التشتت التقني.",
    promptGuidance: "قسّم الخطة لمهام: 1. تحليل المعطيات، 2. صياغة الهيكل، 3. المراجعة.",
    documents: [13, 14, 15, 16, 17, 18],
    transitionCriteria: [
      "البنية المعمارية مفتتة لمكونات مستقلة",
      "التصميم التقني يغطي كل مهمة على حدة",
      "قاموس البيانات و API موثقين بالتفصيل",
      "قواعد البرمجة واضحة ومحددة لكل مهمة",
      "خطة إعادة الهيكلة مجدولة كمهام منفصلة",
    ],
    inputFrom: ["plan"],
    outputTo: ["analyze"],
  },
  {
    id: "analyze",
    name: "Analyze",
    nameAr: "حلل",
    agentName: "analyze-agent",
    objective: "تقييم المعطيات (Inputs) بناءً على قواعد محددة مسبقاً.",
    promptGuidance: "حلل البيانات/النص المرفق وحدد نقاط الضعف أو الأنماط قبل ما تقترح الحلول.",
    documents: [19, 20, 21, 22],
    transitionCriteria: [
      "استراتيجية الاختبار تحلل كل السيناريوهات",
      "تقييم الأمان يكشف نقاط الضعف",
      "فحص إمكانية الوصول يحدد الأنماط والثغرات",
      "خطة التحليلات تقيّم المعطيات بقواعد واضحة",
    ],
    inputFrom: ["tasks"],
    outputTo: ["inspect"],
  },
  {
    id: "inspect",
    name: "Inspect",
    nameAr: "افحص",
    agentName: "inspect-agent",
    objective: "المراجعة الذاتية لاكتشاف الثغرات المنطقية والهلوسة.",
    promptGuidance: "راجع المخرجات المبدئية عشان تتأكد من عدم وجود أخطاء أو تناقضات وصححها.",
    documents: [23],
    transitionCriteria: [
      "خطة النشر تمت مراجعتها لاكتشاف أي ثغرات",
      "خطة التراجع (Rollback) مفحوصة ومختبرة",
      "لا تناقضات بين خطة النشر والمخرجات السابقة",
    ],
    inputFrom: ["analyze"],
    outputTo: ["execute"],
  },
  {
    id: "execute",
    name: "Execute",
    nameAr: "تنفيذ",
    agentName: "execute-agent",
    objective: "البدء في إنتاج المخرجات بناءً على المراحل السابقة خطوة بخطوة.",
    promptGuidance: "ابدأ بتنفيذ المهمة الأولى بس، ولما أأكد لك نجاحها، انقل على المهمة التانية.",
    documents: [24, 25],
    transitionCriteria: [
      "خطة الاستجابة للحوادث جاهزة ومكتملة",
      "مراجعة ما بعد الإطلاق توثق النتائج والدروس",
      "خطة الإجراءات التصحيحية محددة وقابلة للتنفيذ",
    ],
    inputFrom: ["inspect"],
  },
];

// ============================================================
// Phase flow - ترتيب المراحل
// ============================================================
export const PHASE_FLOW: readonly string[] = [
  "define",    // 1. حدد
  "clarify",   // 2. وضح
  "plan",      // 3. خطط
  "tasks",     // 4. المهام
  "analyze",   // 5. حلل
  "inspect",   // 6. افحص
  "execute",   // 7. تنفيذ
] as const;

// ============================================================
// Helpers
// ============================================================
export function getPhaseById(id: string): PhaseDefinition | undefined {
  return PHASES.find((p) => p.id === id);
}

export function getDocById(id: number): WorkflowDocument | undefined {
  return WORKFLOW_DOCUMENTS.find((d) => d.id === id);
}

export function getPhaseDocuments(phaseId: string): WorkflowDocument[] {
  return WORKFLOW_DOCUMENTS.filter((d) => d.phase === phaseId);
}

export function getNextPhase(currentPhaseId: string): PhaseDefinition | undefined {
  const idx = PHASE_FLOW.indexOf(currentPhaseId);
  if (idx === -1 || idx === PHASE_FLOW.length - 1) return undefined;
  return getPhaseById(PHASE_FLOW[idx + 1]);
}

export function getPrevPhase(currentPhaseId: string): PhaseDefinition | undefined {
  const idx = PHASE_FLOW.indexOf(currentPhaseId);
  if (idx <= 0) return undefined;
  return getPhaseById(PHASE_FLOW[idx - 1]);
}
