import { useEffect, useState } from 'react';
import './App.css';
import { Categories } from './components/Categories/Categories';
import { createHashRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Books } from './components/Books/Books';
import { Book } from './components/Book/Book';
import { Cart } from './components/Cart/Cart';
import { OrderRegistration } from './components/OrderRegistration/OrderRegistration';
import { CompleteOrder } from './components/CompleteOrder/CompleteOrder';

function App() {
  const [booksData, setBooksData] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [booksInCart, setBooksInCart] = useState(localStorage.getItem("booksInCart") ? JSON.parse(localStorage.getItem("booksInCart")) : []);

  useEffect(()=>{
    fetch(`${process.env.PUBLIC_URL}/books_data.json`)
  .then(response => {
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  })
  .then(data => setBooksData(data))
  .catch(e => console.error('Fetch error:', e));
  }, [])

  const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Categories booksData={booksData} />} />
      <Route path="/:genre" element={<Books booksData={booksData} setBooksInCart={setBooksInCart} />} />
      <Route path="/:genre/:id" element={<Book booksData={booksData} setBooksInCart={setBooksInCart} />} />
      <Route path="/cart" element={<Cart booksData={booksData} setBooksInCart={setBooksInCart} booksInCart={booksInCart} />} />
      <Route path="/order_registration" element={<OrderRegistration booksInCart={booksInCart} setOrderData={setOrderData} />} />
      <Route path="/complete_order" element={<CompleteOrder orderData={orderData} booksInCart={booksInCart} />} />
    </>
  )
);


  return (
    <div className="App">
        <RouterProvider router={router}/>
    </div>
  );
}

export default App;