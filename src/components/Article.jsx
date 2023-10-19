import Link from "next/link"
import { PiArrowLeftLight} from 'react-icons/pi'
export default function Article({ children, backUrl }){
    return (
        <article className="">
            <div className="pt-5 flex flex-col items-center justify-center gap-5 ">
                {children}
            </div>
        </article>
    )
}