import { useOutletContext } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router";

const CartView = () => {
  const { cart = [], setCart } = useOutletContext();

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
          <Link to="/">
           <button className=" cursor-pointer rounded-md px-2 py-2 text-gray-600 bg-amber-500">
          Your cart is empty
          </button>
          
           
           </Link>
          
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-8">
            {cart.map(item => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4">
                <img src={item.imageUrl} alt={item.title} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-gray-600 text-sm">by {item.artist}</p>
                  <p className="text-gray-500 text-sm">{item.dimensions}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">${item.price}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm mt-1"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total: ${getTotalPrice()}</span>
            </div>
            <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartView;
