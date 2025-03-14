import { useContext } from "react";
import { CartContext } from "../App";

const CartCard = ({ id, name, photo, rate, price, type, count }) => {
  const { dispatchCart } = useContext(CartContext);

  return (
    <div className="h-96 w-1/4 min-w-[250px] max-w-[300px] flex-shrink-0 rounded-3xl overflow-hidden m-4">
      {/* Image Section */}
      <div className="h-[60%] w-full flex justify-center items-center overflow-hidden">
        <img
          src={photo}
          alt={`${name}`}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Details Section */}
      <div className="h-[40%] bg-black w-full flex flex-col p-1 text-white">
        <div className="h-[20%] w-auto m-1 flex justify-center items-center">
          Name: {name}
        </div>
        <div className="flex h-[20%] w-[95%] ml-1">
          <div className="h-full w-[60%]">Rating: {rate}</div>
          <div className="h-full w-[40%] font-[Gobold]">Price: ₹{price}</div>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {/* Type and Remove Button */}
          <div className="flex w-[93%] justify-between">
            <div>Type: {type}</div>
            <button
              onClick={() =>
                dispatchCart({ type: "REMOVE_FROM_CART", payload: id })
              }
              className="bg-red-600 px-3 py-2 text-white rounded-md text-sm"
              aria-label={`Remove ${name} from cart`}
            >
              Remove
            </button>
          </div>

          {/* Count and Increase Button */}
          <div className="flex w-[93%] justify-between">
            <div>Count: {count}</div>
            <button
              onClick={() =>
                dispatchCart({ type: "INCREMENT_ITEM", payload: id })
              }
              className="bg-white px-3 py-2 text-black rounded-md text-sm"
              aria-label={`Increase count of ${name}`}
            >
              Increase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
