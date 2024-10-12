import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogAuthor, setNewBlogAuthor] = useState("");
  const [newBlogUrl, setNewBlogUrl] = useState("");
  const [newBlogLikes, setNewBlogLikes] = useState("");

  const handleBlogTitleChange = (event) => {
    setNewBlogTitle(event.target.value);
  };

  const handleBlogAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value);
  };
  const handleBlogUrlChange = (event) => {
    setNewBlogUrl(event.target.value);
  };
  const handleBlogLikeChange = (event) => {
    setNewBlogLikes(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
      likes: newBlogLikes,
    });
    setNewBlogTitle("");
    setNewBlogAuthor("");
    setNewBlogUrl("");
    setNewBlogLikes("");
  };

  return (
    <form onSubmit={addBlog} className="blogForm">
      <div>
        <label>Blog Title:</label>
        <input value={newBlogTitle} onChange={handleBlogTitleChange} />
      </div>
      <div>
        <label>Blog Author:</label>
        <input value={newBlogAuthor} onChange={handleBlogAuthorChange} />
      </div>
      <div>
        <label>Blog Url:</label>
        <input value={newBlogUrl} onChange={handleBlogUrlChange} />
      </div>
      <div>
        <label>Blog Likes:</label>
        <input value={newBlogLikes} onChange={handleBlogLikeChange} />
      </div>
      <button type="submit">save</button>
    </form>
  );
};

export default BlogForm;
