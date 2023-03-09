import React, { useState, useEffect } from "react";
import { PostCard } from "./";
import { getPostsAPI, getAllTagsAPI } from "../api-adapter";
import { useOutletContext } from "react-router-dom";

const PostList = ({ token }) => {
  const [, , , , posts, setPosts] = useOutletContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [tagArr, setTagArr] = useState([]);
  const [filtered, setFiltered] = useState([...posts]);
  

const getTags = async () => {
  const response = await getAllTagsAPI();
  setTagArr(response.tags[0]);
}

useEffect(() => {
  getTags();
}, []);

useEffect(() => {
  setFiltered(posts.filter((post, idx) => {

    let tagString = "";

    post.tags.map((tag) => {
      tagString = tagString + " " + tag.name;
    })

    console.log(tagString, 'string of tags');

    if(tagString.includes(searchTerm)){
      return true;
    }
  }))

}, [searchTerm])

console.log(posts, 'posts');
console.log(filtered, 'filtered posts');

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
            console.log(searchTerm);
        }
        }></input>
        <button type="submit">search</button>
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
