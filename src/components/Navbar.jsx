import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Container from './Container';
import { useRouter } from 'next/router';
import { CgMenuLeft } from 'react-icons/cg';
import { TfiClose } from 'react-icons/tfi';
import { useTranslation } from 'next-i18next';

const links = [
    { key: 'about', path: '/about' },
    { key: 'services', path: '/#services' },
    { key: 'blog', path: '/blog' },
    { key: 'contact', path: '/#contact' }
];

export default function Navbar(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);  
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  /*   const { t } = useTranslation('common'); */

    const router = useRouter(); 

    const { locales, locale: activeLocale } = router;
    const otherLocales = locales.filter((locale) => locale !== activeLocale);

    const changeLocale = (locale) => {
        document.cookie = `NEXT_LOCALE=${locale}`;
    }; 

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return(
        <div className="fixed top-0 left-0 w-full z-50 shadow-custom border-b bg-glass border-light/40 backdrop-blur-[10px]">
           <nav className='px-5 py-2 fixed z-20 bg-light w-full'>
                <Container>
                    <div className='md:flex md:justify-between'>
                        <div className='flex items-center justify-between'>
                            <Link 
                            href='/'
                            className='font-title text-xl font-bold flex items-center gap-2 cursor-pointer hover:text-basic transition-colors'
                            >
                                <Image 
                                src='/logo.png'
                                alt='logo'
                                width={40}
                                height={40}
                                />
                                EmpowerHer
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
                                    <Link 
                                    href={path} 
                                    key={index}
                                    onClick={() => setIsMenuOpen(false)}
                                    className='text-dark before-element font-text uppercase cursor-pointer transition-colors '>
                                    {key}
                                    </Link>
                                ))}
                        {/* <div className='flex pt-10 md:pt-0'>
                            <span className='bg-basic/70 bg-glass px-4 py-2 rounded-xl uppercase text-light font-bold text-sm'>
                                {activeLocale}
                            </span>
                            {otherLocales.map((locale, localeIndex) => {
                                const { pathname, query } = router;
                                return (
                                <Link
                                    key={localeIndex}
                                    href={{ pathname, query }}
                                    locale={locale}
                                    onClick={() => {
                                        document.cookie = `NEXT_LOCALE=${locale}`;
                                        setIsMenuOpen(false);
                                    }}
                                    className="active:bg-basic/60 cursor-pointer px-4 py-2 rounded-xl text-dark uppercase text-sm transition-colors"
                                >
                                    {locale}
                                </Link>
                                );
                            })}
                        </div> */}
                        <div 
                        className="relative cursor-pointer font-title"
                        onClick={toggleDropdown}>
                        <span className=" bg-basic/70 bg-glass px-4 py-2 rounded-xl uppercase text-light font-title font-bold text-sm">{activeLocale} </span>
                       {isDropdownOpen && (
                        <div className="absolute left-0 mt-2 bg-gray rounded-xl uppercase text-sm text-dark px-4 py-2 z-0">
                             {otherLocales.map((locale, localeIndex) => {
                            const { pathname, query} = router;
                            return (
                                <Link 
                                    key={localeIndex} 
                                    href={{ pathname, query }} 
                                    locale={locale}
                                    onClick={() => changeLocale(locale)}
                                
                                    className="">
                                        {locale}
                                </Link>
                            );
                        })} 

                        </div>
                       )}  
                        </div>
                        </div>
                    </div>
                </Container>
            </nav>

        </div>
        
    )
}

{/* <div className='shadow-custom'>
            <nav className='px-5 py-5 fixed z-20 bg-light md:bg-light/90 w-full'>
                <Container>
                    <div className='md:flex md:justify-between'>
                        <div className='flex items-center justify-between'>
                            <Link 
                            href='/'
                            className='font-title text-xl font-bold flex items-center gap-2 cursor-pointer'
                            >
                                <Image 
                                src='/logo.png'
                                alt='logo'
                                width={40}
                                height={40}
                                />
                                EmpowerHer
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
                                    <Link 
                                    href={path} 
                                    key={index}
                                    onClick={() => setIsMenuOpen(false)}
                                    className='text-dark before-element font-plex uppercase cursor-pointer transition-colors '>
                                    {key}
                                    </Link>
                                ))}
                        <div className='flex pt-10 md:pt-0'>
                            <span className='bg-dark/70 bg-glass px-4 py-2 rounded-xl uppercase text-light font-bold text-sm'>
                                {activeLocale}
                            </span>
                            {otherLocales.map((locale, localeIndex) => {
                                const { pathname, query } = router;
                                return (
                                <Link
                                    key={localeIndex}
                                    href={{ pathname, query }}
                                    locale={locale}
                                    onClick={() => {
                                        document.cookie = `NEXT_LOCALE=${locale}`;
                                        setIsMenuOpen(false);
                                    }}
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
        </div> */}

        {/* <div 
                        className="relative cursor-pointer"
                        onClick={toggleDropdown}>
                        <span className=" bg-hover bg-glass px-4 py-2 rounded-xl uppercase text-dark font-title font-bold text-sm">{activeLocale} </span>
                       {isDropdownOpen && (
                        <div className="absolute left-0 mt-2 bg-dark/90 rounded-xl uppercase text-sm text-light px-4 py-2 z-0">
                             {otherLocales.map((locale, localeIndex) => {
                            const { pathname, query} = router;
                            return (
                                <Link 
                                    key={localeIndex} 
                                    href={{ pathname, query }} 
                                    locale={locale}
                                    onClick={() => changeLocale(locale)}
                                
                                    className="">
                                        {locale}
                                </Link>
                            );
                        })} 

                        </div>
                       )}  
                        </div> */}