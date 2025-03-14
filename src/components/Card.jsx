import React, { useContext } from "react";
import { PetsContext, CartContext } from "../App";
import styles from "./Card.module.css";

const Card = () => {
  const { pets = [] } = useContext(PetsContext);
  const { dispatchCart } = useContext(CartContext);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 w-full">
      {pets.length > 0 ? (
        pets.map((each) => (
          <div
            key={each.id}
            className="bg-black text-white rounded-2xl overflow-hidden flex flex-col"
          >
            {/* Image Container */}
            <div className="h-[250px] w-full overflow-hidden">
              <img
                 src={`https://backendproject-xywk.onrender.com${each.photo}`}
                alt={each.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details Section */}
            <div className="p-4 flex flex-col gap-2">
              <p className="text-center font-semibold">Name: {each.name}</p>
              <div className="flex justify-between text-sm">
                <span>Rating: {each.rate}</span>
                <span className="font-bold">₹{each.price}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Type: {each.type}</span>
                <button
                  onClick={() => dispatchCart({ type: "ADD_TO_CART", payload: each })}
                  className={`${styles.li} bg-white px-3 py-1 text-black rounded-md text-sm font-medium`}
                >
                  Adopt
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex justify-center items-center h-64">
          <p className="text-white text-lg font-semibold">No Pets Found</p>
        </div>
      )}
    </div>
  );
};

export default React.memo(Card);
