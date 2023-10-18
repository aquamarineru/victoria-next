import React from 'react';
import { urlFor } from '../../lib/client';
import Image from 'next/image';
import { Container, Title, Button } from '.';
import BlockContent from '@sanity/block-content-to-react';


const serializers = {
    types: {
        block: (props) => {
            switch (props.node.style) {
                case 'paragraph':
                    return <p className="text-sm text-dark md:text-base font-title py-4">{props.children}</p>;
                default:
                    return <p className="text-sm text-dark md:text-base font-title py-4">{props.children}</p>;
            }
        }
    }
}

export default function HomePage({ homeData, locale }) {


    return ( 
        <div className="relative h-screen w-full mx-auto">
            {
                Array.isArray(homeData) && homeData.map((homeItem) => {
                    const localizedTitle = homeItem.title?.find(item => item._key === locale)?.value;
                    const  localizedButton = homeItem.callToAction?.find(item => item._key === locale)?.value;
                    return(
                        <div 
                        key={homeItem._id}
                        className='absolute  top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-light via-basic/20 to-basic/40 flex items-center justify-between z-0'>
                            <Container className='flex flex-col-reverse justify-between gap-10 md:flex-row' >
                                <div className='flex flex-col items-start justify-around gap-5 z-10 md:w-1/2 '>
                                <Title> 
                                        {localizedTitle}
                                </Title>
                                <BlockContent 
                                blocks={homeItem.subtitle[locale] }
                                className=''
                                />
                                <Button
                                aria-label="contact me">
                                    {localizedButton}
                                </Button>

                                </div>
                                <Image
                                src={urlFor(homeItem.bgImage).url()}
                                alt={homeItem.title}
                                sizes="(max-width: 600px) 100vw, 300px"
                                priority={true}
                                width={800}
                                height={800}
                                className='z-0 w-full absolute top-0 right-0 object-right md:object-cover md:w-10/12 lg:w-7/12 '
                                />
                            </Container>
                            

                        </div>
                    )  
                })
            }
        </div>
    )
}

/* <div className='absolute top-0 left-0 right-0 bottom-0' >
                <div className='absolute top-0 left-0 right-0 bottom-0 bg-light/10' />
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
                            
                            const localizedButton = homeItem.callToAction?.find(item => item._key === locale)?.value;
                            const localizedBtn = homeItem.button?.find(item => item._key === locale)?.value;
                                return (
                                    <React.Fragment key={homeItem._id}>
                                    <div 
                                    style={{backgroundColor: homeItem.bg.hex, opacity: 0.8}}
                                    className='flex flex-col justify-between items-center gap-5 text-center text-dark z-10 px-4 py-6 md:px-10 md:py-16 rounded-md lg:w-[700px]' 
                                    key={homeItem._id}
                                    >
                                        <h1 className='text-xl font-title font-bold text-dark text-center uppercase md:text-4xl'>
                                            {localizedTitle}
                                        </h1>
                                        <p className=''>
                                        </p>
                                    </div>
                                    

                                    
                                    
                                    </React.Fragment>
                                    

                                )
                            } 
                        )
                        }   
                        
                    
                </div> */