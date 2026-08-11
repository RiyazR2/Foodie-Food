const Shimmer = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Loading Message - Orange Theme */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-3 glass-card px-6 py-3 rounded-full shadow-lg border-2 border-orange-200">
          <div className="w-6 h-6 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="font-semibold gradient-text">
            Loading delicious restaurants...
          </span>
        </div>
      </div>

      {/* Shimmer Cards Grid */}
      <div className="flex flex-wrap justify-center gap-4">
        {Array(12)
          .fill()
          .map((_, index) => (
            <div
              key={index}
              className="w-[280px] h-[380px] glass-card rounded-2xl overflow-hidden animate-pulse"
            >
              {/* Image Shimmer */}
              <div className="h-[200px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 shimmer"></div>

              {/* Content Shimmer */}
              <div className="p-4 space-y-3">
                <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 shimmer rounded-lg w-3/4"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 shimmer rounded-lg w-full"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 shimmer rounded-lg w-5/6"></div>
                <div className="flex justify-between pt-3">
                  <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 shimmer rounded-lg w-20"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 shimmer rounded-lg w-20"></div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Shimmer;

export const RestaurantInfoShimmer = () => {
  return (
    <>
      <style>
        {`
          .shimmer {
            background: linear-gradient(
              to right,
              #e0e0e0 0%,
              #f5f5f5 20%,
              #e0e0e0 40%,
              #e0e0e0 100%
            );
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
          }

          @keyframes shimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
        `}
      </style>
      <div className="flex flex-col items-center mt-10 space-y-10">
        {Array(6)
          .fill()
          .map((_, index) => (
            <div
              key={index}
              className="w-6/12 h-52 bg-gray-200 rounded-lg shimmer"
            ></div>
          ))}
      </div>
    </>
  );
};
