import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import loginService from "./services/login";
import blogService from "./services/blogs";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [user, setUser] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [notifMessage, setNotifMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const blogFormRef = useRef();

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
  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setNotifMessage(
        `a new blog ${newBlogTitle} by ${newBlogAuthor} has been added`
      );
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
      <Togglable buttonLabel="add blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
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
