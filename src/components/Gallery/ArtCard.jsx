import { Heart, Star, ShoppingCart } from 'lucide-react';

export default function ArtCard({ artwork, favorites, cart, setSelectedArt, toggleFavorite, addToCart }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img 
          src={artwork.imageUrl} 
          alt={artwork.title}
          className="w-full h-64 object-cover cursor-pointer"
          onClick={() => setSelectedArt(artwork)}
        />
        <button
          onClick={() => toggleFavorite(artwork.id)}
          className={`absolute top-3 right-3 p-2 rounded-full ${
            favorites.includes(artwork.id) ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
          } hover:scale-110 transition-transform`}
        >
          <Heart size={20} fill={favorites.includes(artwork.id) ? 'white' : 'none'} />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{artwork.title}</h3>
        <p className="text-gray-600 text-sm mb-2">by {artwork.customer}</p>  
        <div className="flex items-center mb-3">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm text-gray-600 ml-1">{artwork.rating} ({artwork.reviews})</span>
          <span className="text-sm text-gray-500 ml-auto">{artwork.dimensions}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">₹{artwork.price}</span>
          <button
            onClick={() => addToCart(artwork)}
            disabled={cart.find(item => item.id === artwork.id)}
            className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${
              cart.find(item => item.id === artwork.id)
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : ' bg-amber-500 text-black hover:bg-blue-700'
            }`}
          >
            <ShoppingCart size={16} />
            {cart.find(item => item.id === artwork.id) ? 'In Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

