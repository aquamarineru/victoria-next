import React from "react"
import { Title, Container} from "."
import Service from "./Service"

export default function Services({ servicesData, locale }) {
    return (
        <div 
        id="services"
        className="w-full h-full">
            {
                Array.isArray(servicesData) && servicesData.map((serviceItem) => {
                    const localizedTitle = serviceItem.title?.find(item => item._key === locale)?.value;
                    const localizedDescription = serviceItem.description?.find(item => item._key === locale)?.value;

                    return(
                        <div
                        key={serviceItem._id}
                        className="w-full bg-center bg-no-repeat bg-gradient-to-t from-light via-basic/20 to-basic/40  bg-cover py-10">
                            <Container>
                                <div 
                                className="flex flex-col items-center justify-between gap-5 pb-5">
                                    <Title 
                                    type='medium'>
                                        {localizedTitle}
                                    </Title>
                                    <p className="text-center font-text">{localizedDescription} 
                                    </p>
                                </div>
                                <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {
                                        serviceItem.allServices.map((service) => {
                                            return(
                                                <div key={service._id}>
                                                    <Service 
                                                    title={service.title} 
                                                    image={service.image}
                                                    slug={service.slug}
                                                    description={service.description}
                                                    button={service.button}
                                                    locale={locale}
                                                    />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </Container>
                        </div>
                    )
                })
            }
            
        </div>
    )
}

/* 

 */