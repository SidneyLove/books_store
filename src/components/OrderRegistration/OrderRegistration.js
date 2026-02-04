import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './OrderRegistration_styles.css';
import { Header } from '../Header/Header';
import { AnimatePresence, motion } from 'motion/react';

export const OrderRegistration = ({ booksInCart, setOrderData }) => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        navigate('/complete_order');
        localStorage.orderData = JSON.stringify(data);
    };

    const total = booksInCart? booksInCart.reduce(
        (sum, book) => sum + book.price * book.quantity,
        0
    ) : 0;
    return (
        booksInCart ? <div className='orderInfo_container'>
        <Header />
            <ul className="orderUl">
                {booksInCart.map((book) => (
                <li key={book.id} className="orderText orderLi">
                    <div className="orderBookInfo">
                        <div className="orderTitleAndAuthor_container">
                            <p className="orderBookTitle">{book.title}</p> 
                            <p className="orderBookAuthor">{book.author}</p>
                        </div>

                        <div className="orderPriceAndQuantity">
                            <p className="orderPrice">{book.price}₽</p>
                            <p className="orderQuantity">{book.quantity} шт.</p>
                        </div>
                    </div>

                    <img src={process.env.PUBLIC_URL + book.src} className="orderImg"/>
                
                </li>))}
            </ul>

            <p className="orderResult">Итого: {total} ₽</p>
            <AnimatePresence mode='wait'>
                <form onSubmit={handleSubmit(onSubmit)} className='orderForm'>
                    {errors.name?.message ? <motion.p className='orderError' initial={{opacity: 0, scale: 0}} animate={{ opacity: 1, scale: 1 }}>{errors.name.message}</motion.p> : <label className='orderLabel'>Имя</label>}
                    <input {...register("name", {
                        required: 'Укажите имя', 
                        minLength: {
                            value: 2, 
                            message: 'Некорректное имя'
                        }, 
                        maxLength: {
                            value: 20, 
                            message: 'Некорректное имя'
                        }})} placeholder='Ваше имя' className='orderInput'/>
                    { errors.surname ? <motion.p className='orderError' initial={{opacity: 0, scale: 0}} animate={{ opacity: 1, scale: 1 }}>{errors.surname.message}</motion.p> : <label className='orderLabel'>Фамилия</label>}
                    <input {...register("surname", {
                        required: 'Укажите фамилию', 
                        minLength: {
                            value: 2,
                            message: 'Некорректная фамилия'
                        }, 
                        maxLength: {
                            value: 20,
                            message: 'Некорректная фамилия'
                        }})} className='orderInput' placeholder='Ваша фамилия'/>
                    {errors.email ? <motion.p className='orderError' initial={{opacity: 0, scale: 0}} animate={{ opacity: 1, scale: 1 }}>{errors.email.message}</motion.p> : <label className='orderLabel'>Электронная почта</label>}
                    <input {...register("email", {
                        required: 'Укажите эл. почту',
                        minLength: {
                            value: 8,
                            message: 'Некорректная эл. почта'
                        }, 
                        maxLength: {
                            value: 20,
                            message: 'Некорректная эл. почта'
                        },
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 
                            message: 'Некорректный адрес электронной почты'
                        }})} className='orderInput' placeholder='Электронная почта'/>
                    {errors.locality ? <motion.p className='orderError' initial={{opacity: 0, scale: 0}} animate={{ opacity: 1, scale: 1 }}>{errors.locality.message}</motion.p> : <label className='orderLabel'>Населенный пункт</label>}
                    <input {...register("locality", {
                        required: 'Укажите населенный пункт', 
                        minLength: {
                            value: 2,
                            message: 'Некорректное название'
                        }, 
                        maxLength: {
                            value: 30,
                            message: 'Некорректное название'
                        }})} className='orderInput' placeholder='Укажите населенный пункт'/>
                    {errors.street ? <motion.p className='orderError' initial={{opacity: 0, scale: 0}} animate={{ opacity: 1, scale: 1 }}>{errors.street.message}</motion.p> : <label className='orderLabel'>Улица</label>}
                    <input {...register("street", {
                        required: 'Укажите название улицы', 
                        minLength: {
                            value: 2,
                            message: 'Некорректное название'
                        }, 
                        maxLength: {
                            value: 30,
                            message: 'Некорректное название'
                        }})} className='orderInput' placeholder='Название улицы'/>
                    {errors.house ? <motion.p className='orderError' initial={{opacity: 0, scale: 0}} animate={{ opacity: 1, scale: 1 }}>{errors.house.message}</motion.p> : <label className='orderLabel'>Дом</label>}
                    <input {...register("house", {
                        required: 'Укажите номер дома', 
                        minLength: {
                            value: 1,
                            message: 'Некорректный номер'
                        }, 
                        maxLength: {
                            value: 7,
                            message: 'Некорректный номер'
                        }})} className='orderInput' placeholder='Номер дома'/>
                    {errors.index ? <motion.p className='orderError' initial={{opacity: 0, scale: 0}} animate={{ opacity: 1, scale: 1 }}>{errors.index.message}</motion.p> : <label className='orderLabel'>Индекс</label>}
                    <input {...register("index", {
                        required: 'Укажите индекс почты России', 
                        minLength: {
                            value: 4,
                            message: 'Некорректный индекс'
                        }, 
                        maxLength: {
                            value: 10,
                            message: 'Некорректный индекс'
                        }})} className='orderInput' placeholder='Индекс почты России'/>
                    <motion.input 
                    type='submit' 
                    className='orderSubmit' 
                    value='Подтвердить'
                    whileHover={{backgroundColor: 'rgba(171, 196, 255, 0.7)'}}/>
                </form>
            </AnimatePresence>
            
        </div> : null
    )
}