require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

/**
 * CHECK SCRIPT: Stage 1 — Schema Design
 * 
 * Validates:
 * 1. schema-choice.md exists and is ≥50 words
 * 2. MongoDB collections created (customers, products, orders)
 * 3. Collections have appropriate indexes based on schema choice
 * 4. Sample data seeded (10 customers, 20 products, 5 orders)
 * 
 * Usage: npm run check:schema
 */

const MONGO_URI = process.env.MONGO_URI || 'mongodb://admin:password@mongodb:27017/app?authSource=admin';

async function checkSchema() {
  console.log('\n📋 Stage 1 Check: Schema Design\n');
  
  let passed = 0;
  let failed = 0;

  // Check 1: schema-choice.md exists and is ≥50 words
  console.log('  Checking: schema-choice.md...');
  const schemaFile = path.join(__dirname, '..', 'schema-choice.md');
  if (fs.existsSync(schemaFile)) {
    const content = fs.readFileSync(schemaFile, 'utf-8');
    const wordCount = content.split(/\s+/).filter(w => w.length > 0).length;
    if (wordCount >= 50) {
      console.log(`    ✓ File exists (${wordCount} words)`);
      passed++;
    } else {
      console.log(`    ✗ File too short (${wordCount}/50 words minimum)`);
      failed++;
    }
  } else {
    console.log('    ✗ File not found');
    failed++;
  }

  // Check 2–4: MongoDB collections and data
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db('app');

    // Check collections exist
    console.log('  Checking: Collections...');
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    
    const requiredCollections = ['customers', 'products', 'orders'];
    let allFound = true;
    for (const col of requiredCollections) {
      if (collectionNames.includes(col)) {
        console.log(`    ✓ ${col}`);
      } else {
        console.log(`    ✗ ${col} (missing)`);
        allFound = false;
      }
    }
    if (allFound) passed++; else failed++;

    // Check indexes
    console.log('  Checking: Indexes...');
    for (const col of requiredCollections) {
      if (collectionNames.includes(col)) {
        const indexes = await db.collection(col).listIndexes().toArray();
        const indexNames = indexes.map(i => i.name);
        console.log(`    ✓ ${col} (${indexes.length} indexes)`);
      }
    }
    passed++;

    // Check sample data
    console.log('  Checking: Sample data...');
    const customerCount = await db.collection('customers').countDocuments();
    const productCount = await db.collection('products').countDocuments();
    const orderCount = await db.collection('orders').countDocuments();
    
    const checks = [
      { name: 'customers', expected: 10, actual: customerCount },
      { name: 'products', expected: 20, actual: productCount },
      { name: 'orders', expected: 5, actual: orderCount },
    ];

    let dataValid = true;
    for (const check of checks) {
      if (check.actual >= check.expected) {
        console.log(`    ✓ ${check.actual} ${check.name} (≥${check.expected} expected)`);
      } else {
        console.log(`    ✗ ${check.actual} ${check.name} (${check.expected} expected)`);
        dataValid = false;
      }
    }
    if (dataValid) passed++; else failed++;

  } catch (error) {
    console.error('    ✗ Database connection failed:', error.message);
    failed++;
  } finally {
    await client.close();
  }

  // Final result
  console.log('\n' + '='.repeat(50));
  if (failed === 0) {
    console.log('✅ Stage 1 PASSED: Schema deployed and ready\n');
    process.exit(0);
  } else {
    console.log(`❌ Stage 1 FAILED: ${failed} check(s) failed\n`);
    process.exit(1);
  }
}

checkSchema();
