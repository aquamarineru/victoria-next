import React from 'react';
import Link from 'next/link';
import Container from './Container';

export default function Breadcrumb({ paths }) {
    return (
        <div className="hidden md:inline-block absolute top-[72px] left-0 z-1 w-full  border-light  bg-hover text-dark px-4 py-2 backdrop-blur-[10px] ">
             <Container className="">
             <nav className="flex" aria-label="Breadcrumb">
             <ol className="flex items-center space-x-2 sm:space-x-1">
        <li className='flex items-center'>
            <Link href="/" className="cursor-pointer text-sm sm:text-xs text-slate-300 hover:text-slate-400">
               Home
            </Link>
        </li>
        {paths.map((path, index) => (
            <li key={index} className={`cursor-pointer flex space-x-2 sm:space-x-1 ${index === paths.length - 1 ? 'whitespace-nowrap' : ''}`}>
                <span className="text-dark opacity-40">/</span>
                {index === paths.length - 1 ? (
                    <span className="flex items-center capitalize text-sm sm:text-xs text-slate-400">
                        {path}
                    </span>
                ) : (
                    <Link href={`/${path}`}
                    className="flex capitalize items-center text-sm sm:text-xs text-slate-300 hover:text-slate-400">
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