import { useState } from "react";
import "./Order.css";
import { useCartContext } from "../context/CartContext";

export const Order: React.FC = () => {
  const { cartItems, removeFromCart, updateCartItemQuantity } =
    useCartContext();
  const [inputValue, setInputValue] = useState({
    cep: "",
    street: "",
    number: "",
    complement: "",
    district: "",
    state: "",
    uf: "",
  });

  const [error, setError] = useState({
    cepError: "",
    streetError: "",
    numberError: "",
    complementError: "",
    districtError: "",
    stateError: "",
    ufError: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentError, setPaymentError] = useState("");

  const [orderConfirmed, setOrderCorfirmed] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cep") {
      formattedValue = value.replace(/\D/g, "");

      if (formattedValue.length > 8) {
        formattedValue = formattedValue.slice(0, 8);
      }
    }

    setInputValue({
      ...inputValue,
      [name]: formattedValue,
    });

    setError((prevError) => ({
      ...prevError,
      [`${name}Error`]: "",
    }));
  };

  const validation = () => {
    let isValid = true;
    const newError = {
      cepError: "",
      streetError: "",
      numberError: "",
      complementError: "",
      districtError: "",
      stateError: "",
      ufError: "",
    };

    if (isNaN(Number(inputValue.cep)) || !inputValue.cep) {
      newError.cepError = "O CEP é obrigatório";
      isValid = false;
    } else if (inputValue.cep.length != 8) {
      newError.cepError = "Digite um CEP válido";
      isValid = false;
    }

    if (!inputValue.street) {
      newError.streetError = "Digite o nome da sua rua";
      isValid = false;
    }

    if (isNaN(Number(inputValue.number)) || !inputValue.number) {
      newError.numberError = "Digite o número da sua casa";
      isValid = false;
    }

    if (!inputValue.district) {
      newError.districtError = "Digite em qual bairro você mora";
      isValid = false;
    }

    if (!inputValue.state) {
      newError.stateError = "Digite em qual estado você mora";
      isValid: false;
    }

    if (!inputValue.uf) {
      newError.ufError = "Digite a UF de seu estado";
      isValid = false;
    } else if (inputValue.uf.length != 2) {
      newError.ufError = "Digite um UF válido";
      isValid = false;
    }

    setError(newError);
    return isValid;
  };

  const handlePaymentSelect = (method: string) => {
    setPaymentMethod(method);
    setPaymentError("");
  };

  // Remove todos os itens do carrinho
  const clearCart = () => {
    const itemsToRemove = [...cartItems];
    itemsToRemove.forEach((item) => {
      removeFromCart(item.id);
    });
  };

  // Reseta os estados dos inputs de endereço e método de pagamento
  const resetForm = () => {
    setInputValue({
      cep: "",
      street: "",
      number: "",
      complement: "",
      district: "",
      state: "",
      uf: "",
    });

    setPaymentError("");
  };

  const handleConfirm = () => {
    if (!paymentMethod) {
      setPaymentError("Selecione um método de pagamento");
    }

    if (validation() && paymentMethod) {
      setOrderCorfirmed(true);
      clearCart();
      resetForm();
    } else {
      return false;
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const totalItemsPrice = cartItems.reduce(
    (acc, item) => acc + item.totalPrice,
    0
  );
  const shippingCost = 3.5;
  const totalPrice = totalItemsPrice + shippingCost;

  const handleChangeQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity > 0) {
      updateCartItemQuantity(itemId, newQuantity);
    } else {
      removeFromCart(itemId);
    }
  };

  return (
    <section>
      <div className="order_container">
        {orderConfirmed ? (
          <div className="order_confirmed">
            <div className="order_confirmed_text">
              <h2>Uhu! Pedido confirmado</h2>
              <p>Agora é só aguardar que o café chegará até você</p>
              <div className="order_confirmed_details">
                <div className="order_confirmed_details_time">
                  <i className="fa-regular fa-clock"></i>
                  <span>
                    Previsão de entrega <strong>20 min - 30 min</strong>
                  </span>
                </div>
                <div className="order_confirmed_details_payment_method">
                  <i className="fa-solid fa-dollar-sign"></i>
                  <span>
                    Pagamento na entrega{" "}
                    <strong>
                      {paymentMethod === "credit"
                        ? "Cartão de Crédito"
                        : paymentMethod === "debit"
                        ? "Cartão de Débito"
                        : paymentMethod === "cash"
                        ? "Dinheiro"
                        : ""}
                    </strong>
                  </span>
                </div>
              </div>
            </div>
            <div className="order_confirmed_image">
              <img src="/illustration.png" alt="illustration" />
            </div>
          </div>
        ) : (
          <>
            <div className="address_payment">
              <h2>Complete seu pedido</h2>
              <div className="formulary">
                <div className="formulary_text">
                  <div className="formulary_location_icon">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div className="formulary_title_subtitle">
                    <p>Endereço de Entrega</p>
                    <p>Informe o endereço onde deseja receber seu pedido.</p>
                  </div>
                </div>
                <form action="">
                  <label htmlFor="cep">
                    <input
                      type="number"
                      name="cep"
                      id="cep"
                      placeholder="CEP"
                      onChange={handleChange}
                      className={`${error.cepError ? "error" : ""}`}
                      value={inputValue.cep}
                    />
                    <div className="error">{error.cepError}</div>
                  </label>
                  <label htmlFor="street">
                    <input
                      type="text"
                      name="street"
                      id="street"
                      placeholder="Rua"
                      onChange={handleChange}
                      className={`${error.streetError ? "error" : ""}`}
                    />
                    <div className="error">{error.streetError}</div>
                  </label>
                  <label htmlFor="number">
                    <input
                      type="number"
                      name="number"
                      id="number"
                      placeholder="Número"
                      onChange={handleChange}
                      className={`${error.numberError ? "error" : ""}`}
                    />
                    <div className="error">{error.numberError}</div>
                  </label>
                  <label htmlFor="complement">
                    <input
                      type="text"
                      name="complement"
                      id="complement"
                      placeholder="Complemento"
                      onChange={handleChange}
                      className={`${error.numberError ? "error" : ""}`}
                    />
                  </label>
                  <label htmlFor="district">
                    <input
                      type="text"
                      name="district"
                      id="district"
                      placeholder="Bairro"
                      onChange={handleChange}
                      className={`${error.districtError ? "error" : ""}`}
                    />
                    <div className="error">{error.districtError}</div>
                  </label>
                  <label htmlFor="state">
                    <input
                      type="text"
                      name="state"
                      id="state"
                      placeholder="Estado"
                      onChange={handleChange}
                      className={`${error.stateError ? "error" : ""}`}
                    />
                    <div className="error">{error.stateError}</div>
                  </label>
                  <label htmlFor="uf">
                    <input
                      type="number"
                      name="uf"
                      id="uf"
                      placeholder="UF"
                      onChange={handleChange}
                      className={`${error.ufError ? "error" : ""}`}
                    />
                    <div className="error">{error.ufError}</div>
                  </label>
                </form>
              </div>
              <div className="payment">
                <div className="payment_text">
                  <div className="payment_dollar_icon">
                    <i className="fa-solid fa-dollar-sign"></i>
                  </div>
                  <div className="payment_title_subtitle">
                    <p>Pagamento</p>
                    <p>
                      O pagamento é feito na entrega. Escolha a forma que deseja
                      pagar.
                    </p>
                  </div>
                </div>
                <div className="payment_methods">
                  <div
                    className={`credit ${
                      paymentMethod === "credit" ? "selected" : ""
                    }`}
                    onClick={() => handlePaymentSelect("credit")}
                  >
                    <i className="fa-regular fa-credit-card"></i>
                    <span>Cartão de crédito</span>
                  </div>
                  <div
                    className={`debit ${
                      paymentMethod === "debit" ? "selected" : ""
                    }`}
                    onClick={() => handlePaymentSelect("debit")}
                  >
                    <i className="fa-solid fa-building-columns"></i>
                    <span>Cartão de débito</span>
                  </div>
                  <div
                    className={`cash ${
                      paymentMethod === "cash" ? "selected" : ""
                    }`}
                    onClick={() => handlePaymentSelect("cash")}
                  >
                    <i className="fa-solid fa-money-bill"></i>
                    <span>Dinheiro</span>
                  </div>
                  <div className="payment_error">{paymentError}</div>
                </div>
              </div>
            </div>
            <div className="order_cart">
              <h2>Cafés selecionados</h2>

              <div className="confirm_order">
                {cartItems.length === 0 ? (
                  <></>
                ) : (
                  <>
                    <div className="cart_items">
                      {cartItems.map((item) => (
                        <div className="cart_item" key={item.id}>
                          <div className="cart_item_image">
                            <div className="cart_item_image_image">
                              <img src={item.image} alt={item.name} />
                            </div>
                            <div className="cart_item_image_details">
                              <h4>{item.name}</h4>
                              <div className="cart_item_details_actions">
                                <div className="cart_item_details_actions_quantity">
                                  <i
                                    className="fa-solid fa-minus"
                                    onClick={() =>
                                      handleChangeQuantity(
                                        item.id,
                                        item.quantity - 1
                                      )
                                    }
                                  ></i>
                                  <span>{item.quantity}</span>
                                  <i
                                    className="fa-solid fa-plus"
                                    onClick={() =>
                                      handleChangeQuantity(
                                        item.id,
                                        item.quantity + 1
                                      )
                                    }
                                  ></i>
                                </div>
                                <div
                                  className="cart_item_details_actions_remove"
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  <i className="fa-solid fa-trash"></i>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="cart_item_price">
                            <p>{formatPrice(item.totalPrice)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                <div className="value">
                  <div className="value_items">
                    <p>Total de itens</p>
                    <span>{formatPrice(totalItemsPrice)}</span>
                  </div>
                  <div className="value_shipping">
                    <p>Total de frete</p>
                    <span>{formatPrice(shippingCost)}</span>
                  </div>
                  <div className="value_total">
                    <p>Total</p>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                </div>
                <button
                  className="button_confirm"
                  onClick={handleConfirm}
                  disabled={cartItems.length === 0}
                >
                  Confirmar pedido
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
