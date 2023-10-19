import React from 'react'
import { client } from '../../lib/client'
import { Container, Breadcrumb } from '@/components'
import Link from "next/link";
import Head from 'next/head';
import { PiArrowLeftLight } from 'react-icons/pi';
import BlockContent from '@sanity/block-content-to-react';

const serializers = {
    types: {
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

  const TermsAndConditions = ({ termsAndConditions, locale }) => {
    console.log(termsAndConditions);
    const localizedTitle = termsAndConditions.title?.find(item => item._key === locale)?.value;
    const localizedBackButton = termsAndConditions.backButton?.find(item => item._key === locale)?.value || 'Back';
    const paths = [localizedTitle]; 

    return(
        <div className='bg-gray h-full w-full py-10'>
            <Container>
                <Head>
                    <title>Terms and Conditions | EmpowerHer</title>
                </Head>
                <Breadcrumb paths={paths} />  
                <Link href='/'>
                    <button className="flex items-center gap-3 hover:text-basic pt-24">
                        <PiArrowLeftLight className="transition-all duration-400 ease-in-out hover:transform hover:translate-x-1 cursor-pointer" />
                        {localizedBackButton}
                    </button>
                </Link>
                <div className="pt-10">
                    <h2 className='font-title text-dark font-black text-xl text-center'>{localizedTitle}</h2>
                    <BlockContent 
                        blocks={termsAndConditions.body[locale]} 
                        serializers={serializers} 
                    />
                </div>
            </Container>
        </div>
    )
  };
  export default TermsAndConditions;

  export async function getStaticProps({ locale }) {
    try {
        const query = `*[_type == "termsAndConditions"]{
            _id,
            title,
            backButton,
            body,
        }`;
        const [termsAndConditionsData] = await client.fetch(query); // Updated here

        return {
            props: {
                termsAndConditions: termsAndConditionsData,  // Updated here
                locale
            }
        };
    } catch (err) {
        console.log(err);
        return {
            props: {
                termsAndConditions: [],
                locale
            }
        };
    }
}