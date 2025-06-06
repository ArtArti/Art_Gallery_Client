import { useEffect, useState } from "react";
import SearchAndFilters from "./SearchAndFilter";
import GalleryView from "../Gallery/GalleryView";
import ArtworkModal from "../Gallery/ArtworkModal";

export default function ArtGallery({ artworks, addToCart,cart }) {
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [selectedArt, setSelectedArt] = useState(null);

  useEffect(() => {
    let filtered = artworks;

    // Filter by search term
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (art) =>
          art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          art.customer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((art) => art.category === selectedCategory);
    }

    // Filter by price range
    if (priceRange === "under100") {
      filtered = filtered.filter((art) => art.price < 100);
    } else if (priceRange === "100to200") {
      filtered = filtered.filter((art) => art.price >= 100 && art.price <= 200);
    } else if (priceRange === "over200") {
      filtered = filtered.filter((art) => art.price > 200);
    }

    setFilteredArtworks(filtered);
  }, [artworks, searchTerm, selectedCategory, priceRange]);

  const toggleFavorite = (artworkId) => {
    if (favorites.includes(artworkId)) {
      setFavorites(favorites.filter((id) => id !== artworkId));
    } else {
      setFavorites([...favorites, artworkId]);
    }
  };
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <SearchAndFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />

      <GalleryView
        filteredArtworks={filteredArtworks}
        favorites={favorites}
        cart={cart}
        setSelectedArt={setSelectedArt}
        toggleFavorite={toggleFavorite}
        addToCart={addToCart}
      />

        <ArtworkModal
      selectedArt={selectedArt}
      setSelectedArt={setSelectedArt}
      favorites={favorites}
      toggleFavorite={toggleFavorite}
      cart={cart}
      addToCart={addToCart}
    />
      
    </section>
  );
}
