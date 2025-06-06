import { Heart, ShoppingCart, Star, X } from 'lucide-react';
import { useAuth } from '../../AuthContect/AuthContext';
import { Link } from 'react-router';
export default function ArtworkModal({
  selectedArt,
  setSelectedArt,
  favorites,
  toggleFavorite,
  cart,
  addToCart

}) {
  const { isLoggedIn,user } = useAuth();
  if (!selectedArt) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={() => setSelectedArt(null)}
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 z-10"
          >
            <X size={20} />
          </button>

          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={selectedArt.imageUrl}
                alt={selectedArt.title}
                className="w-full h-96 md:h-full object-cover"
              />
            </div>

            <div className="md:w-1/2 p-6">
              <h2 className="text-2xl font-bold mb-2 text-amber-500">{selectedArt.title}</h2>
              <p className="text-gray-600 mb-4">by {selectedArt.customer}</p>

              <div className="flex items-center mb-4">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="ml-1">{selectedArt.rating} ({selectedArt.reviews} reviews)</span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Dimensions:</span>
                  <span>{selectedArt.dimensions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Medium:</span>
                  <span>{selectedArt.medium}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="capitalize">{selectedArt.category}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl font-bold">${selectedArt.price}</span>
                <button
                  onClick={() => toggleFavorite(selectedArt.id)}
                  className={`p-2 rounded-full ${
                    favorites.includes(selectedArt.id) ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  <Heart size={24} fill={favorites.includes(selectedArt.id) ? 'white' : 'none'} />
                </button>
              </div>


              {isLoggedIn && user ? (<Link
                onClick={() => {
                  addToCart(selectedArt);
                  setSelectedArt(null);
                }}
                className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 ${
                  cart.find(item => item.id === selectedArt.id)
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : ' bg-amber-500 text-black hover:bg-blue-700'
                }`}
              >
                <ShoppingCart size={20} />
                {cart.find(item => item.id === selectedArt.id) ? 'Already in Cart' : 'Add to Cart'}
              </Link>):(
                <Link
                // disabled={cart.find(item => item.id === selectedArt.id)}
                to="/auth"
                className=" hover:bg-amber-500 w-full py-3 rounded-lg flex items-center justify-center gap-2 bg-gray-300 text-gray-500"
              >
                Login First
              </Link>
              )}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
