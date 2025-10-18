import { forwardRef } from "react";
import Card from "./Card.js";

// Cards Component — maps through an array of restaurants to render multiple Card components
const Cards = forwardRef(({ cards }, ref) => {
  // Return a grid of cards
  return (
    <div className="cards-container" ref={ref}>
      {cards.map((card) => (
        <Card card={card} key={card.id} /> // passing props to children
      ))}
    </div>
  );
});

export default Cards;
