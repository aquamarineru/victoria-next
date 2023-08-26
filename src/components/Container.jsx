export default function Container({ className = '', ...props }) {
    return (
        <div className={`mx-auto max-w-7xl px-8 ${className}`} {...props}>
            {props.children}
        </div>
    )
}