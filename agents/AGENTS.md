---
name: lab-agents
description: Index of all lab creation agents for building human learner training labs
---

# Lab Creation Agents

This directory contains specialized agents for creating, validating, and building technical training labs optimized for human learners in VS Code.

**All agents are slash-command invokable.** Type `/` in the chat and select the agent you need. Each agent automatically consults the [Instructional Design Rulebook](../standards/instructional-design-rulebook.md) as its source of truth before taking any action.

## Workflow Overview

The lab creation workflow follows this sequence:

```
/outline-builder
        ↓
/converter
        ↓
/spec-reviewer
        ↓
/lab-builder
        ↓
/qa-review
```

---

## Agents

### 1. Outline Builder
**Slash command:** `/outline-builder`

**File:** [outline-builder.md](outline-builder.md)

Design a lab outline from learning objectives and concept scope.

**Source of truth:** [Instructional Design Rulebook](../standards/instructional-design-rulebook.md) — Uses Sections 0.1, 0.2, 1-4 (backwards design, learning objectives, stage structure)

**Use when:**
- Designing a new training lab from scratch
- Planning what concepts to teach
- Scoping stage-by-stage activities
- Defining learner goals and milestones

**Inputs:** Topic, target audience, environment, constraints
**Output:** Lab outline saved to `labs/outlines/[lab-name]-outline.md`
**Next step:** Run `/converter`

---

### 2. Converter
**Slash command:** `/converter`

**File:** [converter.md](converter.md)

Convert a lab outline into a detailed technical specification.

**Source of truth:** [Instructional Design Rulebook](../standards/instructional-design-rulebook.md) — Uses Sections 5-13 (input/output clarity, scaffolding, testability, terminology, environment buildability)

**Use when:**
- You have a lab outline and need the full spec
- Expanding outlines into step-by-step instructions
- Defining all environment requirements and seed data

**Inputs:** Lab outline (file), target task, audience, platform
**Output:** Tech spec saved to `labs/specs/[lab-name]-tech-spec.md`
**Next step:** Run `/spec-reviewer`

---

### 3. Spec Reviewer
**Slash command:** `/spec-reviewer`

**File:** [spec-reviewer.md](spec-reviewer.md)

Evaluate a lab specification for quality and buildability.

**Source of truth:** [Instructional Design Rulebook](../standards/instructional-design-rulebook.md) — Uses Section 12 (7-criteria evaluation: task clarity, input/output definition, coherence, testability, failure fallbacks, concept coverage, buildability)

**Use when:**
- Validating a spec before building the environment
- Getting feedback on spec quality
- Identifying gaps in instructions or learner experience

**Inputs:** Lab tech spec (file)
**Output:** Evaluation report saved to `labs/reports/[lab-name]-tech-spec-eval-v[N].md`
**Gate:** Spec must score ≥8/10 on both Spec Quality and Resulting Lab Quality
**Next step:** If passing, run `/lab-builder`; otherwise, revise spec

---

### 4. Lab Builder
**Slash command:** `/lab-builder`

**File:** [lab-builder.md](lab-builder.md)

Generate a working test environment from a validated lab spec.

**Source of truth:** [Instructional Design Rulebook](../standards/instructional-design-rulebook.md) — Uses Sections 0.2 (backwards design), 7 (milestone checks), 11 (environment buildability)

**Use when:**
- Building the lab skeleton and tooling
- Setting up Docker services and seed data
- Creating check scripts for milestone validation

**Inputs:** Validated tech spec (must have evaluation scores ≥8/10), lab name
**Output:** Complete environment in `lab-test-env/[lab-name]/`
**Success:** `npm install && npm run seed && npm run check:all` works without errors

---

### 5. QA Review
**Slash command:** `/qa-review`

**File:** [qa-review.md](qa-review.md)

Review a built lab for instructional completeness and learner UX—focusing on the actual learner experience.

**Source of truth:** [Instructional Design Rulebook](../standards/instructional-design-rulebook.md) — Uses Sections 1 (prerequisites), 6 (scaffolding), 7 (milestone clarity), 8 (learner voice)

**Scope:** Narrow and focused—assesses the final lab from a learner's perspective, not a builder evaluation. Checks clarity, scaffolding, pacing, accuracy, typos, navigation, and polish.

