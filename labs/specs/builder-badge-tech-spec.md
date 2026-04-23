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

## Lab Concepts: MongoDB Design Thinking

Before you start the stages, understand the core MongoDB concepts you'll be deciding about.

### Why MongoDB Differs from SQL

SQL normalizes data across separate tables to eliminate duplication:
```sql
CREATE TABLE customers (id, name, email);
CREATE TABLE orders (id, customer_id, total);
SELECT o.*, c.* FROM orders o JOIN customers c ON o.customer_id = c.id;
```

MongoDB embeds related data in documents:
```json
{
  "_id": "ORD-123",
  "customer": { "id": "C-1", "name": "Alice", "email": "alice@example.com" },
  "total": 150,
  "created_at": "2024-01-15"
}
```

### Embedding vs. Referencing: The Core Tradeoff

**Embedding** — Store related data inside a document:
- **Pros:** Single read (fast); automatic consistency; no $lookup needed
- **Cons:** Updates are complex; data duplication; limited to 16MB per document
- **Use when:** You mostly read both together (e.g., "Get order WITH customer details")

**Referencing** — Store as separate collections, link by ID:
```json
// customers collection
{ "_id": "C-1", "name": "Alice" }

// orders collection
{ "_id": "ORD-123", "customer_id": "C-1", "total": 150 }
```
- **Pros:** Flexible; no duplication; independent updates
- **Cons:** Multiple reads needed; requires $lookup joins (slower)
- **Use when:** You update them separately (e.g., "Update customer email WITHOUT touching orders")

### How to Choose: Think About Your Access Patterns

- **Mostly read orders WITH customers?** → Embed
- **Update customers independently of orders?** → Reference
- **Both frequently?** → Hybrid (embed some data, reference others)

### MongoDB Query Patterns

**find() — Simple filters** (like SQL WHERE)
```javascript
db.orders.find({ customer_id: "C-1" })  // Fast; works on indexed fields
```

**aggregate() — Complex transformations** (like SQL with subqueries)
```javascript
db.orders.aggregate([
  { $match: { status: "pending" } },
  { $group: { _id: "$customer_id", total: { $sum: "$amount" } } },
  { $sort: { total: -1 } }
])
```

**$lookup — Join collections** (like SQL JOIN)
```javascript
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customer_id",
      foreignField: "_id",
      as: "customer"
    }
  }
])
```

### Your Job in This Lab

You'll make **3 intentional design decisions** using MongoDB concepts:
1. **Stage 1:** Choose a schema based on embedding vs. referencing tradeoffs
2. **Stage 2:** Understand and approve MongoDB queries (find, aggregate, $lookup)
3. **Stage 3:** Implement vector search for semantic search

Each decision is backed by reasoning about **access patterns** and **tradeoffs** — not just "pick the one that sounds right."

---

## Lab Sections

### Section 1: Schema Design Decision (5–10 min)

**Goal:** Learner reviews agent-generated schema alternatives and makes one intentional design choice.

#### Learner Context

Your SQL-backed app is being evaluated for MongoDB. The data has already been migrated, but the schema still replicates SQL structure (normalized tables). 

**Your job:** Review 3 MongoDB schema alternatives. Each makes different tradeoffs (embedding vs. referencing). Pick one based on your **read patterns**.

**Remember:** Embedding (fast reads, complex updates) vs. Referencing (flexible, slower reads). Which favors your most common queries?

#### Learner Action

1. **Invoke agent:** `/design-lab-schema`
   - **Agent generates:** 3 complete MongoDB schema alternatives for orders/customers/products
   - Each shows: collections, embedding strategy, indexes, read/write patterns, pros/cons
   - Each includes sample data for the e-commerce app (10 customers, 20 products, 5 orders)
2. **Explore (2 min):**
   - Agent has loaded sample data for each schema option
   - Run: `npm run explore:schema -- 1` to see latency of "Get order with customer" for each option
   - Notice: Embedded schema answers faster (single read) vs. referenced schema (requires $lookup)
3. **Learner decision (3 min):**
   - Read all 3 alternatives
   - Which one favors your **read patterns**? (The one where most queries are fast?)
   - Pick one (or hybrid) based on reasoning, not gut feeling
   - Answer in `schema-choice.md`:
     ```markdown
     # Schema Choice
     
     Chosen: [Option A/B/C]
     
     Why: [1–2 sentences: which read/write patterns drove this choice?]
     
     Tradeoff accepted: [1 sentence: what are we sacrificing?]
     ```
