import Link from "next/link";
import Layout from "../defaults/Layout";

/**
 * set up articles api and fetch from it \
 * begin linking webpages up \
 * set-up gooogle adsense
 */
const NotFound = ()=>
{
    return(
        
        <div className="h-screen">

            <div className="relative top-[50%] translate-y-[-50%]">
                    <h1 className="hidden uppercase mt-5 w-fit mx-auto font-semibold italic text-[1.44rem]">page not found.</h1>

                    <div className="mx-auto mt-5 w-[50%] max-w-[600px] lg:inline-block lg:ml-[10%] lg:align-middle lg:w-[90%] ">
                        <img className="" src="/404_transparent_5.png"></img>
                    </div>
                    <div className="w-[90%] mx-auto text-center  lg:text-start lg:align-middle  lg:ml-[3rem] mt-5 mb-5 lg:inline-block lg:w-[30%]">
                        <h1 className="hidden lg:block uppercase w-fit italic font-semibold text-[1.728rem]">Page not found.</h1>
                        <p className="hidden lg:block text-[1.2rem] lg:mt-5">
                            We can’t find the page you’re looking for. It has likely either moved or no longer exists, or the website address is incorrect.
                            
                            
                        
                        </p>
                        <p className="hidden lg:block mt-2 text-[1.2rem]">We’re sorry for any inconvenience.</p>
                        <p className="underline text-[1.2rem] uppercase  font-semibold mt-5 lg:text-[1.44rem]"><Link href="/">Home</Link></p>
                    </div>
                
                
            </div>
        </div>
        
    )
}


export default NotFound;