import ScreenEgg from './ScreenEgg';
import Link from 'next/link';
import Button from './Button';
import { GiCoffeeCup } from 'react-icons/gi';
export default function BuyMeCoffee() {
    return (
        <ScreenEgg type="right">
            Copy code
            <div className='pt-26 flex flex-col items-center gap-6 px-5 z-10'>
                <GiCoffeeCup size={40} className='text-light transition-transform hover:opacity-60' />

                <Link 
                    href="#"
                    target='_blank'
                    className=''
                    rel='noopener' 
                    style={{minWidth: '48px', minHeight: '48px'}}  // Ensure a minimum touch target size
                >
                    <Button className="inline-flex items-center bg-light justify-center text-sm hover:bg-dark/50 hover:text-light py-2 px-4">  {/* Added some padding for clearer touch area */}
                        Buy me <br /> a coffee
                    </Button>
                </Link>
            </div>
        </ScreenEgg>
    )
}
// add link strapi.com to the button