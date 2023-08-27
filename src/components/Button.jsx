export default function Button({ children, className, ...rest }) {
    return (
        <button
        className={`px-8 py-2 border border-light bg-blue-900/50 hover:bg-blue-900 border-opacity-25 p-2 bg-glass rounded-md font-title text-light  uppercase ${className}`}
        {...rest}
        >
        {children}
        </button>
    );
}