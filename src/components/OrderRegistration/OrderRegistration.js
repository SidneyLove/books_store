import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './OrderRegistration_styles.css';
import { GoBackButton } from '../GoBackButton/GoBackButton';

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
        <GoBackButton/>
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

                    <img src={book.src} className="orderImg"/>
                
                </li>))}
            </ul>

            <h3 className="orderResult">Итого: {total} ₽</h3>

            <form onSubmit={handleSubmit(onSubmit)} className='orderForm'>
                {errors.name?.message ? <p className='orderError'>{errors.name.message}</p> : <label className='orderLabel'>Имя</label>}
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
                { errors.surname ? <p className='orderError'>{errors.surname.message}</p> : <label className='orderLabel'>Фамилия</label>}
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
                {/* {errors.middleName ? <p className='orderError'>{errors.middleName.message}</p> : <label className='orderLabel'>Отество</label>}
                <input {...register("middleName", {
                    required: 'Укажите отчество', 
                    minLength: {
                        value: 2,
                        message: 'Некорректное отчество'
                    }, 
                    maxLength: {
                        value: 20,
                        message: 'Некорректное отчество'
                    }})} className='orderInput' placeholder='Ваше отчество'/> */}
                {errors.email ? <p className='orderError'>{errors.email.message}</p> : <label className='orderLabel'>Электронная почта</label>}
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
                {errors.locality ? <p className='orderError'>{errors.locality.message}</p> : <label className='orderLabel'>Населенный пункт</label>}
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
                {errors.street ? <p className='orderError'>{errors.street.message}</p> : <label className='orderLabel'>Улица</label>}
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
                {errors.house ? <p className='orderError'>{errors.house.message}</p> : <label className='orderLabel'>Дом</label>}
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
                {errors.index ? <p className='orderError'>{errors.index.message}</p> : <label className='orderLabel'>Индекс</label>}
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
                <input type='submit' className='orderSubmit' value='Подтвердить'/>
            </form>
        </div> : null
    )
}