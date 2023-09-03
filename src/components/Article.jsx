import Link from "next/link"
import { PiArrowLeftLight} from 'react-icons/pi'
export default function Article({ children, backUrl }){
    return (
        <article className="pt-24 md:pt-32">
            <Link
            href={backUrl}
            >
                <button className="flex items-center gap-3 before-element">
                <PiArrowLeftLight className="transition-all duration-400 ease-in-out hover:transform hover:translate-x-1 cursor-pointer" />
                Back
                </button>
            </Link>
            <div className="pt-5 flex flex-col items-center justify-center ">
                {children}
            </div>
        </article>
    )
}