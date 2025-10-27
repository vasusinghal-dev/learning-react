import starImg from "url:../images/star.png";

// Single Card Component — receives restaurant data via props
const CardUI = ({
  card: { name, cloudinaryImageId, avgRating, cuisines, areaName, sla },
}) => {
  return (
    <div className="card">
      {/* Top Image Section */}
      <div className="img-container">
        <img
          src={
            "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
            cloudinaryImageId
          }
          alt={name}
          className="card-img"
        />
      </div>

      {/* Info Section Below Image */}
      <div className="card-info">
        <div className="card-name">{name}</div>

        <div className="rating">
          <span className="star-container">
            <img src={starImg} alt="star" />
          </span>
          <span>{avgRating}</span>
          <span>•</span>
          <span>{sla.slaString}</span>
        </div>

        {/* Cuisine Speciality*/}
        <div className="speciality">{cuisines.join(", ")}</div>

        {/* Location */}
        <div className="location">{areaName}</div>
      </div>
    </div>
  );
};

export default CardUI;
