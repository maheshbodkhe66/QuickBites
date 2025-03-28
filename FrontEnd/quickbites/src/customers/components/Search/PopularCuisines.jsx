export const PopularCuisines = ({ image, title }) => {
  return (
    <div className="flex flex-col items-center justify-center px-3">
      <img
        className="w-10 h-10 lg:w-16 lg:h-16 rounded-full object-cover"
        src={image}
        alt={title}
      />
      <span className="py-2 font-semibold text-xs text-gray-500 text-center">
        {title.length > 6 ? title.substring(0, 5) + "..." : title}
      </span>
    </div>
  );
};
