---
description: Create or update the full product lifecycle specification from a natural language product description across 7 phases and 25 documents.
handoffs:
  - label: Build Technical Plan
    agent: workflow.plan
    prompt: Create a technical plan for the product spec. I am building with...
  - label: Clarify Spec Requirements
    agent: workflow.clarify
    prompt: Clarify product specification requirements
    send: true
  - label: Run Single Phase
    agent: workflow.phase
    prompt: Execute a specific phase of the workflow
  - label: Check Workflow Status
    agent: workflow.status
    prompt: Show current status of all 25 documents across 7 phases
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

The text the user typed after `/workflow.specify` in the triggering message **is** the product description. Assume you always have it available in this conversation even if `$ARGUMENTS` appears literally below. Do not ask the user to repeat it unless they provided an empty command.

Given that product description, do this:

1. **Generate a concise project short name** (2-4 words) for the project directory:
   - Analyze the product description and extract the most meaningful keywords
   - Create a 2-4 word short name that captures the essence of the product
   - Use noun-noun or adjective-noun format (e.g., "ai-task-manager", "health-tracker", "smart-inventory")
   - Preserve technical terms and acronyms (AI, SaaS, IoT, etc.)
   - Keep it concise but descriptive enough to understand the product at a glance
   - Examples:
     - "تطبيق إدارة مهام بالذكاء الاصطناعي" → "ai-task-manager"
     - "منصة تحليلات للتجارة الإلكترونية" → "ecommerce-analytics"
     - "نظام إدارة مخزون ذكي" → "smart-inventory"
     - "تطبيق صحي لمتابعة المرضى" → "patient-health-tracker"

2. **Initialize the project workspace** by creating the output directory structure:

   ```bash
   mkdir -p ./output/$PROJECT_SHORT_NAME/{define,clarify,plan,tasks,analyze,inspect,execute}/checklists
   ```

   This creates 7 phase directories matching:
   - `define/` → حدد (docs 01-03)
   - `clarify/` → وضح (docs 04-08)
   - `plan/` → خطط (docs 09-12)
   - `tasks/` → المهام (docs 13-18)
   - `analyze/` → حلل (docs 19-22)
   - `inspect/` → افحص (doc 23)
   - `execute/` → تنفيذ (docs 24-25)

3. **Save the project context** as `./output/$PROJECT_SHORT_NAME/project-context.json`:

   ```json
   {
     "projectName": "[extracted from description]",
     "projectDescription": "[full user description]",
     "targetAudience": "[inferred or ask]",
     "industry": "[inferred or ask]",
     "techStack": "[inferred or ask]",
     "teamSize": "[inferred or ask]",
     "timeline": "[inferred or ask]",
     "shortName": "[project-short-name]",
     "createdAt": "[ISO timestamp]"
   }
   ```

