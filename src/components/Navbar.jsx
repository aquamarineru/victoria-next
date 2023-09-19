import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Container from './Container';
import { useRouter } from 'next/router';
import { CgMenuLeft } from 'react-icons/cg';
import { TfiClose } from 'react-icons/tfi';
import { useTranslation } from 'next-i18next';


export default function Navbar({menuData = [], locale}){
    const [isMenuOpen, setIsMenuOpen] = useState(false);  
  /*   const { t } = useTranslation('common'); */

    const router = useRouter(); 

    const { locales, locale: activeLocale } = router;
    const otherLocales = locales.filter((locale) => locale !== activeLocale);

    const changeLocale = (locale) => {
        document.cookie = `NEXT_LOCALE=${locale}`;
    }; 
    const links = [
        { key: 'about', path: '/about' },
        { key: 'services', path: '/#services' },
        { key: 'blog', path: '/blog' },
        { key: 'contact', path: '/#contact' }
    ];
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return(
        <div className='shadow-custom'>
            <nav className='px-5 py-5 fixed z-20 bg-light md:bg-light/90 w-full'>
                <Container>
                    <div className='md:flex md:justify-between'>
                        <div className='flex items-center justify-between'>
                            <Link 
                            href='/'
                            className='font-title text-xl font-bold text-slate-600 hover:text-slate-500'
                            >
                                Some logo
                            </Link>
                            <div className='flex items-center'>
                            {isMenuOpen ? (
                            <TfiClose className="md:hidden cursor-pointer" onClick={toggleMenu} />
                                ) : (
                            <CgMenuLeft size={20} className="md:hidden cursor-pointer" onClick={toggleMenu} />
                            )}
                            </div>
                        </div>
                        <div className={`${isMenuOpen ? 'transform translate-x-0' : 'hidden'} md:flex h-screen md:h-10 transition-transform duration-300 pt-24 md:pt-0 flex flex-col md:flex-row gap-5 items-center font-title`}>
                        {links.map(({ path, key }, index) => (
                                    <Link href={path} key={index}
                                        className='text-dark before-element font-plex uppercase cursor-pointer transition-colors '>
                                            {key}
                                    
                                    </Link>
                                ))}
                        <div className='flex pt-10 md:pt-0'>
                            <span className='px-4 py-2 text-white rounded-lg bg-dark/60 uppercase text-sm cursor-pointer'>
                                {activeLocale}
                            </span>
                            {otherLocales.map((locale, localeIndex) => {
                                const { pathname, query } = router;
                                return (
                                <Link
                                    key={localeIndex}
                                    href={{ pathname, query }}
                                    locale={locale}
                                    onClick={() => document.cookie = `NEXT_LOCALE=${locale}`}
                                    className="active:bg-dark/60 cursor-pointer px-4 py-2 rounded-xl text-dark uppercase text-sm transition-colors"
                                >
                                    {locale}
                                </Link>
                                );
                            })}
                        </div>
                        </div>
                    </div>
                </Container>
            </nav>
        </div>
    )
}