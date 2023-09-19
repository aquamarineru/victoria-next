import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import Title from "./Title";
import { urlFor } from "../../lib/client";

export default function Service({ title, image, slug, description, button,  locale}) {
    const localizedTitle = title?.find(item => item._key === locale)?.value;
    const localizedDescription = description.find(item => item._key === locale)?.value;
    const localizedButton = button?.find(item => item._key === locale)?.value;

    return (
        <div className="flex flex-col items-center justify-between gap-3 w-[400px]">
            <Image 
            src={urlFor(image).crop('center').fit('crop').width(800).height(800).url()}
            alt={title && title[0].value}
            width={300}
            height={300}
            className="object-cover rounded shadow-custom"  />
            <Title type='small'>{localizedTitle}</Title>
            <p className="text-base text-center">{localizedDescription}</p>
            <Link href={`/services/${encodeURIComponent(slug)}`}>
                <Button>{localizedButton}</Button>
            </Link> 
        </div>
    )

}