4. **Follow the 7-phase execution flow**:

   ```
   حدد → وضح → خطط → المهام → حلل → افحص → تنفيذ
   ```

   Each phase MUST complete fully before moving to the next. Each phase's outputs are the next phase's inputs.

   ### Phase 1: حدد (Define) — Documents 01-03
   **Technical Objective:** وضع إطار الهوية والهدف بدقة خالية من التأويل.
   **Guiding Principle:** "دورك هو [كذا]. الهدف: إنجاز المهمة [كذا]."

   1. Parse the product description from Input
      If empty: ERROR "No product description provided"
   2. Extract key concepts from description
      Identify: problem, solution, target audience, competitive advantage
   3. Generate the 3 documents:

      **01 - Founding Hypothesis (فرضية التأسيس):**
      - Define the problem with absolute precision — who suffers and why
      - Formulate the proposed solution and value proposition — no ambiguity
      - Identify target audience and competitive advantage precisely
      - Write testable hypotheses (Testable Hypotheses)
      - Every sentence must be 100% clear — zero room for interpretation

      **02 - Product Strategy (استراتيجية المنتج):**
      - Vision and Mission — clear and unambiguous
      - Market analysis (TAM/SAM/SOM) with specific numbers
      - Competitor analysis — who exactly and what's different
      - Differentiation strategy — what makes us different

      **03 - PR-FAQ Document (وثيقة البيان الصحفي):**
      - Imaginary press release about product launch (Amazon methodology)
      - FAQ from users and internal stakeholders
      - Every Q&A must reflect the identity and goal

   4. Write each document to `define/` directory using `generate_docx`
   5. Run phase transition check before proceeding

   ### Phase 2: وضح (Clarify) — Documents 04-08
   **Technical Objective:** توفير السياق، المحددات، شكل المخرجات، والقيود الصارمة.
   **Guiding Principle:** "المخرجات لازم تكون في [شكل]، التزم بـ [أسلوب]، يُمنع [قيود]."
   **Inputs from Phase 1:** Documents 01-03

   Generate documents 04-08 building on Phase 1 outputs:
   - 04: Market Research — external context and market constraints
   - 05: Product Brief — technical constraints and boundaries
   - 06: OKRs — expected output shape with specific numbers
   - 07: User Research & Personas — user context and constraints (3+ personas)
   - 08: Customer Journey Map — all touchpoints and constraints

   Every Constraint must be explicit and clear.

   ### Phase 3: خطط (Plan) — Documents 09-12
   **Technical Objective:** بناء هيكل منطقي متسلسل قبل الشروع في الحل.
   **Guiding Principle:** "قبل كتابة أي كود/نص، حط خطة عمل متسلسلة للخطوات."
   **Inputs from Phase 2:** Documents 04-08

   Generate documents 09-12:
   - 09: Product Roadmap — sequential logical structure
   - 10: Product Backlog & User Stories — each story is a "step" in the plan (15-20 stories)
   - 11: Definition of Ready — criteria for "when to start a step"
   - 12: Definition of Done — criteria for "when a step is complete"

   Every element depends on the one before it.

   ### Phase 4: المهام (Tasks) — Documents 13-18
   **Technical Objective:** تفتيت الخطة لأجزاء صغيرة ومستقلة لتجنب التشتت التقني.
   **Guiding Principle:** "قسّم الخطة لمهام: 1. تحليل، 2. صياغة، 3. مراجعة."
   **Inputs from Phase 3:** Documents 09-12

   Generate documents 13-18:
   - 13: App Architecture Plan — break system into independent components
   - 14: Technical Design Document — detail each technical task
   - 15: Data Dictionary & Catalog — reference task for all data
   - 16: API Documentation — reference task for all interfaces
   - 17: AI Coding Rules & Standards — execution rules per task
   - 18: Refactoring Plan — maintenance as independent tasks

   Each task must have: inputs, outputs, and clear completion criteria.

   ### Phase 5: حلل (Analyze) — Documents 19-22
   **Technical Objective:** تقييم المعطيات بناءً على قواعد محددة مسبقاً.
   **Guiding Principle:** "حلل البيانات وحدد نقاط الضعف أو الأنماط قبل الحلول."
   **Inputs from Phase 4:** Documents 13-18

   Generate documents 19-22:
   - 19: Testing Strategy & QA Plan — analyze all scenarios, discover quality weaknesses
   - 20: Product Security Assessment — analyze security weaknesses (OWASP Top 10)
   - 21: Accessibility Compliance — analyze access patterns and gaps (WCAG)
   - 22: Analytics Tracking Plan — evaluate data with clear rules

   Analyze before proposing — discover patterns first.

   ### Phase 6: افحص (Inspect) — Document 23
   **Technical Objective:** المراجعة الذاتية لاكتشاف الثغرات المنطقية والهلوسة.
   **Guiding Principle:** "راجع المخرجات وتأكد من عدم وجود أخطاء أو تناقضات."
   **Inputs from Phase 5:** Documents 19-22 + all previous outputs as reference

   Generate document 23:
   - 23: Deployment & Release Plan — final inspection before execution
   - Review every item against previous documents
   - Check for contradictions and logical gaps
   - Ensure every weakness from "Analyze" has a resolution
   - This is NOT production time — this is review and inspection time

   ### Phase 7: تنفيذ (Execute) — Documents 24-25
   **Technical Objective:** إنتاج المخرجات النهائية خطوة بخطوة.
   **Guiding Principle:** "ابدأ بالمهمة الأولى، ولما تنجح انقل على التانية."
   **Inputs from Phase 6:** Document 23 + all previous outputs

   Generate documents 24-25 sequentially:
   - 24: Incident Response Plan — practical execution: "what to do if something goes wrong"
   - 25: Post-Launch Review & Retrospective — final evaluation and documented lessons

   Start with 24, complete it fully, then move to 25.
   All content must be production-ready and directly usable.

