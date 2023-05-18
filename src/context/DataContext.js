import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import api from "../api/posts";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchPost = await api.get("/posts");
        setPosts(fetchPost.data);
      } catch (err) {
        if (err.fetchPost) {
          console.log(err.fetchPost.data);
          console.log(err.fetchPost.status);
          console.log(err.fetchPost.headers);
        } else {
          console.log(`Error : ${err.message}`);
        }
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const filterResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filterResults.reverse());
  }, [posts, search]);

  const handleEdit = async (id) => {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(
        posts.map((post) => (post.id === id ? { ...response.body } : post))
      );
      setEditTitle("");
      setEditBody("");
      navigate("/");
    } catch (e) {
      console.log(`Error : ${e.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postLists = posts.filter((item) => item.id !== id);
      setPosts(postLists);
      navigate("/");
    } catch (e) {
      console.log(`Error : ${e.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try {
      const response = await api.post("/posts", newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle("");
      setPostBody("");
      navigate("/");
    } catch (err) {
      console.log(`Error : ${err.message}`);
    }
  };

  return (
    <DataContext.Provider value={{
        searchResults, postTitle, handleSubmit, setPostTitle, postBody, setPostBody, posts, handleEdit, editBody, setEditBody, editTitle, setEditTitle,
        handleDelete, search, setSearch
    }}>
        {children}
    </DataContext.Provider>
  )
  
};

export default DataContext;
