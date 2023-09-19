import React from 'react'
import { client, urlFor } from '../../../lib/client'
import Head from 'next/head'
import Container from '@/components/Container'
import Image from 'next/image'
import Article from '@/components/Article'
import Title from '@/components/Title'
import Content from '@/components/Content'
import Breadcrumb from "@/components/Breadcrumb"

export default function MyService({ service, locale }) {
    const localizedTitle = service.title.find(t => t._key === locale);
    const paths = [ localizedTitle && localizedTitle.value || '' ]

    console.log(service)
    return (
        <>
        <Head></Head>
        <Breadcrumb paths={paths}/>
            <Container className='py-10'>
            <Article backUrl='/'>
                <Image 
                src={urlFor(service.image).url()}
                alt={service.seoTitle}
                width={500}
                height={500}
                className='object-cover rounded shadow-custom'
                />
                <div className='py-10'>
                    <Content body={service.body} />

                </div>
                
            </Article>
            </Container>


        </>
    )
}

export async function getStaticPaths() {
    const query = `*[_type == "service"]{ 'slug': slug.current }`;
    const services = await client.fetch(query);
    
    const paths = services.map(service => ({
        params: { slug: service.slug },
        locale: service.locale || 'en' // You can adjust this if your data structure is different
    }));

    return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params, locale }) {
    const { slug } = params;

    const query = `*[_type == "service" && slug.current == $slug]{
        'slug': slug.current,
        seoTitle,
        seoDescription,
        seoImage,
        image,
        body,
        title,
    } `;
    const services = await client.fetch(query, { slug });

    const service = services[0];

    if (!service) {
        return { notFound: true };
    }

    return { props: { service, locale }, revalidate: 10 }; 
}

