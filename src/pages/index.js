import { client } from "../../lib/client";



export default function Home({ menuData }) {
  console.log(menuData)
  return (

    <div>
      <h1 className="text-4xl font-bold text-center">Hello World</h1>
    </div>
  )
}

export async function getStaticProps() {
  const menuQuery = '*[_type == "menu"]'
  const menuData = await client.fetch(menuQuery)
  
  return {
    props: {
      menuData
    }
  }
}