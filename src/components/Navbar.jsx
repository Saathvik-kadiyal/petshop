import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { CartContext, ThemeContext } from "../App";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { cart } = useContext(CartContext);
  const { setMode, mode } = useContext(ThemeContext);

  const handleClick = () => {
    setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <>
      <nav
        className={`fixed h-14 bg-black z-10 bg-opacity-50 backdrop-blur-md w-full flex justify-evenly items-center ${
          isVisible ? styles.navbarVisible : ""
        }`}
      >
        <ul className="flex space-x-4">
          <li className={`${styles.li}`}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-gray-300 font-bold"
                  : "text-white hover:text-gray-300"
              }
            >
              Home
            </NavLink>
          </li>
          <li className={`${styles.li}`}>
            <NavLink
              to="/dogs"
              className={({ isActive }) =>
                isActive
                  ? "text-gray-300 font-bold"
                  : "text-white hover:text-gray-300"
              }
            >
              Dogs
            </NavLink>
          </li>
          <li className={`${styles.li}`}>
            <NavLink
              to="/cats"
              className={({ isActive }) =>
                isActive ? "text-gray-300 font-bold" : "text-white"
              }
            >
              Cats
            </NavLink>
          </li>
          <li className={`${styles.li} flex relative gap-[2px]`}>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? "text-gray-300 font-bold"
                  : "text-white hover:text-gray-300"
              }
            >
              Cart
            </NavLink>
            <div className="top-0 right-0 text-sm">
              <p className="text-red-600">
                {cart.reduce((total, item) => total + item.count, 0)}
              </p>
            </div>
          </li>
          <li className="w-5 h-5">
            <button onClick={handleClick}>
              {mode == "dark" ? (
                <FontAwesomeIcon icon={faSun} />
              ) : (
                <FontAwesomeIcon icon={faMoon} />
              )}
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default React.memo(Navbar);
