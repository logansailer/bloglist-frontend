import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import { expect } from "vitest";

test("renders Title and Author, doesnt render url and likes", async () => {
  const blog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  };

  const { container } = render(<Blog blog={blog} />);

  const general = container.querySelector(".generalInfo");
  expect(general).toHaveTextContent("React patterns") &&
    expect(general).toHaveTextContent("Michael Chan");

  const extra = container.querySelector(".extraInfo");
  expect(extra).toHaveStyle("display: none");
});

test("renders url and number of likes after view click", async () => {
  const blog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  };

  //initializes mock click and rendered component
  const mockHandler = vi.fn();
  const { container } = render(<Blog blog={blog} expandInfo={mockHandler} />);

  //emulates screen click
  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  const extra = container.querySelector(".extraInfo");
  expect(extra).toHaveStyle("display: block");
  expect(extra).toHaveTextContent("https://reactpatterns.com/");
  expect(extra).toHaveTextContent("7");
});

test("like button functions with 2 clicks", async () => {
  const blog = {
    id: "test",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  };

  //initializes mock click and rendered component
  const mockHandler = vi.fn();
  render(<Blog blog={blog} likePost={mockHandler} />);

  //emulates screen click
  const user = userEvent.setup();
  const button = screen.getByText("like");
  await user.click(button);
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
