import React from 'react';
import Link from 'next/link';
import Container from './Container';

export default function Breadcrumb({ paths }) {
    return (
        <div 
        className="hidden md:flex absolute top-[65px] left-0 z-1 w-full bg-glass bg-light/50 py-2"
        >
            <Container className="">
                <nav 
                className="flex items-center justify-center font-text text-sm text-dark" 
                aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-2 sm:space-x-1">
                        <li className='flex items-center'>
                            <Link 
                            href="/" className="cursor-pointer font-text text-sm text-dark/70 before-element hover:text-basic/50 ">
                            Home
                            </Link>
                        </li>
                        {paths.map((path, index) => (
                            <li 
                            key={index} 
                            className={`cursor-pointer flex space-x-2 sm:space-x-1 ${index === paths.length - 1 ? 'whitespace-nowrap' : ''}`}>
                                <span className="text-dark/80 text-lg opacity-40">/</span>
                                {index === paths.length - 1 ? (
                                    <span className="flex items-center capitalize text-sm text-dark">
                                        {path}
                                    </span>
                                ) : (
                                    <Link href={`/${path}`}
                                    className="flex capitalize items-center text-sm text-dark/70 before-element hover:text-dark/50 ">
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