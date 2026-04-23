---
mode: agent
description: Review a completed lab environment for instructional gaps, QA issues, and learner UX
---

[agents/qa-review.md](../../agents/qa-review.md)

Review the built lab environment using the agent definition above.

**Prerequisites:**
- The lab environment must have been built by /build-lab-environment
- The lab should be functional (Docker services running, check scripts passing)

**Fill in before running:**
- Lab name: [kebab-case name matching the folder in lab-test-env/]

Attach relevant lab files (README.md, stage instructions) using #file before sending.

Output saves to `labs/reports/{lab-name}-instructional-qa-review-v{N}.md`.
