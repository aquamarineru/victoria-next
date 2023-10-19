import Image from "next/image";
import Link from "next/link";
import {Button, Title} from ".";
import { urlFor } from "../../lib/client";
import BlockContent from '@sanity/block-content-to-react';

const serializers = {
    types: {
        block: (props) => {
            switch (props.node.style) {
                case 'paragraph':
                    return <p className="text-sm text-dark md:text-base font-title py-4">{props.children}</p>;
                default:
                    return <p className="text-sm text-dark md:text-base font-title py-4">{props.children}</p>;
            }
        }
    }
}
export default function Service({ title, image, slug, description, button,  locale}) {
    const localizedTitle = title?.find(item => item._key === locale)?.value;
    
    const localizedButton = button?.find(item => item._key === locale)?.value;

    return (
        <div>
            <Link 
            href={`/services/${encodeURIComponent(slug.current || slug)}`}
            >
                <div className="flex flex-col items-center justify-center gap-4 px-4">
                    <Image 
                    src={urlFor(image).crop('center').fit('crop').width(800).height(800).url()}
                    alt={title && title[0].value}
                    width={300}
                    height={300}
                    className='object-cover h-full z-10 rounded-md shadow-custom opacity-50 transition-opacity duration-500 hover:opacity-100'  />
                    <Title type='small'>{localizedTitle}</Title>
                    <BlockContent
                    blocks={description[locale]}
                    serializers={serializers}
                    />
                    <Button
                    aria-label="read more" 
                    >{localizedButton}</Button>

                </div>
            </Link> 
        </div>
    )

}