4. **Agent deploys:** `/deploy-schema`
   - Agent implements chosen schema into MongoDB
   - Creates indexes
   - Seeds sample data
   - Learner can now query the MongoDB instance and verify the schema works

#### Artifacts Learner Produces

| Artifact | File | Format | Content |
|----------|------|--------|---------|
| Schema choice | `schema-choice.md` | Markdown | 3–4 sentences: choice, rationale, tradeoff |

#### Milestone Check

**Command:** `npm run check:schema`

**Validates:**
- `schema-choice.md` exists and is ≥50 words
- MongoDB schema matches chosen option (collections, embedding strategy)
- Indexes created
- Sample data seeded

**Expected output:**
```
✓ Schema deployed and ready

Collections created:
  ✓ orders
  ✓ customers
  ✓ products

Indexes created:
  ✓ orders._id (primary)
  ✓ customers._id (primary)
  ✓ products._id (primary)
  ✓ orders.customer_id (if option uses referencing)

Sample data seeded:
  ✓ 10 customers
  ✓ 20 products
  ✓ 5 orders

Schema choice documented:
  File: schema-choice.md
  Words: 67 (meets 50-word minimum)
```

**Success:** "✓ Schema deployed and ready"

---

### Section 2: Query Optimization Review (5–10 min)

**Goal:** Learner reviews agent-optimized queries and approves them for deployment.

#### Learner Context

Your schema is now MongoDB-first. The agent has refactored your 4 core SQL queries to MongoDB idioms (find, aggregation, $lookup). Your job: review them, understand the tradeoffs, approve.

**Remember these MongoDB query patterns:**
- **find()** — Simple equality/range filters (like SQL WHERE)
  - Fast when using indexes
  - Used for single-collection queries
- **aggregate()** — Complex multi-stage transformations (like SQL with subqueries + GROUP BY)
  - More powerful than find()
  - Slower but flexible for complex operations
- **$lookup** — Join collections (like SQL JOIN)
  - Simulates the referencing pattern
  - Required when you didn't embed data
  - More expensive than embedded queries

**Your job:** For each query, understand:
1. Why the agent chose this approach (find vs. aggregate vs. $lookup)
2. What tradeoff was made (performance vs. flexibility)
3. Whether this query works for YOUR schema choice from Stage 1

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
- All queries implemented in MongoDB (no SQL)
- Unit tests pass (12/12)
- Query performance <100ms each

**Expected output:**
```
✓ Queries optimized and tested

Query implementations:
  ✓ Query 1: getOrderWithCustomer (aggregation with $lookup) – 45ms
  ✓ Query 2: listRecentOrders (find with sort) – 30ms
  ✓ Query 3: getProductsByCategory (find with filter) – 20ms
  ✓ Query 4: countOrdersByCustomerStatus (aggregation with $group) – 55ms

All queries <100ms: ✓
No SQL usage detected: ✓

Unit tests: 12/12 passing
  ✓ Test 1: getOrderWithCustomer returns customer data
  ✓ Test 2: listRecentOrders sorts by date descending
  ... (9 more)

Query review documented:
  File: query-review.md
  Queries approved: 4/4
```

**Success:** "✓ Queries optimized and tested"

---

### Section 3: Vector Search Implementation (5–10 min)

**Goal:** Learner chooses a collection for vector search and approves agent implementation.

#### Learner Context

MongoDB supports vector search natively. Your job: based on your schema choice from Stage 1, the agent will implement vector search for the most appropriate collection. Approve the implementation and test it.

**Reminder:** Depending on your Stage 1 choice:
- If you chose **embedded products**, vector search targets products within the order document
- If you chose **normalized products**, vector search targets the products collection
- If you chose **hybrid**, vector search targets whichever collection benefits most

#### Learner Action

1. **Invoke agent:** `/implement-vector-search`
   - **Input:** Your chosen schema from Stage 1
   - **Agent generates:** Vector search implementation for the BEST collection in YOUR schema
   - Shows: index definition, embedding approach, sample search query adapted to your choice
