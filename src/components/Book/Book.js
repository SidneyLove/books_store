import { useParams, Link } from 'react-router-dom';
import { CartIcon, ToCart } from '../CartIcon/CartIcon';
import { GoBackButton } from '../GoBackButton/GoBackButton';
import './Book_styles.css';

export const Book = ({booksData, setBooksInCart}) => {
    const urlParams = useParams();

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

    if(booksData) {
        const books = booksData.categories[urlParams.genre].books;
        const book = books.find(el=>el.id === Number(urlParams.id));
        return (
            <div className='bookDesc_container'>
                <GoBackButton/>
                <CartIcon/>
                <div className='bookDesc'>
                    <img src={process.env.PUBLIC_URL + book.src} className='bookDescImg'/>
                    <h1 className='bookDescTitle'>{book.title}</h1>
                    <p className='booksDescText'>{book.description}</p>
                    <p className='bookDescSubText'>Автор: {book.author}</p>
                    <p className='bookDescSubText'>Стоимость: {book.price}₽</p>
                    <p className='bookDescSubText'>Возрастные ограничения: {book.age_restrictions}</p>
                    <p className='bookDescSubText'>Количество страниц: {book.number_of_pages}</p>
                    {book.publisher ? <p className='bookDescSubText'>Издательство: {book.publisher}</p> : null}
                    {JSON.parse(localStorage.getItem("booksInCart")).find((bookCart)=>book.id === bookCart.id) 
                                ? <div className='bookDescAdd_container'>
                                    <p className='bookAddCart'>
                                      Добавлен
                                    </p>
                                    <button 
                                    className='bookDescDel'
                                    onClick={()=>removeFromCart(book.id)}>
                                      X
                                    </button>
                                  </div>
                                : <button 
                                  onClick={()=>addToCart(book)}
                                  className='bookDescBuy'>
                                    В корзину
                                  </button>
                              }
                </div>
                
            </div>
        )
    }
}