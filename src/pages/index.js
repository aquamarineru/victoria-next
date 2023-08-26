import { client } from "../../lib/client";
import Contact from '../components/Contact'
import { useRouter } from "next/router";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';



export default function Home({ menuData, contactData }) {
  const { t } = useTranslation('common');

  console.log(menuData)
  console.log(contactData)
  return (

    <div>
      <h1 className="text-4xl font-bold text-center">{t('head')}</h1>
      <Contact contactData={contactData} />
    </div>
  )
}

export async function getStaticProps({ locale }) {
  try {
    const menuQuery = '*[_type == "menu"]'
    const contactQuery = '*[_type == "contact"]'
    const menuData = await client.fetch(menuQuery)
    const contactData = await client.fetch(contactQuery)
    return {
      props: {
        menuData,
        contactData,
        ...(await serverSideTranslations(locale, ['common'])),
      }
    }
  } catch (error) {
    console.log(error)
    return {
      props: {}
    }
  }
}