---
mode: ask
description: Evaluate a lab technical specification for buildability and resulting lab quality
---

[agents/converter.md](../../agents/converter.md)

Evaluate the attached lab technical specification using the agent definition above. The evaluation covers three passes:
1. **Pass 1:** Section-by-section evaluation (buildability & quality)
2. **Pass 2:** Full-spec synthesis (builder precision & resulting lab coherence)
3. **Pass 3:** Resulting lab quality evaluation (completability in VS Code)

**Fill in before running:**
- Target task: [e.g., "design and implement a MongoDB data model"]
- Audience: a human learner with zero prior knowledge
- Current knowledge state: No prior domain knowledge

Attach the spec file from `labs/specs/` using #file before sending.

Output saves to `labs/reports/{name}-tech-spec-eval-v{N}.md`.
