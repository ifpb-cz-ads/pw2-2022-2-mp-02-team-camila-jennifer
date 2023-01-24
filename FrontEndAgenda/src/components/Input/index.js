import './style.css';

const Input = ({ value, label, type, placeholder, onChange }) => {

    return (
        <div className="container">
            <label htmlFor='id' >{label}:</label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}

export default Input;