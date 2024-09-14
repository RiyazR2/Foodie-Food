import { render, screen } from "@testing-library/react";
import RestaurantCard from "../RestaurantCard";
import MOCK_DATA from "../Mocks/ResCardMock.json";
import "@testing-library/jest-dom";

it("should render RestaurantCard Component with props Data", () => {
  render(<RestaurantCard restData={MOCK_DATA} />);

  const name = screen.getByText("Chinese Wok");

  expect(name).toBeInTheDocument();
});
