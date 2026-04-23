# Contributing to MongoDB Training for Humans

## Code of Conduct

We're committed to providing a welcoming and inspiring community for all. Read our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) (coming soon).

## Ways to Contribute

### 1. Design a New Lab
- Start with [standards/lab-design-template.md](standards/lab-design-template.md)
- Submit a pull request with your lab outline
- We'll review and provide feedback
- Build the environment and iterate with learner feedback

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
