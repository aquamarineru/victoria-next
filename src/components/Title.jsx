export default function Title({ children, type }) {
    if(type === 'small') {
        return (
            <h3 className='text-base md:text-xl font-title font-bold'>
                {children}
            </h3>
        )
    } return (
        <h2 className='font-title font-bold text-2xl md:text-3xl xl:text-4xl title´'>
            {children}
        </h2>
    )
}