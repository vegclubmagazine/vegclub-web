import { API } from "../../config/api";
import Layout from "../../defaults/Layout";
import { MdOutlineOpenInNew } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import Link from "next/link";
import { Fragment } from "react";


const qs = require("qs");


const restaurant = ({restaurant})=>
{
    const mapBaseUrl = "https://google.com/maps/search/";
    
    const encodeQuery = (q)=>
    {
        if(!q || !q.split("").length) return q;

        if(q.split(" ").length < 2) return q.toUpperCase();
        return q.toUpperCase().split(" ").join("+");
    }

    
   

   

    
    return (
        <Layout 
            title={(restaurant?.attributes?.name || "restaurant")+ " | VegClub Magazine"}
            desc={restaurant?.attributes?.description}
        >
            <main className="border-black/[.1]">
                <div className="py-2 border-b-[1px] px-[20px] md:px-[40px] text-black/[.6]">
                    <Link href="/restaurants" className="inline-block align-middle uppercase cursor-pointer text-[0.833rem] underline w-fit">restaurants</Link>
                    <div className="inline-block w-[6px]  h-[6px] ml-2 align-middle rotate-[45deg] border-black border-t-[1px] border-r-[1px]"></div>
                    <div className="inline-block ml-2 w-fit text-[0.833rem] align-middle uppercase">{restaurant?.attributes?.name || ""}</div>


                </div>
                <div className="lg:pl-[40px] border-b-[1px] flex flex-col-reverse lg:grid lg:grid-cols-[2fr_3fr] ">
                    <div className="border-r-[1px] py-5 px-[20px]  md:px-[40px] lg:pl-0 lg:pr-[40px] ">
                        <h1 className="text-[2.074rem] md:text-[2.488rem] font-bold">{restaurant?.attributes?.name}</h1>
                        <p className="mt-2 text-[1.44rem] md:text-[1.728rem] font-semibold">{restaurant?.attributes?.city},<span className="ml-2">{restaurant?.attributes?.country}</span></p>
                        <div className="mt-5 flex flex-row">
                            <div className="flex flex-col grow">
                                <p>{restaurant?.attributes?.address_line_one}</p>
                                <p>{restaurant?.attributes?.address_line_two}</p>
                                <p className="uppercase">{restaurant?.attributes?.zipcode}</p>
                            </div>
                            <Link target="_blank" rel="noreferrer noopener" href={`${mapBaseUrl}?api=1&query=${encodeQuery(restaurant?.attributes?.zipcode)}%20${encodeQuery(restaurant?.attributes?.address_line_one)}`} className=" w-[100px] h-fit text-black/[.8]">
                                <MdOutlineOpenInNew className="inline-block align-middle"/>
                                <p className="inline-block ml-2 align-middle text-[.833rem] md:text-[1rem] underline">See in map</p>
                                
                            </Link>
                        </div>
                        <div className="mt-5 flex flex-row">
                            <div className="flex grow">
                                <p className="font-semibold uppercase">discount offered:</p>
                            </div>
                            <div className="w-[100px] font-semibold">{restaurant?.attributes?.percentDiscount}%</div>
                        </div>
                        <p className="mt-5">{restaurant?.attributes?.description}</p>
                        <div className="mt-5">
                            {restaurant?.attributes?.instagram &&(
                                <Link href={restaurant?.attributes?.instagram} className="inline-block align-middle">
                                    <FaInstagram className="text-[1.2rem] transition-all ease-[cubic-bezier(.19,1,.22,1]) duration-[.34s] hover:text-black/[.6]"/>
                                </Link>
                            )}
                            {restaurant?.attributes?.siteUrl && (
                                <Link target="_blank" rel="noopener noreferrer" href={restaurant?.attributes?.siteUrl} className="text-black/[.8] inline-block align-middle ml-5">
                                    <MdOutlineOpenInNew className=" inline-block align-middle"/>
                                    <p className=" ml-1 text-[0.833rem] md:text-[0.833rem] inline-block align-middle underline">{restaurant?.attributes?.siteUrl}</p>
                                </Link>
                            )}
                        </div>
                        {restaurant?.attributes?.notes ? (
                            <Fragment>
                                <div className="mt-5 h-[6px] bg-black/[.8] r-dtls-division"></div>
                                <p className="mt-3 text-[0.833rem]">{restaurant?.attributes?.notes}</p>
                                <div className="mt-3 h-[6px] bg-black/[.8] r-dtls-division"></div>
                            </Fragment>
                        ):("")}
                        
                    </div>
                    <div className="overflow-hidden lg:max-h-[600px]">
                    {restaurant?.attributes?.image?.data?.length ?   
                    (
                            <img src={restaurant?.attributes?.image?.data[0]?.attributes?.url} className="w-full h-auto object-cover"></img>
                    ):(

                        ""

                    )}
                    </div>
                </div>
            
            </main>
        </Layout>
    )
}



export async function getStaticPaths()
{
    const response = await fetch(`${API}/restaurants`);
    const {data} = await response.json();
    
    const paths = data?.map((restaurant)=>({params:{slug:restaurant?.attributes?.slug}}))

    return {paths, fallback:"blocking"};

    

}


export async function getStaticProps({params})
{
    const {slug} = params;

    const filters = qs.stringify({

        populate:"*",
        filters:{
            slug:{
                $eq:slug
            },
        },

    },{encodeValuesOnly:true})

    

    const response = await fetch(`${API}/restaurants?${filters}`);


    const {data} = await response.json();

    
    

    

    return {
        props:{
            restaurant:data[0] || null
        },
        revalidate:10
    }


}


export default restaurant;