/**
 * Data Access Layer (DAL) — Query Implementations
 * 
 * IMPORTANT: This is where agent-generated code will be placed.
 * Learners will review and approve MongoDB implementations of 4 core SQL queries.
 */

// ============================================================================
// QUERY 1: Get Order with Customer Details
// ============================================================================
// SQL: SELECT o.id, o.total, o.created_at, c.id, c.name, c.email
//      FROM orders o
//      JOIN customers c ON o.customer_id = c.id
//      WHERE o.id = ?
// 
// Purpose: Retrieve a single order with its associated customer information
// Parameters: order_id (String)
// Returns: { order_id, total, created_at, customer_id, customer_name, customer_email }

async function getOrderWithCustomer(db, orderId) {
  // TODO: Agent will generate MongoDB implementation
  // Should use either:
  // - find() if customers are embedded in order document
  // - aggregate() with $lookup if customers are referenced separately
  throw new Error('Not implemented yet');
}

// ============================================================================
// QUERY 2: List Recent Orders (with Pagination)
// ============================================================================
// SQL: SELECT o.id, o.total, o.created_at, c.name
//      FROM orders o
//      JOIN customers c ON o.customer_id = c.id
//      ORDER BY o.created_at DESC
//      LIMIT 10 OFFSET ?
// 
// Purpose: Show dashboard of recent orders
// Parameters: offset (Number, for pagination)
// Returns: Array of { order_id, total, created_at, customer_name }

async function listRecentOrders(db, offset = 0) {
  // TODO: Agent will generate MongoDB implementation
  throw new Error('Not implemented yet');
}

// ============================================================================
// QUERY 3: Get Products by Category
// ============================================================================
// SQL: SELECT id, name, description, price, category
//      FROM products
//      WHERE category = ?
//      ORDER BY price ASC
// 
// Purpose: List all products in a category
// Parameters: category (String, e.g., "backpacks", "tents")
// Returns: Array of { product_id, name, description, price, category }

async function getProductsByCategory(db, category) {
  // TODO: Agent will generate MongoDB implementation
  throw new Error('Not implemented yet');
}

// ============================================================================
// QUERY 4: Count Orders by Customer Status
// ============================================================================
// SQL: SELECT c.id, c.name, COUNT(o.id) as order_count, SUM(o.total) as total_spent
//      FROM customers c
//      LEFT JOIN orders o ON c.id = o.customer_id
//      GROUP BY c.id, c.name
//      ORDER BY total_spent DESC
// 
// Purpose: Generate customer analytics (VIP customers, repeat purchase patterns)
// Parameters: None
// Returns: Array of { customer_id, customer_name, order_count, total_spent }

async function countOrdersByCustomerStatus(db) {
  // TODO: Agent will generate MongoDB implementation
  // Likely requires aggregation with $group and $sum
  throw new Error('Not implemented yet');
}

// ============================================================================
// Vector Search (Stage 3)
// ============================================================================
// Purpose: Find semantically similar products
// Implementation will be adaptive to learner's schema choice from Stage 1

async function searchSimilarProducts(db, query, limit = 5) {
  // TODO: Agent will generate vector search implementation
  // Should use MongoDB's native vector search on product descriptions
  throw new Error('Not implemented yet');
}

module.exports = {
  getOrderWithCustomer,
  listRecentOrders,
  getProductsByCategory,
  countOrdersByCustomerStatus,
  searchSimilarProducts,
};
