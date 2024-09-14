import { render, screen } from "@testing-library/react";
import Contact from "../Contact";
import "@testing-library/jest-dom";

// *we can also use "it"(alias for test) instead of "test"

test("should load Contact us component", () => {
  render(<Contact />);

  // Querying
  const heading = screen.getByRole("heading");

  // Assertion
  expect(heading).toBeInTheDocument();
});

it("should load button inside Contact component", () => {
  render(<Contact />);

  const button = screen.getByRole("button");
  const text = screen.getByText("Submit");
  const ini = screen.getByPlaceholderText("Message");

  // Assertion
  expect(button).toBeInTheDocument();
  expect(text).toBeInTheDocument();
  expect(ini).toBeInTheDocument();
});

test("should load input name inside Contact component", () => {
  render(<Contact />);

  const inputName = screen.getByPlaceholderText("Message");

  // Assertion
  expect(inputName).toBeInTheDocument();
});

test("should load 2 inout boxes inside contact component", () => {
  render(<Contact />);

  const inputBoxes = screen.getAllByRole("textbox");

  expect(inputBoxes.length).toBe(2);
  // expect(inputBoxes.length).toBeLessThanOrEqual(2);
  // expect(inputBoxes.length).not.toBe(3);
});

//same as above but it in this we have grouped or we can also have describe in describe also
// describe("Contact us Page Test Cases", () => {
//   test("Contact us component lodaded or not", () => {
//     render(<Contact />);

//     // Querying
//     const heading = screen.getByRole("heading");

//     // Assertion
//     expect(heading).toBeInTheDocument();
//   });

//   test("should load button inside Contact component", () => {
//     render(<Contact />);

//     const button = screen.getByRole("button");
//     const text = screen.getByText("Submit");
//     const ini = screen.getByPlaceholderText("Message");

//     // Assertion
//     expect(button).toBeInTheDocument();
//     expect(text).toBeInTheDocument();
//     expect(ini).toBeInTheDocument();
//   });

//   test("should load input name inside Contact component", () => {
//     render(<Contact />);

//     const inputName = screen.getByPlaceholderText("Message");

//     // Assertion
//     expect(inputName).toBeInTheDocument();
//   });

//   test("should load 2 inout boxes inside contact component", () => {
//     render(<Contact />);

//     const inputBoxes = screen.getAllByRole("textbox");

//     expect(inputBoxes.length).toBe(2);
//     // expect(inputBoxes.length).toBeLessThanOrEqual(2);
//     // expect(inputBoxes.length).not.toBe(3);
//   });
// });
