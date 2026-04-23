---
name: instructional-design-rulebook
description: Instructional design principles for creating effective human learner labs
author: Lab Creation Framework
version: 1.0
---

# Instructional Design Rulebook for Human Learner Labs

This rulebook defines principles for creating effective, learner-centered training labs that can be completed by human learners in a VS Code environment. It applies to any technical domain or subject matter.

---

## Section 0: Foundation Principles

### 0.1: Humans Interpret, Agents Plan

Lab specifications must be written so that a learner with zero prior knowledge can:
1. Understand what they are being asked to do
2. Know what success looks like before they start
3. Identify when they are stuck and why
4. Recover from mistakes without re-reading the entire specification

Every section, stage, and check command must prioritize **unambiguous, actionable instruction** over conceptual completeness. If a choice exists between comprehensive explanation and crystal-clear direction, choose clarity.

---

### 0.2: Backwards Design

All labs must be designed using **backwards design** — a foundational approach that starts with the end goal and works backwards to design learning experiences.

**The backwards design process:**

1. **Start with the target task** — Define precisely what the learner will be able to do after completing the lab (see Section 1)
2. **Define success criteria** — Specify the exact behaviors, artifacts, or outputs that demonstrate the learner has achieved the target task (see Section 7 for milestone checks)
3. **Design learning experiences** — Work backwards from success criteria to identify what stages, concepts, and scaffolding are needed for the learner to reach that goal (see Sections 2-6)
4. **Build the environment** — Create the minimal working environment that supports the planned learning experiences without adding unnecessary complexity

**Why backwards design matters:**

- **Prevents scope creep** — Concepts or activities that don't directly support the target task are excluded
- **Ensures alignment** — Every stage, concept, and milestone check is justified by the end goal
- **Clarifies prerequisites** — Working backwards reveals what knowledge must come before what
- **Improves testability** — Success criteria are defined before the lab is built, making evaluation unambiguous

**Key backward design principle:** If a concept doesn't directly enable the learner to perform the target task, it does not belong in the lab. External resources can cover additional context, but the lab itself stays focused.

**Example of backwards design at work:**

- ❌ Non-backwards approach: "This lab teaches MongoDB basics: CRUD operations, indexing, aggregation pipelines, and replication."
- ✓ Backwards approach: "After this lab, you will **design a MongoDB schema for a ticket-tracking system and implement queries to support common access patterns** (view all tickets by user, filter by status, sort by date). The stages are: Stage 1 (understand access patterns), Stage 2 (design schema), Stage 3 (implement queries), Stage 4 (optimize with indexing). Aggregation pipelines and replication are out of scope."

---

## Section 1: Learning Objectives

Every lab must define **3-6 specific, measurable learning objectives** that:

1. **Are concrete**: "Understand X concept" is not specific enough. Use: "Implement X using pattern Y" or "Evaluate tradeoff between X and Y."
2. **Use measurable action verbs**: build, implement, design, debug, refactor, analyze, compare, optimize
3. **Avoid passive understanding**: "Know what a function is" → "Write and call a function that..."
4. **Map to stage completion**: Each objective should be achievable in 1-2 stages
5. **Stack progressively**: Later objectives build on earlier ones without assuming prior learning

**Example:**
- ❌ "Understand API design"
- ✓ "Design a REST API endpoint that accepts JSON input, validates the schema, and returns a 201 status on success"

---

## Section 2: Stage Design (3-5 Stages)

Every lab is broken into **3-5 sequential stages**. Each stage:

1. **Has a single, clear goal** — One primary concept or task per stage
2. **Builds on previous stages** — Outputs of Stage N become inputs to Stage N+1
3. **Is independently scoped** — A learner who understands prior content can complete this stage without re-reading earlier sections
4. **Takes 15-30 minutes** — Quick wins early, complexity grows gradually
5. **Has a concrete milestone check** — A testable outcome that confirms the learner succeeded

**Stage Structure:**
```
## Stage N: [Goal in 4-6 words]

### Goal
[One sentence describing the concrete outcome]

### Starting State
[What files/environment/knowledge the learner has at the start of this stage]

### Activities
[Numbered list of tasks or explorations the learner performs]

### Learner Skills/Tools Available
[Which tools, frameworks, or methodologies can be used]

### Artifact to Produce
[Specific file(s), code, or output the learner must create]

### Milestone Check
[Named command that validates success]
```

