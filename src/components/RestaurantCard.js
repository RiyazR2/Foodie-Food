import { IMG_CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { restData } = props;

  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla } =
    restData?.info;

  return (
    <div
      data-testid="resCard"
      className="relative flex flex-col justify-between mx-6 mb-10 p-4 w-[190px] sm:w-[200px] h-[350px] sm:h-[350px] rounded-lg bg-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out hover:-translate-y-2 overflow-hidden md:w-[250px] md:h-[400px]"
    >
      <div className="relative overflow-hidden rounded-lg">
        <img
          className="w-full h-[150px] sm:h-[200px] object-cover rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-110"
          alt="res-logo"
          src={IMG_CDN_URL + cloudinaryImageId}
        />
      </div>

      <div className="flex flex-col justify-between flex-grow mt-3">
        <div>
          <h3 className="font-bold text-sm sm:text-lg text-gray-800">{name}</h3>
          <h4 className="font-semibold text-xs sm:text-base text-gray-600">
            {cuisines.join(", ")}
          </h4>
        </div>

        <div className="flex justify-between items-center text-xs sm:text-base text-gray-600 mt-2">
          <span className="font-semibold">{avgRating} stars</span>
          <span className="font-semibold">{costForTwo}</span>
        </div>

        <h4 className="font-semibold text-xs sm:text-base text-gray-600">
          {sla?.slaString}
        </h4>
      </div>
    </div>
  );
};
export default RestaurantCard;

// Higher Order Component
// input - RestaurantCard ==> RestaurantCardDiscount
export const withDiscountLabel = (RestaurantCard) => {
  return (props) => {
    const { header } = props?.restData?.info?.aggregatedDiscountInfoV3;
    return (
      <div className="relative">
        <label className="absolute bg-black text-white text-xs sm:text-sm rounded-md ml-8 p-2 z-10">
          {!header.includes("OFF") ? "Discount Soon 🤗" : header}
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export const withPromotedLabel = (RestaurantCard) => {
  return () => {
    return () => (
      <div>
        <label>Promoted</label>
        <RestaurantCard />
      </div>
    );
  };
};
