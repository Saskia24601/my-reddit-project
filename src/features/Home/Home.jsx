import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../Post/Post";
import {
  fetchComments,
  fetchPosts,
  selectFilteredPosts,
  setSearchTerm,
} from "../../store/redditSlice";
import "./Home.css";
import getRandomNumber from "../../utils/getRandomNumber";

const Home = () => {
  const reddit = useSelector((state) => state.reddit);
  const { isLoading, error, searchTerm, selectedSubreddits } = reddit;
  const posts = useSelector(selectFilteredPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts(selectedSubreddits));
  }, [selectedSubreddits]);

  const onToggleComments = (index) => {
    const getComments = (permalink) => {
      dispatch(fetchComments(index, permalink));
    };

    return getComments;
  };

  if (error) {
    return (
      <div className="error">
        <h2>Failed to load.</h2>
        <button
          type="button"
          onClick={() => dispatch(fetchPosts(selectedSubreddits))}
        >
          Try again.
        </button>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="error">
        <h2>No posts</h2>
        <button type="button" onClick={() => dispatch(setSearchTerm(""))}>
          Back to Home.
        </button>
      </div>
    );
  }

  return (
    <>
      {posts.map((post, index) => (
        <Post
          key={post.id}
          post={post}
          onToggleComments={onToggleComments(index)}
        />
      ))}
    </>
  );
};

export default Home;
