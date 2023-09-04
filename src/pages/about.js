import Contact from "@/components/Contact"
import Container from "@/components/Container"
import Breadcrumb from "@/components/Breadcrumb"
import ContentAbout from "@/components/ContentAbout"
import { client, urlFor } from '../../lib/client'
import Image from 'next/image'
import Title from "@/components/Title"

import Link from "next/link"
import { PiArrowLeftLight} from 'react-icons/pi'

export default function AboutPage({ aboutData, locale, }) {
    console.log(aboutData)
    const paths = ['About']
    return (
        <div className="">
        {aboutData.map((aboutItem) => {
            const localizedTitle = aboutItem.title?.find(item => item._key === locale)?.value;

            return (
                <div className="pt-24 md:pt-36 h-full text-center" key={aboutItem._id} style={{ backgroundColor: aboutItem.bg.hex }} >
                    <Container>
                        <Breadcrumb paths={paths} />
                        <Link href='/'>
                            <button className="flex items-center gap-3 before-element">
                                <PiArrowLeftLight className="transition-all duration-400 ease-in-out hover:transform hover:translate-x-1 cursor-pointer" />
                                Back
                            </button>
                        </Link>
                        <Title >{localizedTitle}</Title>

                        <div className="flex flex-col items-center lg:flex-row lg:items-start justify-between gap-10">
                            <Image
                                    src={urlFor(aboutItem.myImage).crop('center').fit('crop').width(1000).height(1080).url()} 
                                    alt={aboutItem.title}
                                    width={400}
                                    height={400}
                                    priority={true}
                                    className='mt-5 md:mt-12 object-cover rounded shadow-custom z-10'
                                    />

                            <ContentAbout body={aboutItem.body} />
                        </div>
                        <div className="py-10">
                            <Title>Publications</Title>

                            <ul className="flex items-center flex-col">
                                {aboutItem.publications && aboutItem.publications.map((publication, index) => (
                                    <li 
                                    key={index} 
                                    className="mb-4 flex flex-col gap-5 md:flex-row items-center justify-center">
                                        {publication.image && 
                                            <div className="mt-3 hidden md:block">
                                                <Image 
                                                    src={urlFor(publication.image).crop('center').fit('crop').width(1000).height(1080).url()} 
                                                    alt={publication.title || "Publication Image"} 
                                                    width={200} 
                                                    height={200} 
                                                    className='mt-5 md:mt-12 object-cover rounded shadow-custom z-10'
                                                />
                                            </div>
                                        }
                                        <div className=" px-4 w-[300px] md:w-[500px] ">
                                        <h3 className="text-xl font-bold">{publication.title}</h3>
                                        <p className="mt-2">{publication.description}</p>
                                        
                                        
                                        <p className="mt-1">Year: {publication.year}</p>
                                        {publication.author && <p>Author: {publication.author}</p>}
                                        <Link href={publication.link} target="_blank" rel="noreferrer" className="text-blue-500 mt-3 inline-block">Read More</Link>

                                        </div>
                                        
                                    </li>
                                ))}
                            </ul>
    </div>

                        
                    </Container>
                </div>
            );
        })}
    </div>
);
}

export async function getStaticProps({ locale }) {  
    const aboutQuery = `*[_type == "about"]{
        title,
        description,
        myImage,
        bg,
        body,
        publications[]->{
            title,
            description,
            link,
            image,
            year,
            author
        }
    }`

    const aboutData = await client.fetch(aboutQuery)

    return {
        props: {
            aboutData,
            locale,
        },
    };
}