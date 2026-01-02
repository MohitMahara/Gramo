export default function Btn({ children, onClick, className, disabled = false, variant = "primary", type = "button" }) {
    const btnVariants ={
        primary : 'bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 text-white',
        secondary : 'bg-gray-800 hover:bg-gray-900 disabled:bg-gray-500 text-white',
        noBackground : ''
    }

    const baseClass = "px-4 py-2 rounded-md cursor-pointer disabled:cursor-not-allowed transition-colors duration-300";
  return (
    <button
      onClick={onClick}
      className={`${baseClass} ${btnVariants[variant]} ${className}`}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}