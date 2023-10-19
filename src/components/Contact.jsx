import React, { useRef, useState } from "react"
import { Container, Button, Title } from "."
import Image from "next/image"
import emailjs from 'emailjs-com';
import { urlFor } from "../../lib/client"
import BlockContent from '@sanity/block-content-to-react';


const serializers = {
    types: {
        block: (props) => {
            switch (props.node.style) {
                case 'paragraph':
                    return <p className="text-sm text-dark md:text-base font-title py-4">{props.children}</p>;
                case 'bullet':
                    return <ul className="text-light list-disc pl-6 mb-4 font-light text-sm md:text-base"><li className="mb-2">{props.children}</li></ul>;
                default:
                    return <p className="text-sm text-dark md:text-base font-title py-4">{props.children}</p>;
            }
        }
    }
}

export default function Contact({ contactData, locale, contactSlugData }) {
    const [popup, setPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');



    const form = useRef();
    function hidePopup() {
        setPopup(false);
    }
    function sendEmail(e) {
        e.preventDefault();
        const { name, email, message } = e.target.elements;
        const templateParams = {
            from_name: name.value,
            from_email: email.value,
            message: message.value,
          };

        emailjs.sendForm(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, 
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, 
            e.target, 
            process.env.NEXT_PUBLIC_EMAILJS_USER_ID)
            .then((result) => {
                setPopupMessage('Message sent successfully!');
                setPopup(true);
                form.current.reset(); 
            }, (error) => {
                setPopupMessage('An error occurred. Please try again.');
                setPopup(true);
                console.log(error.text);
            });
    }

    return (
        <div 
        id="contact" 
        className="w-full h-full bg-light bg-cover relative">
            {
                Array.isArray(contactData) && contactData.map((contactItem) => {
                    const localizedTitle = contactItem.title?.find(item => item._key === locale)?.value;
                    const localizeSubTitle = contactItem.subtitle.find(item => item._key === locale)?.value; 
                    const localizedBtn = contactItem.button?.find(item => item._key === locale)?.value;
                    return(
                        <div
                        key={contactItem._id}
                        className='py-10'>
                            <Container className="md:w-[700px] xl:w-3/4 ">
                                <div className= "flex items-center flex-col gap-5 py-16 text-dark text-center ">
                                    <Title type='medium' className="title" >{localizedTitle} </Title>
                                    <Title type='small'>{localizeSubTitle}</Title>
                                    <BlockContent
                                    blocks={contactItem.description[locale]}
                                    serializers={serializers}
                                    
                                    />
                                </div>
                                <div className="flex justify-around items-center pt-5 md:gap-4">
                                    <form
                                    ref={form} 
                                    action=""
                                    onSubmit={sendEmail} 
                                    >
                                        <div className='relative mb-2 h-[4rem]'>
                                            <label
                                            className='bg-light text-dark uppercase  absolute top-[-.5rem] left-[1.25rem] p-[0.25rem]'>
                                                Name
                                            </label>
                                            <input 
                                            type="text" 
                                            name="name" 
                                            placeholder='Your name' 
                                            required
                                            className="border-[1px] border-basic/50 bg-light bg-glass rounded-md px-3 py-3 mt-2 w-full "/>
                                        </div>
                                        <div className='relative mb-2 h-[4rem]'>
                                            <label
                                            className='bg-light text-dark uppercase  absolute top-[-.5rem] left-[1.25rem] p-[0.25rem] '>
                                                Email
                                            </label>
                                            <input 
                                            type="email" 
                                            name="email"  
                                            placeholder='Your email' 
                                            required
                                            className="border-[1px] border-basic/50 bg-light rounded-md px-3 py-3 mt-2 w-full "/>
                                        </div>
                                        <div className='relative mb-2 h-[4rem]'>
                                            <label
                                            className='bg-light text-dark uppercase absolute top-[-.5rem] left-[1.25rem] p-[0.25rem] '>
                                                Message
                                            </label>
                                            <textarea
                                            name='message' 
                                            cols="30" 
                                            rows="5" 
                                            placeholder='Send me your message'
                                            required
                                            className="border-[1px] border-basic/50 bg-light rounded px-3 py-3 mt-2 w-full ">
                                            </textarea>
                                        </div>
                                        <Button
                                        aria-label="send message"
                                        type="submit"
                                        className="border-basic/50 bg-light mt-24 inline-flex items-center justify-center gap-3 text-sm"
                                        >
                                            {localizedBtn}
                                        </Button>
                                        {popup && <div className="absolute top-0 left-0 right-0 bottom-0 bg-basic/50 flex items-center justify-center z-50">
                                    <div className="bg-light rounded-md p-5 flex flex-col items-center justify-center gap-5">
                                        <p className="text-dark text-center">{popupMessage}</p>
                                        <button
                                        aria-label="Close popup"
                                        role="Close popup"
                                        onClick={hidePopup}
                                        className="bg-green-800 text-light px-4 py-2 rounded-md"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>}
                                    </form>
                                    <Image
                                        src={urlFor(contactItem.image.asset).crop('center').fit('crop').width(400).height(480).url()} 
                                        alt={contactItem.title}
                                        width={400}
                                        height={400}
                                        sizes="(max-width: 300px) 100vw, 300px"
                                        className="object-cover hidden md:block"
                                    />
                                </div>

                            </Container>

                        </div>
                    )
                })
            }
            
        </div>
    );
}
