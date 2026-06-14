# Human Training — MongoDB Training Labs for Humans

## Purpose
Framework for designing, building, and delivering hands-on MongoDB training labs for human learners. The human-learner counterpart to `agent-training`. Teaches MongoDB design thinking through intentional decision-making rather than rote coding.

## Tech Stack
- **Runtime:** Node.js v18+
- **Framework:** Express.js ^4.18
- **Database:** MongoDB v6+ (mongodb driver)
- **Containerization:** Docker / Docker Compose
- **Testing:** Jest, Supertest
- **Vector Search:** MongoDB Atlas Vector Search
- **AI Integration:** OpenAI API (text-embedding-ada-002)

## Key Files
- `standards/instructional-design-rulebook.md` — Pedagogical rulebook (466 lines)
- `.github/agents/` — 5 agent definitions (outline-builder, converter, spec-reviewer, lab-builder, qa-review)
- `.github/prompts/` — Slash-command prompt templates
- `labs/outlines/` — Lab outlines
- `labs/specs/` — Technical specifications
- `labs/reports/` — Evaluation reports
- `lab-test-env/building-app-with-code-agents/` — First complete lab environment

## Agent Pipeline
1. `/outline-builder` — Designs lab outlines
2. `/converter` — Converts outlines to technical specs
3. `/spec-reviewer` — 3-pass evaluation (gate: >= 8/10)
4. `/lab-builder` — Generates Docker/Node.js lab environments
5. `/qa-review` — Reviews built labs for instructional UX

## Pedagogical Principles
- Backwards design: start with end goal, define success criteria, design stages backward
- Zero prior knowledge assumption: every domain term defined on first use
- 3-5 stages per lab, each 15-30 minutes with concrete milestone checks
- KLI types: Memory/Fluency (early) vs. Induction/Refinement (later) — never mix
- Scaffolding reduction: full for new knowledge, reduced for prior
- 3-attempt failure recovery: reset, fallback, simplified objective
- At least one stage requires written reflection on design decisions

## Conventions
- VS Code custom agents invoked via slash commands
- All agents defined as .md files with YAML frontmatter
- Companion repo: danielcurran/agent-training
