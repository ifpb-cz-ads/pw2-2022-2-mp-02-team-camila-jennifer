import './style.css';

const Button = ({ title, type, onClick}) => {

    return (
        <>
           <button type={type} onClick={() => onClick(true)} >
                {title}
           </button>
        </>
    )
}

export default Button;