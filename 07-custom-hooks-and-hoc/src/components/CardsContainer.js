import { forwardRef } from "react";
import CardUI from "./CardUI.js";
import ShimmerUI from "./ShimmerUI.js";
import { Link } from "react-router";
import withPromotedLabel from "../utility/withPromotedLabel.js";
import { useOutletContext } from "react-router";

// Cards Component — maps through an array of restaurants to render multiple Card components
const CardsContainer = forwardRef((props, ref) => {
  const { filteredList: cards, loading } = useOutletContext();
  const PromotedCard = withPromotedLabel(CardUI);
  // Conditional Rendering
  if (loading) return <ShimmerUI />;
  if (!cards || cards.length === 0)
    return (
      <div className="my-5 flex min-h-52 w-full items-center justify-center rounded-[20px] bg-[#f9f9f9] py-14 text-xl font-bold text-[#555]">
        No results found
      </div>
    );

  // Return a grid of cards
  return (
    <div className="mx-44 my-12 flex flex-wrap gap-8" ref={ref}>
      {cards.map((card) => (
        <Link
          to={`/restaurant/${card.info.id}`}
          key={card?.info?.id}
          className="text-black no-underline transition-all duration-200 hover:scale-95"
        >
          {card?.info?.promoted ? (
            <PromotedCard card={card.info} promoted={card?.info?.promoted} />
          ) : (
            <CardUI card={card.info} />
          )}
        </Link>
      ))}
    </div>
  );
});

export default CardsContainer;
