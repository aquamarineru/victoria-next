import { client } from "../../lib/client";
import Contact from '../components/Contact'
//import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { HomePage} from "@/components";
import About from "@/components/About";
import Section from "@/components/Section";
import BuyMeCoffee from "@/components/BuyMeCoffee";
import Social from "@/components/Social";
import Services from "@/components/Services";


export default function Home({  contactData, locale, homeData, aboutData, servicesData }) {
  console.log(homeData)
  return (

    <div>
        <HomePage homeData={homeData} locale={locale} />
        <About aboutData={aboutData} locale={locale} />
        <Services servicesData={servicesData} locale={locale}  />
       {/*  <About aboutData={aboutData} locale={locale} />
        <Services servicesData={servicesData} locale={locale}  />
        <Contact contactData={contactData} locale={locale} /> */}
    </div>
  )
}


export async function getStaticProps({ locale }) {
  try {

    const contactQuery = `*[_type == "contact"]{
      _id,
      title,
      subtitle,
      description,
      image,
      bg,
      button,
    }`
    const homeQuery = `*[_type == "home"]{
      _id,
      seoImage,
      seoTitle,
      seoDescription,
      title,
      subtitle,
      bg,
      button,
      bgImage,
      callToAction,
    }`
    const aboutQuery = `*[_type == "about"]{
      _id,
      title,
      description,
      image,
      bg,
      button,
      body,
    }`
    const servicesQuery = `*[_type == "services"]{
      _id,
      title,
      description,
      bg,
      allServices[]->{
        _id,
        seoTitle,
        seoDescription,
        seoImage,
        title,
        description,
        image,
        button,
        slug,
        body,
      },
    }`

    const homeData = await client.fetch(homeQuery)
    const aboutData = await client.fetch(aboutQuery)
    const contactData = await client.fetch(contactQuery)
    const servicesData = await client.fetch(servicesQuery)

    return {
      props: {
        contactData,
        homeData,
        aboutData,
        servicesData,
        locale: locale,
        ...(await serverSideTranslations(locale, ['common'])),
      }
    }
  }catch (error) {
    console.log(error)
    return {
      props: {}
    }
  } 
}