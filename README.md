# MongoDB Training for Humans

Repository for designing, iterating, and delivering MongoDB education labs for human learners. Learners work through progressively harder labs that teach MongoDB concepts by doing — starting from SQL thinking and migrating to idiomatic MongoDB patterns.

## Purpose

This repository is the counterpart to [`agent-training`](https://github.com/danielcurran/agent-training). Where `agent-training` optimizes for *external AI agents* with explicit scaffolding and zero implicit context, this repository optimizes for *human learners* with storytelling, motivation scaffolds, and struggle recovery cues.

## Structure

| Directory | Purpose |
|---|---|
| `agents/` | AI agents that automate the lab design and build workflow |
| `standards/` | Instructional design principles and rubrics for human-centered MongoDB education |
| `skills/` | Reusable domain knowledge modules (teaching strategies, patterns, etc.) |
| `labs/` | Lab outlines, technical specs, and evaluation reports |
| `lab-test-env/` | Self-contained lab environments (Docker, Node.js, check scripts) |
| `docs/` | Research, design thinking, and learner feedback |

## Labs

| Lab | Status | Difficulty |
|---|---|---|
| [Builder Badge](labs/outlines/builder-badge) | Outline | Intermediate |
| (Your next lab here) | — | — |

## Workflow

Labs are created using a 5-agent pipeline (see [agents/AGENTS.md](agents/AGENTS.md)):

```
1. /lab-outline-designer     — Design high-level outline
2. /lab-outline-converter     — Convert outline → technical spec
3. /lab-instruction-evaluator — Validate spec (gate: ≥8/10)
4. /lab-environment-builder   — Build lab environment
5. /lab-instructional-qa-reviewer — QA review for learner experience
```

## Getting Started

### For Lab Authors
Read [standards/README.md](standards/README.md) for pedagogical principles and the lab design template.

### For Learners
Each lab has a `README.md` in its `lab-test-env/{lab-name}/` folder with setup and execution instructions.

### For Facilitators
See `docs/` for guidance on running these labs in classroom, bootcamp, or self-paced contexts.

## Differences from `agent-training`

| Aspect | agent-training | human-training |
|---|---|---|
| **Audience** | External AI agents | Human learners |
| **Scaffolding** | Explicit, exhaustive | Strategic (some struggle is productive) |
| **Instructions** | No implicit context, everything stated | Assumes common sense, domain knowledge |
| **Feedback** | Mechanical pass/fail checks | Formative feedback with explanations |
| **Pacing** | Agent-speed (fast completion) | Human-speed (time for reflection) |
| **Motivation** | Performance metrics, mastery | Curiosity, real-world application, community |
| **Error Recovery** | Restart; try again | Guided debugging, partial credit |

## Contributing

We welcome contributions:
- **New labs** — design and submit via pull request (see [standards/](standards/) for the template)
- **Feedback** — run a lab and tell us where you got stuck or what was unclear
- **Bug reports** — if a lab environment breaks or a check fails unexpectedly
- **Ideas** — open an issue to discuss MongoDB concepts we should teach

## Standards & Principles

All labs follow the [Instructional Design Rulebook](standards/instructional-design-rulebook.md). See that document for core learning science principles and how we apply them.

## Questions?

- **Lab design questions** — see `standards/` and `skills/`
- **Environment setup issues** — see each lab's README under `lab-test-env/{lab-name}/`
- **General feedback** — open an issue

---

**Repository:** [danielcurran/human-training](https://github.com/danielcurran/human-training)  
**Companion Repo:** [danielcurran/agent-training](https://github.com/danielcurran/agent-training)  
**License:** MIT (for code and environment); instructional content TBD
