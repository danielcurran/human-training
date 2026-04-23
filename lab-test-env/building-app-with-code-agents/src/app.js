require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connectToDatabase } = require('../lib/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// ============================================================================
// Routes
// ============================================================================

app.get('/', (req, res) => {
  res.json({
    message: 'Building an App with Code Agents Lab',
    status: 'running',
    endpoints: {
      health: '/health',
      schema: '/api/schema',
      queries: '/api/queries',
      search: '/api/search',
    },
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ============================================================================
// Schema Exploration Route (for Stage 1)
// ============================================================================
app.get('/api/schema/explore', async (req, res) => {
  try {
    const { client, db } = await connectToDatabase();
    
    const collections = await db.listCollections().toArray();
    const stats = {
      collections: collections.map(c => c.name),
      counts: {},
    };

    for (const col of collections) {
      const count = await db.collection(col.name).countDocuments();
      stats.counts[col.name] = count;
    }

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================================
// Query Endpoints (Stage 2)
// ============================================================================
app.get('/api/orders/:orderId', async (req, res) => {
  try {
    const { client, db } = await connectToDatabase();
    const queries = require('./queries');
    
    const order = await queries.getOrderWithCustomer(db, req.params.orderId);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const { client, db } = await connectToDatabase();
    const queries = require('./queries');
    const offset = parseInt(req.query.offset) || 0;
    
    const orders = await queries.listRecentOrders(db, offset);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/products/:category', async (req, res) => {
  try {
    const { client, db } = await connectToDatabase();
    const queries = require('./queries');
    
    const products = await queries.getProductsByCategory(db, req.params.category);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/customers/analytics', async (req, res) => {
  try {
    const { client, db } = await connectToDatabase();
    const queries = require('./queries');
    
    const analytics = await queries.countOrdersByCustomerStatus(db);
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================================
// Vector Search Route (Stage 3)
// ============================================================================
app.post('/api/search', async (req, res) => {
  try {
    const { client, db } = await connectToDatabase();
    const queries = require('./queries');
    const { q, limit } = req.body;
    
    if (!q) {
      return res.status(400).json({ error: 'Query parameter required' });
    }

    const results = await queries.searchSimilarProducts(db, q, limit || 5);
    res.json({ query: q, results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================================
// Error Handling
// ============================================================================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message,
  });
});

// ============================================================================
// Server Startup
// ============================================================================
app.listen(PORT, () => {
  console.log(`\n✓ Lab app listening on port ${PORT}`);
  console.log(`✓ Open http://localhost:${PORT} in your browser\n`);
});

module.exports = app;
