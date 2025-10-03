// queries.js - MongoDB queries for Week 1 Assignment
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function runQueries() {
  try {
    await client.connect();
    const db = client.db("plp_bookstore");
    const books = db.collection("books");

    // ---------- Task 2: Basic CRUD ----------
    console.log("\nFind all Fiction books:");
    console.log(await books.find({ genre: "Fiction" }).toArray());

    console.log("\nFind books published after 1950:");
    console.log(await books.find({ published_year: { $gt: 1950 } }).toArray());

    console.log("\nFind books by George Orwell:");
    console.log(await books.find({ author: "George Orwell" }).toArray());

    console.log("\nUpdate price of '1984':");
    await books.updateOne({ title: "1984" }, { $set: { price: 12.5 } });
    console.log(await books.findOne({ title: "1984" }));

    console.log("\nDelete 'Moby Dick':");
    await books.deleteOne({ title: "Moby Dick" });

    // ---------- Task 3: Advanced Queries ----------
    console.log("\nIn-stock books published after 2010:");
    console.log(await books.find({ in_stock: true, published_year: { $gt: 2010 } }).toArray());

    console.log("\nProjection (title, author, price only):");
    console.log(await books.find({}, { projection: { title: 1, author: 1, price: 1 } }).toArray());

    console.log("\nBooks sorted by price ascending:");
    console.log(await books.find().sort({ price: 1 }).toArray());

    console.log("\nBooks sorted by price descending:");
    console.log(await books.find().sort({ price: -1 }).toArray());

    console.log("\nPagination (first 5 books):");
    console.log(await books.find().skip(0).limit(5).toArray());

    // ---------- Task 4: Aggregation ----------
    console.log("\nAverage price by genre:");
    console.log(await books.aggregate([
      { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
    ]).toArray());

    console.log("\nAuthor with the most books:");
    console.log(await books.aggregate([
      { $group: { _id: "$author", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]).toArray());

    console.log("\nBooks grouped by decade:");
    console.log(await books.aggregate([
      { $group: {
          _id: { $subtract: [ { $divide: ["$published_year", 10] }, { $mod: [ { $divide: ["$published_year", 10] }, 1 ] } ] },
          count: { $sum: 1 }
      }}
    ]).toArray());

    // ---------- Task 5: Indexing ----------
    console.log("\nCreating index on title...");
    await books.createIndex({ title: 1 });

    console.log("\nCreating compound index on author and published_year...");
    await books.createIndex({ author: 1, published_year: -1 });

    console.log("\nExplain query performance with index:");
    console.log(await books.find({ title: "1984" }).explain("executionStats"));

  } finally {
    await client.close();
  }
}

runQueries().catch(console.dir);