---

## Section 3: KLI Types (Knowledge Learning Interactions)

Every stage has one of two types:

### Memory and Fluency (Stages 1-2 usually)
- **Goal**: Build automaticity with new syntax, patterns, or workflows
- **Example tasks**: Write 3 functions using this pattern; run commands and observe output; follow a step-by-step guide
- **Learner role**: Active doer, following templates
- **Success metric**: Can execute the task correctly and repeatedly

### Induction and Refinement (Stages 3+ usually)
- **Goal**: Apply knowledge to novel situations; understand when and why to use patterns
- **Example tasks**: Refactor code for a new use case; explain tradeoffs; choose between two patterns and justify the choice
- **Learner role**: Decision-maker, with support
- **Success metric**: Makes sound decisions with reasoning

**Rule**: Do not mix KLI types in the same stage. If a stage asks learners to both memorize syntax and make design decisions, split into two stages.

---

## Section 4: Conceptual Framing and Mental Models

Many learners arrive with misconceptions or instincts from prior experience (e.g., SQL instincts when learning NoSQL, OOP instincts when learning functional programming).

Every stage that **challenges or reframes prior knowledge must include sense-making framing**:

```
### ⚠️ Reframing: [Concept]

[Your prior experience taught you X, but in this context, we use Y because...]

Example:
- In SQL, you normalized data to avoid redundancy.
- In this system, we denormalize strategically because [reason].
- Watch for this pattern in [Stage 2 activity].
```

**Rules:**
1. Identify the likely prior mental model (SQL, OOP, procedural, etc.)
2. Name the difference explicitly
3. Explain why the new approach is needed in *this* context
4. Show a concrete example
5. Point to where the learner will experience the new pattern

---

## Section 5: Input/Output Clarity

Every stage must have crystal-clear inputs and outputs:

### Inputs
- **What is available from the environment?** (files, database state, running services)
- **What knowledge or skills must the learner have acquired in prior stages?**
- **What tools or skills can the learner use?** (from available agent skills, frameworks, documentation)

If input is not available from prior stages or the environment, the stage is **blocked** — move it to a later position or add a prerequisite stage.

### Outputs
- **What file(s) or artifact(s) must the learner produce?**
- **What is the minimum quality bar?** (e.g., "minimum 200 words of explanation", "all functions must have examples")
- **In what location or format?** (e.g., "src/handler.js with exported function named `process()`")

**Rule**: Every output must be named and formatted precisely enough that a learner can check their own work against a simple rubric.

---

## Section 6: Scaffolding Reduction

Scaffolding is the support provided to learners. It must be **full for new knowledge** and **reduced for prior knowledge**.

### Full Scaffolding (New Knowledge)
- Step-by-step instructions
- Code examples with explanations
- Clarification of domain terminology
- Prompts guiding the learner through decision points

### Reduced Scaffolding (Prior Knowledge)
- High-level descriptions instead of step-by-step
- Hint prompts ("You'll need to consider X") instead of solutions
- Learner makes decisions with less guidance

**Rule**: Do NOT reduce scaffolding for new concepts just because they appeared in earlier stages. If Stage 1 taught pattern X, and Stage 4 uses pattern X in a new context, Stage 4 gets full scaffolding for the new context, even though pattern X is familiar.

Example:
- Stage 1 (full scaffolding): "Write a function that takes a number and returns it doubled. Use this template: `function double(n) { ... }`"
- Stage 2 (reduced scaffolding): "Write a function that applies doubling to each element in an array."
- Stage 3 (new concept, full scaffolding even though functions are known): "Asynchronous functions run in the background. Here's how to define one: `async function fetchData() { ... }`. Use await to pause execution."

---

## Section 7: Testability and Milestone Checks

Every stage must have one **milestone check** — a named, reproducible command that validates success:

