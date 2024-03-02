import Layout from "../defaults/Layout";


const NotFound = ()=>
{
    return(
        <Layout>
            <div className="">
                    <h1 className="uppercase mt-5 w-fit mx-auto font-semibold italic text-[1.44rem]">page not found.</h1>

                    <div className="mx-auto mt-5 w-[90%] max-w-[600px] ">
                        <img className="" src="/404_transparent_5.png"></img>
                    </div>
                    <div className="w-[90%] mx-auto text-center mt-5 mb-5">
                        <p className="text-[1.2rem]">
                            We can’t find the page you’re looking for. It has likely either moved or no longer exists, or the website address is incorrect.
                            
                            
                           
                        </p>
                        <p className="mt-2 text-[1.2rem]">We’re sorry for any inconvenience.</p>
                        <p className="underline text-[1.2rem] uppercase italic font-semibold mt-5"><a href="/">Home</a></p>
                    </div>
                
                
            </div>
        </Layout>
    )
}


export default NotFound;