import ItemList_Category from "./ItemList_Category";

// Extracted setShowIndex
const RestaurantCategory = ({ categoryData, showItems, setShowIndex }) => {
  const handleClick = () => {
    setShowIndex(); //
  };
  // console.log("categoryData:", categoryData);

  return (
    <div className="glass-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 animate-float-up">
      {/* Accordion Header */}
      <div
        className={`flex justify-between items-center cursor-pointer p-5 transition-all duration-300 ${
          showItems
            ? "bg-gradient-to-r from-orange-50 to-amber-50"
            : "hover:bg-orange-50"
        }`}
        onClick={handleClick}
      >
        <div className="flex items-center space-x-3 flex-1">
          {/* Icon - Changes based on state */}
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 text-orange-600 transition-all duration-300">
            <span className="text-xl">{showItems ? "📂" : "📁"}</span>
          </div>

          {/* Title */}
          <span className="font-bold text-lg text-gray-900 flex-1">
            {categoryData.title}
          </span>

          {/* Item Count Badge */}
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
              showItems
                ? "bg-orange-500 text-white"
                : "bg-orange-100 text-orange-600"
            }`}
          >
            {categoryData.itemCards.length}
          </span>
        </div>

        {/* Dropdown Arrow - Smooth Rotation */}
        <div className="ml-3">
          <svg
            className={`w-6 h-6 text-orange-600 transform transition-transform duration-300 ${
              showItems ? "rotate-180" : "rotate-0"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Accordion Content - Smooth Slide Animation */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          showItems ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-orange-200 bg-gradient-to-b from-white/80 to-white/60 backdrop-blur-sm">
          <ItemList_Category items={categoryData.itemCards} />
        </div>
      </div>
    </div>
  );
};

export default RestaurantCategory;
