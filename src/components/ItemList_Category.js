import { IMG_CDN_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../utils/cartSlice";

const ItemList_Category = ({ items, showRemoveButton }) => {
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  return (
    <div className="p-4">
      {items.map((item) => (
        <div
          data-testid="foodItems"
          key={item.card.info.id}
          className="flex justify-between items-start p-4 mb-4 rounded-xl bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-md transition-all duration-200 border border-gray-100"
        >
          {/* Item Info */}
          <div className="flex-1 pr-4">
            {/* Name & Price */}
            <div className="mb-2">
              <h4 className="font-bold text-gray-900 mb-1">
                {item.card.info.name}
              </h4>
              <div className="flex items-center space-x-2">
                <span className="text-orange-600 font-bold text-lg">
                  ₹
                  {item.card.info.price / 100 ||
                    item.card.info.defaultPrice / 100}
                </span>
              </div>
            </div>

            {/* Description */}
            {item.card.info?.description && (
              <p className="text-xs text-gray-600 line-clamp-2">
                {item.card.info.description}
              </p>
            )}
          </div>

          {/* Image & Action Buttons */}
          <div className="flex flex-col items-center space-y-3">
            {item?.card?.info?.imageId && (
              <div className="relative">
                <img
                  className="w-32 h-24 object-cover rounded-lg shadow-md"
                  src={IMG_CDN_URL + item?.card?.info?.imageId}
                  alt={item.card.info.name}
                />
              </div>
            )}

            {/* Add/Remove Buttons */}
            <div className="flex items-center space-x-2">
              <button
                className="px-4 py-2 font-bold bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm rounded-full hover:shadow-lg hover:scale-105 transition-all duration-200"
                onClick={() => handleAddItem(item)}
              >
                + ADD
              </button>
              {showRemoveButton && (
                <button
                  className="px-3 py-2 font-semibold bg-red-50 text-red-600 text-sm border-2 border-red-200 rounded-full hover:bg-red-100 hover:border-red-400 transition-all duration-200"
                  onClick={() => handleRemoveItem(item.card.info.id)}
                >
                  REMOVE
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList_Category;
