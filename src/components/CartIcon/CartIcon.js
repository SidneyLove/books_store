import { Link } from 'react-router-dom';
import './CartIcon_styles.css';
import cartIcon from './cart_icon.svg';

export const CartIcon = () => {
    return (
        <div className='cartIcon_container'>
            <Link to='/cart' className='cartIconLink'>
                <img src={cartIcon} className='cartIconImage'/>
                <p className='cartIconQuantity'>{localStorage.getItem("booksInCart") ? JSON.parse(localStorage.getItem("booksInCart")).length === 0 ? null : JSON.parse(localStorage.getItem("booksInCart")).length : 0}</p>
            </Link>
        </div>
        
    )
}