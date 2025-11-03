const ShimmerCard = () => {
  return (
    <div className="m-2 h-[370px] w-[390px] shrink-0 overflow-hidden rounded-[20px] border border-[rgba(0_0_0/0.2)]">
      <div className="shimmer-effect relative h-[230px] overflow-hidden bg-[lightgray]"></div>
      <div className="p-2.5">
        <div className="shimmer-effect relative mt-3 h-[25px] overflow-hidden rounded-sm bg-[lightgray]"></div>
        <div className="shimmer-effect relative mt-3 h-[25px] overflow-hidden rounded-sm bg-[lightgray]"></div>
      </div>
    </div>
  );
};

export default ShimmerCard;
<div className="relative overflow-hidden" />;
