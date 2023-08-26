import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Container from './Container';
import { useRouter } from 'next/router';


export default function Navbar({menuData, locale}){
console.log(locale)
console.log(menuData)

    const router = useRouter(); 
    const { locales, locale: activeLocale } = router;
    const otherLocales = locales.filter((locale) => locale !== activeLocale);
    const changeLocale = (locale) => {
        document.cookie = `NEXT_LOCALE=${locale}`;
    };
    const predefinedOrder = ['#about', '#services', 'blog', '#contact'];

    // Sort the menuData based on the predefined order
    const sortedMenuData = [...menuData].sort((a, b) => {
        return predefinedOrder.indexOf(a.slug) - predefinedOrder.indexOf(b.slug);
    });

    return(
        <div>
            <Container>
                <nav className='py-7 px-10 flex justify-between'>
                    <Link href='/'>Some logo</Link>
                    <ul className='flex gap-3'>
                        {sortedMenuData.map((menuItem) => {
                            const localizedTitle = menuItem.title?.find(item => item._key === locale)?.value;
                            if (localizedTitle) {
                                return (
                                    <li key={menuItem._id} className='cursor-pointer'>
                                        <Link href={`/${menuItem.slug?.current}`}>
                                            {localizedTitle}
                                        </Link>
                                    </li>
                                );
                            }
                            return null; 
                        })}
                    </ul>

                    <div>
                        <span className='px-4 py-2 text-white rounded-lg bg-slate-600 uppercase text-sm'>{activeLocale} </span>
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