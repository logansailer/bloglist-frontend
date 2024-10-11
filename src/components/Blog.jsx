import blogService from "../services/blogs"
import { useState } from "react";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [viewer, setViewer] = useState("view");
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? "" : "none" };

  const expandInfo = () => {
    setVisible(!visible);
    if (viewer === "view") {
      setViewer("hide");
    } else {
      setViewer("view");
    }
  };

  const likePost = (blog) => {};

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={expandInfo}>{viewer}</button>
      <div style={showWhenVisible}>
        {blog.url}
        <br></br>
        Likes: {blog.likes} <button onClick={likePost(blog)}>like</button>
      </div>
    </div>
  );
};

export default Blog;
