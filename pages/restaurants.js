import { Fragment } from "react";
import { API } from "../config/api";
import Layout from "../defaults/Layout";
import {useState, useRef, useEffect} from "react"
import { FaInstagram } from "react-icons/fa";
import Link from "next/link";


const qs = require("qs");


const restaurants = ({locations, first_location}) =>
{
   // location is in format: { country:{ city: [...places]}}
   
   const [imageIndex, setImageIndex] = useState(0);
   const [selection, setSelection] = useState(null);
   
   const [xVal, setXVal] = useState(0);
   const imgContainerRef = useRef(null);
   const sliderRef = useRef(null);
   
   const handleClick = (e)=>
   {
        setImageIndex(0);
        setSelection(JSON.parse(e.target.getAttribute("data-meta")));
        

   }

   useEffect(()=>{
        if(sliderRef.current)setXVal((-1* imageIndex)* sliderRef.current.getBoundingClientRect().width)
   },[imageIndex])
  
  
    return (
        <Layout title = "Restaurants | VegClub Magazine">
            <main className="border-black/[.1] ">
                <div className=" border-y-[1px] py-2 pl-[20px] md:px-[40px]">
                    <div className="inline-block w-fit  text-[0.833rem] uppercase">restaurants</div>
                    <div className="inline-block w-[6px]  h-[6px] ml-2 align-middle rotate-[45deg] border-black border-t-[1px] border-r-[1px]"></div>
                    <div className="inline-block w-fit text-[0.833rem] ml-3 text-black/[.6] uppercase underline">{selection ? selection?.attributes?.name : "find restaurant"}</div>
                </div>
                <div className="md:grid  md:grid-cols-[1fr_4fr] md:pr-[40px] pb-[40px]">
                
                  
                    <div className="uppercase r-menu text-[.833rem] max-h-[300px] border-black/[.1] border-b-[1px] md:border-b-[0px] md:max-h-[100vh] overflow-y-scroll"> 
                        {Object.keys(locations)?.map((country, index)=>(
                            <Fragment key={country}>
                                <div className="px-[20px] md:px-[40px] bg-[#f7f7f7] py-3">{country}</div>
                                <div>
                                    {Object.keys(locations[`${country}`]).map((city, j)=>(
                                        <Fragment key={city}>
                                            <div className="px-[20px] md:px-[40px] border-b-[1px] py-3">{city}</div>
                                            <div>
                                                {locations[`${country}`][`${city}`].map((place,k)=>(
                                                    <div key={place?.id || k} data-meta={JSON.stringify(place)} className="text-[#0018a8] py-3 px-[20px] md:px-[40px] cursor-pointer font-light border-b-[1px]" onClick={(e)=>{handleClick(e);}}>{place.attributes.name}</div>
                                                ))}
                                            </div>
                                        </Fragment>
                                    ))}
                                </div>
                            
                            </Fragment>
                        ))}
                    
                    </div>
                    
                    <div  className="">
                        {selection ? (
                            
                            <div className="mt-[20px] flex flex-col flex-col-reverse md:mt-0 md:grid md:grid-cols-[2fr_3fr] text-[.833rem]">
                                <div className="mt-5  md:px-[40px]">
                                    <h1 className="mt-5 px-[20px] md:px-0 font-semibold uppercase text-[1.2rem] md:text-[1.728rem]">{selection?.attributes?.name},{" "}<span className="font-normal md:text-[1.44rem]">{selection?.attributes?.country}</span></h1>
                                    <div className="mt-5 pb-2 md:pb-0 md:w-fit px-[20px] md:px-0 uppercase border-black/[.1] border-b-[1px] md:border-b-0">
                                        <div>{selection?.attributes?.address_line_one}</div>
                                        <div className="mt-2">{selection?.attributes?.address_line_two}</div>
                                        
                                        <div className="mt-2">{selection?.attributes?.city}</div>
                                        <div className="mt-2">{selection?.attributes?.zipcode}</div>
                                    </div>
                                    <div className="md:w-fit mt-5 uppercase px-[20px] pb-2 md:pb-0 md:px-0 border-b-[1px] md:border-b-0">
                                        <p className="md:inline-block mr-[40px]">discount</p>
                                        <p className="md:inline-block font-bold">{selection?.attributes?.percentDiscount}%</p>
                                    </div>
                                    <div className="mt-5 md:w-fit uppercase px-[20px] md:px-0 pb-2 md:pb-0 border-b-[1px] md:border-b-0">
                                        <p className="">Description</p>
                                        <p className="mt-2 leading-[2] ">{selection?.attributes?.description}</p>

                                    </div>
                                    <div className="mt-5 px-[20px] md:px-0 pb-2 md:pb-0 border-b-[1px] md:border-b-0">
                                        {selection.attributes?.instagram && (<Link href={`${selection.attributes?.instagram}`}><FaInstagram className="text-[1.2rem]"></FaInstagram></Link>)}
                                    </div>
                                    <div className="mt-5 md:mt-8 font-semibold px-[20px] pb-2 md:px-0 border-b-[1px] md:border-b-0">*{" "}{selection?.attributes?.notes || ""}</div>

                                </div>
                                <div>
                                    {selection?.attributes?.image?.data?.length && (
                                        <Fragment>
                                            <div ref={imgContainerRef} className="group relative w-full lg:aspect-[4/3] overflow-hidden">
                                                <div className={`${!imageIndex ? "hidden":"absolute"} opacity-0 duration-[.8s] ease-[cubic-bezier(.19,1,.22,1)] group-hover:opacity-100 h-full z-[2] cursor-pointer bg-[linear-gradient(to_right,#18181b,rgba(0,0,0,0))] px-[25px] md:px-[40px]`} onClick={()=>{setImageIndex(prev => prev - 1);}}>
                                                    <div className="relative border-white w-[20px] h-[20px] md:w-[30px] md:h-[30px] border-t-[3px] border-l-[3px] rotate-[-45deg] top-[50%] translate-y-[-50%]"></div> 
                                                </div>
                                                <div className={`${imageIndex >= selection.attributes.image.data.length - 1? "hidden": "absolute"} opacity-0 duration-[.8s] ease-[cubic-bezier(.19,1,.22,1)] group-hover:opacity-100 h-full z-[2] cursor-pointer right-0 bg-[linear-gradient(to_left,#18181b,rgba(0,0,0,0))] px-[25px] md:px-[40px]`} onClick={()=>{setImageIndex(prev => prev + 1);}}>
                                                    <div className="relative border-white w-[20px] h-[20px] md:w-[30px] md:h-[30px] border-t-[3px] border-r-[3px] rotate-[45deg] top-[50%] translate-y-[-50%]"></div> 
                                                </div>
                                                
                                                
                                                <div ref={sliderRef} className={`w-full h-full whitespace-nowrap`} style={{transform:`translateX(${xVal}px)`}}>
                                                {selection?.attributes?.image?.data?.map((img,index)=>(
                                                        <img key={index} src={img?.attributes?.url} className="inline-block align-top w-full h-auto object-cover"/>
                                                )) }
                                                </div>
                                                
                                                
                                            </div>
                                            {selection?.attributes?.image?.data?.length > 1 &&(
                                                <div className="mt-5 w-fit mx-auto">
                                                    {selection?.attributes?.image?.data?.map((img,index) =>(
                                                        <div key={index} className={`inline-block w-[27px] mr-3 h-[3px] ${index === imageIndex ? "bg-black":"bg-[#cacaca]"}`}></div>
                                                    ))}
                                                </div>
                                            )}
                                            
                                        </Fragment>

                                    )}
                                </div>
                            </div>
                        ):(
                            <div className="mt-[20px] flex flex-col flex-col-reverse md:mt-0 md:grid md:grid-cols-[2fr_3fr] text-[.833rem]">
                                <div className="mt-5  md:px-[40px]">
                                    <h1 className="mt-5 px-[20px] md:px-0 font-semibold uppercase text-[1.2rem] md:text-[1.728rem]">{first_location?.attributes?.name},{" "}<span className="font-normal md:text-[1.44rem]">{first_location?.attributes?.country}</span></h1>
                                    <div className="mt-5 pb-2 md:pb-0 md:w-fit px-[20px] md:px-0 uppercase border-black/[.1] border-b-[1px] md:border-b-0">
                                        <div>{first_location?.attributes?.address_line_one}</div>
                                        <div className="mt-2">{first_location?.attributes?.address_line_two}</div>
                                        
                                        <div className="mt-2">{first_location?.attributes?.city}</div>
                                        <div className="mt-2">{first_location?.attributes?.zipcode}</div>
                                    </div>
                                    <div className="md:w-fit mt-5 uppercase px-[20px] pb-2 md:pb-0 md:px-0 border-b-[1px] md:border-b-0">
                                        <p className="md:inline-block mr-[40px]">discount</p>
                                        <p className="md:inline-block font-bold">{first_location?.attributes?.percentDiscount}%</p>
                                    </div>
                                    <div className="mt-5 md:w-fit uppercase px-[20px] md:px-0 pb-2 md:pb-0 border-b-[1px] md:border-b-0">
                                        <p className="">Description</p>
                                        <p className="mt-2 leading-[2] ">{first_location?.attributes?.description}</p>

                                    </div>
                                    <div className="mt-5 px-[20px] md:px-0 pb-2 md:pb-0 border-b-[1px] md:border-b-0">
                                        {first_location.attributes?.instagram && (<Link href={`${first_location.attributes?.instagram}`}><FaInstagram className="text-[1.2rem]"></FaInstagram></Link>)}
                                    </div>
                                    <div className="mt-5 md:mt-8 font-semibold px-[20px] pb-2 md:px-0 border-b-[1px] md:border-b-0">*{" "}{first_location?.attributes?.notes || ""}</div>
                                </div>
                                <div className="">
                                    {first_location?.attributes?.image?.data?.length && (
                                        <Fragment>
                                            <div ref={imgContainerRef} className="group relative w-full lg:aspect-[4/3] overflow-hidden">
                                                <div className={`${!imageIndex ? "hidden":"absolute"} opacity-0 duration-[.8s] ease-[cubic-bezier(.19,1,.22,1)] group-hover:opacity-100 h-full z-[2] cursor-pointer bg-[linear-gradient(to_right,#18181b,rgba(0,0,0,0))] px-[25px] md:px-[40px]`} onClick={()=>{setImageIndex(prev => prev - 1);}}>
                                                    <div className="relative border-white w-[20px] h-[20px] md:w-[30px] md:h-[30px] border-t-[3px] border-l-[3px] rotate-[-45deg] top-[50%] translate-y-[-50%]"></div> 
                                                </div>
                                                <div className={`${imageIndex >= first_location.attributes.image.data.length - 1? "hidden": "absolute"} opacity-0 duration-[.8s] ease-[cubic-bezier(.19,1,.22,1)] group-hover:opacity-100 h-full z-[2] cursor-pointer right-0 bg-[linear-gradient(to_left,#18181b,rgba(0,0,0,0))] px-[25px] md:px-[40px]`} onClick={()=>{setImageIndex(prev => prev + 1);}}>
                                                    <div className="relative border-white w-[20px] h-[20px]  md:w-[30px] md:h-[30px] border-t-[3px] border-r-[3px] rotate-[45deg] top-[50%] translate-y-[-50%]"></div> 
                                                </div>
                                                
                                                
                                                <div ref={sliderRef} className={`w-full h-full whitespace-nowrap`} style={{transform:`translateX(${xVal}px)`}}>
                                                {first_location?.attributes?.image?.data?.map((img,index)=>(
                                                        <img key={index} src={img?.attributes?.url} className="inline-block align-top w-full h-auto object-cover"/>
                                                )) }
                                                </div>
                                                
                                                
                                            </div>
                                            {first_location?.attributes?.image?.data?.length > 1 &&(
                                                <div className="mt-5 w-fit mx-auto">
                                                    {first_location?.attributes?.image?.data?.map((img,index) =>(
                                                        <div key={index} className={`inline-block w-[27px] mr-3 h-[3px] ${index === imageIndex ? "bg-black":"bg-[#cacaca]"}`}></div>
                                                    ))}
                                                </div>
                                            )}
                                            
                                        </Fragment>

                                    )}
                                </div>
                            </div>
                        )}

                    </div>
        
                </div>

                
            </main>
          
        </Layout>
    
    )
}


