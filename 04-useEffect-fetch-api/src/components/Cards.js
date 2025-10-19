import { forwardRef } from "react";
import Card from "./Card.js";
import Shimmer from "./Shimmer.js";

// Cards Component — maps through an array of restaurants to render multiple Card components
const Cards = forwardRef(({ cards, loading }, ref) => {
  // Conditional Rendering
  if (loading) return <Shimmer />;
  if (!cards || cards.length === 0)
    return <div className="no-results">No results found</div>;

  // Return a grid of cards
  return (
    <div className="cards-container" ref={ref}>
      {cards.map((card) => (
        <Card card={card.info} key={card?.info?.id} /> // passing props to children
      ))}
    </div>
  );
});

export default Cards;
