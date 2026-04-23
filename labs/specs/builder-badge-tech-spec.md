# Lab Technical Specification: Building an App with Code Agents — Beyond the SQL Mental Model

## Spec Metadata

- **Lab Name:** building-app-with-code-agents
- **Domain:** MongoDB + AI-assisted development
- **Target Learner:** Developer with SQL experience, zero MongoDB or agent-assisted development experience
- **Duration:** 60–90 minutes (5–10 min per section)
- **Environment:** VS Code with embedded agent panel
- **Prerequisite Knowledge:** Basic SQL, application architecture

---

## Target Task (Backwards Design)

**By the end of this lab, learners will be able to:**

Design and review a MongoDB-first data model, query optimization strategy, and one AI-powered feature by evaluating agent suggestions and making intentional tradeoff decisions — then deploy a working app with those decisions implemented.

---

## Lab Sections

### Section 1: Schema Design Decision (5–10 min)

**Goal:** Learner reviews agent-generated schema alternatives and makes one intentional design choice.

#### Learner Context

Your SQL-backed app is being evaluated for MongoDB. The data has already been migrated, but the schema still replicates SQL structure (normalized tables). Your job: review 3 MongoDB schema alternatives, pick one, document your reasoning.

#### Learner Action

1. **Invoke agent:** `/design-lab-schema`
   - **Agent generates:** 3 complete MongoDB schema alternatives for orders/customers/products
   - Each shows: collections, embedding strategy, indexes, read/write patterns, pros/cons
2. **Learner decision (5 min):**
   - Read all 3 alternatives
   - Pick one (or hybrid) based on: "Which favors our read patterns?"
   - Answer in `schema-choice.md`:
     ```markdown
     # Schema Choice
     
     Chosen: [Option A/B/C]
     
     Why: [1–2 sentences: which read/write patterns drove this choice?]
     
     Tradeoff accepted: [1 sentence: what are we sacrificing?]
     ```
3. **Agent deploys:** `/deploy-schema`
   - Agent implements chosen schema into MongoDB
   - Creates indexes
   - Seeds sample data

#### Artifacts Learner Produces

| Artifact | File | Format | Content |
|----------|------|--------|---------|
| Schema choice | `schema-choice.md` | Markdown | 3–4 sentences: choice, rationale, tradeoff |

#### Milestone Check

**Command:** `npm run check:schema`

**Validates:**
- `schema-choice.md` exists and is ≥50 words
- MongoDB schema matches chosen option
- Indexes created
- Sample data seeded

**Success:** "✓ Schema deployed and ready"

---

### Section 2: Query Optimization Review (5–10 min)

**Goal:** Learner reviews agent-optimized queries and approves them for deployment.

#### Learner Context

Your schema is now MongoDB-first. The agent has refactored your 4 core SQL queries to MongoDB idioms (find, aggregation, $lookup). Your job: review them, understand the tradeoffs, approve.

#### Learner Action

1. **Invoke agent:** `/optimize-dal-queries`
   - **Agent generates:** 4 MongoDB query implementations with rationale
   - Shows: old SQL query → new MongoDB query, why this is better/different
2. **Learner review (5 min):**
   - Read each query and its explanation
   - Mark in `query-review.md`:
     ```markdown
     # Query Review
     
     ## Query 1: Get Order with Customer
     - MongoDB approach: [find / aggregation / $lookup]
     - Understand tradeoff: [agent's explanation, in your own words]
     - Approved: ✓
     
     ## Query 2: List Recent Orders
     - MongoDB approach: [find / aggregation / $lookup]
     - Understand tradeoff: [agent's explanation, in your own words]
     - Approved: ✓
     ```
3. **Agent deploys:** `/deploy-dal-queries`
   - Agent implements all 4 queries
   - Runs unit tests (must pass)

#### Artifacts Learner Produces

| Artifact | File | Format | Content |
|----------|------|--------|---------|
| Query review | `query-review.md` | Markdown | 4 queries × (approach + tradeoff + approval) |

#### Milestone Check

**Command:** `npm run check:queries`

**Validates:**
- `query-review.md` exists with all 4 queries marked approved
- All queries implemented in MongoDB
- Unit tests pass (0 SQL usage)
- Query performance <100ms

**Success:** "✓ Queries optimized and tested"

---

### Section 3: Vector Search Implementation (5–10 min)

**Goal:** Learner chooses a collection for vector search and approves agent implementation.

#### Learner Context

MongoDB supports vector search natively. Your job: decide which collection benefits most from semantic search, approve the implementation, test it.

#### Learner Action

1. **Invoke agent:** `/implement-vector-search`
   - **Agent generates:** Vector search implementation for products collection
   - Shows: index definition, embedding approach, sample search query
2. **Learner decision (5 min):**
   - Review implementation
   - Test manually: `npm run search -- "outdoor backpack"`
   - Answer in `vector-choice.md`:
     ```markdown
     # Vector Search Choice
     
     Collection: products
     
     Use case: [e.g., "Recommend similar products to customer"]
     
     Test result: [Did search return semantically related products?]
     
     Approved: ✓
     ```
3. **Agent verifies:** `/validate-vector-search`
   - Agent runs test suite for vector search
   - All tests must pass

#### Artifacts Learner Produces

| Artifact | File | Format | Content |
|----------|------|--------|---------|
| Vector choice | `vector-choice.md` | Markdown | Collection + use case + test result + approval |

#### Milestone Check

**Command:** `npm run check:vector`

**Validates:**
- `vector-choice.md` exists with approval
- Vector index created
- Sample search returns results
- Test suite passes

**Success:** "✓ Vector search live and tested"

---

