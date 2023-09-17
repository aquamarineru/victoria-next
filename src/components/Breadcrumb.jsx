import React from 'react';
import Link from 'next/link';
import Container from './Container';

export default function Breadcrumb({ paths }) {
    return (
        <div className="hidden md:flex absolute top-[78px] left-0 z-1 w-full rounded-b-sm bg-light/80 border  px-4 py-4 ">
             <Container className="">
                <nav className="flex items-center justify-center font-title" aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-2 sm:space-x-1">
                        <li className='flex items-center'>
                            <Link 
                            href="/" className="cursor-pointer font-title text-dark/70 text-lg before-element hover:text-dark/50 ">
                            Home
                            </Link>
                        </li>
                        {paths.map((path, index) => (
                            <li 
                            key={index} 
                            className={`cursor-pointer flex space-x-2 sm:space-x-1 ${index === paths.length - 1 ? 'whitespace-nowrap' : ''}`}>
                                <span className="text-dark/80 text-lg opacity-40">/</span>
                                {index === paths.length - 1 ? (
                                    <span className="flex items-center capitalize text-lg text-dark">
                                        {path}
                                    </span>
                ) : (
                    <Link href={`/${path}`}
                    className="flex capitalize items-center text-lg text-dark/70 before-element hover:text-dark/50 ">
                            {path}
                    </Link>
                )}
            </li>
        ))}
    </ol>
                </nav>
            </Container>
        </div>
      );
}