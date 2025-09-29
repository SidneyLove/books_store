import { Link } from 'react-router-dom';
import { CartIcon } from '../CartIcon/CartIcon';
import { OrderRegistration } from '../OrderRegistration/OrderRegistration'
import './Categories_styles.css';

export const Categories = ({booksData}) => {

    return (
        <div className='categories_container'>
            <CartIcon/>
            <div className='categoriesNav_container'>
                <div className='categoriesBookDecorDown'>
                    <div className='categoriesBookDecorUp'></div>
                    <div className='categoriesBookDecorMiddle1'></div>
                    <div className='categoriesBookDecorMiddle2'></div>
                </div>
                <nav className='categoriesNav'>
                    <ul className='categoriesUl'>
                        {booksData && Object.entries(booksData.categories).map(([categories, genre])=>{
                            return <Link to={`/${categories}`} key={categories} className='categoriesLink'>{genre.name}</Link>
                        })}
                    </ul>
                </nav>
            </div>
            <OrderRegistration/>
        </div>
    )
}