import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { CartIcon } from '../CartIcon/CartIcon';
import { GoBackButton } from '../GoBackButton/GoBackButton';
import './Books_styles.css';

export const Books = ({booksData, setBooksInCart}) => {
const categorie = useParams();

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

      localStorage.booksInCart = JSON.stringify(updated);
      return updated;
    });
  };

    const removeFromCart = (id) => {
    setBooksInCart((prevCart) => {
      const updated = prevCart.filter((book) => book.id !== id);
      localStorage.booksInCart = JSON.stringify(updated);
      return updated;
    });
  };

    if (booksData) {
        return (
            booksData && (<div className='books_container'>
                <CartIcon/>
                <GoBackButton/>
                
                <h1 className='genreName'>{booksData.categories[categorie.genre].name.toUpperCase()}</h1>
                <div className='books'>{booksData.categories[categorie.genre].books.map((book)=>{
                    return (
                        <div key={book.id} className='book'>
                            <Link to={`${book.id}`} className='bookLink'>
                                <img src={book.src} className='bookImg'/>
                                <h2 className='bookTitle'>{book.title.length > 21? book.title.slice(0, 20) + "..." : book.title}</h2>
                                <h3 className='bookPrice'>{book.price}₽</h3>
                            </Link>
          
                              {/* {JSON.parse(localStorage.getItem("booksInCart"))  */}
                              {JSON.parse(localStorage.getItem("booksInCart")).find((bookCart)=>book.id === bookCart.id) 
                                ? <div className='bookAdd_container'>
                                    <p className='bookAdd'>
                                      Добавлен
                                    </p>
                                    <button 
                                    className='bookDel'
                                    onClick={()=>removeFromCart(book.id)}>
                                      X
                                    </button>
                                  </div>
                                : <button 
                                  onClick={()=>addToCart(book)}
                                  className='bookButton'>
                                    В корзину
                                  </button>
                              }
                        </div>
                        
                    )
                })}</div>
            </div>)
        )
    }
}