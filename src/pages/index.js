import { client } from "../../lib/client";
import Contact from '../components/Contact'



export default function Home({ menuData, contactData }) {
  console.log(menuData)
  console.log(contactData)
  return (

    <div>
      <h1 className="text-4xl font-bold text-center">Hello World</h1>
      <Contact contactData={contactData} />
    </div>
  )
}

export async function getStaticProps() {
  const menuQuery = '*[_type == "menu"]'
  const contactQuery = '*[_type == "contact"]'
  const menuData = await client.fetch(menuQuery)
  const contactData = await client.fetch(contactQuery)
  return {
    props: {
      menuData,
      contactData
    }
  }
}