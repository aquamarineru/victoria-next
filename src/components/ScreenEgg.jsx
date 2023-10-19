export default function ScreenEgg({ children, type }) {
    return (
        <div className={`
        ${type === 'right' 
        ? 'pl-8 top-24 right-0 transform translate-x-[calc(100%-2.5rem)] transition-transform duration-600 hover:translate-x-0 hover:translate-y-0' 
        : 'pr-[1.7rem] bottom-10 left-0 transform -translate-x-[calc(100%-2.5rem)] transition-transform duration-300 hover:translate-x-0 hover:translate-y-0' 
        } 
        block p-4 fixed md:inline-block border border-basic/40 z-20 md:px-6 cursor-pointer md:py-4 rounded bg-glass bg-basic/60 bg-glass `}>
            {children}
        </div>
    )
}

//'custom-translate pl-8 top-10 right-0 transition-transform duration-500 hover:translate-x-0 hover:translate-y-0'