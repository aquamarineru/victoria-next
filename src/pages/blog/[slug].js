import React from 'react'
import { client } from '../../../lib/client'
import Head from 'next/head'
import Container from '@/components/Container'
import RelatedPosts from '@/components/RelatedPosts'
import BodyPost from '@/components/BodyPost'


const Post = ({ post, relatedPosts, locale }) => {

    return (
        <>
        <Head>
            <title>{post.seoTitle}</title>
            <meta property="og:title" content={post.seoTitle} />
            <meta property="og:description" content={post.seoDescription} />
            {post.seoImage && (
                <meta property="og:image" content={post.seoImage} />
            )}
            <meta property="og:type" content="website" />
        </Head>
        <div className='bg-light h-full'>
            <Container>
                <BodyPost post={post} locale={locale} />
                <RelatedPosts 
                relatedPosts={relatedPosts} 
                post={post} 
                locale={locale}
                className='py-10' />
            </Container>
        </div>
        </>
    )
}
export default Post

export async function getStaticPaths() {
    const query = `*[_type == "post"]{
        'slug': slug.current,
    } `;
    const posts = await client.fetch(query);
    const paths = posts.map((post) => ({
        params: { slug: String(post.slug) },
    }));
    return { paths, fallback: 'blocking' };
}
export async function getStaticProps({ params: { slug }, locale }) {
    try {
        const query = `*[_type == "post" && slug.current == '${slug}'][0]{
            'tags': tags[]->{ _id, name },
            title,
            body,
            readingTime,
            seoTitle,
            seoDescription,
            seoImage,
            publishedAt,
            slug,
            image,
        }`;
        const post = await client.fetch(query, { slug });

        const relatedPostsQuery = `*[_type == "post"] {
            tags[]->{
                _id,
                name
            },
            title,
            slug,
            image,
        }`;
        const relatedPosts = await client.fetch(relatedPostsQuery);

        return {
            props: {
                post,
                relatedPosts,
                locale: locale,
            },
            revalidate: 60,
        };
    } catch (error) {
        console.error("Error fetching related posts:", error);
    }
}
