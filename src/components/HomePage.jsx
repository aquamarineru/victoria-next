import React from 'react';
import { urlFor } from '../../lib/client';
import Image from 'next/image';
import Container from './Container';
import { PiCalendarBlankThin } from 'react-icons/pi';
import Link from 'next/link';
import Button from './Button';

export default function HomePage({ homeData, locale }) {
    console.log(homeData, locale);

    return ( 
        <section className="h-screen bg-center bg-no-repeat bg-zinc-300 bg-cover relative flex items-center justify-center">
            <Container className=''>
                <div className='absolute top-0 left-0 right-0 bottom-0' >
                <div className='absolute top-0 left-0 right-0 bottom-0 bg-light/20' />
                    {
                    homeData.map((homeItem) => (
                        <Image
                            key={homeItem._id}
                            src={urlFor(homeItem.bgImage).url()}
                            alt={homeItem.title}
                            width={1000}
                            height={700}
                            className='object-cover w-full h-full -z-10' 
                        />
                        ))
                    } 
                </div> 
                <div className='flex flex-col items-center justify-center'>
                    {
                        homeData.map((homeItem) => {
                            const localizedTitle = homeItem.title?.find(item => item._key === locale)?.value;
                            const localizedSubtitle = homeItem.subtitle?.find(item => item._key === locale)?.value;
                                return (
                                    <>
                                    <div className='z-10 bg-slate-500/40 px-10 py-16 rounded-md' key={homeItem._id}>
                                        <h1 className='text-4xl font-title font-bold text-light uppercase'>{localizedTitle}</h1>
                                        <h2 className='text-2xl font-title font-bold text-light uppercase'>{localizedSubtitle}</h2>
                                    </div>
                                    <div className='z-10 flex items-center gap-5 mt-24'>
                                        <Link href='#'>
                                            <Button className="font-title hover:bg-hover">work with me</Button>
                                        </Link>
                                        <Link href='#'>
                                            <Button className="inline-flex items-center justify-center gap-3 ">
                                            <PiCalendarBlankThin  /> Book a meeting
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
        </section>
    )
}