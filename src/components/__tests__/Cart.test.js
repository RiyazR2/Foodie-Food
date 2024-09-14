import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import RestaurantMenu from "../RestaurantMenu";
import Header from "../Header";
import MOCK_DATA_NAME from "../Mocks/mockResMenu.json";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import "@testing-library/jest-dom";
import Cart from "../Cart";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(MOCK_DATA_NAME),
  })
);

it("should load RestaurantMenu Component", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
          <RestaurantMenu />
          <Cart />
        </Provider>
      </BrowserRouter>
    )
  );

  // ! ALL THE BELOW TEST CASES HAVE TO BE SEPARETED but as of now I'm doing for practice in single file

  const accordionHeader = screen.getByText("Recommended (13)");
  fireEvent.click(accordionHeader);
  expect(screen.getAllByTestId("foodItems").length).toBe(13);

  const addBtns = screen.getAllByRole("button", { name: "ADD" });
  fireEvent.click(addBtns[0]);
  expect(screen.getByText("Cart - (1) 🛒")).toBeInTheDocument();

  fireEvent.click(addBtns[1]);
  expect(screen.getByText("Cart - (2) 🛒")).toBeInTheDocument();

  fireEvent.click(addBtns[2]);
  expect(screen.getByText("Cart - (3) 🛒")).toBeInTheDocument();

  expect(screen.getAllByTestId("foodItems").length).toBe(16);

  fireEvent.click(screen.getByRole("button", { name: "Clear Cart" }));
  expect(screen.getAllByTestId("foodItems").length).toBe(13);
  expect(
    screen.getByText(
      "Your cart is empty You can go to home page to view more restaurants"
    )
  ).toBeInTheDocument();
});
