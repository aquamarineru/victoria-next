import React from 'react';
import Link from 'next/link';
import Container from './Container';
import { useRouter } from 'next/router';
export default function Navbar({menuData}){

    const router = useRouter(); 
    const { locales, locale: activeLocale } = router;
    const otherLocales = locales.filter((locale) => locale !== activeLocale);
    const changeLocale = (locale) => {
        document.cookie = `NEXT_LOCALE=${locale}`;
    };
    return(
        <div>
            <Container>
                <nav className='py-7 px-10 flex justify-between'>
                    <Link
                    href='/'>
                        Some logo
                    </Link>
                    <ul className='flex gap-3'>
                        <li>About</li>
                        <li>Services</li>
                        <li>Blog</li>
                        <li>Contact</li>
                    </ul>
                    <div>
                        <span className='px-4 py-2 text-white  rounded-lg bg-slate-600 uppercase text-sm'>{activeLocale} </span>
                        {otherLocales.map((locale, localeIndex) => {
                            const { pathname, query} = router;
                            return (
                                <Link 
                                    key={localeIndex} 
                                    href={{ pathname, query }} 
                                    locale={locale}
                                    onClick={() => changeLocale(locale)}
                                
                                    className="active:bg-[#414052] cursor-pointer px-4 py-2 rounded-xl text-light uppercase text-sm transition-colors">
                                        {locale}
                                    
                                </Link>
                            );
                        })}   
                    </div>
                </nav>
            </Container>
            
        </div>
    )
}