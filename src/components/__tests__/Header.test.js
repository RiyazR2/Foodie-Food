import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import { LocationProvider } from "../../utils/LocationContext";
import Header from "../Header";

const renderHeader = () =>
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <LocationProvider>
          <Header />
        </LocationProvider>
      </Provider>
    </BrowserRouter>,
  );

it("renders the FoodieFinder header", () => {
  renderHeader();
  expect(screen.getByAltText("FoodieFinder Logo")).toBeInTheDocument();
  expect(screen.getByText("Recipe Generator")).toBeInTheDocument();
});

it("renders the cart link", () => {
  renderHeader();
  expect(screen.getByRole("link", { name: /Cart/ })).toBeInTheDocument();
});
