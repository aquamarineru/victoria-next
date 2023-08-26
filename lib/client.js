import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const clientConfig = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
}
export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2023-05-16',
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
    useCdn: false,
    ignoreBrowserTokenWarning: true,
});

const builder = imageUrlBuilder(client)
export const urlFor = source => builder.image(source)