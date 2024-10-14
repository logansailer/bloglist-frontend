import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm.jsx";
import { expect } from "vitest";

test("<BlogForm /> calls event handler it receives as props", async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();

  const {container} = render(<BlogForm createBlog={createBlog} />);

  const inputTitle = container.querySelector("#title");
  const inputAuthor = container.querySelector("#author");
  const inputURL = container.querySelector("#URL");
  const inputLikes = container.querySelector("#likes");
  const sendButton = container.querySelector("#save");

  await user.type(inputTitle, "testing a form...");
  await user.type(inputAuthor, "test");
  await user.type(inputURL, "url");
  await user.type(inputLikes, "2");

  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("testing a form...");
});