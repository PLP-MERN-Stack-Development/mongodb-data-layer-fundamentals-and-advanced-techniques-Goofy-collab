# MongoDB CRUD Assignment

This project demonstrates basic CRUD (Create, Read, Update, Delete) operations using **Node.js** and **MongoDB**.

## Prerequisites

Before running the scripts, make sure you have:

- [Node.js](https://nodejs.org/) installed (v14 or above recommended)
- A MongoDB instance running:
  - Either locally (`mongodb://127.0.0.1:27017`)
  - Or on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) 

## Installation

1. Clone or download this repository.
2. Open the project folder in your terminal.
3. Install dependencies:
   ```bash
   npm install
````

## Running the Script

1. Start your MongoDB server (if running locally).
2. Run the Node.js script:

   ```bash
   node insert_books.js
   ```

## What the Script Does

* Creates/uses a database and a `books` collection
* Inserts sample book documents
* Runs queries:

  * Find all Fiction books
  * Find books published after 1950
  * Find books by George Orwell
* Updates the price of *1984*
* Deletes *Moby Dick*

## Expected Output

When you run the script, you will see the results of each operation printed in the terminal, for example:

```
Find all Fiction books:
[ { _id: ..., title: "1984", author: "George Orwell", ... }, ... ]

Find books published after 1950:
[ ... ]

Update price of '1984':
{ _id: ..., title: "1984", price: 12.5, ... }
```

