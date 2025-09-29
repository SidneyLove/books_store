import { useNavigate } from 'react-router-dom';
import './GoBackButton_styles.css'

export function GoBackButton() {  
    const navigate = useNavigate();  
    return (
        <button onClick={() => navigate(-1)} className='goBackButton'>
            Назад
        </button>
    );
}  