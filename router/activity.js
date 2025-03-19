const route = require("express").Router();
const db = require("../database/index.js");


route.patch('/like/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query("UPDATE posts SET likes = likes + 1 WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.json({ message: "Post liked successfully" });
    } catch (error) {
        console.error("Error liking post:", error);
        res.status(500).json({ error: "Database error" });
    }
});

route.patch('/unlike/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query("UPDATE posts SET likes = likes - 1 WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.json({ message: "Post unliked successfully" });
    } catch (error) {
        console.error("Error unliking post:", error);
        res.status(500).json({ error: "Database error" });
    }
});

route.patch('/comment/:id', async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;
    try {
        const [result] = await db.query("UPDATE posts SET comments = comments + 1 WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.json({ message: "Comment added successfully" });
    } catch (error) {
        console.error("Error commenting on post:", error);
        res.status(500).json({ error: "Database error" });
    }
});