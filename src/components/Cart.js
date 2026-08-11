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
      (item) => item.card.info.price / 100 || item.card.info.defaultPrice / 100,
    )
    .reduce((acc, cur) => acc + cur, 0);

  return (
    <div className="min-h-screen pb-20 px-4">
      {/* Cart Header */}
      <div className="max-w-4xl mx-auto pt-8 pb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
              <span className="text-2xl">🛒</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
          </div>
          {cartItems.length > 0 && (
            <span className="px-4 py-2 rounded-full bg-orange-100 text-orange-600 font-bold">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
            </span>
          )}
        </div>
      </div>

      {/* Cart Content */}
      <div className="max-w-4xl mx-auto">
        {cartItems.length === 0 ? (
          // Empty Cart
          <div className="glass-card rounded-2xl p-12 text-center animate-float-up">
            <div className="text-7xl mb-6">🛒</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Your cart is empty!
            </h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added anything to your cart yet.
              <br />
              Explore delicious restaurants and start ordering!
            </p>
            <Link
              to="/"
              className="inline-flex items-center space-x-2 btn-gradient"
            >
              <span>🏠</span>
              <span>Explore Restaurants</span>
            </Link>
          </div>
        ) : (
          // Cart Items
          <div className="space-y-6">
            {/* Items List */}
            <div className="glass-card rounded-2xl overflow-hidden shadow-lg">
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-6 py-4 border-b border-orange-200">
                <h2 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                  <span>📋</span>
                  <span>Order Items</span>
                </h2>
              </div>
              <div className="bg-white/60 backdrop-blur-sm">
                <ItemList_Category items={cartItems} showRemoveButton={true} />
              </div>
            </div>

            {/* Cart Actions */}
            <div className="glass-card rounded-2xl p-6 shadow-lg">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                {/* Clear Cart Button */}
                <button
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-red-50 text-red-600 font-bold border-2 border-red-200 hover:bg-red-100 hover:border-red-400 transition-all duration-200 flex items-center justify-center space-x-2"
                  onClick={handleClearCart}
                >
                  <span>🗑️</span>
                  <span>Clear Cart</span>
                </button>

                {/* Total & Checkout */}
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="text-2xl font-bold text-orange-600">
                      ₹{totalToPay}
                    </p>
                  </div>
                  <Link to="/payment">
                    <button
                      className="btn-gradient px-8 py-3 flex items-center space-x-2 whitespace-nowrap"
                      onClick={handleClearCart}
                    >
                      <span>Proceed to Pay</span>
                      <span>→</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

/* ************************************************************************************************* */
