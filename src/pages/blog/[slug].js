import React from 'react'
import { client, urlFor } from '../../../lib/client'
import Head from 'next/head'
import Container from '@/components/Container'
import RelatedPosts from '@/components/RelatedPosts'
import BodyPost from '@/components/BodyPost'
import Link from 'next/link'
import { PiArrowLeftLight } from 'react-icons/pi'

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

const Post = ({ post, relatedPosts, locale }) => {
    const localizedBackButton = post.backButton.find(item => item._key === locale)?.value || 'Back';
    const seoImageUrl = post.seoImage && urlFor(post.seoImage.asset).url();
    const localizedSeoDescription = post.seoDescription && post.seoDescription[locale]
    ? blockToPlainText(post.seoDescription[locale])
    : null;
        
    return (
        <>
        <Head>
            <title>{post.seoTitle} | EmpowerHer</title>
            <meta name='og:title' content={post.seoTitle} />
            {localizedSeoDescription && <meta name="og:description" content={localizedSeoDescription} />}
            {localizedSeoDescription && <meta name="description" content={localizedSeoDescription} />}
            {seoImageUrl && <meta name="og:image" content={seoImageUrl} />}
            <meta property="og:type" content="website" />
        </Head>
        <div className="bg-gradient-to-b from-light via-basic/20 to-basic/40 pt-24">
            <Container>
                <Link
                href='/blog'
                >
                    <button 
                    className="flex items-center gap-3 hover:text-basic py-10">
                    <PiArrowLeftLight 
                    className="transition-all duration-400 ease-in-out hover:transform hover:translate-x-1 cursor-pointer" />
                    {localizedBackButton}
                    </button>
                </Link>
                <BodyPost 
                post={post} 
                locale={locale} />
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
            seoTitle,
            seoDescription,
            seoImage,
            image,
            title,
            publishedAt,
            readingTime,
            backButton,
            body,
            slug,
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
