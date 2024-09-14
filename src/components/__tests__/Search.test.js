import { fireEvent, render, screen } from "@testing-library/react";
import Body from "../Body";
import MOCK_DATA from "../Mocks/mockResListData.json";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

global.fetch = jest.fn(() => {
  //here we have to write mock fetch function exactly similar identical to original fetch function
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCK_DATA);
    },
  });
});

it("should Search Res List for 'c' text input", async () => {
  // here c could be a burger, pizza etc I'm just used 'c' for at a moment I don't have more than 1 item with same name so i used letter c
  await act(async () =>
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    )
  );

  const cardBeforeSearch = screen.getAllByTestId("resCard");

  expect(cardBeforeSearch.length).toBe(9);

  const searchBtn = screen.getByRole("button", { name: "Search" });

  const searchInput = screen.getByTestId("searchInput");

  fireEvent.change(searchInput, { target: { value: "c" } });

  fireEvent.click(searchBtn);

  const cardAfterSearch = screen.getAllByTestId("resCard");

  expect(cardAfterSearch.length).toBe(4);
});

it("should Filter Top Rated Restaurants ", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    )
  );

  const cardBeforeFilter = screen.getAllByTestId("resCard");

  expect(cardBeforeFilter.length).toBe(9);

  const topRatedBtn = screen.getByRole("button", {
    name: "Top Rated Restaurants",
  });

  fireEvent.click(topRatedBtn);

  const cardAfterFilter = screen.getAllByTestId("resCard");

  expect(cardAfterFilter.length).toBe(5);
});
