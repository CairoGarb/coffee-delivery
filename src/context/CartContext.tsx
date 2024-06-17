import { ReactNode, createContext, useContext, useState } from "react";

// Values
interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

// Functions
interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  updateCartItemQuantity: (itemId: number, quantity: number) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

// Hook
export const useCartContext = (): CartContextProps => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("Não está dentro do contexto");
  }

  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (newItem: CartItem) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === newItem.id
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        const existingItem = updatedItems[existingItemIndex];
        existingItem.quantity += newItem.quantity;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;

        return updatedItems;
      } else {
        return [...prevItems, newItem];
      }
    });
  };

  const removeFromCart = (itemId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateCartItemQuantity = (itemId: number, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity, totalPrice: item.price * quantity }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateCartItemQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
