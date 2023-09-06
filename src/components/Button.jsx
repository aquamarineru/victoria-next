export default function Button({ children, className, ...rest }) {
    return (
        <button
        className={`px-8 py-4 border-[1px] border-dark  p-2 rounded-md font-title text-dark uppercase ${className}`}
        {...rest}
        >
        {children}
        </button>
    );
}