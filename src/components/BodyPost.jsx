import Article from "./Article"
import Title from "./Title"
import Content from "./Content"
import Breadcrumb from "./Breadcrumb"
import { format } from 'date-fns'

export default function BodyPost({ post, locale }) {

    const date = format(new Date(), 'dd MMM yyyy')
    const localizedTitle = post.title.find(item => item._key === locale);
    const paths = [ 'blog', localizedTitle && localizedTitle.value || '' ]


    return ( 
        <>
            <Breadcrumb paths={paths}/>
            <Article backUrl='/blog'>
                <Title className=''>{localizedTitle && localizedTitle.value}</Title>
                <div className="grid grid-cols-2 gap-10 py-4 text-sm">
                    <div className="flex flex-col items-center"> 
                        <p className="mb-2 font-title font-bold ">Published on: </p>
                        {date}
                    </div>
                    <div className="flex flex-col items-center justify-between">
                        <p className="font-bold font-title">Reading Time:</p>
                        {post.readingTime[0]?.value}
                    </div>
                    <div className="flex gap-2 items-center col-span-2">
                        <p className="font-bold font-title">Tags: </p>
                        <ul>
                            {post.tags && post.tags.map((tagRef) => (
                                <li
                                    className="rounded-md border-[1px] border-dark uppercase border-opacity-20 bg-glass px-2 py-1"
                                    key={tagRef._ref}> 
                                    {tagRef.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                </div>
                    <Content body={post.body} />
            </Article>
        </>
    )
}