**Use when:**
- Validating the lab is ready for learners
- Finding instructional gaps or confusing sections
- Identifying typos, formatting issues, or broken references
- Improving UX and navigation
- Checking stage-by-stage completability

**Inputs:** Built lab environment (from `/lab-builder`)
**Output:** QA Review report saved to `labs/reports/[lab-name]-instructional-qa-review-v[N].md`
**Gate:** Ready for release / Minor fixes needed / Major revisions needed
**Next step:** If major revisions needed, feed back to spec or builder; otherwise, lab is ready for learners

---

## Supporting Documentation

### Instructional Design Rulebook
**File:** [standards/instructional-design-rulebook.md](../standards/instructional-design-rulebook.md)

The foundation for all lab creation. Defines:
- Learning objectives and stage design
- Scaffolding and KLI types
- Terminology standards
- Evaluation criteria

**Read this first.** All agents reference it.

---

## Lab Directory Structure

Labs are organized as follows:

```
labs/
├── outlines/
│   └── [lab-name]-outline.md           # High-level plan
├── specs/
│   └── [lab-name]-tech-spec.md         # Detailed specification
└── reports/
    └── [lab-name]-tech-spec-eval-v1.md # Evaluation report

lab-test-env/
└── [lab-name]/                         # Built environment
    ├── .env.example
    ├── docker-compose.yml
    ├── package.json
    ├── README.md
    ├── lib/
    ├── src/
    └── scripts/
        ├── seed.js
        ├── reset.js
        ├── check-env.js
        └── check-[stage-name].js (one per stage)
```

---

## Quick Start Example

### Step 1: Design the Outline

```
/outline-builder

Topic: Learning to build REST APIs
Audience: JavaScript developers new to Express
Environment: Local VS Code
```

Output: `labs/outlines/rest-api-outline.md`

### Step 2: Convert to Spec

```
/converter #file labs/outlines/rest-api-outline.md
```

Output: `labs/specs/rest-api-tech-spec.md`

### Step 3: Evaluate

```
/spec-reviewer #file labs/specs/rest-api-tech-spec.md
```

Output: `labs/reports/rest-api-tech-spec-eval-v1.md`

Check: Both scores ≥ 8/10? If yes, proceed to Step 4.

### Step 4: Build Environment

```
/lab-builder #file labs/specs/rest-api-tech-spec.md
Lab name: rest-api
```

Output: `lab-test-env/rest-api/` ready to run

### Step 5: QA Review

```
/qa-review
Lab name: rest-api
```

Output: `labs/reports/rest-api-instructional-qa-review-v1.md`

### Verify

```bash
cd lab-test-env/rest-api
npm install
docker-compose up -d
npm run seed
npm run check:all
```

---

## Principles

### Human Interpretation First
Every lab is written using **backwards design** (define the end goal, work backwards to design stages) and **unambiguous instruction** (learners know what to do without guessing). All agents follow the foundation principles from Section 0 of the Instructional Design Rulebook.

### Zero Prior Knowledge
All labs assume learners have no domain knowledge. Every concept is defined on first use.

### Testable Success
Every stage has a concrete milestone check. Learners know exactly what success looks like.

### Graceful Failure
Labs anticipate where learners will get stuck and provide recovery paths. Maximum 3 attempts before fallback.

---

## Examples

See these directories for reference lab specifications and environments:

- `labs/specs/` — Reference technical specifications
- `lab-test-env/` — Built lab environments ready to run

---

## Troubleshooting

### Agent doesn't seem to apply?
Make sure the `description` field in the agent's frontmatter includes the keywords from your request. The system uses `description` to decide which agent to invoke.

### Agent is missing features?
Check the [Instructional Design Rulebook](../standards/instructional-design-rulebook.md) for the authoritative standard. All agents implement it.

### Lab environment won't start?
1. Ensure Docker Desktop is running
2. Check `.env` exists and has correct `DATABASE_URL`
3. Run `docker-compose logs` to see service output
4. Verify ports 27017, 3000, 5432 (etc.) are not already in use

---

## Contact & Feedback

These agents implement the [Instructional Design Rulebook](../standards/instructional-design-rulebook.md). 

For questions or improvements:
1. Check the rulebook first
2. Consult the specific agent definition
3. Run the evaluation agent on any lab you're uncertain about

