import Link from "next/link";
import Image from "next/image";
import { urlFor } from "../../lib/client";
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import Slider from 'react-slick';

const NextArrow = ({ onClick }) => {
    return (
        <BsArrowRight 
        style={{ 
          color: "#090909", 
          fontSize: "25px", 
          position: "absolute",
          top: "50%",
          right: "0",
          transform: "translateY(-50%)",
          zIndex: "1"
       }} 
        onClick={onClick} />
    );
  }
  
  const PrevArrow = ({ onClick }) => {
    return (
        <BsArrowLeft 
        style={{ 
          color: "#090909", 
          fontSize: "25px", 
          position: "absolute",
          top: "50%",
          left: "0",
          transform: "translateY(-50%)",
          zIndex: "1"
       }}  
        onClick={onClick} 
        />
    );
  }

export default function RelatedPosts({ post, relatedPosts, locale }) {
    const filteredRelatedPosts = relatedPosts.filter(relatedPost => relatedPost.slug.current !== post.slug.current);
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: true,
              }
            },
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
              }
            },
            {
              breakpoint: 800,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
      };
    if (!relatedPosts) {
      return <div>Loading...</div>;
    } 

    return (
        <div className="py-10">
      {filteredRelatedPosts && filteredRelatedPosts.length > 0 && (
        <div className=''>
          <h2 className='text-xl font-title font-semibold mb-4'>
            This posts can be interesting for you:
          </h2>
          <Slider {...settings}> 
            {filteredRelatedPosts.map(relatedPost => {
              const localizedTitle = relatedPost.title.find(item => item._key === locale);
              return (
                <li key={relatedPost.slug.current} className=''>
                  <Link 
                    href={`/blog/${relatedPost.slug.current}`}
                    className="text-dark border-hover bg-slate-100 p-4 rounded-md flex flex-col items-center"
                  >
                    {relatedPost.image && (
                      <div className="block">
                        <Image 
                          src={urlFor(relatedPost.image).crop('center').fit('crop').width(800).height(800).url()}
                          alt={localizedTitle && localizedTitle.value}
                          width={300}
                          height={300}
                          priority={true}
                          className='object-cover w-[200px] h-[200px] z-10 rounded-md shadow-custom'
                        />
                      </div>
                    )}
                    <h3 className='mt-3 font-bold text-center'>{localizedTitle && localizedTitle.value}</h3> 
                  </Link>
                </li>
              );
            })}
          </Slider>
        </div>
      )}
    </div>
    );
}
