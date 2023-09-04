import React from 'react';
import Link from 'next/link';
import Container from './Container';

export default function Breadcrumb({ paths }) {
    return (
        <div className="hidden md:flex absolute top-[72px] left-0 z-1 w-full rounded-b-sm bg-gray-600  px-4 py-4 ">
             <Container className="">
                <nav className="flex items-center justify-center font-title" aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-2 sm:space-x-1">
                        <li className='flex items-center'>
                            <Link 
                            href="/" className="cursor-pointer text-slate-400 text-lg hover:text-hover ">
                            Home
                            </Link>
                        </li>
                        {paths.map((path, index) => (
                            <li 
                            key={index} 
                            className={`cursor-pointer flex space-x-2 sm:space-x-1 ${index === paths.length - 1 ? 'whitespace-nowrap' : ''}`}>
                                <span className="text-light text-lg opacity-40">/</span>
                                {index === paths.length - 1 ? (
                                    <span className="flex items-center capitalize text-lg text-light">
                                        {path}
                                    </span>
                ) : (
                    <Link href={`/${path}`}
                    className="flex capitalize items-center text-lg text-slate-400 hover:text-hover">
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