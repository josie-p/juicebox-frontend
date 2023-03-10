import React, { useState, useEffect } from "react";
import { useOutletContext, useParams, Link } from "react-router-dom";
import { getPostsAPI } from "../api-adapter";
import { Loading } from "./";

const SinglePost = () => {
  const [, , token, setToken] = useOutletContext();
  const [posts, setPosts] = useState([]);
  const { id } = useParams();

  const getPosts = async (token) => {
    const response = await getPostsAPI(token);

    setPosts(response.posts[0]);
  };

  useEffect(() => {
    if (!token) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    getPosts(token);
  }, [token]);

  const singlePost = posts.filter((post) => {
    if (post.id == id) {
      return true;
    }

    return false;
  });

  return (
    <>
      {posts.length ? (
        <>
          <div className="single-post">
            <h2 id="title">{singlePost[0].title}</h2>
            <h1 id="user"> by: {singlePost[0].author.username}</h1>
            <p id="content">{singlePost[0].content}</p>
            <p>tags:</p>
            <div id="holdTags">
              {singlePost[0].tags.map((tag, idx) => {
                if (tag.name.includes("#")) {
                  return (
                    <p key={`Tag Map Single Post: ${idx}`} className="tags">
                      {tag.name}
                    </p>
                  );
                } else {
                  return (
                    <p key={`Tag Map Single Post: ${idx}`} className="tags">
                      #{tag.name}
                    </p>
                  );
                }
              })}
            </div>
          </div>
          <Link to="/" className="goHome">
            Go Home
          </Link>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default SinglePost;
