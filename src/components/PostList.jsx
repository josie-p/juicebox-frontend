import React, { useState, useEffect } from "react";
import { PostCard } from "./";
import { getPostsAPI, getAllTagsAPI } from "../api-adapter";
import { useOutletContext } from "react-router-dom";

const PostList = ({ token }) => {
  const [, , , , posts, setPosts] = useOutletContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState([...posts]);
  

useEffect(() => {
  setFiltered(posts.filter((post, idx) => {

    let tagString = "";

    post.tags.map((tag) => {
      tagString = tagString + " " + tag.name;
    })

    if(tagString.includes(searchTerm)){
      return true;
    }
  }))

}, [searchTerm])


  return (
    <div>
      <form onSubmit={
        (e) => {
          e.preventDefault();
        }
      }>
        <label>search for tags</label>
        <input type="text" onInput={ (e) => {
            setSearchTerm(e.target.value);
        }
        } id="searchBar"></input>
        <button type="submit">search</button>
        <button onClick={
          () => {
            setSearchTerm("");
            document.getElementById("searchBar").value = "";
          }
        }>clear search</button>
      </form>
      <div>

        {
          posts.length ? 
          searchTerm.length ? 
          filtered.map((post, idx) => {
            return (
              <PostCard
                key={`PostCard Key: ${idx}`}
                post={post}
                token={token}
                posts={posts}
                setPosts={setPosts}
                setSearchTerm={setSearchTerm}
              />
            );
          }) : 
          posts.map((post, idx) => {
            return (
              <PostCard
                key={`PostCard Key: ${idx}`}
                post={post}
                token={token}
                posts={posts}
                setPosts={setPosts}
                setSearchTerm={setSearchTerm}
              />
            );
          }) :
          <h1>LOADING...</h1>
        }

      </div>
    </div>
  );
};

export default PostList;
