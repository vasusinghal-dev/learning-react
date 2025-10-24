import TruncatedText from "./TruncatedText.js";
import starImg from "url:../images/star.png";
import greenStarImg from "url:../images/green-star.png";

const MenuUI = ({ menu }) => {
  const {
    name,
    cuisines,
    avgRating,
    totalRatingsString,
    areaName,
    sla,
    costForTwoMessage,
  } = menu?.cards[2]?.card?.card?.info;

  const menuItems =
    menu?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card
      ?.itemCards;

  console.log(
    menu?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card
  );

  return (
    <div className="menu-container">
      <div className="menu-title">{name}</div>
      <div className="menu-info">
        <div className="inner">
          <div className="rating-price">
            <span className="star-container">
              <img src={starImg} alt="star" />
            </span>
            {avgRating} ({totalRatingsString}) • {costForTwoMessage}
          </div>
          <div className="cuisines">{cuisines.join(", ")}</div>
          <div className="location">
            <div className="design">
              <div className="circle" />
              <div className="line" />
              <div className="circle" />
            </div>
            <div className="location-details">
              <div className="place">
                <span className="outlet">Outlet</span>
                <span>
                  {areaName} <span className="down-sign">▾</span>
                </span>
              </div>
              <div className="delivery-time">
                {sla?.slaString.toLowerCase()}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="separator" />
      <div className="menu-card-container">
        <div className="recommended">Recommended (19)</div>
        {menuItems.map((item, index) => {
          const { id, name, description, price, ratings, imageId } =
            item?.card?.info;
          return (
            <div key={id}>
              <div className="menu-card">
                <div className="info">
                  <div className="name">{name}</div>
                  <div className="price">
                    {price > 0
                      ? new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(price / 100)
                      : " "}
                  </div>
                  <div className="rating">
                    <img src={greenStarImg} alt="star" />
                    <span>{ratings?.aggregatedRating?.rating}</span>
                    <span className="avgRating">
                      ({ratings?.aggregatedRating?.ratingCountV2})
                    </span>
                  </div>
                  <TruncatedText text={description} limit={145} />
                </div>
                <div className="img-section">
                  <img
                    src={
                      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
                      imageId
                    }
                    alt={item.name}
                  />
                  <div className="button-section">
                    <div className="add-button">ADD</div>
                    <div className="customisable">Customisable</div>
                  </div>
                </div>
              </div>
              {index < menuItems.length - 1 && <div className="separator" />}
            </div>
          );
        })}
      </div>
      <div className="end"></div>
    </div>
  );
};
export default MenuUI;
