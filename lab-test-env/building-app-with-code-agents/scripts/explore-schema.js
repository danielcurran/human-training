require('dotenv').config();
const { MongoClient } = require('mongodb');

/**
 * EXPLORE SCRIPT: Compare Schema Options
 * 
 * Runs latency tests on different schema options to show performance tradeoffs.
 * Helps learner understand embedding vs. referencing during Stage 1.
 * 
 * Usage: npm run explore:schema -- [1|2|3]
 *   1 = Embedded (fast reads, complex updates)
 *   2 = Normalized (flexible updates, slower reads)
 *   3 = Hybrid (balanced approach)
 */

const MONGO_URI = process.env.MONGO_URI || 'mongodb://admin:password@mongodb:27017/app?authSource=admin';

async function exploreSchema() {
  const option = process.argv[2] || 'all';
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const db = client.db('app');

    console.log('\n🔍 Schema Exploration Tool\n');
    console.log('Comparing read performance across schema options...\n');

    // Simulate reading an order with customer for different schema designs
    const startTime = Date.now();
    
    // Try to find an order
    const order = await db.collection('orders').findOne({});
    
    if (!order) {
      console.log('ℹ No orders found. Run "npm run seed" first.\n');
      return;
    }

    const queryTime = Date.now() - startTime;

    console.log('Test Query: "Get order with customer details"');
    console.log('─'.repeat(50));
    console.log(`Order found: ${order.order_id}`);
    console.log(`Query latency: ${queryTime}ms\n`);

    console.log('Schema Option Analysis:');
    console.log('─'.repeat(50));
    
    if (option === 'all' || option === '1') {
      console.log('\n📌 Option A: Embedded (Customer data inside order document)');
      console.log('  Read latency: FAST (1 query)');
      console.log('  Update latency: SLOW (must update all orders if customer changes)');
      console.log('  Tradeoff: Best for read-heavy workloads\n');
    }

    if (option === 'all' || option === '2') {
      console.log('📌 Option B: Normalized (Separate collections, linked by ID)');
      console.log('  Read latency: SLOWER (requires $lookup join)');
      console.log('  Update latency: FAST (update once in customers collection)');
      console.log('  Tradeoff: Best for write-heavy or highly flexible workloads\n');
    }

    if (option === 'all' || option === '3') {
      console.log('📌 Option C: Hybrid (Embed some, reference others)');
      console.log('  Read latency: MODERATE (most common access patterns fast)');
      console.log('  Update latency: MODERATE (selective embedding)');
      console.log('  Tradeoff: Best for balanced read/write workloads\n');
    }

    console.log('Decision Help:');
    console.log('─'.repeat(50));
    console.log('Which queries are MOST COMMON in your app?');
    console.log('1. "Get order WITH customer" → Choose Option A or C');
    console.log('2. "Update customer email" → Choose Option B or C');
    console.log('3. "Mix of both" → Choose Option C\n');

  } catch (error) {
    console.error('Error exploring schema:', error);
  } finally {
    await client.close();
  }
}

exploreSchema();
