import ScreenEgg from './ScreenEgg';
import Link from 'next/link';
import Image from 'next/image';
import Button from './Button';
import { GiCoffeeCup } from 'react-icons/gi';
export default function BuyMeCoffee() {
    return (
        <ScreenEgg type="right">
            <div className='pt-26 flex flex-col items-center gap-2 px-5 z-10'>
                <Image
                src='/coffee.png'
                alt='coffee'
                width={50}
                height={60}
                />
                <Link 
                    href="#"
                    target='_blank'
                    rel='noopener noreferrer'
                    style={{minWidth: '48px', minHeight: '48px'}}  
                >
                    <Button
                    aria-label='Buy me a coffee' 
                    className="flex bg-glass items-center bg-yellow-600 text-light justify-center text-sm hover:bg-yellow-800 border-light transition-colors py-2 px-4">  
                        Buy me a coffee...
                    </Button>
                </Link>
            </div>
        </ScreenEgg>
    )
}
// add link strapi.com to the button