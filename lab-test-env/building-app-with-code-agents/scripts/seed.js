require('dotenv').config();
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

/**
 * SEED SCRIPT
 * 
 * Populates MongoDB with sample data for the lab.
 * Creates 3 schema alternatives so learner can choose their design in Stage 1.
 * 
 * Usage: npm run seed
 */

const MONGO_URI = process.env.MONGO_URI || 'mongodb://admin:password@mongodb:27017/app?authSource=admin';

// Sample data for all schema options
const SAMPLE_CUSTOMERS = [
  { _id: 'C-001', name: 'Alice Johnson', email: 'alice@example.com', created_at: new Date('2024-01-01') },
  { _id: 'C-002', name: 'Bob Smith', email: 'bob@example.com', created_at: new Date('2024-01-02') },
  { _id: 'C-003', name: 'Carol White', email: 'carol@example.com', created_at: new Date('2024-01-03') },
  { _id: 'C-004', name: 'David Brown', email: 'david@example.com', created_at: new Date('2024-01-04') },
  { _id: 'C-005', name: 'Eve Davis', email: 'eve@example.com', created_at: new Date('2024-01-05') },
  { _id: 'C-006', name: 'Frank Green', email: 'frank@example.com', created_at: new Date('2024-01-06') },
  { _id: 'C-007', name: 'Grace Lee', email: 'grace@example.com', created_at: new Date('2024-01-07') },
  { _id: 'C-008', name: 'Henry Chen', email: 'henry@example.com', created_at: new Date('2024-01-08') },
  { _id: 'C-009', name: 'Iris Wilson', email: 'iris@example.com', created_at: new Date('2024-01-09') },
  { _id: 'C-010', name: 'Jack Martinez', email: 'jack@example.com', created_at: new Date('2024-01-10') },
];

const SAMPLE_PRODUCTS = [
  { _id: 'P-100', name: 'Hiking Backpack 60L', description: 'Durable outdoor backpack for long treks', category: 'backpacks', price: 150, stock: 45 },
  { _id: 'P-101', name: 'Camping Tent 2-Person', description: 'Lightweight dome tent for camping', category: 'tents', price: 200, stock: 30 },
  { _id: 'P-102', name: 'Sleeping Bag -10C', description: 'Warm sleeping bag for winter camping', category: 'bags', price: 120, stock: 50 },
  { _id: 'P-103', name: 'Hiking Boots Size 10', description: 'Waterproof hiking boots with ankle support', category: 'footwear', price: 180, stock: 25 },
  { _id: 'P-104', name: 'Portable Camping Stove', description: 'Lightweight camping cooking stove', category: 'cooking', price: 45, stock: 60 },
  { _id: 'P-105', name: 'Water Bottle 1L', description: 'Insulated stainless steel water bottle', category: 'hydration', price: 35, stock: 100 },
  { _id: 'P-106', name: 'LED Headlamp', description: 'Rechargeable LED headlamp for hiking', category: 'lighting', price: 40, stock: 75 },
  { _id: 'P-107', name: 'Weekend Adventure Pack', description: 'Versatile backpack for weekend trips', category: 'backpacks', price: 130, stock: 55 },
  { _id: 'P-108', name: 'Kids Explorer Backpack', description: 'Colorful backpack designed for children', category: 'backpacks', price: 80, stock: 40 },
  { _id: 'P-109', name: 'Outdoor Cooking Set', description: 'Complete cooking utensil set for camping', category: 'cooking', price: 60, stock: 35 },
  { _id: 'P-110', name: 'Climbing Rope 50m', description: 'Professional climbing rope', category: 'climbing', price: 85, stock: 20 },
  { _id: 'P-111', name: 'Carabiner Pack 5pc', description: 'Set of 5 safety carabiners', category: 'climbing', price: 50, stock: 45 },
  { _id: 'P-112', name: 'Compass Waterproof', description: 'Digital compass with waterproof case', category: 'navigation', price: 30, stock: 55 },
  { _id: 'P-113', name: 'Dry Bag 20L', description: 'Waterproof dry bag for water activities', category: 'bags', price: 55, stock: 40 },
  { _id: 'P-114', name: 'Multi-Tool Deluxe', description: '15-in-1 outdoor multi-tool', category: 'tools', price: 75, stock: 65 },
  { _id: 'P-115', name: 'Camping Chair', description: 'Folding portable camping chair', category: 'furniture', price: 60, stock: 50 },
  { _id: 'P-116', name: 'Binoculars 10x42', description: 'High-power outdoor binoculars', category: 'optics', price: 250, stock: 15 },
  { _id: 'P-117', name: 'Solar Power Bank', description: '20000mAh solar-powered charger', category: 'power', price: 80, stock: 35 },
  { _id: 'P-118', name: 'Rain Jacket', description: 'Lightweight waterproof rain jacket', category: 'apparel', price: 95, stock: 70 },
  { _id: 'P-119', name: 'Trail Map Set', description: 'Waterproof topographic trail maps', category: 'navigation', price: 25, stock: 60 },
];