### Section 4: Design Review & Deployment (5–10 min)

**Goal:** Learner reviews all decisions, writes brief reflection, and deploys complete app.

#### Learner Context

You've made 3 intentional design decisions (schema, queries, AI feature). Now review them holistically, reflect on tradeoffs, and deploy.

#### Learner Action

1. **Review all decisions (3 min):**
   - Re-read `schema-choice.md`, `query-review.md`, `vector-choice.md`
   - Ask yourself: "Are these decisions coherent? Do they work together?"
2. **Write reflection (5 min):**
   - In `REFLECTION.md` (200–250 words):
     ```markdown
     # Design Reflection
     
     ## Decisions I Made
     - Schema: [embedded vs. normalized; why?]
     - Queries: [find vs. aggregation; why?]
     - Vector search: [which collection; why?]
     
     ## One Tradeoff I'm Accepting
     [E.g., "Embedded customer data means updates are complex, but reads are fast"]
     
     ## One Thing That Surprised Me
     [E.g., "MongoDB aggregations are more powerful than SQL JOINs"]
     
     ## In Production, I'd Monitor
     [E.g., "Query latency, embedding staleness, user click-through on recommendations"]
     ```
3. **Deploy:** `/deploy-complete-app`
   - Agent packages everything
   - Runs full test suite
   - Starts dev server

#### Artifacts Learner Produces

| Artifact | File | Format | Content |
|----------|------|--------|---------|
| Reflection | `REFLECTION.md` | Markdown | 200–250 words: decisions, tradeoff, surprise, monitoring |

#### Milestone Check

**Command:** `npm run check:final`

**Validates:**
- `REFLECTION.md` exists and is ≥200 words
- All tests pass (schema, queries, vector)
- App runs on localhost:3000
- No SQL usage in core paths

**Success Output:**
```
✓ Schema deployed
✓ Queries optimized
✓ Vector search live
✓ Full test suite: 50/50 passing
✓ App running on localhost:3000

Lab complete! 🎉
```

---

## Agent Skills (Core Implementation)

### `/design-lab-schema`
- **Input:** Outline + learner's domain context
- **Output:** 3 complete MongoDB schema alternatives (YAML/JSON) with rationale
- **Time:** <2 min

### `/deploy-schema`
- **Input:** Chosen schema
- **Output:** MongoDB collections created, indexes built, sample data seeded
- **Time:** <1 min

### `/optimize-dal-queries`
- **Input:** List of 4 SQL queries + chosen schema
- **Output:** 4 MongoDB implementations with side-by-side comparison
- **Time:** <2 min

### `/deploy-dal-queries`
- **Input:** Approved queries
- **Output:** Queries implemented, unit tests run
- **Time:** <1 min

### `/implement-vector-search`
- **Input:** Chosen collection + use case
- **Output:** Vector index definition, embedding code, sample search query
- **Time:** <2 min

### `/validate-vector-search`
- **Input:** Vector search implementation
- **Output:** Test suite results
- **Time:** <1 min

### `/deploy-complete-app`
- **Input:** All decisions (schema, queries, vector)
- **Output:** Complete Docker environment + app running
- **Time:** <2 min

---

## Environment Setup

### Docker Compose

```yaml
version: '3.9'

services:
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password
    volumes:
      - mongo-data:/data/db

  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      MONGO_URI: "mongodb://admin:password@mongodb:27017/app?authSource=admin"
      NODE_ENV: development
    depends_on:
      - mongodb
    volumes:
      - .:/app

volumes:
  mongo-data:
```

### Initial State

- Empty MongoDB (no collections, no indexes, no data)
- Stub `src/dal/queries.js` with 4 query function signatures (empty bodies)
- No vector search code

**Agents will fill in all of these.**

---

## Success Criteria

### ✅ Spec is Buildable

- All agent skills produce deterministic outputs (schema, queries, vector implementation)
- Agents can deploy directly to MongoDB/Docker
- All check scripts pass/fail unambiguously

### ✅ Resulting Lab is 60–90 min

- Section 1: 5–10 min (read schema alternatives, choose, approve)
- Section 2: 5–10 min (read queries, review tradeoffs, approve)
- Section 3: 5–10 min (choose collection, test, approve)
- Section 4: 5–10 min (reflect, write, deploy)
- **Total: 20–40 min of learner time + agent execution**

### ✅ Learner Focus is Decision-Making, Not Manual Work

- Learner makes 3 intentional choices (schema, query strategy, AI feature)
- Learner documents reasoning and tradeoffs
- Learner validates agent output (tests pass, search works)
- No manual coding, no manual setup

---

## Recovery Paths (Minimal)

### If tests fail after agent deployment
- `npm run test:verbose` → learner sees failure
- Invoke `/debug-test-failure` → agent diagnoses and fixes
- Re-run tests

### If vector search returns no results
- `npm run search -- "test"` → returns empty
- Invoke `/debug-vector-search` → agent checks index and re-seeds data
- Re-test

### If learner regrets a choice
- Run `/reset-section:[1|2|3]` → reverts that section
- Learner can re-choose and re-approve

---

## Notes for Builder Agent

- **No manual coding by learners** — all code is agent-generated
- **Agent output must be deterministic** — same input → same schema/queries/vector setup
- **All decisions are tracked** — in `schema-choice.md`, `query-review.md`, `vector-choice.md`, `REFLECTION.md`
- **Agents handle deployment** — Docker, MongoDB, seed data, tests
- **Learner focus:** Review decisions, understand tradeoffs, write brief reflections

This is a **decision lab**, not a **coding lab**. The goal is to teach MongoDB design thinking through intentional choices, not through manual implementation.
