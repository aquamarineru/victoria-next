export default function PostGrid({ children }) {
    return(
        <div className="grid grid-col-1 md:grid-cols-2 xl:grid-col-3 gap-10 pt-24">
            {children}
        </div>
    )

}