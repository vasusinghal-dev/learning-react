import Cards from "./Cards.js";

const Body = ({ cards, cardsRef, loading }) => (
  <main>
    <h1
      style={{ marginTop: "50px", marginLeft: "180px", marginRight: "180px" }}
    >
      Top restaurant chains in Bangalore
    </h1>
    <Cards cards={cards} ref={cardsRef} loading={loading} />
  </main>
);

export default Body;
