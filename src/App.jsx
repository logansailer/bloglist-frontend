import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import loginService from "./services/login";
import blogService from "./services/blogs";

const App = () => {
  const [user, setUser] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogAuthor, setNewBlogAuthor] = useState("");
  const [newBlogUrl, setNewBlogUrl] = useState("");
  const [newBlogLikes, setNewBlogLikes] = useState("");
  const [notifMessage, setNotifMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setNotifMessage("User not recognized: Incorrect Credentials");
      setTimeout(() => {
        setNotifMessage(null);
      }, 3000);
    }
  };

  const loginForm = () => (
    <div>
      <h3>Login to Application</h3>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );

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
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
      likes: newBlogLikes,
    };

    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setNotifMessage(
        `a new blog ${newBlogTitle} by ${newBlogAuthor} has been added`
      );
      setNewBlogTitle("");
      setNewBlogAuthor("");
      setNewBlogUrl("");
      setNewBlogLikes("");
    });
  };

  const logout = () => {
    window.localStorage.clear();
    location.reload();
  };

  const blogForm = () => (
    <div>
      <h2>Blogs</h2>
      <h4>{user.name} logged in</h4>
      <button onClick={logout}>Logout</button>
      <h3>Add a blog:</h3>
      <form onSubmit={addBlog}>
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
      <br></br>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  return (
    <div>
      <Notification message={notifMessage} />

      {user === null || user === "" ? loginForm() : blogForm()}
    </div>
  );
};

export default App;
