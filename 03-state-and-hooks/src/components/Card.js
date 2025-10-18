import starImg from "url:../images/star.png";

// Single Card Component — receives restaurant data via props
const Card = ({
  card: {
    name,
    imgSrc,
    rating,
    speciality,
    price,
    location,
    distance,
    discount,
    discountQty,
  },
}) => {
  return (
    <div className="card">
      {/* Top Image Section */}
      <div className="img-container">
        <img src={imgSrc} alt={name} className="card-img" />

        {/* Restaurant name + Rating */}
        <div className="name-rating">
          <div className="card-name">{name}</div>
          <div className="rating">
            <div className="star-container">
              <img src={starImg} alt="star" />
            </div>
            {rating}
          </div>
        </div>
      </div>

      {/* Info Section Below Image */}
      <div className="card-info">
        {/* Cuisine + Price */}
        <div className="speciality">
          <div className="cusine-type">{speciality}</div>
          <div className="cusine-price">{price}</div>
        </div>

        {/* Location + Distance */}
        <div className="location">
          <div className="location-name">{location}</div>
          <div className="distance">{distance} km</div>
        </div>

        {/* Table Booking Info */}
        <div className="table-booking">
          <img
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/dineout/rx-card/highlights/book.png"
            alt="booked"
          />
          Table booking
        </div>

        {/* Discounts Section */}
        <div className="discount-container">
          <div className="discount">
            <img
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/dineout/rx-card/OFFER.png"
              alt="offer"
              className="offer-icon"
            />
            Flat {discount}% off on pre-booking
          </div>
          <div className="discount-quantity">+{discountQty} more</div>
        </div>

        {/* Bank Offers */}
        <div className="bank-offer">Up to 10% off with bank offers</div>
      </div>
    </div>
  );
};

export default Card;
