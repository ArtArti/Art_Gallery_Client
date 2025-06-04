import { useOutletContext } from "react-router-dom";
import ArtGallery from "../Home/Home";

export default function ArtGalleryWrapper() {
  const { artworks, addToCart, userType , cart} = useOutletContext();
  return( <ArtGallery  cart={cart} artworks={artworks} addToCart={addToCart} userType={userType} />
    
  );
}


