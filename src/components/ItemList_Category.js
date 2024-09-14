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
    <div>
      {items.map((item) => (
        <div
          data-testid="foodItems"
          key={item.card.info.id}
          className="m-2 p-2 border-gray-200 border-b-2 text-left flex justify-between items-start"
        >
          <div className="w-8/12">
            <div className="py-2 font-semibold">
              <span>{item.card.info.name}</span>
              <span>
                ➡️ ₹
                {item.card.info.price / 100 ||
                  item.card.info.defaultPrice / 100}
              </span>
            </div>
            <div>
              <p className="text-xs">{item.card.info?.description}</p>
            </div>
          </div>
          <div className="w-4/12 flex flex-col items-center">
            <img
              className="w-32 h-24 rounded-lg mb-2"
              src={IMG_CDN_URL + item?.card?.info?.imageId}
              alt="logo"
            />
            <div className="flex justify-center items-center space-x-2 mt-2">
              <button
                className="w-14 p-1 font-semibold bg-white text-[#68ae52] text-sm border border-black rounded-lg hover:bg-green-200 transition duration-300"
                onClick={() => handleAddItem(item)}
              >
                ADD
              </button>
              {showRemoveButton && (
                <button
                  className="w-16 p-1 font-semibold bg-white text-[#ff0000] text-sm border border-black rounded-lg hover:bg-red-200 transition duration-300"
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
