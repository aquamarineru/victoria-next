import Link from "next/link";
import Image from "next/image";
import Title from "./Title";
import { urlFor } from "../../lib/client";
import Button from "./Button";
import { PiArrowRight } from "react-icons/pi";

export default function Post({ title, image, slug, description, tags, locale }) {
    const localizedTitle = title.find(item => item._key === locale).value;
    const localizedDescription = description.find(item => item._key === locale).value;

    return(
        <Link href={`/blog/${encodeURIComponent(slug.current)}`} 
        className="text-dark border-hover bg-slate-100 p-4 rounded-md">
            <div className=" flex flex-col gap-3 relative">
                <div className="hidden md:block">
                    {image && (
                    <Image 
                    src={urlFor(image).crop('center').fit('crop').width(800).height(800).url()}
                        alt={title && title[0].value}
                        width={300}
                        height={300}
                        priority={true}
                        className='object-cover w-full h-full z-10 rounded-md shadow-custom'
                    />
                    )}
                </div>
            
            <Title type='small'
            className="mb-7 text-center">{localizedTitle}</Title>
            <ul>
                {tags && tags.map((tagRef) => (
                    <li
                    className="inline-block bg-slate-200 text-slate-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 uppercase"
                    key={tagRef._ref}>
                        {tagRef.name}
                    </li>
                ))}
            </ul>
            <p className="leading-6">{localizedDescription}</p>
               
            <div  className="text-center relative">
              <button
              className="flex items-center justify-center gap-2 font-plex text-lg before-element"
              >
              Read More
              <PiArrowRight 
              className='transition-all duration-400 ease-in-out hover:transform hover:translate-x-1 cursor-pointer' 
              />    
              </button>
            </div>
            </div>
        </Link>


    )
}