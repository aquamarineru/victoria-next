export default function Section({ children  }) {
    return (
        <section className='h-screen w-full bg-center bg-no-repeat bg-zinc-300 bg-cover relative flex items-center justify-center'>
            {children}
        </section>
    )
}