import ShimmerCard from "./ShimmerCard.js";

const ShimmerUI = () => {
  return (
    <div className="mx-48 my-12 flex flex-wrap items-stretch">
      {Array(12)
        .fill(0)
        .map((_, i) => (
          <ShimmerCard key={i} />
        ))}
    </div>
  );
};

export default ShimmerUI;
