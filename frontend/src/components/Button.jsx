import { FaPlus } from "react-icons/fa6";

const Button = ({ text, icon, onClick, className }) => {
    return (
        <button 
            className={`flex items-center px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 whitespace-nowrap ${className}`} 
            onClick={onClick}
        >
            {icon && <span className="mr-2">{icon}</span>}
            <span className="text-sm">{text}</span>
        </button>
    )
}

export default Button