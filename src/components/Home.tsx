import "./Home.css";

export const Home = () => {
  return (
    <main>
      <div className="main_container">
        <div className="text">
          <div className="title_subtitle">
            <h1>Encontre o café perfeito para qualquer hora do dia</h1>
            <p>
              Com o Coffee Delivery você recebe seu café onde estiver, a
              qualquer hora
            </p>
          </div>
          <div className="benefits">
            <div className="safe">
              <i className="fa-solid fa-cart-shopping"></i>{" "}
              <p>Compra simples e segura</p>
            </div>
            <div className="intact">
              <i className="fa-solid fa-box"></i>
              <p>Embalagem mantém o café intacto</p>
            </div>
            <div className="quick">
              <i className="fa-regular fa-clock"></i>
              <p>Entrega rápida e rastreada</p>
            </div>
            <div className="fresh">
              <i className="fa-solid fa-mug-hot"></i>
              <p>O café chega fresquinho até você</p>
            </div>
          </div>
        </div>
        <div className="image">
          <img src="./image.png" alt="coffee" />
        </div>
      </div>
    </main>
  );
};
