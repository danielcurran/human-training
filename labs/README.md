# Labs

This directory contains all MongoDB training labs for human learners.

## Structure

```
labs/
├── outlines/             # High-level lab design (conceptual)
│   └── {lab-name}-outline.md
├── specs/                # Detailed technical specifications (ready to build)
│   └── {lab-name}-tech-spec.md
├── reports/              # Evaluation and feedback reports
│   └── {lab-name}-eval-{version}.md
└── README.md             # This file
```

## Workflow

1. **Outline** — Author sketches the learning arc and key concepts (informally)
2. **Spec** — Author writes a detailed technical specification
3. **Review** — Peer review or facilitator feedback
4. **Build** — Engineer builds the lab environment in `lab-test-env/{lab-name}/`
5. **Test** — Learners run the lab; feedback is collected
6. **Iterate** — Spec is revised; environment is updated; process repeats

## Current Labs

| Lab | Outline | Spec | Status |
|---|---|---|---|
| (Coming soon) | — | — | — |

---

Each lab folder has:
- `README.md` — Overview and motivation
- Full specification with all stages, check scripts, and expected outputs
- Links to the live environment in `lab-test-env/`
