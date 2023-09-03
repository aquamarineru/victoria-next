import BlockContent from '@sanity/block-content-to-react';
import { clientConfig } from '../../lib/client';
import Image from 'next/image'

const serializers = {
    types: {
      mainImage: (props) => (
        <div className="">
          <Image
            src={props.node.asset.url}
            alt={props.node.alt}
            className="w-full h-auto"
            width={1000}
            height={800}
          />
        </div>
      ),
    },
  };


export default function Content({ body }) {
    return (
        <div className="">
            <BlockContent
                blocks={body}
                imageOptions={{ w: 1000, h: 800, fit: 'max',  }}
                projectId={clientConfig.projectId}
                dataset={clientConfig.dataset}
                serializers={serializers}
                className='block-content w-[300px] px-2 md:w-[700px] '
            />
        </div>
    )
}