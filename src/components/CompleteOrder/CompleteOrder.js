import './CompleteOrder_styles.css';
import { useNavigate } from 'react-router-dom';

export const CompleteOrder = ({ booksInCart }) => {
    const navigate = useNavigate();
    const total = booksInCart? booksInCart.reduce(
        (sum, book) => sum + book.price * book.quantity,
        0
    ) : 0;

    const orderData = JSON.parse(localStorage.getItem('orderData'));

    return (
        <div className='completeOrder_container'>
            <button onClick={()=>{
                localStorage.clear();
                localStorage.setItem("booksInCart", JSON.stringify([]));
                localStorage.setItem("orderData", JSON.stringify([]));
                navigate('/');
            }} className='orderCompleteButton'>На главную</button>
            <h1 className='completeOrderHeader'>Ваш заказ успешно оформлен</h1>
            <div className='completeOrderInfo'>
                <h2 className='completeOrederInfoHeader'>Информация по заказу:</h2>
                <p className='completeOrderInfoText'>Имя: {orderData.name}</p>
                <p className='completeOrderInfoText'>Фамилия: {orderData.surname}</p>
                <p className='completeOrderInfoText'>Электронная почта: {orderData.email}</p>
                <p className='completeOrderInfoText'>Населенный пункт: {orderData.locality}</p>
                <p className='completeOrderInfoText'>Улица: {orderData.street}</p>
                <p className='completeOrderInfoText'>Дом: {orderData.house}</p>
                <p className='completeOrderInfoText'>Индекс: {orderData.index}</p>
                <h2 className='completeOrederInfoHeader'>В заказе:</h2>
                {booksInCart.map((book)=>{
                    return (
                        <>
                            <div className='completeOrderStructure'>
                                <div className='completeOrderStructureBookTitleAuthor'>
                                    <p className='completeOrderInfoText'>{book.title}</p>
                                    <p className='completeOrderInfoText'>{book.author}</p>
                                </div>
                                <div className='completeOrderStructurePriceQuntity'>
                                    <p className='completeOrderInfoText'>{book.quantity} шт.</p>
                                    <p className='completeOrderInfoText'>{book.price}₽</p>
                                </div>
                                
                            </div>
                            {booksInCart.length > 1 && <div className='completeOrderHr'/>}
                        </>
                    )
                    })}
                <h2 className='completeOrederInfoHeader'>Общая стоимость заказа: {total}₽</h2>
            </div>
        </div>
    )
}