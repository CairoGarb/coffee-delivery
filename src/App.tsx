import { useState } from "react";
import { Coffees } from "./components/Coffees";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { Order } from "./components/Order";
import { CartProvider } from "./context/CartContext";

export const App = () => {
  const [showCart, setShowCart] = useState(false);

  return (
    <CartProvider>
      <Header
        handleCart={() => setShowCart(true)}
        returnMenu={() => setShowCart(false)}
      />
      {showCart ? (
        <Order />
      ) : (
        <div>
          <Home />
          <Coffees />
        </div>
      )}
    </CartProvider> 
  );
};
