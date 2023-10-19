import React, { useState } from "react"
import Container from "@/components/Container"
import Link from "next/link"
import PostGrid from "@/components/PostGrid"
import Post from "@/components/Post"
import { loadPosts } from './api/posts'
import Breadcrumb from "@/components/Breadcrumb"
import Button from "@/components/Button"
import { PiArrowLeftLight} from 'react-icons/pi'

const LOAD_MORE = 4

export default function Blog({ initialPosts, total, locale  }) {
    console.log(initialPosts)
    const paths = ['Blog']

    const [ posts, setPosts ] = useState(initialPosts)
    const [ loadedAmount, setLoadedAmount ] = useState(LOAD_MORE)
    const [ loading, setLoading ] = useState(false)

    const isLoadButtonVisible = loadedAmount < total

    const getMorePosts = async () => {
        setLoading(true)
        try{
            const data = await fetch(`/api/posts?start=${loadedAmount}&end=${loadedAmount + LOAD_MORE}`).then((res) => res.json())
            setLoadedAmount(loadedAmount + LOAD_MORE)
            setPosts([...posts, ...data.posts])
            setLoading(false)
        } 
        catch (err) {
            setLoading(false)
            console.log(err)
        }
    }
    const localizedBackButton = initialPosts.find(post => post.backButton)?.backButton.find(item => item._key === locale)?.value || 'Back';

    return (
        <div className="bg-gradient-to-b from-light via-basic/20 to-basic/40 pt-24 md:pt-24">
            <Container>
            <Breadcrumb paths={paths} />
            <Link
            href='/'
            >
                <button className="flex items-center gap-3 hover:text-basic py-10">
                <PiArrowLeftLight className="transition-all duration-400 ease-in-out hover:transform hover:translate-x-1 cursor-pointer" />
                {localizedBackButton}
                </button>
                
            </Link>
            <PostGrid className="">
            {posts.map((post) => (
                <Post 
                key={post.slug.current}
                title={post.title}
                image={post.image}
                slug={post.slug}
                description={post.description}
                tags={post.tags}
                button={post.button}
                locale={locale}></Post>
            ))}
            </PostGrid>
            {isLoadButtonVisible && (
                <div className="flex justify-center py-10">
                    <Button
                    className="inline-flex items-center justify-center gap-3 text-sm hover:bg-dark/70 hover:text-light"
                    onClick={getMorePosts}
                    disabled={loading}
                    >Load more post</Button>
                </div>
            )}
            </Container>
        </div>
    )
}

export async function getServerSideProps({ locale }) {
     const { posts, total } = await loadPosts(0, LOAD_MORE)

     return {
            props: {
                initialPosts: posts,
                total,
                locale: locale,
                
            
            }
     }
}