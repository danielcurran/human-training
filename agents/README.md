# Lab Creation Agents

This directory contains AI agents that automate the lab design and build workflow. All agents are slash-command invokable (`/agent-name`) in VS Code.

## Quick Start

Type `/` in the chat and select:

1. **`/lab-outline-designer`** — Create a high-level lab outline from a topic
2. **`/lab-outline-converter`** — Convert outline → detailed technical spec
3. **`/lab-instruction-evaluator`** — Validate spec quality (gate: must score ≥8/10)
4. **`/lab-environment-builder`** — Generate working lab environment

## Agent Files

- `lab-outline-designer.md` — Designs lab outlines with learning objectives and stage structure
- `lab-outline-converter.md` — Expands outlines into full technical specifications
- `lab-instruction-evaluator.md` — Three-pass evaluation (section-by-section, full-spec, learner experience)
- `lab-environment-builder.md` — Generates Docker services, seed scripts, and check scripts
- `AGENTS.md` — Master index and workflow documentation

## Source of Truth

All agents consult the **[Instructional Design Rulebook](../standards/instructional-design-rulebook.md)** before taking any action. This is the authoritative standard for all lab creation. See Sections 0.1 (Humans Interpret, Agents Plan) and 0.2 (Backwards Design) for foundational principles.

## Workflow

```
Lab Outline          Technical Spec         Evaluation Report      Lab Environment
(High-level)         (Detailed)             (Quality assurance)    (Ready to run)
     
outline.md ------>  tech-spec.md ------>  eval-report.md ------> lab-test-env/
     ↓                   ↓                      ↓                      ↓
designer          converter              evaluator              builder
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
