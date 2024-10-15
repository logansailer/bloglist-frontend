import blogService from "../services/blogs";
import { useState } from "react";

const Blog = ({ blog }) => {
  let blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [blogObject, setBlogObject] = useState(blog);
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

  const likePost = () => {
    const updatedBlog = {
      ...blogObject,
      likes: blogObject.likes + 1,
    };
    blogService.addLike(updatedBlog);
    setBlogObject(updatedBlog);
  };

  const users = () => {
    if (blogObject.user) {
      return blogObject.user.name;
    }
  };

  const remove = () => {
    blogService.deleteBlog(blogObject);
    location.reload();
  };

  return (
    <div style={blogStyle} className="blog">
      <p className="generalInfo">
        {blogObject.title} by {blogObject.author}{" "}
        <button onClick={expandInfo}>{viewer}</button>
      </p>
      <div style={showWhenVisible} className="extraInfo">
        <p>{blogObject.url}</p>
        <p>
          Likes: {blogObject.likes}{" "}
          <button onClick={likePost} id="like">
            like
          </button>
        </p>
        <p>{users()}</p>
        <button id="remove" onClick={remove}>
          remove
        </button>
      </div>
    </div>
  );
};

export default Blog;
