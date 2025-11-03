import greenStarImg from "url:../images/green-star.png";
import TruncatedText from "./TruncatedText";

const MenuItem = ({ item, showDivider = false }) => {
  const { id, name, description, price, defaultPrice, ratings, imageId } = item;

  return (
    <div key={id}>
      <div className="flex justify-between">
        {/* LEFT: Info */}
        <div className="flex-1 pr-6">
          <div className="text-lg font-bold">{name}</div>
          {(price || defaultPrice) > 0 && (
            <div className="mt-1.5 text-[16px] font-bold">
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format((price || defaultPrice) / 100)}
            </div>
          )}

          {ratings?.aggregatedRating?.rating && (
            <div className="mt-3 flex gap-1 text-xs font-bold text-[#11ac12]">
              <img src={greenStarImg} alt="star" className="w-3" />
              <span>{ratings.aggregatedRating.rating}</span>
              <span className="text-[#02060c99]">
                ({ratings.aggregatedRating.ratingCountV2})
              </span>
            </div>
          )}

          <TruncatedText text={description} limit={145} />
        </div>

        {/* RIGHT: Image + Button */}
        <div className="relative h-44 w-36">
          <img
            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`}
            alt={name}
            className="h-36 w-full rounded-xl object-cover"
          />
          <div className="absolute -bottom-1 left-1/2 flex -translate-x-1/2 flex-col items-center">
            <button className="h-[38px] w-[120px] rounded-lg border border-[rgba(2_6_12/0.15)] bg-white text-lg font-bold text-[#1ba672] transition duration-200 hover:bg-[#d9dadb]">
              ADD
            </button>
            <div className="text-[13px] text-[#02060c73]">Customisable</div>
          </div>
        </div>
      </div>
      {showDivider && (
        <div className="mx-auto my-6 h-[0.5px] w-[calc(100%-32px)] bg-[rgba(2_6_12/0.15)]" />
      )}
    </div>
  );
};

export default MenuItem;
