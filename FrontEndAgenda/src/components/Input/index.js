import './style.css';

const Input = ({ id, label, type, placeholder, handleChange }) => {
    return (
        <div className="container">
            <label htmlFor='id' >{label}:</label>
            <input
                type={type}
                placeholder={placeholder}
                value={id} 
                onChange={(e) => handleChange(e.value)}
            />
        </div>
    )
}

export default Input;