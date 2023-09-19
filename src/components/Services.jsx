import React from "react"
import Service from "./Service"
import Title from "./Title"
import Container from "./Container"

export default function Services({ servicesData, locale }) {
    console.log(servicesData)
    return (
        <>
            {servicesData.map(serviceGroup => {
                return(
                <div 
                id='services'
                key={serviceGroup._id}
                className="w-full bg-center bg-no-repeat bg-zinc-300 bg-cover py-10"
                style={{ backgroundColor: serviceGroup.bg.hex, opacity: .8 }}>
                <Container className="">
                    <div className="flex flex-col items-center justify-between gap-5 pb-5">
                    <Title type='medium'>{serviceGroup.title.find(item => item._key === locale)?.value}</Title>
                    <p className="text-center font-text">{serviceGroup.description.find(item => item._key === locale)?.value}</p>
                    </div>
                
                <div 
                className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {serviceGroup.allServices.map(service => {
                    return(
                    <div key={service._id} className="py-10  ">
                    <Service 
                    title={service.title} 
                    image={service.image}
                    slug={service.slug}
                    description={service.description}
                    button={service.button}
                    locale={locale}
                    />
                    </div>
                    )})}
                </div>
                </Container>
                </div>
            )})}
        </>
    )
}