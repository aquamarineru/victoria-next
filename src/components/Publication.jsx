import Image from "next/image";
import { urlFor } from "../../lib/client";
import Link from "next/link";

export default function Publication({ aboutData }) {
    return (
        <>
            <h2>Publications:</h2>
            <div>
                {aboutData && aboutData.length > 0 && aboutData.map((publication, index) => (
                    <div key={index} className="publication-item">
                        <h3>{publication.title}</h3>
                        <p>{publication.description}</p>
                        {publication.image && 
                            <Image 
                                src={urlFor(publication.image).url()} 
                                alt={publication.title || "Publication Image"} 
                                width={100}
                                height={100}
                            />
                        }
                        <a href={publication.link} target="_blank" rel="noopener noreferrer">Read More</a>
                        <p>Year: {publication.year}</p>
                    </div>
                ))}
            </div>
        </>
    )
}