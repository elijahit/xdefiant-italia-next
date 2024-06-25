const sqlite3 = require("sqlite3").verbose();
const {open} = require("sqlite");
const path = require("path");


  // open the database
  const db = await open({
    filename: 'database.db',
    driver: sqlite3.Database
  })
  export default db;

  const post = await db.get("select titolo from article where titolo = ?", "titolo");

