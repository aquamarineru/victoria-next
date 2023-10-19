import React from 'react'
import { client, urlFor } from '../../../lib/client'
import Head from 'next/head'
import Link from 'next/link'
import { Container, Article, Contact, Content, Breadcrumb } from '@/components'
import Image from 'next/image'
import { PiArrowLeftLight } from 'react-icons/pi';

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


export default function MyService({ service, locale, contactData }) {
    const seoImageUrl = service.seoImage && urlFor(service.seoImage.asset).url();
    const localizedSeoDescription = service.seoDescription && service.seoDescription[locale]
        ? blockToPlainText(service.seoDescription[locale])
        : null;
    const localizedBackButton= service.backButton.find(t => t._key === locale);
    const paths = [ service.seoTitle ]

    return (
        <div 
        className='w-full bg-gray h-full'
        key={service._id}
        >
        <Head>
            <title>{service.seoTitle} | EmpowerHer</title>
            <meta name='og:title' content={service.seoTitle} />
            {localizedSeoDescription && <meta name="og:description" content={localizedSeoDescription} />}
            {localizedSeoDescription && <meta name="description" content={localizedSeoDescription} />}
            {seoImageUrl && <meta name="og:image" content={seoImageUrl} />}
        </Head>
        <Breadcrumb paths={paths}/>
            <Container className=''>
                <Link 
                href='/'
                key={service._id} 
                className="flex items-center font-text text-dark gap-3 hover:text-basic hover:transform pt-32">
                    <PiArrowLeftLight className="transition-all duration-400 ease-in-out hover:transform hover:translate-x-1 cursor-pointer" />
                        {localizedBackButton?.value || 'Back'}
                </Link>
                <Article>
                    <Image 
                    src={urlFor(service.image).url()}
                    alt={service.seoTitle}
                    width={500}
                    height={500}
                    className='object-cover rounded shadow-custom'
                    />
                    <div className='py-10'>
                        <Content body={service.body} locale={locale} />
                    </div>
                </Article>
                <Contact contactData={contactData} locale={locale} />
            </Container>


        </div>
    )
}

export async function getStaticPaths() {
    const query = `*[_type == "service"]{ 'slug': slug.current }`;
    const services = await client.fetch(query);
    
    const paths = services.map(service => ({
        params: { slug: service.slug },
        locale: service.locale || 'en' 
    }));

    return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params, locale }) {
    const { slug } = params;

    const query = `*[_type == "service" && slug.current == $slug]{
        _id,
        'slug': slug.current,
        seoTitle,
        seoDescription,
        seoImage,
        image,
        backButton,
        body,
        title,
    } `;
    const contactQuery = `*[_type == "contact"]{
        _id,
        title,
        subtitle,
        description,
        image,
        button,
    }`;
    const contactData = await client.fetch(contactQuery);
    const services = await client.fetch(query, { slug });

    const service = services[0];

    if (!service) {
        return { notFound: true };
    }

    return { props: { service, locale, contactData }, revalidate: 10 }; 
}

