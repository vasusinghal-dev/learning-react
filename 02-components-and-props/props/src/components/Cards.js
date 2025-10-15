import cardsArray from "../data/Data.js";
import Card from "./Card.js";

// Cards Component — maps through an array of restaurants to render multiple Card components
const Cards = () => {
  // Return a grid of cards
  return (
    <div className="cards-container">
      {cardsArray.map((card, index) => (
        <Card card={card} key={index} />
      ))}
    </div>
  );
};

export default Cards;
