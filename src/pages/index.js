import { client } from "../../lib/client";
import Contact from '../components/Contact'
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Navbar from "@/components/Navbar";
import HomePage from "@/components/HomePage";



export default function Home({  contactData, locale, menuData, homeData }) {
  console.log(homeData)
const { t } = useTranslation();

  return (

    <div>
      <Navbar menuData={menuData} locale={locale} />
      <HomePage homeData={homeData} locale={locale} />
      <Contact contactData={contactData} locale={locale} />
    </div>
  )
}


export async function getStaticProps({ locale }) {
  try {
    const menuQuery = `*[_type == "menu"] {
      title,
      "slug": slug.current,
    }`
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

    const menuData = await client.fetch(menuQuery)
    const homeData = await client.fetch(homeQuery)
    const contactData = await client.fetch(contactQuery)
    return {
      props: {
        menuData,
        contactData,
        locale: locale,
        homeData,
        ...(await serverSideTranslations(locale, [])),
      }
    }
  } catch (error) {
    console.log(error)
    return {
      props: {}
    }
  }
}