2. **Learner decision (5 min):**
   - Review the implementation (it's adapted to your schema, not a generic template)
   - Understand: Why vector search for this specific collection?
   - Test manually: `npm run search -- "outdoor backpack"`
   - Answer in `vector-choice.md`:
     ```markdown
     # Vector Search Choice
     
     Collection: [products OR orders OR other, depending on your schema]
     
     Use case: [e.g., "Recommend similar products to customer"]
     
     Test result: [Did search return semantically related products?]
     
     Approved: ✓
     ```
3. **Agent verifies:** `/validate-vector-search`
   - Agent runs test suite for vector search on YOUR chosen collection
   - All tests must pass

#### Artifacts Learner Produces

| Artifact | File | Format | Content |
|----------|------|--------|---------|
| Vector choice | `vector-choice.md` | Markdown | Collection + use case + test result + approval |

#### Milestone Check

**Command:** `npm run check:vector`

**Validates:**
- `vector-choice.md` exists with approval
- Vector index created on the appropriate collection (adapted to your Stage 1 choice)
- Sample search returns semantically related results
- Test suite passes (8/8)

**Expected output:**
```
✓ Vector search live and tested

Vector search configuration:
  Collection: [products OR orders OR other, based on your schema]
  Field: description (or product_name, depending on your schema)
  Embeddings model: OpenAI ada-002
  Index type: vector
  Index status: ✓ Created

Sample search test:
  Query: "outdoor backpack"
  Results:
    1. Hiking Backpack 60L (similarity: 0.97)
    2. Weekend Adventure Pack (similarity: 0.91)
    3. Kids Explorer Backpack (similarity: 0.85)
  ✓ Returns semantically related products

Test suite: 8/8 passing
  ✓ Index query latency <50ms
  ✓ Returns top-K results correctly
  ... (6 more tests)

Vector choice documented:
  File: vector-choice.md
  Collection: [your choice]
  Use case specified: ✓
  Test result: ✓ Passed
```

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

---

## Appendix A: Core Specifications for Agents

### The 4 SQL Queries to Migrate

These are the queries the agent will convert from SQL to MongoDB idioms in Stage 2. All use the `orders`, `customers`, and `products` tables from a typical e-commerce database.

#### Query 1: Get Order with Customer Details

**SQL Version:**
```sql
SELECT o.id, o.total, o.created_at, c.id, c.name, c.email
FROM orders o
JOIN customers c ON o.customer_id = c.id
WHERE o.id = ?
```

**Purpose:** Retrieve a single order with its associated customer information (needed for order confirmation emails, customer support)

**Parameters:** `order_id` (String)

**Expected Columns:** order_id, total, created_at, customer_id, customer_name, customer_email

#### Query 2: List Recent Orders (with Pagination)

**SQL Version:**
```sql
SELECT o.id, o.total, o.created_at, c.name
FROM orders o
JOIN customers c ON o.customer_id = c.id
ORDER BY o.created_at DESC
LIMIT 10 OFFSET ?
```

**Purpose:** Show dashboard of recent orders (needed for dashboard, recent activity feed)

**Parameters:** `offset` (Number, for pagination)

**Expected Columns:** order_id, total, created_at, customer_name (10 most recent orders)

#### Query 3: Get Products by Category

**SQL Version:**
```sql
SELECT id, name, description, price, category
FROM products
WHERE category = ?
ORDER BY price ASC
```

**Purpose:** List all products in a category (needed for category pages, product browsing)

**Parameters:** `category` (String, e.g., "backpacks", "tents")

**Expected Columns:** product_id, name, description, price, category (sorted by price ascending)

#### Query 4: Count Orders by Customer Status

**SQL Version:**
```sql
SELECT c.id, c.name, COUNT(o.id) as order_count, SUM(o.total) as total_spent
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name
ORDER BY total_spent DESC
```

**Purpose:** Generate customer analytics (VIP customers, repeat purchase patterns)

**Parameters:** None

**Expected Columns:** customer_id, customer_name, order_count, total_spent (sorted by total_spent descending)

---

### The 3 MongoDB Schema Alternatives

These are the three schema options the agent will present in Stage 1 for the learner to evaluate. Each makes different tradeoffs on embedding vs. referencing.

#### Option A: Denormalized (Embedded Everything)

**Rationale:** Optimize for read performance. Customer and product data are embedded in order documents.

**Collections:**

**orders collection:**
```json
{
  "_id": ObjectId,
  "order_id": "ORD-12345",
  "customer": {
    "id": "C-001",
    "name": "Alice Johnson",
    "email": "alice@example.com"
  },
  "products": [
    {
      "id": "P-100",
      "name": "Hiking Backpack 60L",
      "description": "Durable outdoor backpack",
      "category": "backpacks",
      "price": 150
    }
  ],
  "total": 150,
  "created_at": ISODate("2024-01-15T10:30:00Z"),
  "status": "confirmed"
}
```

**Pros:**
- Single read for "Get order with customer" (Query 1) — very fast
- No $lookup joins needed
- Automatic consistency (customer data locked with order)

**Cons:**
- Update customer email requires updating all their orders (complex)
- Data duplication (same customer appears in multiple orders)
- Document size limited to 16MB
- Product price history lost (can't see what price was paid vs. current price)

**Read/Write Patterns:**
- Best for: Read-heavy access (dashboard showing orders + customer details)
- Poor for: Frequent customer updates, inventory management

**Indexes:**
```
db.orders.createIndex({ "order_id": 1 })
db.orders.createIndex({ "customer.id": 1 })
db.orders.createIndex({ "created_at": -1 })
```

---

#### Option B: Normalized (Separate Collections)

**Rationale:** Optimize for independent updates and flexibility. Collections remain separate, linked by IDs.

**Collections:**

**customers collection:**
```json
{
  "_id": "C-001",
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "created_at": ISODate("2024-01-01T00:00:00Z")
}
```

**products collection:**
```json
{
  "_id": "P-100",
  "name": "Hiking Backpack 60L",
  "description": "Durable outdoor backpack",
  "category": "backpacks",
  "price": 150,
  "stock": 45
}
```

**orders collection:**
```json
{
  "_id": ObjectId,
  "order_id": "ORD-12345",
  "customer_id": "C-001",
  "product_ids": ["P-100"],
  "total": 150,
  "created_at": ISODate("2024-01-15T10:30:00Z"),
  "status": "confirmed"
}
```

**Pros:**
- Update customer email once (all orders automatically see new email via $lookup)
- No data duplication
- Independent collection updates
- Can track product price history separately

**Cons:**
- "Get order with customer" requires $lookup join (slower, multiple round-trips)
- More complex queries (aggregation pipelines)
- Risk of inconsistency (customer deleted but orders reference them)

**Read/Write Patterns:**
- Best for: Frequent customer/product updates, complex analytics
- Poor for: Simple read-heavy dashboard queries

**Indexes:**
```
db.customers.createIndex({ "_id": 1 })
db.products.createIndex({ "_id": 1 })
db.orders.createIndex({ "order_id": 1 })
db.orders.createIndex({ "customer_id": 1 })
db.orders.createIndex({ "created_at": -1 })
```

---

#### Option C: Hybrid (Embed Customer, Reference Products)

**Rationale:** Balance of both. Customer data embedded (read-friendly for orders), products referenced (flexible inventory management).

**Collections:**

**orders collection:**
```json
{
  "_id": ObjectId,
  "order_id": "ORD-12345",
  "customer": {
    "id": "C-001",
    "name": "Alice Johnson",
    "email": "alice@example.com"
  },
  "items": [
    {
      "product_id": "P-100",
      "quantity": 1,
      "price_at_purchase": 150
    }
  ],
  "total": 150,
  "created_at": ISODate("2024-01-15T10:30:00Z"),
  "status": "confirmed"
}
```

**products collection:**
```json
{
  "_id": "P-100",
  "name": "Hiking Backpack 60L",
  "description": "Durable outdoor backpack",
  "category": "backpacks",
  "price": 150,
  "stock": 45
}
```

**Pros:**
- "Get order with customer" is fast (single read, no $lookup)
- Can update product descriptions independently
- Price history preserved (price_at_purchase stored with order)
- Moderate complexity

**Cons:**
- Customer updates still require updating all orders (moderate complexity)
- Slightly more data than fully normalized
- "Get products by category" needs to query products collection (not included in order)

**Read/Write Patterns:**
- Best for: Most e-commerce apps (fast order reads, flexible product management)
- Decent for: Mixed workloads

**Indexes:**
```
db.orders.createIndex({ "order_id": 1 })
db.orders.createIndex({ "customer.id": 1 })
db.orders.createIndex({ "created_at": -1 })
db.products.createIndex({ "category": 1, "price": 1 })
```

---

### Sample Data for Seeding

**Customers (10 total):**
```json
[
  { "_id": "C-001", "name": "Alice Johnson", "email": "alice@example.com" },
  { "_id": "C-002", "name": "Bob Smith", "email": "bob@example.com" },
  ...8 more customers...
]
```

**Products (20 total):**
```json
[
  { "_id": "P-100", "name": "Hiking Backpack 60L", "category": "backpacks", "price": 150 },
  { "_id": "P-101", "name": "Camping Tent 2-Person", "category": "tents", "price": 200 },
  ...18 more products...
]
```

**Orders (5 total, distributed across schema options):**
- Each schema alternative will seed the same orders, formatted according to its embedding/referencing strategy
- Sample data ensures Query 1–4 have results to return
- Sample data includes enough variation to show query capabilities (multiple categories, multiple customers, multiple orders)
