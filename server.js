const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();
const app = express();
app.use(express.json());

const pool = new Pool();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

// GET all fighters
app.get("/api/fighters", (req, res) => {
  pool
    .query("SELECT * FROM fighters;")
    .then((data) => res.json({ myResponse: data.rows }))
    .catch((e) => res.sendStatus(500));
});

// GET one fighter
app.get("/api/fighters/:id", (req, res) => {
  const { id } = req.params;
  pool
    .query("SELECT * FROM fighters WHERE id=$1;", [id])
    .then((data) => res.json(data.rows))
    .catch((e) => res.sendStatus(500));
});

// CREATE a fighter
app.post("/api/fighters", (req, res) => {
  const { first_name, last_name, country_id, style } = req.body;

  pool
    .query(
      "INSERT INTO fighters (first_name, last_name, country_id, style) VALUES ($1, $2, $3, $4) RETURNING first_name;",
      [first_name, last_name, country_id, style]
    )
    .then((data) => res.json(data.rows))
    .catch((e) => res.sendStatus(500));
});

// UPDATE a fighter
app.put("/api/fighters/:id");

// DELETE a fighter
app.delete("/api/fighters/:id");

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
