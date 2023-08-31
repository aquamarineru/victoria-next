import Container from "./Container"
import Image from "next/image"
import { urlFor } from "../../lib/client"
import Button from "./Button";
import Title from "./Title";

export default function Contact({ contactData, locale }) {
    console.log(contactData);

    return (
        <>
            {contactData.map((contactItem) =>{ 
            const localizedTitle = contactItem.title?.find(item => item._key === locale)?.value;
            const localizeSubTitle = contactItem.subtitle.find(item => item._key === locale)?.value; 
            const localizeDescription = contactItem.description.find(item => item._key === locale)?.value;
            const localizedBtn = contactItem.button?.find(item => item._key === locale)?.value;
            return(    
                <section
                    key={contactItem._id}
                    style={{ backgroundColor: contactItem.bg.hex }}
                    className='h-screen w-full bg-center bg-no-repeat opacity-75 bg-zinc-300 bg-cover'>
                        <Container>
                            <div className= "flex items-center flex-col gap-5 py-16 text-dark text-center">
                                <Title type='medium' className="title" >{localizedTitle} </Title>
                                <Title type='small'>{localizeSubTitle}</Title>
                                <p className="font-text text-base md:text-lg xl:w-[700px] ">{localizeDescription}</p>
                            </div>
                            <div className="flex justify-around items-center pt-10">
                                <form action="#">
                                <div className='relative mb-2 h-[4rem]'>
                                <label
                                style={{ backgroundColor: contactItem.bg.hex }}
                                className=' uppercase  absolute top-[-.5rem] left-[1.25rem] p-[0.25rem]'>Name</label>
                                <input 
                                style={{ backgroundColor: contactItem.bg.hex }}
                                type="text" 
                                name="name" 
                                placeholder='Your name' 
                                required
                                className="border-[1px] border-dark rounded-md px-3 py-3 mt-2 w-full "/>
                                </div>
                                <div className='relative mb-2 h-[4rem]'>
                                    <label
                                    style={{ backgroundColor: contactItem.bg.hex }} 
                                    className=' uppercase  absolute top-[-.5rem] left-[1.25rem] p-[0.25rem] '>Email</label>
                                    <input 
                                    style={{ backgroundColor: contactItem.bg.hex }}
                                    type="email" 
                                    name="email"  
                                    placeholder='Your email' 
                                    required
                                    className="border-[1px] border-dark rounded-md px-3 py-3 mt-2 w-full "/>
                                </div>
                                <div className='relative mb-2 h-[4rem]'>
                                    <label
                                    style={{ backgroundColor: contactItem.bg.hex }} 
                                    className='uppercase absolute top-[-.5rem] left-[1.25rem] p-[0.25rem] '>Message</label>
                                    <textarea
                                    style={{ backgroundColor: contactItem.bg.hex }} 
                                    name='message' 
                                    cols="30" 
                                    rows="5" 
                                    placeholder='Send me your message'
                                    required
                                    className="border-[1px] border-dark rounded px-3 py-3 mt-2 w-full ">
                                    </textarea>
                                </div>
                                <Button
                                type="submit"
                                style={{ backgroundColor: contactItem.bg.hex, color: "#090909" }}
                                className="mt-24">
                                    {localizedBtn}
                                </Button>

                                </form>
                                <Image
                                    src={urlFor(contactItem.image.asset).crop('center').fit('crop').width(400).height(480).url()} 
                                    alt={contactItem.title}
                                    width={300}
                                    height={300}
                                    className="rounded-md shadow-custom object-cover hidden md:block"
                                />
                            </div>
                        </Container>
                </section>
            )})}
        </>
    );
}