import { useState, useEffect } from "react";
import "./App.css";
import AddPost from "./components/AddPost.jsx";
import EditPost from "./components/EditPost.jsx";
import Posts from "./components/Posts";
import api from "./api/api";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null); // post I am editing
  const [error, setError] = useState(null);
// to add a post 
  const handleAddPost = async (newPost) => {
    try {
      const id = posts.length ? Number(posts[posts.length - 1].id) + 1 : 1;
      const nextPost = {
        id: id.toString(),
        ...newPost,
      };
      const response = await api.post("/posts", nextPost);
      setPosts([...posts, response.data]);
    } catch (err) {
      if (err.response) {
        setError(`Status:${err.response.status} Message:${err.response.data}`);
      } else {
        setError(err.message);
      }
    }
  };
// to delete a post 
  const handleDeletePost = async (postId) => {
    if (confirm("Are you sure you want to delete the post?")) {
      try {
        const response = await api.delete(`/posts/${postId}`);
        
        const newPosts = posts.filter((post) => post.id !== response?.data?.id);
        setPosts(newPosts);
      } catch (err) {
        if (err.response) {
          setError(
            `Status:${err.response.status} Message:${err.response.data}`
          );
        } else {
          setError(err.message);
        }
      }
    } else {
      console("You chose not to delete the post!");
    }
  };
// to edit a post 
  const handleEditPost = async (updatedPost) => {
    try {
      const response = await api.patch(`/posts/${updatedPost.id}`, updatedPost);
      const updatedPosts = posts.map((post) =>
        post.id === response.data.id ? updatedPost : post
      );
      setPosts(updatedPosts);
      setPost(null);
    } catch (err) {
      if (err.response) {
        setError(`Status:${err.response.status} Message:${err.response.data}`);
      } else {
        setError(err.message);
      }
    }
  };

// load posts in first rendering 
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts");
        setPosts(response.data);
      } catch (err) {
        if (err.response) {
          setError(
            `Status: ${err.response.status} Message: ${err.response.data}`
          );
        } else {
          setError(err.message);
        }
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <div>
        <h1 className="text-3xl">API Request with Axios</h1>
        <hr />

        <div>
          <Posts
            posts={posts}
            onDeletePost={handleDeletePost}
            onEditClick={setPost}
          />

          <hr />

          {!post ? (
            <AddPost onAddPost={handleAddPost} />
          ) : (
            <EditPost post={post} onEditPost={handleEditPost} />
          )}
          {error && (
            <div>
              <span className="font-bold">Error:</span> {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
