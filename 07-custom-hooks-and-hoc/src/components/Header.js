import { useContext, useState } from "react";
import searchIcon from "url:../images/search-icon.png";
import { NavLink } from "react-router";
import UserContext from "../utility/UserContext.js";

// Header Component — logo, search bar, and navigation
const Header = ({ onSearch, scrollToResults }) => {
  const [query, setQuery] = useState("");
  const { loggedUser } = useContext(UserContext);

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
    <div className="fixed top-0 z-50 flex w-full items-center justify-between bg-white pr-8 pl-14">
      {/* Logo Section */}
      <div className="mr-14 flex shrink-0 items-center justify-center max-md:mr-5">
        <img
          className="w-24"
          src="https://static.vecteezy.com/system/resources/previews/047/171/152/non_2x/logo-design-for-restaurant-and-food-company-vector.jpg"
          alt="Food Company"
        />
      </div>

      {/* Search Bar Section */}
      <div className="mx-3.5 flex min-w-36 flex-1 items-center justify-center max-md:mr-10">
        <input
          type="text"
          placeholder="Search Bar"
          className="mr-4 h-8 max-w-lg min-w-0 flex-1 rounded-[20px] border border-gray-300 px-4 text-[16px] shadow-[inset_1px_2px_3px_rgba(0,0,0,0.05)]"
          value={query}
          onChange={handleChange}
          onKeyDown={onEnterKeyPressed}
        />
        <button
          onClick={() => {
            scrollToResults();
            onSearch(query);
          }}
          className="flex cursor-pointer items-center justify-center border-none bg-none"
        >
          <img src={searchIcon} alt="Search Icon" className="w-10" />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="ml-14 max-w-[450px] flex-1 max-md:hidden">
        <ul className="flex list-none justify-between gap-5 text-lg font-bold [&_a]:text-black [&_a]:no-underline [&_a]:transition-colors [&_a]:duration-200 [&_a]:ease-in-out [&_a.active]:text-orange-500 [&_a:hover]:text-orange-500 [&>li]:cursor-pointer">
          <li>
            <NavLink to="/" className="navLink">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className="navLink">
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink to="/error" className="navLink">
              Contact Us
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" className="navLink">
              Cart
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/user-${loggedUser.toLowerCase()}`}
              className="navLink"
            >
              {loggedUser}
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Mobile Menu (Hamburger icon) */}
      <div className="cursor-pointer text-2xl font-bold transition-colors duration-200 ease-in-out hover:text-orange-500 md:hidden">
        ☰
      </div>
    </div>
  );
};

export default Header;
