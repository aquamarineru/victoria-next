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

    return (
        <div className="bg-light pt-24 md:pt-36">
            <Container>
            <Breadcrumb paths={paths} />
            <Link
            href='/'
            >
                <button className="flex items-center gap-3 before-element py-10">
                <PiArrowLeftLight className="transition-all duration-400 ease-in-out hover:transform hover:translate-x-1 cursor-pointer" />
                Back
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