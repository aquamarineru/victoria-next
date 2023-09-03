import BlockContent from '@sanity/block-content-to-react';
import { clientConfig } from '../../lib/client';
import Image from 'next/image'

const serializers = {
    types: {
      mainImage: (props) => (
        <div className="">
          <Image
            src={props.node.asset.url}
            alt={props.node.alt}
            className="w-full h-auto"
            width={1000}
            height={800}
          />
        </div>
      ),
    },
  };

export default function ContentAbout({ body }) {
    return (
        <div className="">
            <BlockContent
                blocks={body}
                imageOptions={{ w: 1000, h: 800, fit: 'max',  }}
                projectId={clientConfig.projectId}
                dataset={clientConfig.dataset}
                serializers={serializers}
                className='about-content'
            />
        </div>
    )

}


/* import Contact from "@/components/Contact"
import Container from "@/components/Container"
import Breadcrumb from "@/components/Breadcrumb"

import Link from "next/link"
import { PiArrowLeftLight } from 'react-icons/pi'

export default function AboutPage({ aboutData, locale }) {
    const paths = ['About'];
    
    return (
        <>
            {aboutData.map((aboutItem) => {
                const localizedTitle = aboutItem.title?.find(item => item._key === locale)?.value;
                const localizedSubtitle = aboutItem.description?.find(item => item._key === locale)?.value;
                const localizedButton = aboutItem.button?.find(item => item._key === locale)?.value;

                return (
                    <div className="pt-24 md:pt-32" key={aboutItem._id}>
                        <Container>
                            <Breadcrumb paths={paths} />
                            <Link href='/'>
                                <button className="flex items-center gap-3 before-element">
                                    <PiArrowLeftLight className="transition-all duration-400 ease-in-out hover:transform hover:translate-x-1 cursor-pointer" />
                                    Back
                                </button>
                            </Link>
                            <div>{localizedTitle}</div>
                        </Container>
                    </div>
                );
            })}
        </>
    );
}

export async function getStaticProps({ locale }) {
    // Ensure you have imported the client at the top of your file
    try {
        const aboutQuery = `*[_type == "about"]{
            title,
            description,
            image,
            bg,
            button,
        }`
        const aboutData = await client.fetch(aboutQuery);
        
        return {
            props: {
                aboutData,
                locale,
            },
        }
    } catch (err) {
        console.log(err);
        return {
            props: {
                aboutData: [],
                locale,
            },
        }
    }
} */