import cardsArray from "../data/Data.js";
import Card from "./Card.js";

// Cards Component — maps through an array of restaurants to render multiple Card components
const Cards = () => {
  // Return a grid of cards
  return (
    <div className="cards-container">
      {cardsArray.map((card) => (
        <Card card={card} key={card.id} /> // passing props to children
      ))}
    </div>
  );
};

export default Cards;
