const Shimmer = () => {
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
      <div className="flex flex-wrap">
        {Array(20)
          .fill()
          .map((_, index) => (
            <div
              key={index}
              className="h-96 m-4 p-4 w-[250px] rounded-lg bg-gray-100 shimmer"
            ></div>
          ))}
      </div>
    </>
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
