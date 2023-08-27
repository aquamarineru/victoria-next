import Container from "./Container"
import Image from "next/image"
import { urlFor } from "../../lib/client"

export default function Contact ({contactData, locale}) {
    console.log(contactData)
    return (
        <div>
            <Container>
                <div>
                    {
                        contactData.map((contactItem)=> {
                            const localizedTitle = contactItem.title?.find(item => item._key === locale)?.value;
                            if (localizedTitle) {
                                return (
                                    <h2 key= {contactItem._id} >
                                            {localizedTitle}
                                    </h2> )
                            } return null
                        })

                    }
                </div>
                <p></p>
                <div>
                   <form action="#">
                    <div className='relative mb-2 h-[4rem]'>
            <label className=' uppercase  absolute top-[-.5rem] left-[1.25rem] p-[0.25rem]'>Name</label>
                <input 
                type="text" 
                name="name" 
                placeholder='Your name' 
                required
                className="border-[1px]  rounded-md px-3 py-3 mt-2 w-full "/>
            </div>
            <div className='relative mb-2 h-[4rem]'>
                <label className=' uppercase  absolute top-[-.5rem] left-[1.25rem] p-[0.25rem] '>Email</label>
                <input 
                    type="email" 
                    name="email"  
                    placeholder='Your email' 
                    required
                    className="border-[1px] border-tomatoes rounded-md px-3 py-3 mt-2 w-full "/>
                </div>
                <div className='relative mb-2 h-[4rem]'>
                <label className='uppercase absolute top-[-.5rem] left-[1.25rem] p-[0.25rem] '>Message</label>
                    <textarea 
                    name='message' 
                    cols="30" 
                    rows="5" 
                    placeholder='Send me your message'
                    required
                    className="border-[1px] bor rounded px-3 py-3 mt-2 w-full ">
                    </textarea>
                </div>
                <button type="submit" className="px-8 py-2 text-light border  rounded  uppercase mt-24">
            Contact me
        </button>
                    </form> 
                    
                </div>
            </Container>
        </div>
    )
}