import ArtCard from './ArtCard';

export default function GalleryGrid({ artworks, favorites, cart, setSelectedArt, toggleFavorite, addToCart }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {artworks.map((art) => (
        <ArtCard
          key={art.id}
          artwork={art}
          favorites={favorites}
          cart={cart}                 
          setSelectedArt={setSelectedArt}
          toggleFavorite={toggleFavorite}
          addToCart={addToCart}
        />
      ))}
    </div>
  );
}
