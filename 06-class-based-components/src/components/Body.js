import CardsContainer from "./CardsContainer.js";
import { useOutletContext } from "react-router";

const Body = () => {
  const { filteredList, loading, cardsRef } = useOutletContext();

  return (
    <>
      <h1 className="heading">Top restaurant chains in Bangalore</h1>
      <CardsContainer cards={filteredList} ref={cardsRef} loading={loading} />
    </>
  );
};

export default Body;
