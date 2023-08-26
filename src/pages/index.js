import { client } from "../../lib/client";
import Contact from '../components/Contact'
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Navbar from "@/components/Navbar";



export default function Home({  contactData, locale, menuData }) {
const { t } = useTranslation();

  return (

    <div>
      <Navbar menuData={menuData} locale={locale} />
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
    }`
    const menuData = await client.fetch(menuQuery)
    const contactData = await client.fetch(contactQuery)
    return {
      props: {
        menuData,
        contactData,
        locale: locale,
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