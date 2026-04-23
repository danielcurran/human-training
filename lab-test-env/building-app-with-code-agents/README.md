# Building an App with Code Agents — MongoDB Lab

## Welcome! 👋

This is a hands-on lab designed to teach you MongoDB design thinking through agent-assisted decision-making.

**What you'll learn:**
- MongoDB schema design: embedding vs. referencing tradeoffs
- Query optimization: find, aggregation, $lookup
- Vector search for semantic search
- How to make intentional design decisions (not just follow templates)

**Prerequisites:**
- SQL experience (you'll translate SQL queries to MongoDB)
- Basic understanding of databases
- 60–90 minutes of your time

---

## Quick Start

### 1. Setup

```bash
# Install dependencies
npm install

# Start MongoDB and app in Docker
docker-compose up -d

# Seed database with sample data
npm run seed

# Verify setup
npm run check:schema  # Should pass after seed
```

### 2. Run the Lab

The lab is divided into **4 stages**. Complete them in order:

**Stage 1: Schema Design (5–10 min)**
- Review 3 MongoDB schema options
- Choose one based on your access patterns
- Approve deployment

```bash
npm run check:schema
```

**Stage 2: Query Optimization (5–10 min)**
- Review agent-optimized MongoDB queries
- Understand tradeoffs (find vs. aggregate vs. $lookup)
- Approve for deployment

```bash
npm run check:queries
```

**Stage 3: Vector Search (5–10 min)**
- Implement semantic search on your chosen schema
- Test that searches return similar results
- Approve implementation

```bash
npm run check:vector
```

**Stage 4: Design Review (5–10 min)**
- Reflect on your design decisions
- Write brief reflection
- Deploy complete app

```bash
npm run check:final
```

---

## Lab Stages in Detail

### Stage 1: Schema Design Decision

**Your Task:**
1. **Explore** different schema options with `npm run explore:schema`
2. **Read** the schema alternatives and understand the tradeoffs
3. **Choose** one option based on your read/write patterns
4. **Document** your choice in `schema-choice.md`:

   ```markdown
   # Schema Choice

   Chosen: [Option A/B/C]

   Why: [1–2 sentences: which read/write patterns drove this choice?]

   Tradeoff accepted: [1 sentence: what are we sacrificing?]
   ```

5. **Validate** with `npm run check:schema`

**Key Concepts:**
- **Embedding:** Customer data inside order document → Fast reads, complex updates
- **Referencing:** Separate collections, linked by ID → Flexible updates, slower reads
- **Your job:** Pick the design that matches YOUR access patterns

---

### Stage 2: Query Optimization

**Your Task:**
1. **Review** the agent-generated MongoDB queries
2. **Understand** why the agent chose find vs. aggregation vs. $lookup
3. **Approve** each query in `query-review.md`:

   ```markdown
   # Query Review

   ## Query 1: Get Order with Customer
   - MongoDB approach: [find / aggregation / $lookup]
   - Understand tradeoff: [agent's explanation, in your own words]
   - Approved: ✓

   ## Query 2: List Recent Orders
   - MongoDB approach: [find / aggregation / $lookup]
   - Understand tradeoff: [...]
   - Approved: ✓

   [Continue for Query 3 and 4...]
   ```

4. **Validate** with `npm run check:queries`

**Key Concepts:**
- **find():** Simple filters (like SQL WHERE) — use indexed fields
- **aggregate():** Complex transformations (like SQL subqueries) — more powerful
- **$lookup:** Join collections (like SQL JOIN) — required if you didn't embed

---

### Stage 3: Vector Search

**Your Task:**
1. **Review** the vector search implementation (adapted to YOUR schema choice)
2. **Test** manually: `npm run search -- "outdoor backpack"`
3. **Approve** in `vector-choice.md`:

   ```markdown
   # Vector Search Choice

   Collection: [products OR orders OR other, depending on your schema]

   Use case: [e.g., "Recommend similar products to customer"]

   Test result: [Did search return semantically related products?]

   Approved: ✓
   ```

4. **Validate** with `npm run check:vector`

**Key Concepts:**
- **Embeddings:** Convert text to numeric vectors → Find similar vectors
- **Vector Search:** MongoDB's native vector search using embeddings
- **Adaptive:** Your vector search is tailored to your Stage 1 schema choice

---

### Stage 4: Design Review & Deployment

**Your Task:**
1. **Review** all your decisions (schema, queries, vector search)
2. **Write** reflection in `REFLECTION.md` (200–250 words):

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

3. **Deploy** with `npm run start`
4. **Validate** with `npm run check:final`

---

## Available Commands

```bash
# Lab Management
npm run seed                # Load sample data (customers, products, orders)
npm run reset              # Clear database and restart

# Stage Checks
npm run check:schema       # Validate Stage 1 (schema choice)
npm run check:queries      # Validate Stage 2 (query optimization)
npm run check:vector       # Validate Stage 3 (vector search)
npm run check:final        # Validate Stage 4 (deployment)
npm run check:all          # Run all checks

# Exploration
npm run explore:schema     # Compare schema options side-by-side

# Running the App
npm start                  # Start app in production mode
npm run dev                # Start app with auto-reload
npm test                   # Run test suite

# Docker
docker-compose up -d       # Start MongoDB and app
docker-compose down        # Stop all services
docker logs building-app-mongodb  # View MongoDB logs
docker logs building-app-server   # View app logs
```

---

## Files You'll Create

| Stage | File | What You'll Write |
|-------|------|-------------------|
| 1 | `schema-choice.md` | Schema choice + rationale + tradeoff |
| 2 | `query-review.md` | 4 queries + approach + approval |
| 3 | `vector-choice.md` | Collection + use case + test result |
| 4 | `REFLECTION.md` | Design reflection (200–250 words) |

---

## Architecture

```
building-app-with-code-agents/
├── src/
│   ├── app.js           # Express server + routes
│   └── queries.js       # Data access layer (DAL) — query implementations
├── lib/
│   └── db.js            # MongoDB connection
├── scripts/
│   ├── seed.js          # Load sample data
│   ├── reset.js         # Clear database
│   ├── check-*.js       # Validation scripts
│   └── explore-schema.js # Schema exploration
├── docker-compose.yml   # MongoDB + app services
├── package.json         # Dependencies + scripts
└── [Your artifacts]
    ├── schema-choice.md
    ├── query-review.md
    ├── vector-choice.md
    └── REFLECTION.md
```

---

## Troubleshooting

**MongoDB connection failed:**
```bash
# Check if containers are running
docker ps

# View MongoDB logs
docker logs building-app-mongodb

# Verify connection
docker exec building-app-mongodb mongosh -u admin -p password
```

**Port 3000 already in use:**
```bash
# Change port in .env
PORT=3001

# Or find and kill the process
lsof -i :3000
kill -9 <PID>
```

**Database not seeded:**
```bash
npm run seed
npm run check:schema
```

---

## Learning Outcomes

By the end of this lab, you will:

✅ Understand MongoDB's embedding vs. referencing tradeoff
✅ Make intentional schema design decisions based on access patterns
✅ Optimize queries for MongoDB (find, aggregate, $lookup)
✅ Implement semantic search using vector embeddings
✅ Deploy a complete MongoDB app with vector search

---

## Next Steps

After completing this lab:

1. **Run your app:** `npm start` → http://localhost:3000
2. **Test your queries:** Review `src/queries.js` and make sure they match your schema
3. **Extend:** Add a new query or a new feature
4. **Deploy:** Take your app to production (Atlas, AWS, Azure, etc.)

---

## Questions?

- **Not sure which schema to pick?** Run `npm run explore:schema` to see performance tradeoffs
- **Query not working?** Check the MongoDB shell: `docker exec building-app-mongodb mongosh`
- **Need help with MongoDB?** [MongoDB Docs](https://docs.mongodb.com)
- **Want to learn more about vector search?** [MongoDB Vector Search Guide](https://www.mongodb.com/docs/atlas/atlas-vector-search/overview/)

---

**Happy learning!** 🚀
