import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import RestaurantMenu from "../RestaurantMenu";
import Header from "../Header";
import MOCK_DATA_NAME from "../Mocks/mockResMenu.json";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import "@testing-library/jest-dom";
import Cart from "../Cart";
import { LocationProvider } from "../../utils/LocationContext";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(MOCK_DATA_NAME),
  }),
);

it("should load RestaurantMenu Component", async () => {
  await act(async () =>
    render(
      <MemoryRouter initialEntries={["/restaurants/123"]}>
        <Provider store={appStore}>
          <LocationProvider>
            <Header />
            <Routes>
              <Route path="/restaurants/:resId" element={<RestaurantMenu />} />
            </Routes>
            <Cart />
          </LocationProvider>
        </Provider>
      </MemoryRouter>,
    ),
  );

  // ! ALL THE BELOW TEST CASES HAVE TO BE SEPARETED but as of now I'm doing for practice in single file

  await screen.findByText("Recommended");
  expect(screen.getAllByTestId("foodItems").length).toBe(43);

  const addBtns = screen.getAllByRole("button", { name: /ADD/ });
  fireEvent.click(addBtns[0]);
  expect(screen.getByRole("link", { name: /Cart.*1/ })).toBeInTheDocument();

  fireEvent.click(addBtns[1]);
  expect(screen.getByRole("link", { name: /Cart.*2/ })).toBeInTheDocument();

  fireEvent.click(addBtns[2]);
  expect(screen.getByRole("link", { name: /Cart.*3/ })).toBeInTheDocument();

  expect(screen.getAllByTestId("foodItems").length).toBe(46);

  fireEvent.click(screen.getByRole("button", { name: /Clear Cart/ }));
  expect(screen.getAllByTestId("foodItems").length).toBe(43);
  expect(screen.getByText(/Looks like you haven't added/)).toBeInTheDocument();
});
