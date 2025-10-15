import searchIcon from "url:../images/search-icon.png";

// Header Component — logo, search bar, and navigation
const Header = () => {
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
        <input type="text" placeholder="Search" className="search-bar" />
        <img src={searchIcon} alt="Search bar" className="search-icon" />
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
