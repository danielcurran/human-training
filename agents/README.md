# Lab Creation Agents

This directory contains AI agents that automate the lab design and build workflow. All agents are slash-command invokable (`/agent-name`) in VS Code.

## Quick Start

Type `/` in the chat and select:

1. **`/outline-builder`** — Create a high-level lab outline from a topic
2. **`/converter`** — Convert outline → detailed technical spec
3. **`/spec-reviewer`** — Validate spec quality (gate: must score ≥8/10)
4. **`/lab-builder`** — Generate working lab environment
5. **`/qa-review`** — Review built lab for instructional gaps and UX

## Agent Files

- `outline-builder.md` — Designs lab outlines with learning objectives and stage structure
- `converter.md` — Expands outlines into full technical specifications
- `spec-reviewer.md` — Three-pass evaluation (section-by-section, full-spec, resulting lab quality)
- `lab-builder.md` — Generates Docker services, seed scripts, and check scripts
- `qa-review.md` — Reviews built labs for instructional completeness and learner UX
- `AGENTS.md` — Master index and workflow documentation

## Source of Truth

All agents consult the **[Instructional Design Rulebook](../standards/instructional-design-rulebook.md)** before taking any action. This is the authoritative standard for all lab creation. See Sections 0.1 (Humans Interpret, Agents Plan) and 0.2 (Backwards Design) for foundational principles.

## Workflow

```
Lab Outline          Technical Spec         Evaluation Report      Lab Environment        QA Review
(High-level)         (Detailed)             (Quality assurance)    (Ready to run)         (Learner polish)
     
outline.md ------>  tech-spec.md ------>  eval-report.md ------> lab-test-env/ -------> qa-review.md
     ↓                   ↓                      ↓                      ↓                      ↓
outline-builder    converter             spec-reviewer          lab-builder           qa-review
```

## Key Concepts

- **Backwards Design** — Define the target task first, then work backwards to design stages
- **Unambiguous Instruction** — Learners know exactly what to do without guessing
- **Testable Success** — Every stage has a concrete milestone check
- **Graceful Failure** — Max 3 attempts per stage with documented fallback paths

## Related Documentation

- `../standards/instructional-design-rulebook.md` — Foundational principles
- `../labs/` — Lab outlines, specs, and reports
- `../lab-test-env/` — Built lab environments

## For Developers

Each agent is a VS Code custom agent (`.md` file) with:
- `user-invocable: true` in frontmatter (makes it a slash command)
- Foundation section that references the rulebook
- Detailed behaviors section that implements rulebook rules
- Success criteria tied to rulebook compliance

To update an agent:
1. Edit the `.md` file
2. Ensure all rulebook references are correct
3. Test by running `/agent-name` in VS Code chat
