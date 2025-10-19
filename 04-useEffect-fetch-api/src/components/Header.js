import { useState } from "react";
import searchIcon from "url:../images/search-icon.png";

// Header Component — logo, search bar, and navigation
const Header = ({ onSearch, scrollToResults }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  const onEnterKeyPressed = (e) => {
    if (e.key === "Enter") {
      scrollToResults();
      onSearch(query);
    }
  };

  return (
    <div className="header">
      {/* Logo Section */}
      <div className="logo-container">
        <img
          className="logo"
          src="https://static.vecteezy.com/system/resources/previews/047/171/152/non_2x/logo-design-for-restaurant-and-food-company-vector.jpg"
          alt="Food Company"
        />
      </div>

      {/* Search Bar Section */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search Bar"
          className="search-bar"
          value={query}
          onChange={handleChange}
          onKeyDown={onEnterKeyPressed}
        />
        <button
          onClick={() => {
            scrollToResults();
            onSearch(query);
          }}
          className="search-btn"
        >
          <img src={searchIcon} alt="Search Icon" className="search-icon" />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Cart</li>
        </ul>
      </div>

      {/* Mobile Menu (Hamburger icon) */}
      <div className="hamburger">☰</div>
    </div>
  );
};

export default Header;
