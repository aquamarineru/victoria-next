import Image from "next/image";
import { urlFor } from "../../lib/client";
import Link from "next/link";
import { Title } from ".";
import BlockContent from '@sanity/block-content-to-react';
const serializers = {
    types: {
      block: (props) =>{
        switch (props.node.style) {
        case 'h1':
          return <h1 className=" text-xl md:text-3xl font-bold font-title mb-5 text-center text-basic/90">{props.children}</h1>;
        case 'h2':
            return <h2 className=" text-xl md:text-2xl font-semibold font-title mb-5 text-center text-basic/80">{props.children}</h2>;
        case 'h3':
            return <h3 className="text-basic/70 text-lg md:text-xl font-semibold mb-4">{props.children}</h3>;
        case 'paragraph':
            return <p className="text-sm text-dark md:text-base font-light font-text mb-4">{props.children}</p>;
        case 'bullet':
            return <ul className="list-disc pl-6 font-light text-sm text-dark md:text-base font-text mb-4"><li className="mb-2">{props.children}</li></ul>;
        case 'number':
            return <o className="list-disc pl-6 font-light text-sm text-dark md:text-base font-text mb-4"><li className="mb-2">{props.children}</li></o>;
        default:
            return <p className="text-sm text-dark md:text-base font-light font-text mb-4">{props.children}</p>;
        }
      },
      listItem: (props) => <li className="mb-2">{props.children}</li>
    },
  };

export default function Publication({ key, title, description, link, image, author, button, locale }) {
    const localizedButton = button?.find(item => item._key === locale)?.value;
    const localizedAuthor = author?.find(item => item._key === locale)?.value;

    return (

        <div className="py-10"
        key={key}>   
        <ul className="flex items-center flex-col">
            <li className="mb-4 flex flex-col gap-5 md:flex-row items-center justify-center">
                {image &&
                <Image 
                src={urlFor(image).crop('center').fit('crop').width(1000).height(1080).url()}
                alt={title || "Publication Image"}
                width={200}
                height={200}
                className='mt-5 md:mt-12 object-cover rounded shadow-custom z-10'
                />
                }
                <div className=" px-4 w-[300px] md:w-[500px] ">
                    <h3 className="text-xl font-title font-bold">
                        {title}
                    </h3>
                    <BlockContent
                    blocks={description[locale]}
                    serializers={serializers}
                    className='about-content'
                    />
                    <p>Author: {localizedAuthor}</p>
                    <Link 
                    href={link} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-basic mt-3 inline-block hover:underline">{localizedButton}</Link>

                </div>


            </li>

                        </ul>
                    </div>
    )
}