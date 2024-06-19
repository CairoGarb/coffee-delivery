import "./Header.css";
import React from "react";
import { useCartContext } from "../context/CartContext";

interface HeaderProps {
  handleCart: () => void;
  returnMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ handleCart, returnMenu }) => {
  const { cartItems } = useCartContext();

  const totalItems = new Set(cartItems.map(item => item.id));
  const totalItemsId = totalItems.size;

  return (
    <header>
      <nav>
        <div className="logo" onClick={returnMenu}>
          <img src="./logo.png" alt="logo" />
        </div>
        <div className="location_cart">
          <div className="location">
            <span>Florianópolis, SC</span>
            <i className="fa-solid fa-location-dot"></i>
          </div>
          <div className="cart" onClick={handleCart}>
            <i className="fa-solid fa-cart-shopping"></i>
            <div className="quantity_cart">{totalItemsId}</div>
          </div>
        </div>
      </nav>
    </header>
  );
};
