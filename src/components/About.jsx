import React from "react"
import {Title, Container, Button} from "."
import { urlFor } from '../../lib/client';
import Image from 'next/image';
import Link from "next/link";
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
export default function About({ aboutData, locale }) {

    return(
        <div 
        id="about" 
        className="w-full h-full">
            {
                Array.isArray(aboutData) && aboutData.map((aboutItem) => {
                    const localizedTitle = aboutItem.title?.find(item => item._key === locale)?.value;
                   
                    const localizedButton = aboutItem.button?.find(item => item._key === locale)?.value;
                    return(
                        <div 
                        key={aboutItem._id}  
                        /* style={{ backgroundColor: aboutItem.bg.hex, opacity: .8, zIndex: -1 }} */
                        className="px-3 md:px-5 bg-center bg-cover bg-no-repeat bg-basic/40 -z-10">
                            <Container className= "flex items-center flex-col gap-5 py-16 text-dark">
                                <Title type='medium'>{localizedTitle}</Title>
                                <div className="flex flex-col md:flex-row items-center justify-around gap-10 pt-5">
                                <Image
                                    src={urlFor(aboutItem.image).crop('center').fit('crop').width(1000).height(1080).url()} 
                                    alt={aboutItem.title}
                                    width={500}
                                    height={500}
                                    sizes="(max-width: 600px) 100vw, 400px"
                                    priority={true}
                                    className='object-cover rounded shadow-custom'
                                    />
                                    <div className="flex flex-col items-start justify-between gap-10 lg:w-1/3">
                                    <BlockContent 
                                    blocks={aboutItem.description[locale] }
                                    className=''
                                    />
                                        <Link href='/about'>
                                            <Button
                                            aria-label="about me" 
                                            className="inline-flex items-center justify-center gap-3 text-sm hover:bg-dark/70 hover:text-light">
                                                {localizedButton}
                                            </Button>
                                            
                                        </Link>
                                    </div>
                                             
                                   
                                    
                                </div>
                            </Container>

                        </div>
                    )

                })
            }


        </div>
    )
}