```
### Milestone Check

Command: `npm run check:stage-1` or `python scripts/check_stage_1.py`

Expected Output:
```
✓ Output 1: [exact text]
✓ Output 2: [exact text]
[N checks passed, 0 failed]
```

**Rules:**
1. The check command must be runnable by learner without additional setup
2. The expected output must be shown exactly as it will appear in the terminal
3. The check must validate the **exact artifacts and behaviors** described in the stage
4. If the check runs queries against a database, show the query and expected result
5. For written artifacts (notes, explanations), specify minimum length or quality criteria

---

## Section 8: Failure Paths and Recovery

Labs must anticipate where learners will fail and provide recovery paths:

### Per-Stage Failure Handling

```
### If You Get Stuck

**Problem**: [Common failure mode]
**Why it happens**: [Explanation]
**Recovery steps**:
1. [Action 1]
2. [Action 2]
**If still stuck after 3 attempts**:
   - Run `npm run reset` to start the stage over
   - See [FAQ link] for common issues
```

### Maximum Iteration Rule

If a learner fails the milestone check more than **3 times**, they should have a fallback path:
- Option A: Jump to the next stage with a partially-correct state (if safe)
- Option B: Reset the environment and restart the stage
- Option C: Move to a simplified version of the objective

**Rule**: Every stage must document what happens after 3 failed attempts. This is not optional.

---

## Section 9: Zero-Knowledge Terminology

This rulebook assumes learners have **zero prior knowledge** of the domain/technology being taught.

### Terminology Rules

1. **Define every domain-specific term inline on first use**:
   - ❌ "Implement indexing to optimize queries"
   - ✓ "Implement **indexing** — telling the database to create a lookup table for faster searches — to optimize queries"

2. **Never assume familiarity with:**
   - Frameworks, libraries, or platforms
   - Mathematical or CS concepts
   - Architectural patterns
   - Industry jargon

3. **Include a Glossary section** at the end with all domain terms, definitions, and examples

4. **When contrasting with prior knowledge** (e.g., SQL vs. NoSQL), always explain the contrast:
   - What the learner likely knows from SQL
   - How this system differs
   - Why the difference matters

---

## Section 10: Reflection and Decision-Making

Labs must include opportunities for **learner reflection** and **documented decision-making**.

At least one stage must ask the learner to:

1. **Write a brief reflection** on a decision or tradeoff they made
2. **Document their reasoning** for choosing one approach over another
3. **Predict consequences** of their choice and compare to actual results

**Example Reflection Prompt:**
```
### Reflection: Design Tradeoff

In this stage, you chose [Option A] instead of [Option B].

1. Why did you choose Option A?
2. What is the benefit of this choice?
3. What is the downside?
4. When might Option B have been better?

Write 3-5 sentences in `reflection-stage-2.md`.
```

**Why**: Reflection deepens learning. Documented reasoning helps instructors iterate on the lab.

---

## Section 11: Environment Buildability

The lab environment (files, services, database) must be **fully specified** so it can be provisioned without trial-and-error.

### Environment Specification Checklist

- [ ] **Platform**: Explicitly state where the lab runs (local VS Code, cloud IDE, Docker, etc.)
- [ ] **Pre-installed tools**: List Node.js, Python, Docker, etc. versions
- [ ] **Running services**: Database, API servers, message queues — what needs to run and how to start it
- [ ] **Initial file structure**: Show the directory structure at the start of Stage 1
- [ ] **Seed data**: What test data exists before the learner starts, and why it's in that state
- [ ] **Health checks**: How the learner verifies the environment is ready before starting

### Seed Data Specification

For database labs:
```
### Seed Data

Collections to seed:
- `users` — 5 documents (shown below)
- `posts` — 10 documents

Starting state:
- All documents are flat (no embedded objects) — learner will add structure in Stage 2
- `posts.author_id` references `users._id` but the relationship is not modeled as a join — learner will normalize this

