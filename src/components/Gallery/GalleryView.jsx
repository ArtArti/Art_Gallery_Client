
import ArtCard from './ArtCard';

const GalleryView = ({
  filteredArtworks,
  favorites,
  cart,
  setSelectedArt,
  toggleFavorite,
  addToCart,
}) => (
  <div className="max-w-7xl mx-auto px-4 py-8">
    <div className="flex justify-between items-center mb-6">
      <h2 className=" w-96 text-2xl font-bold text-amber-500">Explore Art Gallery</h2>
      <p className="text-amber-600">{filteredArtworks.length} artworks found</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredArtworks.map(artwork => (
        <ArtCard
          key={artwork.id}
          artwork={artwork}
          favorites={favorites}
          cart={cart}
          setSelectedArt={setSelectedArt}
          toggleFavorite={toggleFavorite}
          addToCart={addToCart}
        />
      ))}
    </div>

    {filteredArtworks.length === 0 && (
      <div className="text-center py-12">
        <p className="text-gray-600">No artworks found matching your criteria.</p>
      </div>
    )}
  </div>
);

export default GalleryView;
