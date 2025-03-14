import React, { useContext } from "react";
import { CartContext, ThemeContext } from "../App";
import CartCard from "./CartCard";

const Cart = () => {
  const { cart } = useContext(CartContext);
  const { mode } = useContext(ThemeContext);

  return (
    <div
      className={`${
        mode === "dark"
          ? "bg-gradient-to-br from-gray-800 to-gray-900 text-white"
          : "bg-gradient-to-br from-yellow-400 to-yellow-500 text-black"
      } w-full min-h-screen py-16`}
    >
      <div className="container mx-auto px-4">
        {cart.length === 0 ? (
          <div className="w-full flex justify-center mt-20">
            <p className="text-lg font-semibold">Your Cart is Empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cart.map((each) => (
              <CartCard
                key={each.id}
                id={each.id}
                name={each.name}
                photo={each.photo}
                rate={each.rate}
                price={each.price}
                type={each.type}
                count={each.count}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Cart);