export async function getServerSideProps ({req,res})
{
    res.setHeader("Cache-Control",
    "public", "s-maxage=604800", "stale-while-revalidate=84600");


    var sorted_locations = {}
    
    const filters = qs.stringify(
        {
            populate:"*",
            sort:["country:asc", "city:asc"]
        },
        {encodeValuesOnly:true}
    )
    const response = await fetch(`${API}/restaurants?${filters}`)

    const {data} = await response.json();
        
 
    if(data?.length){
        for(var i=0; i < data?.length; i++){
            if(!sorted_locations[`${data[i].attributes.country.toLowerCase()}`]){
                sorted_locations[`${data[i].attributes.country.toLowerCase()}`] = {};
               

            }
            if(!sorted_locations[`${data[i].attributes.country.toLowerCase()}`][`${data[i].attributes.city.toLowerCase()}`])
            {
                sorted_locations[`${data[i].attributes.country.toLowerCase()}`][`${data[i].attributes.city.toLowerCase()}`] = [];
            }

            sorted_locations[`${data[i].attributes.country.toLowerCase()}`][`${data[i].attributes.city.toLowerCase()}`].push(data[i]);
            
        }
    }

          

    return {
        props:{
            locations: sorted_locations || null,
            first_location:data[0] || null
        }
    }

}

export default restaurants;

