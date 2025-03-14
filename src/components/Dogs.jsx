import React, { useContext, useCallback } from "react";
import { PetsContext, CartContext } from "../App";
import styles from "./Card.module.css";

const Dogs = () => {
  const { pets } = useContext(PetsContext);
  const { dispatchCart } = useContext(CartContext);

  const handleClick = useCallback(
    (id) => {
      const selectedPet = pets.find((pet) => pet.id === id);
      if (selectedPet) {
        dispatchCart({ type: "ADD_TO_CART", payload: selectedPet });
      }
    },
    [pets, dispatchCart]
  );

  const dogs = pets.filter((pet) => pet.type.toLowerCase() === "dog");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {dogs.length > 0 ? (
        dogs.map((each) => (
          <div
            key={each.id}
            className={`${styles.card} bg-gray-900 rounded-xl overflow-hidden shadow-lg`}
          >
            {/* Image Section */}
            <div className="h-56 w-full flex justify-center items-center overflow-hidden">
              <img
                src={each.photo}
                alt={each.name}
                className="object-cover w-full h-full max-w-full"
              />
            </div>

            {/* Details Section */}
            <div className="p-4 text-white">
              <h3 className="text-lg font-semibold text-center">{each.name}</h3>
              <div className="flex justify-between text-sm md:text-base mt-2">
                <p>Rating: {each.rate}</p>
                <p className="font-bold">₹{each.price}</p>
              </div>

              <div className="flex justify-between items-center mt-3">
                <span className="text-xs md:text-sm">Type: {each.type}</span>
                <button
                  onClick={() => handleClick(each.id)}
                  className={`${styles.li} bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition`}
                >
                  Adopt
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full mt-20 flex justify-center">
          <p className="text-white">No Dogs are found</p>
        </div>
      )}
    </div>
  );
};

export default Dogs;
