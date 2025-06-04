import { Outlet } from "react-router-dom";
import Navbar from "./components/Header/Navbar";
import { useState } from "react";
import  mockArtworks  from "./Data/GalleryData";

function App() {
  const [userType, setUserType] = useState("buyer");
  const [cart, setCart] = useState([]);
  const [artworks] = useState(mockArtworks);

  
  const addToCart = (art) => {
    setCart((prev) => [...prev, art]);
  };
  
  return (
    <>
      <Navbar userType={userType} setUserType={setUserType} cart={cart} />
      <Outlet context={{ artworks, addToCart, userType, cart, setCart }} />

    </>
  );
}

export default App;
