import React from "react"
import Head from "next/head"
import Link from "next/link"
import Image from 'next/image'
import { client, urlFor } from '../../lib/client'
import { PiArrowLeftLight } from 'react-icons/pi';
import { Container, Breadcrumb, Article, Title, ContentAbout, Publication } from '@/components';
import BlockContent from '@sanity/block-content-to-react';


const serializers = {
    types: {
        block: props => props.children.join('')
    }
};

function blockToPlainText(blockContent) {
    if (!blockContent || !Array.isArray(blockContent)) {
        return '';
    }

    return blockContent
        .map(block => {
            if (block._type === 'block') {
                return block.children
                    .map(child => child.text || '')
                    .join('');
            }
            return '';
        })
        .join('\n');
}

export default function AboutPage({ aboutEntry, locale, }) {
    console.log(aboutEntry);
    if (!aboutEntry) return <div>No data found.</div>;

    const seoImageUrl = aboutEntry.seoImage && urlFor(aboutEntry.seoImage.asset).url();
    const localizedSeoDescription = aboutEntry.seoDescription && aboutEntry.seoDescription[locale]
        ? blockToPlainText(aboutEntry.seoDescription[locale])
        : null;
    const localizedBackButton = aboutEntry?.backButton?.find(t => t._key === locale)?.value || 'Back';
    const localizedTitle = aboutEntry.title?.find(item => item._key === locale)?.value;
    const paths = [ aboutEntry.seoTitle ];
    
    return (
        <div key={aboutEntry._id} className="w-full bg-gray h-full"
        style={{ backgroundColor: aboutEntry.bg.hex }}>
            <Head>
                <title>{aboutEntry.seoTitle} | EmpowerHer</title>
                <meta name='og:title' content={aboutEntry.seoTitle} />
                {localizedSeoDescription && <meta name="og:description" content={localizedSeoDescription} />}
                {localizedSeoDescription && <meta name="description" content={localizedSeoDescription} />}
                {seoImageUrl && <meta name="og:image" content={seoImageUrl} />}
            </Head>
            <Breadcrumb paths={paths}/>
            <Container>
            <Link 
            href='/'
            key={aboutEntry._id} 
            className="flex items-center font-text text-dark gap-3 hover:text-basic hover:transform pt-32">
            <PiArrowLeftLight className="transition-all duration-400 ease-in-out hover:transform hover:translate-x-1 cursor-pointer" />
            {localizedBackButton}
        </Link>
                <Article>
                    <Title >{localizedTitle}</Title>
                    <div className="flex flex-col items-center lg:flex-row lg:items-start justify-between gap-10">
                        <Image
                        src={urlFor(aboutEntry.myImage).crop('center').fit('crop').width(1000).height(1080).url()} 
                        alt={aboutEntry.title}
                        width={400}
                        height={400}
                        priority={true}
                        className='mt-5 md:mt-12 object-cover rounded shadow-custom z-10'
                        />
                        <ContentAbout body={aboutEntry.body} locale={locale} />
                    </div>
                    <Title type='small'>Publications</Title>
                    {
                        aboutEntry.publications.map((publication) => {
                            return(
                                <Publication 
                                key={publication._id}
                                title={publication.title}
                                description={publication.description}
                                link={publication.link}
                                image={publication.image}
                                author={publication.author}
                                button={publication.button}
                                locale={locale}
                                />
                            )
                        })
                    }
                </Article>
                
            </Container>
        
        </div>
);
}

export async function getStaticProps({ locale }) {  
    const aboutQuery = `*[_type == "about"]{
        _id,
        seoImage,
        seoTitle,
        seoDescription,
        backButton,
        title,
        myImage,
        bg,
        body,
        publications[]->{
            title,
            description,
            link,
            image,
            author,
            button
        }
    }`

    const aboutData = await client.fetch(aboutQuery)
    const aboutEntry = aboutData[0];

    return {
        props: {
            aboutEntry,
            locale,
        },
    };
}

