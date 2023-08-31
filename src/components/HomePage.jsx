import React from 'react';
import { urlFor } from '../../lib/client';
import Image from 'next/image';
import Container from './Container';
import { PiCalendarBlankThin } from 'react-icons/pi';
import Link from 'next/link';
import Button from './Button';

export default function HomePage({ homeData = [], locale }) {


    return ( 
        <div className="">
            <Container className=''>
                <div className='absolute top-0 left-0 right-0 bottom-0' >
                <div className='absolute top-0 left-0 right-0 bottom-0 bg-light/20' />
                    {
                    Array.isArray(homeData) && homeData.map((homeItem) => (
                        <Image
                            key={homeItem._id}
                            src={urlFor(homeItem.bgImage).url()}
                            alt={homeItem.title}
                            width={800}
                            height={700}
                            priority={true}
                            className='object-cover w-full h-full -z-10' 
                        />
                        ))
                    } 
                </div> 
                <div className='flex flex-col items-center justify-center '>
                    {
                        Array.isArray(homeData) && homeData.map((homeItem) => {
                            const localizedTitle = homeItem.title?.find(item => item._key === locale)?.value;
                            const localizedSubtitle = homeItem.subtitle?.find(item => item._key === locale)?.value;
                            const localizedButton = homeItem.callToAction?.find(item => item._key === locale)?.value;
                            const localizedBtn = homeItem.button?.find(item => item._key === locale)?.value;
                                return (
                                    <>
                                    <div 
                                    style={{backgroundColor: homeItem.bg.hex}}
                                    className='flex flex-col justify-between gap-5 text-center z-10 opacity-70 px-4 py-6 md:px-10 md:py-16 rounded-md lg:w-[700px]' 
                                    key={homeItem._id}
                                    >
                                        <h1 className='text-xl font-title font-bold text-light text-center uppercase md:text-3xl'>
                                            {localizedTitle}
                                        </h1>
                                        <h2 className='text-base md:text-xl font-title font-medium text-light'>{localizedSubtitle}
                                        </h2>
                                    </div>
                                    <div className='z-10 flex flex-col md:flex-row items-center gap-5 mt-24'>
                                        <Link href='#'>
                                            <Button
                                            style={{backgroundColor: homeItem.bg.hex}}
                                            className="font-title text-sm opacity-80">
                                                {localizedButton}
                                            </Button>
                                        </Link>
                                        <Link href='#'>
                                            <Button
                                            style={{backgroundColor: homeItem.bg.hex}} 
                                            className="inline-flex items-center justify-center gap-3 text-sm opacity-80">
                                            <PiCalendarBlankThin  /> 
                                            {localizedBtn}
                                            </Button>
                                        </Link>

                                    </div>

                                    
                                    
                                    </>
                                    

                                )
                            } 
                        )
                        }   
                        
                    
                </div>

            </Container>
        </div>
    )
}