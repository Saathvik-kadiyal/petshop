import React, { createContext, useReducer, useState, useEffect, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Layout from "./components/Layout";
import Cart from "./components/Cart";
import Dogs from "./components/Dogs";
import Cats from "./components/Cats";
import "./App.css";

export const PetsContext = createContext();
export const CartContext = createContext();
export const ThemeContext = createContext();

const Card = React.lazy(() => import("./components/Card"));

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      if (state.some((item) => item.id === action.payload.id)) {
        return state; // Avoid adding duplicates
      }
      return [...state, { ...action.payload, count: 1 }];
    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.payload);
    case "INCREMENT_ITEM":
      return state.map((item) =>
        item.id === action.payload ? { ...item, count: item.count + 1 } : item
      );
    default:
      return state;
  }
};

function App() {
  const [mode, setMode] = useState("dark");
  const [pets, setPets] = useState([]);
  const [cart, dispatchCart] = useReducer(cartReducer, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("https://petscommerce.vercel.app/db.json");
      setPets(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <PetsContext.Provider value={{ pets }}>
      <CartContext.Provider value={{ cart, dispatchCart }}>
        <ThemeContext.Provider value={{ setMode, mode }}>
          <div
            className={`${
              mode === "dark"
                ? "bg-gradient-to-br from-gray-800 to-gray-900"
                : "bg-gradient-to-br from-yellow-400 to-yellow-500"
            } h-full w-screen`}
          >
            <Router>
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Card />} />
                    <Route path="dogs" element={<Dogs />} />
                    <Route path="cats" element={<Cats />} />
                    <Route path="cart" element={<Cart />} />
                  </Route>
                </Routes>
              </Suspense>
            </Router>
          </div>
        </ThemeContext.Provider>
      </CartContext.Provider>
    </PetsContext.Provider>
  );
}

export default App;
