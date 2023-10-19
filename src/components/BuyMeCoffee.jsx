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
                <Button
                aria-label='Buy me a coffee' 
                className="flex bg-glass items-center bg-basic/60 text-light justify-center text-sm hover:bg-basic border-basic/30 transition-colors">  
                    <a 
                    href="#"
                    target='_blank'
                    rel='noopener noreferrer'
                    style={{minWidth: '40px', minHeight: '20px'}}  
                    >
                        Buy me a coffee...   
                    </a>
                    </Button>
               
            </div>
        </ScreenEgg>
    )
}
// add link strapi.com to the button