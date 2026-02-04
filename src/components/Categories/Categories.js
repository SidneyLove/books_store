import { Link } from 'react-router-dom';
import { OrderRegistration } from '../OrderRegistration/OrderRegistration'
import './Categories_styles.css';
import { Header } from '../Header/Header';
import { motion } from 'motion/react';

export const Categories = ({booksData}) => {

    return (
        <div className='categories_container'>
            <Header />
            <div className='categoriesNav_container'>
                <div className='categoriesBookDecorDown'>
                    <div className='categoriesBookDecorUp'></div>
                    <div className='categoriesBookDecorMiddle decorMiddleEl1'></div>
                    <div className='categoriesBookDecorMiddle decorMiddleEl2'></div>
                    <div className='categoriesBookDecorMiddle decorMiddleEl3'></div>
                    <div className='categoriesBookDecorMiddle decorMiddleEl4'></div>
                    <div className='categoriesBookDecorMiddle decorMiddleEl5'></div>
                    <div className='categoriesBookDecorMiddle decorMiddleEl6'></div>
                    <div className='categoriesBookDecorMiddle decorMiddleEl7'></div>
                    <div className='categoriesBookDecorMiddle decorMiddleEl8'></div>
                </div>
                <nav className='categoriesNav'>
                    <ul className='categoriesUl'>
                        {booksData && Object.entries(booksData.categories).map(([categories, genre], index)=>{
                            return <motion.li 
                                    key={categories}
                                    className='categoriesLi'
                                    style={{ zIndex: Math.floor(Math.random() * (4 - 2 + 1) + 2)}}
                                    whileHover={{left: 20, backgroundColor: 'rgba(171, 196, 255, 0.5)'}}
                                    >
                                        <Link to={`/${categories}`} className='categoriesLink'>{genre.name}</Link>
                                    </motion.li>
                        })}
                    </ul>
                </nav>
            </div>
            <OrderRegistration/>
        </div>
    )
}