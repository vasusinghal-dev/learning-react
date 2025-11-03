import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import { useCallback, useEffect, useRef, useState } from "react";
import { Outlet } from "react-router";
import useFetch from "./utility/useFetch.js";
import useOnlineStatus from "./utility/useOnlineStatus.js";
import UserContext from "./utility/UserContext.js";

// App Component — combines all parts together (Parent Component)
const AppLayout = () => {
  const [restaurants, loading] = useFetch(
    "http://localhost:5000/api/restaurants",
  );
  const [filteredList, setFilteredList] = useState([]);
  const onlineStatus = useOnlineStatus();

  useEffect(() => {
    setFilteredList(restaurants);
  }, [restaurants]);

  const [userName, setUserName] = useState("");
  // authentication
  useEffect(() => {
    // make an api call send username and password
    // receive data after verification
    const data = { name: "Vasu" };
    setUserName(data.name);
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
    [restaurants],
  );

  const scrollToResults = useCallback(() => {
    if (cardsRef.current) {
      cardsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <UserContext.Provider value={{ loggedUser: userName }}>
      <div className="flex min-h-screen flex-col">
        <Header onSearch={handleSearch} scrollToResults={scrollToResults} />
        <main className="flex-1 pt-[130px] pb-10">
          {onlineStatus ? (
            <Outlet context={{ filteredList, loading, cardsRef }} />
          ) : (
            <div className="mx-auto my-8 w-fit animate-[fadeIn_0.5s_ease] rounded-lg bg-[#ffe6e6] px-8 py-4 text-center text-lg font-bold text-[#b00020] shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition duration-300 ease-in-out before:mr-2 before:inline-block before:h-2.5 before:w-2.5 before:animate-[pulse_1.5s_infinite] before:rounded-full before:bg-[#b00020] before:content-['']">
              Offline! Please check your internet connection
            </div>
          )}
        </main>
        <Footer />
      </div>
    </UserContext.Provider>
  );
};

export default AppLayout;
