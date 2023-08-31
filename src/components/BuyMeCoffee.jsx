import ScreenEgg from './ScreenEgg';
import Link from 'next/link';
import { GiCoffeeCup } from 'react-icons/gi';
export default function BuyMeCoffee() {
    return (
        <ScreenEgg type="right">
        <div className='pt-26 flex flex-col items-center gap-3  z-10'>
            <GiCoffeeCup size={40} className='text-light transition-transform hover:opacity-60' />
            <Link 
            href="#"
            target='_blank'
            className='bg-slate-700 text-light hover:bg-hover hover:text-dark font-title text-base text-center px-4 py-2 rounded-md flex flex-col items-center justify-center gap-2 '
            rel='noopener' >
                Buy me a coffee...
            </Link>
        </div>
        </ScreenEgg>
    )
}
// add link strapi.com to the button