import { useNavigate } from 'react-router-dom';
import './GoBackButton_styles.css';
import { motion } from 'motion/react';

export function GoBackButton() {  
    const navigate = useNavigate();  
    return (
        <motion.button 
        onClick={() => navigate(-1)} 
        className='goBackButton'
        whileHover={{backgroundColor: 'rgba(171, 196, 255, 0.7)'}}
        >
            Назад
        </motion.button>
    );
}  