[Show sample documents]
```

---

## Section 12: Evaluation Scoring

After creating a lab, evaluate it against these 7 criteria. Score each as:
- **✓** (Fully met)
- **△** (Partially met)
- **✗** (Not met)

### 1. Task Clarity
Can a zero-knowledge learner understand what they are being asked to do without clarifying questions? Are learning objectives concrete and stage goals unambiguous?

### 2. Input/Output Definition
Are all inputs available from prior stages or the environment? Are all outputs (files, artifacts, data) named and formatted precisely?

### 3. Instructional Coherence
Does each stage state its KLI type? Does scaffolding reduce appropriately? Are prerequisites taught before they are used?

### 4. Testability
Does each stage have a concrete milestone check with exact expected output? Can a learner verify their own success?

### 5. Failure Fallbacks
Does every stage have a recovery path if the learner fails? Is there a max iteration rule (3 attempts) with a fallback?

### 6. Concept Coverage
Is every domain term defined on first use? Is there a glossary? Are contrasts with prior knowledge (if needed) explicit?

### 7. Buildability
Is the environment fully specified? Can someone provision the lab from the Environment Requirements and Seed Data sections without trial-and-error?

**Scoring Guide:**
- **6-7 ✓**: Ready to build
- **5 ✓, 1-2 △**: Minor revisions needed
- **4 ✓ or fewer**: Major revisions needed

---

## Section 13: Lab Specification Template

Use this template for all technical specifications:

```markdown
---
title: "[Lab Title]"
target_task: "[What learner will be able to do — 1-2 sentences]"
audience: "Human learner, zero prior knowledge of [domain]"
domain: "[e.g., Python, Web Development, Data Analysis]"
estimated_time: "[Total time in minutes, e.g., 60-90 minutes]"
---

# Technical Spec: [Lab Title]

## Learning Objectives

- [Objective 1 — specific, measurable]
- [Objective 2]
- [Objective 3]

## Application Context
[1-2 sentences describing the scenario — what the learner is building and why]

## Core Concepts Covered
[Table or list mapping concept → stage introduced]

## Environment Requirements
- **Platform**: [local VS Code / cloud IDE / other]
- **Tools**: [Node.js v18, Python 3.11, Docker, etc.]
- **Services**: [MongoDB, PostgreSQL, mock API server, etc.]
- **File Structure**: [Initial directory layout]

## Seed Data
- **Collections/Data to seed**: [description]
- **Starting state**: [what is intentionally incomplete or wrong]

## Stage 1: [Title]
[Full stage spec following Section 2 structure]

## Stage 2: [Title]
[Full stage spec]

## Stage 3: [Title]
[Full stage spec]

[... additional stages ...]

## Glossary
[All domain terms, definitions, examples]

## FAQ and Common Pitfalls
[Common questions and issues]
```

---

## Appendix: Common Anti-Patterns

### ❌ Anti-Pattern 1: "Scaffolding Cliff"
Stages 1-2 hold the learner's hand completely; Stage 3 suddenly requires complex independent thinking.

**Fix**: Reduce scaffolding gradually. Stage 2 should have some guided decision-making; Stage 3 adds more.

### ❌ Anti-Pattern 2: "Moving Target"
Each stage introduces new tools/frameworks instead of deepening practice with existing ones.

**Fix**: Introduce one new concept per stage. Return to and deepen prior concepts in later stages.

### ❌ Anti-Pattern 3: "Silent Failures"
A learner completes a task but the milestone check produces confusing error output (or no output).

**Fix**: Milestone checks must give clear pass/fail signals and explain why a check failed.

### ❌ Anti-Pattern 4: "Knowledge Cliff"
A stage assumes learners will know concept X from external reading, but doesn't teach it.

**Fix**: Teach everything needed to complete the stage within the stage. Link to external resources as optional deepening.

### ❌ Anti-Pattern 5: "Vague Artifacts"
"Write a brief summary" without specifying minimum length, tone, or structure.

**Fix**: "Write 3-5 sentences in `reflection.md` explaining why you chose approach X over approach Y."

---

## How to Use This Rulebook

1. **When designing a lab**: Start with Section 0.2 (Backwards Design) to define your target task and work backwards
2. **When creating a lab outline**: Use Sections 0.1, 1-4 to structure learning objectives and stages
3. **When writing a technical spec**: Use Sections 5-13 to ensure completeness
4. **When evaluating a lab**: Score against Section 12 criteria
5. **When building an environment**: Use Section 11 checklist
6. **When debugging learner confusion**: Check Section 9 (terminology) and Section 10 (mental models)

**Foundation principles:** Always ground your work in Section 0.1 (**Humans Interpret, Agents Plan** — unambiguous, actionable instruction) and Section 0.2 (**Backwards Design** — end goal first, then work backwards). If a section is ambiguous, refer back to these principles rather than assuming.
