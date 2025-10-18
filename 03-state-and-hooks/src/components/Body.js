import Cards from "./Cards.js";
import Hero from "./Hero.js";

const Body = ({ cards, cardsRef }) => (
  <main>
    <Hero />
    <Cards cards={cards} ref={cardsRef} />
  </main>
);

export default Body;