5. **Specification Quality Validation**: After completing each phase, validate against quality criteria:

   a. **Create Phase Quality Checklist**: Generate a checklist file at `$PHASE_DIR/checklists/phase-quality.md`:

      ```markdown
      # Phase Quality Checklist: [PHASE_NAME_AR] ([PHASE_NAME_EN])

      **Purpose**: Validate phase completeness and quality before transition
      **Created**: [DATE]
      **Project**: [PROJECT_NAME]
      **Phase**: [PHASE_NUMBER]/7

      ## Content Quality

      - [ ] All documents written in Arabic with technical terms in English
      - [ ] Content is real and data-driven, not placeholders
      - [ ] No contradictions with previous phases
      - [ ] Outputs align with phase's technical objective

      ## Phase-Specific Requirements

      [Auto-generated based on phase transition criteria from documents.ts]

      ## Cross-Phase Consistency

      - [ ] This phase's outputs can serve as valid inputs for the next phase
      - [ ] No information gaps between this phase and previous phases
      - [ ] Dependencies from documents.ts are satisfied

      ## Readiness for Next Phase

      - [ ] All documents in this phase are complete
      - [ ] Phase transition criteria are met
      - [ ] Ready for: [NEXT_PHASE_NAME_AR] ([NEXT_PHASE_NAME_EN])

      ## Notes

      - Items marked incomplete require updates before proceeding
      ```

   b. **Run Validation Check**: Review each document against:
      - Phase technical objective alignment
      - Cross-document consistency
      - Transition criteria fulfillment
      - Document dependency satisfaction

   c. **Handle Validation Results**:

      - **If all items pass**: Mark checklist complete, proceed to next phase

      - **If items fail (fixable)**:
        1. List failing items and specific issues
        2. Update the documents to address each issue
        3. Re-run validation (max 3 iterations per phase)
        4. If still failing after 3 iterations, document remaining issues and warn user

      - **If [NEEDS CLARIFICATION] items found**:
        1. Extract all unclear aspects across the phase
        2. **LIMIT CHECK**: Maximum 3 clarification questions per phase
        3. For each clarification needed (max 3), present options:

           ```markdown
           ## Question [N]: [Topic]

           **Context**: [Quote relevant document section]
           **Phase**: [Current phase name]
           **Impact**: [scope | security | UX | technical]

           **What we need to know**: [Specific question]

           **Suggested Answers**:

           | Option | Answer | Implications |
           |--------|--------|--------------|
           | A      | [First suggestion]  | [Impact on product] |
           | B      | [Second suggestion] | [Impact on product] |
           | C      | [Third suggestion]  | [Impact on product] |
           | Custom | Your own answer     | [How to provide]    |

           **Your choice**: _[Wait for user response]_
           ```

        4. Number questions sequentially (Q1, Q2, Q3 — max 3 per phase)
        5. Present all questions together before waiting
        6. Update documents with user's choices
        7. Re-run validation

   d. **Update Checklist** after each iteration with current pass/fail status

