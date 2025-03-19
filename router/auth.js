const route = require("express").Router();
const db = require("../database/index.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

route.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if email and password match
    if (!email || !password) {
      return res.status(400).json({ error: "Invalid request" });
    }

    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (rows.length === 0) {
      res.status(401).json({ error: "Invalid credentials" });
    } else {
      const hashedPassword = rows[0].password;
      const result = await bcrypt.compare(password, hashedPassword);
      if (!result) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: rows[0].id, email: rows[0].email },
        process.env.JWT_SECRETE_KEY
      );

      res.json({
        message: "Login successful",
        token,
        email: rows[0].email,
        name: rows[0].name,
        id: rows[0].id,
      });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Database error" });
  }
});

route.post("/register", async (req, res) => {
    const { email, password, name } = req.body;
    try {
     
      const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  
      if (rows.length > 0) {
        return res.status(400).json({ error: "Email already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const [result] = await db.query(
        "INSERT INTO users (email, password, name) VALUES (?, ?, ?)", 
        [email, hashedPassword, name]
      );
  
      res.json({
        message: "User registered successfully",
        userId: result.insertId,
      });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Database error" });
    }
  });
  

module.exports = route;

