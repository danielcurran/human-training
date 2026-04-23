const { MongoClient } = require('mongodb');

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient) {
    return { client: cachedClient, db: cachedDb };
  }

  const uri = process.env.MONGO_URI || 'mongodb://admin:password@mongodb:27017/app?authSource=admin';
  
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  const db = client.db('app');

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

async function closeDatabase() {
  if (cachedClient) {
    await cachedClient.close();
    cachedClient = null;
    cachedDb = null;
  }
}

module.exports = {
  connectToDatabase,
  closeDatabase,
};
