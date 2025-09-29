import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { GoBackButton } from "../GoBackButton/GoBackButton";
import './Cart_styles.css'

export const Cart = ({ booksInCart, setBooksInCart }) => {
  const navigate = useNavigate();
  // Загружаем корзину из localStorage при монтировании
  useEffect(() => {
    const saved = localStorage.getItem("booksInCart");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setBooksInCart(parsed);
        } else {
          setBooksInCart([]); // если там что-то не то
        }
      } catch {
        setBooksInCart([]); // если JSON.parse упал
      }
    } else {
      setBooksInCart([]);
    }
  }, [setBooksInCart]);

  const decreaseQuantity = (id) => {
    setBooksInCart((prevCart) => {
      const updated = prevCart
        .map((book) =>
          book.id === id ? { ...book, quantity: book.quantity - 1 } : book
        )
        .filter((book) => book.quantity > 0);

      localStorage.setItem("booksInCart", JSON.stringify(updated));
      return updated;
    });
  };

  const addToCart = (book) => {
    setBooksInCart((prevCart) => {
      let updated;
      const existing = prevCart.find((b) => b.id === book.id);
      if (existing) {
        updated = prevCart.map((b) =>
          b.id === book.id ? { ...b, quantity: b.quantity + 1 } : b
        );
      } else {
        updated = [...prevCart, { ...book, quantity: 1 }];
      }

      localStorage.setItem("booksInCart", JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromCart = (id) => {
    setBooksInCart((prevCart) => {
      const updated = prevCart.filter((book) => book.id !== id);
      localStorage.setItem("booksInCart", JSON.stringify(updated));
      return updated;
    });
  };

  if (!booksInCart || booksInCart.length === 0) {
    return (
      <div className="cart_container">
        <GoBackButton/>
        <div className="cart">
          <h2 className="cartHeader">Корзина</h2>
          <p className="cartText">Корзина пуста</p>
        </div>
        
      </div>
    );
  }

  // тут booksInCart гарантированно массив
  const total = booksInCart.reduce(
    (sum, book) => sum + book.price * book.quantity,
    0
  );
 
  return (
    <div className="cart_container">
      <GoBackButton/>
      <div className="cart">
        <h2 className="cartHeader">Корзина</h2>
        <ul className="cartUl">
          {booksInCart.map((book) => (
          <li key={book.id} className="cartText cartLi">

            <div className="cartBookInfo">
              <div className="cartTitleAndAuthor_container">
                  <p className="cartBookTitle">{book.title.length > 40 
                  ? book.title.slice(0,40) + "..." 
                  : book.title}
                  </p> 
                  <p className="cartBookAuthor">{book.author}</p>
              </div>

              <div className="cartPriceAndQuantity">
                  <p className="cartPrice">{book.price}₽</p>
                  <div className="cartQuantity_contianer">
                    <button 
                      onClick={() => decreaseQuantity(book.id)} 
                      className="cartQuantityButton">
                        −
                    </button>
                    <p className="cartQuantity">{book.quantity} шт.</p>
                    <button 
                      onClick={() => addToCart(book)}
                      className="cartQuantityButton">
                      +
                    </button>
                  </div>
              </div>
            </div>

            <div className="cartDelAndImg">
              <img src={book.src} className="cartImg"/>
              <button 
              onClick={() => removeFromCart(book.id)}
              className="cartDelButton">
                  X
              </button>
            </div>

          </li>
          ))}
        </ul>
        <h3 className="cartText cartResult">Итого: {total} ₽</h3>
        <button 
        onClick={()=>navigate('/order_registration')}
        className="cartRegistrationButton">Оформить заказ</button>
      </div>
    </div>
  );
};