const SAMPLE_ORDERS = [
  {
    _id: 'ORD-001',
    order_id: 'ORD-001',
    customer_id: 'C-001',
    product_ids: ['P-100', 'P-106'],
    total: 190,
    created_at: new Date('2024-01-15T10:30:00Z'),
    status: 'confirmed'
  },
  {
    _id: 'ORD-002',
    order_id: 'ORD-002',
    customer_id: 'C-002',
    product_ids: ['P-101', 'P-102'],
    total: 320,
    created_at: new Date('2024-01-16T14:20:00Z'),
    status: 'confirmed'
  },
  {
    _id: 'ORD-003',
    order_id: 'ORD-003',
    customer_id: 'C-003',
    product_ids: ['P-107', 'P-104', 'P-105'],
    total: 210,
    created_at: new Date('2024-01-17T09:15:00Z'),
    status: 'confirmed'
  },
  {
    _id: 'ORD-004',
    order_id: 'ORD-004',
    customer_id: 'C-001',
    product_ids: ['P-118', 'P-119'],
    total: 120,
    created_at: new Date('2024-01-18T16:45:00Z'),
    status: 'confirmed'
  },
  {
    _id: 'ORD-005',
    order_id: 'ORD-005',
    customer_id: 'C-004',
    product_ids: ['P-116'],
    total: 250,
    created_at: new Date('2024-01-19T11:30:00Z'),
    status: 'confirmed'
  },
];

async function seedDatabase() {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const db = client.db('app');

    console.log('🌱 Seeding database...\n');

    // Drop existing collections
    const collections = await db.listCollections().toArray();
    for (const col of collections) {
      await db.collection(col.name).deleteMany({});
      console.log(`  ✓ Cleared collection: ${col.name}`);
    }

    // Seed customers
    if (SAMPLE_CUSTOMERS.length > 0) {
      await db.collection('customers').insertMany(SAMPLE_CUSTOMERS);
      console.log(`  ✓ Seeded ${SAMPLE_CUSTOMERS.length} customers`);
    }

    // Seed products
    if (SAMPLE_PRODUCTS.length > 0) {
      await db.collection('products').insertMany(SAMPLE_PRODUCTS);
      console.log(`  ✓ Seeded ${SAMPLE_PRODUCTS.length} products`);
    }

    // Seed orders
    if (SAMPLE_ORDERS.length > 0) {
      await db.collection('orders').insertMany(SAMPLE_ORDERS);
      console.log(`  ✓ Seeded ${SAMPLE_ORDERS.length} orders`);
    }

    // Create indexes
    console.log('\n  📍 Creating indexes...');
    await db.collection('customers').createIndex({ _id: 1 });
    await db.collection('products').createIndex({ _id: 1 });
    await db.collection('products').createIndex({ category: 1, price: 1 });
    await db.collection('orders').createIndex({ order_id: 1 });
    await db.collection('orders').createIndex({ customer_id: 1 });
    await db.collection('orders').createIndex({ created_at: -1 });
    console.log('  ✓ Indexes created');

    console.log('\n✅ Database seeded successfully!\n');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seedDatabase();
