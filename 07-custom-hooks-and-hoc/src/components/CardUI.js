import starImg from "url:../images/star.png";

// Single Card Component — receives restaurant data via props
const CardUI = ({
  card: { name, cloudinaryImageId, avgRating, cuisines, areaName, sla },
}) => {
  return (
    <div className="card w-96">
      {/* Top Image Section */}
      <div className="overflow-hidden rounded-[20px]">
        <img
          src={
            "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
            cloudinaryImageId
          }
          alt={name}
          className="h-60 w-full object-cover"
        />
      </div>

      {/* Info Section Below Image */}
      <div className="flex flex-col gap-0.5 p-2.5">
        <div className="text-lg font-bold">{name}</div>

        <div className="flex items-center gap-1 text-lg font-bold">
          <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-green-700 [&>img]:w-3">
            <img src={starImg} alt="star" />
          </span>
          <span>{avgRating}</span>
          <span>•</span>
          <span>{sla.slaString}</span>
        </div>

        {/* Cuisine Speciality*/}
        <div className="p-0.5 text-[16px] tracking-[-1px] text-[rgba(38,37,37,0.7)]">
          {cuisines.join(", ")}
        </div>

        {/* Location */}
        <div className="p-0.5 text-[16px] tracking-[-1px] text-[rgba(38,37,37,0.7)]">
          {areaName}
        </div>
      </div>
    </div>
  );
};

export default CardUI;
