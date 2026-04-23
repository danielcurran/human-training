require('dotenv').config();
const { MongoClient } = require('mongodb');

/**
 * RESET SCRIPT
 * 
 * Clears the MongoDB database and removes all learner artifacts.
 * Used to reset the lab if learner wants to restart from the beginning.
 * 
 * Usage: npm run reset
 */

const MONGO_URI = process.env.MONGO_URI || 'mongodb://admin:password@mongodb:27017/app?authSource=admin';

async function resetDatabase() {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const db = client.db('app');

    console.log('🔄 Resetting database...\n');

    // Drop all collections
    const collections = await db.listCollections().toArray();
    for (const col of collections) {
      await db.collection(col.name).deleteMany({});
      console.log(`  ✓ Cleared collection: ${col.name}`);
    }

    console.log('\n✅ Database reset successfully!\n');
    console.log('   Next step: npm run seed\n');
  } catch (error) {
    console.error('❌ Error resetting database:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

resetDatabase();
