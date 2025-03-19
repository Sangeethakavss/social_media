import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, TextField, Box } from '@mui/material';

function Post({ post, onLikeChange, onCommentAdded }) {
  const [commentText, setCommentText] = useState("");

  const handleLike = async () => {
    const endpoint = post.liked
      ? `http://localhost:3000/api/posts/unlike/${post.id}`
      : `http://localhost:3000/api/posts/like/${post.id}`;
    try {
      const response = await fetch(endpoint, { method: "PATCH" });
      const data = await response.json();
      if (response.ok) {
        onLikeChange(post.id, !post.liked);
      } else {
        alert(data.error || "Failed to update like");
      }
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      try {
        const response = await fetch(`http://localhost:3000/api/posts/comment/${post.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ comment: commentText }),
        });
        const data = await response.json();
        if (response.ok) {
          onCommentAdded(post.id);
          setCommentText("");
        } else {
          alert(data.error || "Failed to add comment");
        }
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6">{post.title}</Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>{post.content}</Typography>
        <Typography variant="caption" display="block" sx={{ mt: 1, fontStyle: 'italic' }}>
          Posted by User ID: {post.user_id}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button variant="outlined" onClick={handleLike}>
            {post.liked ? "Unlike" : "Like"} ({post.likes || 0})
          </Button>
        </Box>
        <Typography variant="subtitle2" sx={{ mt: 2 }}>
          Comments: {post.comments || 0}
        </Typography>
        <Box component="form" onSubmit={handleCommentSubmit} sx={{ mt: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <Button type="submit" variant="contained" color="secondary" sx={{ mt: 1 }}>
            Comment
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default Post;

