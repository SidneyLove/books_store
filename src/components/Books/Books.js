import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import './Books_styles.css';
import { Header } from '../Header/Header';
import { AnimatePresence, motion } from 'motion/react';

export const Books = ({booksData, setBooksInCart}) => {
const categorie = useParams();

const addToCart = (book) => {
    setBooksInCart((prevCart) => {
      let updated;
      const existing = prevCart.find((b) => b.id === book.id);
      if (existing) {
        updated = prevCart.map((b) =>
          b.id === book.id ? { ...b, quantity: Number(b.quantity) + 1 } : b
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
                <Header/>
                
                <h1 className='genreName'>{booksData.categories[categorie.genre].name.toUpperCase()}</h1>
                <div className='books'>{booksData.categories[categorie.genre].books.map((book)=>{
                    return (
                        <div key={book.id} className='book'>
                            <Link to={`${book.id}`} className='bookLink'>
                                <img src={process.env.PUBLIC_URL + book.src} className='bookImg'/>
                                <p className='bookTitle'>{book.title.length > 21? book.title.slice(0, 20) + "..." : book.title}</p>
                                <p className='bookPrice'>{book.price}₽</p>
                            </Link>
          
                              {/* {JSON.parse(localStorage.getItem("booksInCart"))  */}
                              <AnimatePresence mode='wait'>
                                {JSON.parse(localStorage.getItem("booksInCart")) && JSON.parse(localStorage.getItem("booksInCart")).find((bookCart)=>book.id === bookCart.id) 
                                  ? <motion.div 
                                    className='bookAdd_container'
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                    exit={{opacity: 0}}
                                    >
                                      <p className='bookAdd'>
                                        Добавлен
                                      </p>
                                      <motion.button 
                                      className='bookDel'
                                      onClick={()=>removeFromCart(book.id)}
                                      whileHover={{ backgroundColor: 'rgba(254, 193, 193, 0.8)' }}
                                      key='delFromCart'
                                      >
                                        X
                                      </motion.button>
                                    </motion.div>
                                  : <motion.button 
                                    onClick={()=>addToCart(book)}
                                    className='bookButton'
                                    initial={{ opacity: 1 }}
                                    whileHover={{ backgroundColor: 'rgba(171, 196, 255, 0.8)' }}
                                    transition={{ duration: 0.2 }}
                                    exit={{opacity: 0}}
                                    key='addToCart'
                                    >
                                      В корзину
                                    </motion.button>
                                }
                              </AnimatePresence>
                        </div>
                        
                    )
                })}</div>
            </div>)
        )
    }
}