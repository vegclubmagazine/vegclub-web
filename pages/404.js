import Layout from "../defaults/Layout";


const NotFound = ()=>
{
    return(
        <Layout>
            <div className="">
                    <h1 className="lg:hidden uppercase mt-5 w-fit mx-auto font-semibold italic text-[1.44rem]">page not found.</h1>

                    <div className="mx-auto mt-5 w-[90%] max-w-[600px] lg:inline-block lg:ml-[10%] lg:align-middle lg:w-[90%] ">
                        <img className="" src="/404_transparent_5.png"></img>
                    </div>
                    <div className="w-[90%] mx-auto text-center  lg:text-start lg:align-middle  lg: ml-[3rem] mt-5 mb-5 lg:inline-block lg:w-[30%]">
                        <h1 className="hidden lg:block uppercase w-fit italic font-semibold text-[1.728rem]">Page not found.</h1>
                        <p className="text-[1.2rem] lg:mt-5">
                            We can’t find the page you’re looking for. It has likely either moved or no longer exists, or the website address is incorrect.
                            
                            
                           
                        </p>
                        <p className="mt-2 text-[1.2rem]">We’re sorry for any inconvenience.</p>
                        <p className="underline text-[1.2rem] uppercase  font-semibold mt-5 lg:text-[1.2rem]"><a href="/">Home</a></p>
                    </div>
                
                
            </div>
        </Layout>
    )
}


export default NotFound;