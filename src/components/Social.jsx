import React from 'react';
import { AiOutlineInstagram } from 'react-icons/ai';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { GrMail } from 'react-icons/gr';
import Link from 'next/link';
import ScreenEgg from './ScreenEgg';

const socialItems = [
    {
        id: 1,
        icon: <AiOutlineInstagram  size={30}/>,
        href: 'https://www.instagram.com/'
    },
    {
        id: 2,
        icon: <FaFacebookF size={30} />,
        href: 'https://www.facebook.com/'
    },
    {
        id: 3,
        icon: <FaTwitter size={30} />,
        href: 'https://twitter.com/'
    },
    {
        id: 4,
        icon: <FaLinkedinIn size={30} />,
        href: 'https://www.linkedin.com/'
    },
    {
        id: 5,
        icon: <GrMail size={30} />,
        href: '#'
    }
]

export default function Social() {
    return (
        <ScreenEgg className='z-10' type="left">
            <ul className='flex gap-4 justify-center md:mb-0 md:inline-block px-4 md:px-5'> 
            {socialItems.map((item) => (
                <li 
                key={item.id} 
                className='mb-3'>
                    <Link 
                    href={item.href}
                    target= '_blank'
                    passHref 
                    rel='noopener noreferrer'
                    className='transition-transform text-dark hover:text-basic/70'>
                        {
                            item.icon
                        }
                    </Link>

                </li>
            ))}

            </ul>
        </ScreenEgg>
    )
}