import { useDispatch, useSelector } from "react-redux";
import ItemList_Category from "./ItemList_Category";
import { clearCart } from "../utils/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const totalToPay = cartItems
    .map(
      (item) => item.card.info.price / 100 || item.card.info.defaultPrice / 100
    )
    .reduce((acc, cur) => acc + cur, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        {cartItems.length === 0 ? (
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-700">
              Your cart is empty.
            </h2>
            <p className="text-gray-600">
              You can go to the home page to view more restaurants.
            </p>
            <Link
              to="/"
              className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300"
            >
              Go to Home
            </Link>
          </div>
        ) : (
          <>
            <ItemList_Category items={cartItems} showRemoveButton={true} />
            <div className="flex justify-between items-center mt-6">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition duration-300"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
              <Link to="/payment">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition duration-300"
                  onClick={handleClearCart}
                >
                  Total to Pay: ₹{totalToPay}
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;

/* ************************************************************************************************* */