6. **Report completion** with:
   - Project name and short name
   - Phase-by-phase status summary:
     ```
     🎯 حدد:    [✅/⬜] 3/3 documents
     🔍 وضح:    [✅/⬜] 5/5 documents
     📋 خطط:    [✅/⬜] 4/4 documents
     ⚙️ المهام:  [✅/⬜] 6/6 documents
     🔬 حلل:    [✅/⬜] 4/4 documents
     🔎 افحص:   [✅/⬜] 1/1 documents
     🚀 تنفيذ:   [✅/⬜] 2/2 documents
     ─────────────────────────
     Total: [X]/25 documents complete
     ```
   - Any remaining clarification items
   - Readiness for next steps (`/workflow.clarify` or `/workflow.plan`)

## General Guidelines

### Quick Guidelines

- Each phase has a **technical objective** — all documents in that phase must serve it.
- Phase outputs = next phase inputs. No gaps allowed.
- Focus on **WHAT** users need and **WHY** in early phases (حدد, وضح).
- Focus on **HOW** to structure in middle phases (خطط, المهام).
- Focus on **VERIFY** and **VALIDATE** in later phases (حلل, افحص).
- Focus on **DELIVER** in the final phase (تنفيذ).
- Write in Arabic with technical terms in English.
- DO NOT create embedded checklists inside documents — use separate checklist files.

### Phase Execution Rules

- **Sequential**: Complete phases in order. Never skip a phase.
- **Dependent**: Each phase reads outputs from all previous phases.
- **Validated**: Every phase ends with quality validation before transition.
- **Bounded**: Maximum 3 [NEEDS CLARIFICATION] per phase (21 max across entire workflow).

### For AI Generation

When creating documents from a user prompt:

1. **Make informed guesses**: Use context, industry standards, and common patterns to fill gaps
2. **Document assumptions**: Record reasonable defaults in each document's assumptions section
3. **Limit clarifications**: Maximum 3 [NEEDS CLARIFICATION] markers per phase — use only for critical decisions that:
   - Significantly impact product scope or user experience
   - Have multiple reasonable interpretations with different implications
   - Lack any reasonable default
4. **Prioritize clarifications**: scope > security/privacy > user experience > technical details
5. **Think like a product owner**: Every vague requirement should fail the phase transition check
6. **Cross-reference**: Every document must reference its dependencies explicitly

**Examples of reasonable defaults** (don't ask about these):
- Market size: Use publicly available industry data and standard estimation methods
- User personas: Based on common patterns for the industry/product type
- Tech stack: Modern standard stack unless user specifies otherwise
- Performance targets: Standard web/mobile app expectations
- Security: OWASP Top 10 compliance as baseline
- Accessibility: WCAG 2.1 Level AA as baseline
- Analytics: Standard funnel metrics + product-specific KPIs
- Deployment: Blue/Green or Canary as default strategy
- Incident response: Standard P0-P4 classification with industry SLAs

### Success Criteria Guidelines

Success criteria across all documents must be:

1. **Measurable**: Include specific metrics (time, percentage, count, rate)
2. **Phase-appropriate**: Match the technical objective of the current phase
3. **Traceable**: Link back to OKRs (doc 06) and user personas (doc 07)
4. **Verifiable**: Can be tested/validated at the appropriate phase

### Document Dependency Rules

```
[حدد] → 01 → 02 → 03
[وضح] → 02→04, 02+04→05, 02+05→06, 04+06→07, 07→08
[خطط] → 06+08→09, 09+07→10, 10→11, 10→12
[المهام] → 05+10→13, 13→14, 14→15, 14→16, 13→17, 14→18
[حلل] → 12+14→19, 13+14→20, 14→21, 06+08→22
[افحص] → 19+20+21→23
[تنفيذ] → 13+23→24, 22+23→25
```

Every document MUST read its dependencies before generating content. No document operates in isolation.
