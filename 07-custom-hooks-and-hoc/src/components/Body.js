import CardsContainer from "./CardsContainer.js";
import { useOutletContext } from "react-router";

const Body = () => {
  const { cardsRef } = useOutletContext();

  return (
    <>
      <h1 className="mx-44 text-3xl font-bold">
        Top restaurant chains in Bangalore
      </h1>
      <CardsContainer ref={cardsRef} />
    </>
  );
};

export default Body;
