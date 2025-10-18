import Header from "./components/Header.js";
import Body from "./components/Body.js";
import Footer from "./components/Footer.js";
import { useRef, useState } from "react";
import cardsArray from "./data/Data.js";

// App Component — combines all parts together (Parent Component)
const App = () => {
  const [filteredCards, setFilteredCards] = useState(cardsArray);
  const cardsRef = useRef(null);

  const handleSearch = (query) => {
    const trimmedQuery = query.trim();

    if (trimmedQuery === "") {
      // show all cards when search is empty
      setFilteredCards(cardsArray);
      return;
    }

    const filtered = cardsArray.filter((card) =>
      card.name.toLowerCase().includes(trimmedQuery.toLowerCase())
    );
    setFilteredCards(filtered);
  };

  const scrollToResults = () => {
    if (cardsRef.current) {
      cardsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <Header onSearch={handleSearch} scrollToResults={scrollToResults} />
      <Body cards={filteredCards} cardsRef={cardsRef} />
      <Footer />
    </div>
  );
};

export default App;
