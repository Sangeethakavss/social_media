import React, { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import CreatePost from './CreatePost';
import Post from './Post';

function Feed({ user }) {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/posts/all");
      if (!response.ok) throw new Error("Failed to fetch posts");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Local handler to update like status and comment count
  const handleLikeChange = (postId, liked) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const updatedLikes = liked ? post.likes + 1 : post.likes - 1;
          return { ...post, liked, likes: updatedLikes };
        }
        return post;
      })
    );
  };

  const handleCommentAdded = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return { ...post, comments: (post.comments || 0) + 1 };
        }
        return post;
      })
    );
  };

  const handleCreatePost = async (title, content) => {
    try {
      const response = await fetch("http://localhost:3000/api/posts/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, user_id: user.id }),
      });
      const data = await response.json();
      if (response.ok) {
        fetchPosts();
      } else {
        alert(data.error || "Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user.name}!
      </Typography>
      <CreatePost onCreate={handleCreatePost} />
      <Box sx={{ mt: 3 }}>
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            onLikeChange={handleLikeChange}
            onCommentAdded={handleCommentAdded}
          />
        ))}
      </Box>
    </Container>
  );
}

export default Feed;

