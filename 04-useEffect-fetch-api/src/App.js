import Header from "./components/Header.js";
import Body from "./components/Body.js";
import Footer from "./components/Footer.js";
import { useCallback, useEffect, useRef, useState } from "react";
import cardsArray from "./data/Data.js";

// App Component — combines all parts together (Parent Component)
const App = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://corsproxy.io/https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
    )
      .then((res) => res.json())
      .then((data) => {
        const fetchedData =
          data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants || [];
        setRestaurants(fetchedData);
        setFilteredList(fetchedData);
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
    <div>
      <Header onSearch={handleSearch} scrollToResults={scrollToResults} />
      <Body cards={filteredList} loading={loading} cardsRef={cardsRef} />
      <Footer />
    </div>
  );
};

export default App;
