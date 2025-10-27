import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import { useCallback, useEffect, useRef, useState } from "react";
import { Outlet } from "react-router";

// App Component — combines all parts together (Parent Component)
const App = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/restaurants")
      .then((res) => res.json())
      .then((data) => {
        setRestaurants(data);
        setFilteredList(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching:", err);
        setLoading(false);
      });
  }, []);

  const cardsRef = useRef(null);

  const handleSearch = useCallback(
    (query) => {
      const trimmedQuery = query.trim().toLowerCase();

      if (!trimmedQuery) {
        setFilteredList(restaurants);
        return;
      }

      const filtered = restaurants.filter((res) => {
        const words = res.info.name.toLowerCase().split(" ");
        return words.some((word) => word.startsWith(trimmedQuery));
      });

      setFilteredList(filtered);
    },
    [restaurants]
  );

  const scrollToResults = useCallback(() => {
    if (cardsRef.current) {
      cardsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="app-layout">
      <Header onSearch={handleSearch} scrollToResults={scrollToResults} />
      <main className="app-content">
        <Outlet context={{ filteredList, loading, cardsRef }} />
      </main>
      <Footer />
    </div>
  );
};

export default App;
