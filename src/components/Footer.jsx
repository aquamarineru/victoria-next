import React from 'react';
import Container  from './Container';
import Link from 'next/link';
import Image from 'next/image';


function Footer(){
    const currentYear = new Date().getFullYear(); 
    return(
        <div className="bg-light/90 text-dark text-center py-4 border-t border-basic/40 backdrop-blur-[10px]">
            <Container>
                <nav
                className='text-light mx-auto max-w-7xl px-8 flex flex-col md:flex-row items-center justify-between py-5 relative'>
                    <div
                    className='font-title text-base md:text-xl font-bold text-dark flex items-center gap-2 cursor-pointer hover:text-basic/50 transition-colors'
                    >
                        <Image 
                        src='/logo.png'
                        alt='logo'
                        width={40}
                        height={40}
                        />
                        EmpowerHer
                    </div>
                    <div className='flex flex-col md:flex-row md:gap-10 font-text text-dark'>
                        <Link
                        href='/terms-and-conditions'
                        className='hover:text-basic/50 hover:underline'>
                            Terms and Conditions
                        </Link>
                        <Link
                        href='/privacy-policy'
                        className='hover:text-basic/50 hover:underline'>
                            Privacy Policy
                        </Link>
                    </div>

                </nav>
                <div className='text-xs font-text  flex flex-col items-center py-2'>
                    © {currentYear} EmpowerHer. All Rights Reserved.
                </div>
                <p className="text-xs mt-2 text-dark dark:text-basic/50">
                Created by  
                <a 
                href="https://codecrafters.online" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="underline">
                    codecrafters.online
                </a>
                </p>
            </Container>
        </div>
    )
}
export default Footer;