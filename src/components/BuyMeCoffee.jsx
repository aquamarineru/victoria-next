import ScreenEgg from './ScreenEgg';
import Link from 'next/link';
import Button from './Button';
import { GiCoffeeCup } from 'react-icons/gi';
export default function BuyMeCoffee() {
    return (
        <ScreenEgg type="right">
        <div className='pt-26 flex flex-col items-center gap-3 px-5  z-10'>
            <GiCoffeeCup size={40} className='text-light transition-transform hover:opacity-60' />
            <Link 
            href="#"
            target='_blank'
            className=''
            rel='noopener' >
                <Button className="inline-flex items-center bg-light justify-center gap-3 text-sm hover:bg-dark/50 hover:text-light">
                    Buy me a coffee...
                </Button>
            </Link>
        </div>
        </ScreenEgg>
    )
}
// add link strapi.com to the button