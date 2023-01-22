import './style.css';

const Button = ({ title, type}) => {
    return (
        <>
           <button type='type'>
                {title}
           </button>
        </>
    )
}

export default Button;