import { fireEvent, render, screen } from "@testing-library/react";
import Body from "../Body";
import MOCK_DATA from "../Mocks/mockResListData.json";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import { LocationProvider } from "../../utils/LocationContext";
import "@testing-library/jest-dom";

global.fetch = jest.fn(() => {
  //here we have to write mock fetch function exactly similar identical to original fetch function
  return Promise.resolve({
    ok: true,
    json: () => {
      return Promise.resolve(MOCK_DATA);
    },
  });
});

it("should search restaurants by name", async () => {
  // here c could be a burger, pizza etc I'm just used 'c' for at a moment I don't have more than 1 item with same name so i used letter c
  await act(async () =>
    render(
      <BrowserRouter>
        <LocationProvider>
          <Body />
        </LocationProvider>
      </BrowserRouter>,
    ),
  );

  const cardBeforeSearch = await screen.findAllByTestId("resCard");

  expect(cardBeforeSearch.length).toBeGreaterThan(0);

  const searchBtn = screen.getAllByRole("button", { name: /Search/ })[1];

  const searchInput = screen.getByTestId("searchInput");

  fireEvent.change(searchInput, { target: { value: "Chinese Wok" } });

  fireEvent.click(searchBtn);

  const cardAfterSearch = screen.getAllByTestId("resCard");

  expect(cardAfterSearch.length).toBeLessThan(cardBeforeSearch.length);
});

it("should Filter Top Rated Restaurants ", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <LocationProvider>
          <Body />
        </LocationProvider>
      </BrowserRouter>,
    ),
  );

  const cardBeforeFilter = await screen.findAllByTestId("resCard");

  expect(cardBeforeFilter.length).toBeGreaterThan(0);

  const topRatedBtn = screen.getByRole("button", {
    name: /Top Rated/,
  });

  fireEvent.click(topRatedBtn);

  const cardAfterFilter = screen.getAllByTestId("resCard");

  expect(cardAfterFilter.length).toBeLessThan(cardBeforeFilter.length);
});
