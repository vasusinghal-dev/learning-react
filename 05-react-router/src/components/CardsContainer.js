import { forwardRef } from "react";
import CardUI from "./CardUI.js";
import ShimmerUI from "./ShimmerUI.js";
import { Link } from "react-router";

// Cards Component — maps through an array of restaurants to render multiple Card components
const CardsContainer = forwardRef(({ cards, loading }, ref) => {
  // Conditional Rendering
  if (loading) return <ShimmerUI />;
  if (!cards || cards.length === 0)
    return <div className="no-results">No results found</div>;

  // Return a grid of cards
  return (
    <div className="cards-container" ref={ref}>
      {cards.map((card) => (
        <Link
          to={`/restaurant/${card.info.id}`}
          key={card.info.id}
          className="link"
        >
          <CardUI card={card.info} />
        </Link>
      ))}
    </div>
  );
});

export default CardsContainer;
