import ShimmerCard from "./ShimmerCard.js";

const ShimmerUI = () => {
  return (
    <div className="shimmer-container">
      {Array(12)
        .fill(0)
        .map((_, i) => (
          <ShimmerCard key={i} />
        ))}
    </div>
  );
};

export default ShimmerUI;
