# Product Lifecycle Workflow Agent | وكيل وركفلو دورة حياة المنتج

وكيل ذكي مبني على **DeepAgents + LangChain** لإدارة دورة حياة تطوير المنتج الكاملة.

## 🧠 Framework: 7 مراحل

النظام مبني على framework من 7 مراحل متسلسلة، كل مرحلة لها هدف تقني محدد:

```
حدد → وضح → خطط → المهام → حلل → افحص → تنفيذ
```

| # | المرحلة | Phase | الهدف التقني | الوثائق |
|---|---------|-------|-------------|---------|
| 1 | 🎯 حدد | Define | وضع إطار الهوية والهدف بدقة خالية من التأويل | 01-03 |
| 2 | 🔍 وضح | Clarify | توفير السياق، المحددات، شكل المخرجات، والقيود | 04-08 |
| 3 | 📋 خطط | Plan | بناء هيكل منطقي متسلسل قبل الشروع في الحل | 09-12 |
| 4 | ⚙️ المهام | Tasks | تفتيت الخطة لأجزاء صغيرة ومستقلة | 13-18 |
| 5 | 🔬 حلل | Analyze | تقييم المعطيات بناءً على قواعد محددة | 19-22 |
| 6 | 🔎 افحص | Inspect | المراجعة الذاتية لاكتشاف الثغرات والهلوسة | 23 |
| 7 | 🚀 تنفيذ | Execute | إنتاج المخرجات النهائية خطوة بخطوة | 24-25 |

## 📄 25 وثيقة

### 1. حدد (Define)
| # | الوثيقة | الوصف |
|---|---------|-------|
| 01 | Founding Hypothesis | فرضية التأسيس - "مين إحنا وإيه الهدف" |
| 02 | Product Strategy | استراتيجية المنتج - الاتجاه والهوية |
| 03 | PR-FAQ Document | البيان الصحفي - الهدف كخبر واضح |

### 2. وضح (Clarify)
| # | الوثيقة | الوصف |
|---|---------|-------|
| 04 | Market Research & Competitive Analysis | السياق السوقي والقيود |
| 05 | Product Brief for AI Development | المحددات والقيود التقنية |
| 06 | OKRs | شكل المخرجات المتوقعة بأرقام |
| 07 | User Research & Personas | سياق المستخدم وقيوده |
| 08 | Customer Journey Map | نقاط التماس والقيود في الرحلة |

### 3. خطط (Plan)
| # | الوثيقة | الوصف |
|---|---------|-------|
| 09 | Product Roadmap | الهيكل المنطقي المتسلسل الكبير |
| 10 | Product Backlog & User Stories | الهيكل التفصيلي - كل خطوة |
| 11 | Definition of Ready | معايير "متى نبدأ خطوة" |
| 12 | Definition of Done | معايير "متى خلصت خطوة" |

### 4. المهام (Tasks)
| # | الوثيقة | الوصف |
|---|---------|-------|
| 13 | App Architecture Plan | تفتيت النظام لمكونات مستقلة |
| 14 | Technical Design Document | تفصيل كل مهمة تقنية |
| 15 | Data Dictionary & Catalog | مهمة مرجعية - البيانات |
| 16 | API Documentation | مهمة مرجعية - الواجهات |
| 17 | AI Coding Rules & Standards | قواعد تنفيذ المهام |
| 18 | Refactoring Plan | مهام الصيانة المستقلة |

### 5. حلل (Analyze)
| # | الوثيقة | الوصف |
|---|---------|-------|
| 19 | Testing Strategy & QA Plan | تحليل سيناريوهات الجودة |
| 20 | Product Security Assessment | تحليل نقاط الضعف الأمنية |
| 21 | Accessibility Compliance | تحليل أنماط الوصول والثغرات |
| 22 | Analytics Tracking Plan | تقييم المعطيات بقواعد واضحة |

### 6. افحص (Inspect)
| # | الوثيقة | الوصف |
|---|---------|-------|
| 23 | Deployment & Release Plan | الفحص النهائي قبل التنفيذ |

### 7. تنفيذ (Execute)
| # | الوثيقة | الوصف |
|---|---------|-------|
| 24 | Incident Response Plan | التنفيذ العملي للطوارئ |
| 25 | Post-Launch Review | تنفيذ التقييم النهائي |

## 🤖 فريق الوكلاء (8 Agents)

| # | الوكيل | المرحلة | الدور |
|---|--------|---------|-------|
| 0 | Orchestrator | الكل | المنسق الرئيسي - إدارة الـ 7 مراحل |
| 1 | define-agent | حدد | تحديد الهوية والهدف |
| 2 | clarify-agent | وضح | توفير السياق والقيود |
| 3 | plan-agent | خطط | بناء الهيكل المنطقي |
| 4 | tasks-agent | المهام | تفتيت الخطة لمهام |
| 5 | analyze-agent | حلل | تقييم وتحليل المعطيات |
| 6 | inspect-agent | افحص | المراجعة واكتشاف الثغرات |
| 7 | execute-agent | تنفيذ | إنتاج المخرجات النهائية |

## 📁 هيكل المشروع

```
├── src/
│   ├── agents/
│   │   └── create-agents.ts    # إنشاء 8 وكلاء (orchestrator + 7)
│   ├── config/
│   │   ├── documents.ts        # 25 وثيقة + 7 مراحل + التبعيات
│   │   └── models.ts           # إعدادات النموذج (Anthropic/OpenAI)
│   ├── prompts/
│   │   └── system.ts           # System prompts لكل وكيل (بالعربي)
│   ├── tools/
│   │   ├── docx-tools.ts       # إنشاء ملفات DOCX
│   │   ├── search-tools.ts     # بحث الإنترنت (Tavily)
│   │   └── workflow-tools.ts   # حالة الوركفلو وفحص الانتقال
│   ├── types/
│   │   └── index.ts            # TypeScript types + Zod schemas
│   ├── cli.ts                  # واجهة سطر الأوامر التفاعلية
│   └── index.ts                # Programmatic API exports
├── package.json
├── tsconfig.json
├── .env.example
└── .gitignore
```

## 🚀 التشغيل

### 1. التثبيت
```bash
npm install
```

### 2. إعداد API Key
```bash
cp .env.example .env
# أضف أحد المفاتيح:
# ANTHROPIC_API_KEY=sk-ant-...
# OPENAI_API_KEY=sk-...
# TAVILY_API_KEY=tvly-...  (اختياري - للبحث)
```

### 3. التشغيل
```bash
# الوركفلو الكامل (7 مراحل)
npm run start

# واجهة تفاعلية
npm run run:phase

# تطوير
npm run dev
```

### 4. الاستخدام البرمجي
```typescript
import { createWorkflowAgent } from "./src/index.js";

const agent = createWorkflowAgent();
const result = await agent.invoke({
  messages: [{
    role: "user",
    content: "نفّذ الوركفلو الكامل لمشروع: تطبيق إدارة المهام بالـ AI"
  }]
});
```

## 🔗 تدفق المراحل

```
حدد (01-03) ─── مخرجات ──→ وضح (04-08)
                              │
                              ↓
                          خطط (09-12)
                              │
                              ↓
                        المهام (13-18)
                              │
                              ↓
                         حلل (19-22)
                              │
                              ↓
                        افحص (23)
                              │
                              ↓
                        تنفيذ (24-25)
```

كل مرحلة تغذي المرحلة اللي بعدها - مخرجات "حدد" هي مدخلات "وضح"، وهكذا.

## 📜 License

MIT
