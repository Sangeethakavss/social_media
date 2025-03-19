const route = require("express").Router();
const db = require("../database/index.js");


route.post('/create', async (req, res) => {
    const { title, content, user_id } = req.body;
    try {
        const [result] = await db.query(
            "INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)",
            [title, content, user_id]
        );
        res.json({ message: "Post created successfully" });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ error: "Database error" });
    }
});

route.get('/all', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM posts");
        res.json(rows);
    } catch (error) {
        console.error("Error getting posts:", error);
        res.status(500).json({ error: "Database error" });
    }
});

route.get('/post/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query("SELECT * FROM posts WHERE id = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error("Error getting posts:", error);
        res.status(500).json({ error: "Database error" });
    }
});


module.exports = route;