# Contributing to MongoDB Training for Humans

## Code of Conduct

We're committed to providing a welcoming and inspiring community for all.

## Ways to Contribute

### 1. Design a New Lab
- Use the agent pipeline to create labs (see [agents/AGENTS.md](agents/AGENTS.md)):
  1. `/lab-outline-designer` — Create outline from topic
  2. `/lab-outline-converter` — Convert to technical spec
  3. `/lab-instruction-evaluator` — Validate spec (gate: ≥8/10)
  4. `/lab-environment-builder` — Build the environment
  5. `/lab-instructional-qa-reviewer` — QA review for learner experience
- Submit a pull request with your lab artifacts
- We'll review and provide feedback

### 2. Test an Existing Lab
- Pick a lab from `lab-test-env/`
- Follow the README to run it
- Document what was confusing, where you got stuck, what worked well
- Open an issue with your feedback

### 3. Improve Documentation
- Fix typos or unclear explanations
- Add worked examples to standards
- Document lessons learned from running labs
- Submit a pull request

### 4. Report Issues
- Environment bugs (Docker setup, check scripts)
- Instructional gaps (unclear instructions, missing scaffolding)
- Typos or broken links
- Open an issue with details

## Pull Request Process

1. **For new labs:**
   - Submit the outline first (no environment build)
   - Get feedback and iterate
   - Then build the environment

2. **For documentation changes:**
   - Small changes (typos, clarity) → submit directly
   - Large changes (new sections, restructure) → open an issue first to discuss

3. **For environment fixes:**
   - Include the specific issue (e.g., "check:env fails when MONGODB_URI is localhost:27017")
   - Provide the fix and test evidence
   - Reference the lab it applies to

## Questions?

- **Lab design:** Comment on the lab's spec pull request or open an issue
- **Environment setup:** Check the lab's README first, then open an issue
- **General questions:** Open an issue labeled `question`
