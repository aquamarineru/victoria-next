export default function Button({ children, ariaLabel, className, ...rest  }) {
    return (
        <button
        aria-label={ariaLabel}
        className={`px-8 py-4 border-[1px] border-dark  p-2 rounded-md font-title text-dark uppercase bg-glass transition-colors hover:bg-basic/70 hover:text-light hover:border-none ${className}`}
        {...rest}
        >
        {children}
        </button>
    );
}