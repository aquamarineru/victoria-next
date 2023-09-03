import { client } from "../../lib/client";
import Contact from '../components/Contact'
//import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import HomePage from "@/components/HomePage";
import About from "@/components/About";
import Section from "@/components/Section";
import BuyMeCoffee from "@/components/BuyMeCoffee";
import Social from "@/components/Social";


export default function Home({  contactData, locale, homeData, aboutData }) {
  return (

    <div>
      <Section>
        <HomePage homeData={homeData} locale={locale} />
        <Social />
        <BuyMeCoffee />
      </Section>
        <About aboutData={aboutData} locale={locale} />
        <Contact contactData={contactData} locale={locale} />

    </div>
  )
}


export async function getStaticProps({ locale }) {
  try {

    const contactQuery = `*[_type == "contact"]{
      title,
      subtitle,
      description,
      image,
      bg,
      button,
    }`
    const homeQuery = `*[_type == "home"]{
      seoTitle,
      seoDescription,
      seoImage,
      title,
      subtitle,
      bg,
      button,
      bgImage,
      callToAction,
    }`
    const aboutQuery = `*[_type == "about"]{
      title,
      description,
      image,
      bg,
      button,
      body,
    }`

    const homeData = await client.fetch(homeQuery)
    const aboutData = await client.fetch(aboutQuery)
    const contactData = await client.fetch(contactQuery)

    return {
      props: {
        contactData,
        homeData,
        aboutData,
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