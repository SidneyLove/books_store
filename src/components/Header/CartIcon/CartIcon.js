import { Link } from 'react-router-dom';
import './CartIcon_styles.css';
import cartIcon from './cart_icon.png';
import { motion } from 'motion/react';

export const CartIcon = () => {

    let bookQuantityInCart = 0;
    let bookQuantity = localStorage.getItem("booksInCart") ? JSON.parse(localStorage.getItem("booksInCart")).length === 0 ? null : JSON.parse(localStorage.getItem("booksInCart")).map( (book) =>  {bookQuantityInCart += Number(book.quantity); return Number(bookQuantityInCart)}) : 0;
    return (
        <motion.div 
        className='cartIcon_container'
        whileHover={{backgroundColor: 'rgba(171, 196, 255, 0.5)'}}
        >
            <Link to='/cart' className='cartIconLink'>
                <img src={cartIcon} className='cartIconImage'/>
                <p className='cartIconQuantity'>{bookQuantityInCart}</p>
            </Link>
        </motion.div>
        
    )
}