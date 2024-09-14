import { RestaurantInfoShimmer } from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantMenu = () => {
  const { resId } = useParams();

  // CUSTOM HOOK
  const restaurantInfo = useRestaurantMenu(resId);
  // console.log("restaurantInfo", restaurantInfo); // ! don't delete this, this is for reference

  //for RestaurantCategory to do Expand or Collapse
  const [showIndex, setShowIndex] = useState(0);

  if (restaurantInfo === null) return <RestaurantInfoShimmer />;

  const { name, cuisines, costForTwoMessage, avgRating } =
    restaurantInfo?.cards[2]?.card?.card?.info; // ! Always check the path [json / restaurantInfo]

  const categories =
    restaurantInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    ); // ! Always check the path [json / restaurantInfo]

  return (
    <div className="menu text-center">
      <h1 className="mt-6 mb-2 font-bold text-2xl">{name}</h1>

      <h3 className="font-bold text-lg">
        {cuisines.join(", ")} | {costForTwoMessage} | {avgRating} stars
      </h3>

      {/* Categories Accordion */}
      {categories?.map((category, index) => (
        //Controlled Component
        <RestaurantCategory
          key={index}
          categoryData={category?.card?.card}
          showItems={index === showIndex ? true : false}
          setShowIndex={() => setShowIndex(index)} // Passing setShowIndex to my Children, I will pass a function and this function basically setShowIndex of that particular index
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
