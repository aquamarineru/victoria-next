import Article from "./Article"
import Title from "./Title"
import Content from "./Content"
import Breadcrumb from "./Breadcrumb"
import { format } from 'date-fns'
import BlockContent from '@sanity/block-content-to-react';
import Image from "next/image"

const serializers = {
    types: {
        mainImage: (props) => (
            <div className="">
              <Image
                src={props.node.asset.url}
                alt={props.node.alt}
                className=" h-auto rounded shadow my-10 "
                width={1000}
                height={800}
              />
            </div>
          ),
        block: (props) => {
            switch (props.node.style) {
                case 'h2':
                    return <h2 className=" text-xl md:text-3xl font-semibold font-h1 mb-5 text-center text-dark/80">{props.children}</h2>;
                case 'h3':
                    return <h3 className="text-dark text-2xl font-medium mb-4">{props.children}</h3>;
                case 'paragraph':
                    return <p className="text-sm text-dark md:text-base font-light mb-4">{props.children}</p>;
                case 'bullet':
                    return <ul className="text-dark list-disc pl-6 mb-4 font-light text-sm md:text-base"><li className="mb-2">{props.children}</li></ul>;
                case 'number':
                    return <ol className="text-dark list-decimal pl-6 mb-4 font-light"><li className="mb-2">{props.children}</li></ol>;
                default:
                    return <p className="text-dark text-sm md:text-base font-light mb-4">{props.children}</p>;
            }
        },
        listItem: (props) => <li className="mb-2">{props.children}</li>,
    },
};

export default function BodyPost({ post, locale }) {

    const date = format(new Date(), 'dd MMM yyyy')
    const localizedTitle = post.title.find(item => item._key === locale);
    const localizedReadingTime = post.readingTime?.find(entry => entry._key === locale)?.value;
    const paths = [ 'blog', localizedTitle && localizedTitle.value || '' ]


    return ( 
        <>
            <Breadcrumb paths={paths}/>
            <Article backUrl='/blog'>
                <Title>{localizedTitle && localizedTitle.value}</Title>
                <div className="grid grid-cols-2 gap-10 py-4 text-sm">
                <div 
                className="flex flex-col grid-row-1 grid-col-1"> 
                    <p 
                    className="mb-2 font-bold text-basic text-base md:text-lg text-opacity-50 ">
                    Published on: 
                    </p>
                    {date} 
                </div>
                <div 
                className="flex flex-col grid-row-1 grid-col-2">
                    <p className="mb-2 font-bold text-basic text-base md:text-lg text-opacity-50">
                        Reading Time:
                    </p>
                    {localizedReadingTime}
                </div>
                    <div className="flex flex-col grid-row-2 grid-col-1 gap-2">
                        <p className="font-bold font-title text-basic text-opacity-50 md:text-lg">Tags:</p>
                        <div>
                            {post.tags && post.tags.map((tagRef) => (
                                <span
                                className="rounded-md border-[1px] border-basic uppercase text-basic  border-opacity-20 bg-glass px-2 py-1 font-light text-sm md:text-base"
                                    key={tagRef._ref}> 
                                    {tagRef.name}
                                </span>
                            ))}
                        </div>
                            
                        
                    </div>
                    
                </div>
                    <Content body={post.body} locale={locale} />
            </Article>
        </>
    )
}