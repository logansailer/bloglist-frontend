import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm.jsx";
import { expect } from "vitest";

test("BlogForm calls event handler", () => {
  const createBlog = vi.fn();

  const component = render(<BlogForm createBlog={createBlog} />);

  const input = component.container.querySelector("#title");
  const form = component.container.querySelector("form");

  fireEvent.change(input, {
    target: { value: "Go To Statement Considered Harmful" },
  });
  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe(
    "Go To Statement Considered Harmful"
  );
});
