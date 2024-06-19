import { useRef, useState } from "react";
import "./Coffees.css";
import { data } from "./data";
import { useCartContext } from "../context/CartContext";

export const Coffees: React.FC = () => {
  const [products] = useState(data);
  const { addToCart } = useCartContext();

  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  // Increase and Decrease quantity
  const increaseQuantities = (id: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const decreaseQuantities = (id: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  };

  const [message, setMessage] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleAddToCart = (item: any) => {
    if (quantities[item.id] > 0) {
      const newItem = {
        ...item,
        quantity: quantities[item.id],
        totalPrice: item.price * quantities[item.id],
      };
      addToCart(newItem);
      setQuantities((prev) => ({
        ...prev,
        [item.id]: 0,
      }));
      // aparece a mensagem confirmando que foi adicionado ao carrinho
      setMessage(item.id);

      // reseta o tempo que a mensagem aparece caso for adicionado outro item
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // a mensagem de confirmação desaparece após 2 segundos
      timeoutRef.current = setTimeout(() => {
        setMessage(null);
      }, 2000);
    }
  };

  return (
    <section>
      <div className="coffee">
        <h2 className="section_name">Nossos Cafés</h2>
        <div className="coffee_container">
          {products.map((item: any) => (
            <div className="product" key={item.id}>
              <div className="product_image">
                <img src={item.image} alt={item.name} />
              </div>
              <span className="tradicional_text">Tradicional</span>
              <div className="name_description">
                <div className="name">
                  <h4>{item.name}</h4>
                </div>
                <div className="description">
                  <p>{item.description}</p>
                </div>
              </div>
              <div className="price_quantity_cart">
                <div className="price">{formatPrice(item.price)}</div>
                <div className="quantity">
                  <span>
                    <i
                      className="fa-solid fa-minus"
                      onClick={() => decreaseQuantities(item.id)}
                    ></i>
                  </span>
                  <span>{quantities[item.id] || 0}</span>
                  <span>
                    <i
                      className="fa-solid fa-plus"
                      onClick={() => increaseQuantities(item.id)}
                    ></i>
                  </span>
                </div>
                <div
                  className="add_to_cart"
                  onClick={() => handleAddToCart(item)}
                >
                  <i className="fa-solid fa-cart-shopping"></i>
                </div>
                {message === item.id && (
                  <div className="add_to_cart_message">
                    <span>
                      <strong>{item.name}</strong> foi adicionado ao carrinho!
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
