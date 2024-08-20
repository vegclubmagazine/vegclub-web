import { Fragment } from "react";
import { API } from "../config/api";
import Layout from "../defaults/Layout";
import {useState, useRef, useEffect} from "react"
import { FaInstagram } from "react-icons/fa";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { MdOutlineOpenInNew } from "react-icons/md";

const qs = require("qs");
/** search:
 * client-side " filter" of what are essentially strings
 * first approach: iterative search
 */

const restaurants = ({locations, first_location}) =>
{
   // location is in format: { country:{ city: [...places]}}

   var filtered_locations = {};
   const dfs = (locs,q) =>
   {
      if(!Object.keys(locs))return;
      
     
      
      const loc_list = Object.keys(locs);
      
      for(var i=0; i < loc_list.length; i++){
    
        if(loc_list[i].toLowerCase().includes(q.toLowerCase())){
            if(filteredLocations[`${loc_list[i]}`]){
                continue;
            }
            else{
                let location = `${loc_list[i]}`;
                
                setFilteredLocations(prev => ({...prev, [location]:locs[location]}));
            }

            
        }
        else{
            for(let j= 0, cities = Object.keys(locs[`${loc_list[i]}`]); j < cities.length; j++){
                if(cities[j].toLowerCase().includes(q.toLowerCase())){

                    let region = `${loc_list[i]}`;
                    let location = {[cities[j]]:locs[region][cities[j]]};
                    
                    setFilteredLocations(prev => ({...prev, [region]:location}));



                }


            }
        }
        
      }

   }
   const [searchOpen, setSearchOpen] = useState(false);
   const [imageIndex, setImageIndex] = useState(0);
   const [Query, setQuery] = useState(null);
   const [selection, setSelection] = useState(null);
   const [filteredLocations, setFilteredLocations] = useState({});
   
   const [xVal, setXVal] = useState(0);
   const imgContainerRef = useRef(null);
   const sliderRef = useRef(null);
   
   const handleClick = (e)=>
   {
        setImageIndex(0);
        setSelection(JSON.parse(e.target.getAttribute("data-meta")));
        

   }

   useEffect(()=>{
        
       
        Query && dfs(locations,Query);
       
   },[Query])
   const handleInput = (e)=>
   {
        if(!searchOpen)setSearchOpen(true);
        setFilteredLocations({});
        setQuery(e.target.value);
   }
   const clearSearch = ()=>
   {
        setQuery(null);
   }

   useEffect(()=>{
        if(sliderRef.current)setXVal((-1* imageIndex)* sliderRef.current.getBoundingClientRect().width)
   },[imageIndex])
  
  
    return (
        <Layout title = "Restaurants | VegClub Magazine">
            <main className="border-black/[.1] ">
                <div className="relative border-y-[1px] py-2 pl-[20px] md:px-[40px]">
                    <div className="inline-block w-fit  text-[0.833rem] uppercase">restaurants</div>
                    <div className="inline-block w-[6px]  h-[6px] ml-2 align-middle rotate-[45deg] border-black border-t-[1px] border-r-[1px]"></div>
                    <div className="inline-block w-fit text-[0.833rem] ml-3 text-black/[.6] uppercase underline">{selection ? selection?.attributes?.name : "find restaurant"}</div>
                </div>
                <div className="md:grid   md:grid-cols-[1fr_4fr] md:pr-[40px] pb-[40px]">
                    <div className="relative ">
                        <div className="relative pr-[60px] md:pl-[40px] pr:or-[60px] text-[0.833rem]  border-b-[1px] border-r-[1px] border-l-[1px]">
                            <div className="inline-block md:hidden border-r-[1px] pl-[20px] uppercase pr-2 cursor-pointer" onClick={()=>setSearchOpen( prev => prev ? false:true)}>
                                <p className="inline-block mr-3">{searchOpen ? "hide": "view all"}</p>
                                <div className={`border-black relative ${searchOpen ? "rotate-[-45deg] align-middle top-[1px]":"top-[2px] rotate-[135deg] align-top"}  inline-block  border-r-[1px] mr-4 border-t-[1px] w-[7px] h-[7px]`}></div>
                            </div>
                            <input className={`inline-block md:block placeholder:text-black/[.5] bg-white w-[55%] pl-2 md:pl-0 md:w-full py-3 uppercase outline-none`} type="text" value={Query || ""} placeholder="search country,city..." onChange={(e)=>handleInput(e)}/>
                            {Query ? (
                                <div className="absolute text-[#0018a8]  text-center w-[60px] top-[12px] right-0">
                                    <div className="relative  inline-block  w-[30px] h-[14px] cursor-pointer" onClick={()=>clearSearch()}>
                                        <div className="absolute top-0 right-[12.5px] bg-[#0018a8] w-[1px] h-[14px] rotate-[45deg]"></div>
                                        <div className="absolute top-0 right-[12.5px] bg-[#0018a8] w-[1px] h-[14px] rotate-[-45deg]"></div>
                                    </div>
                                    <div className="inline-block text-[0.833rem] align-top leading-[1.3]  uppercase mr-2">exit</div>
                                
                                 </div>
                            ):(
                                <CiSearch className="absolute text-[#0018a8]  top-[8px] right-[12.5px] w-[20px] h-[20px]"/>

                            )}
                        </div>
                    
                        <div className={`${searchOpen ? "absolute":"hidden"} md:block z-[3]   w-full  md:relative uppercase r-menu text-[.833rem] max-h-[250px] border-black/[.1] border-b-[1px] md:border-b-[0px] md:max-h-[100vh] overflow-y-auto shadow-xl md:shadow-none`}> 
                            
                                {Query ? (
                                    Object.keys(filteredLocations)?.map((country, index)=>(
                                        <Fragment key={country}>
                                            <div className="w-full px-[20px] md:px-[40px] bg-[#f7f7f7] py-3 border-b-[1px]">{country}</div>
                                            <div>
                                                {Object.keys(filteredLocations[`${country}`]).map((city, j)=>(
                                                    <Fragment key={city}>
                                                        <div className="px-[30px] bg-white md:px-[40px] border-b-[1px] py-3">{city}</div>
                                                        <div>
                                                            {filteredLocations[`${country}`][`${city}`].map((place,k)=>(
                                                                <div key={place?.id || k} data-meta={JSON.stringify(place)} className="text-[#0018a8] bg-white py-3 px-[40px] md:px-[40px] cursor-pointer font-light border-b-[1px]" onClick={(e)=>{handleClick(e);}}>{place.attributes.name}</div>
                                                            ))}
                                                        </div>
                                                    </Fragment>
                                                ))}
                                            </div> 
                                        
                                        </Fragment>
                                ))
                                ):(
                                    Object.keys(locations)?.map((country, index)=>(
                                        <Fragment key={country}>
                                            <div className="px-[20px] md:px-[40px] bg-[#f7f7f7] border-b-[1px] py-3 ">{country}</div>
                                            <div>
                                                {Object.keys(locations[`${country}`]).map((city, j)=>(
                                                    <Fragment key={city}>
                                                        <div className="px-[30px] bg-white md:px-[40px] border-b-[1px] py-3">{city}</div>
                                                        <div>
                                                            {locations[`${country}`][`${city}`].map((place,k)=>(
                                                                <div key={place?.id || k} data-meta={JSON.stringify(place)} className="text-[#0018a8] bg-white py-3 px-[40px] md:px-[40px] cursor-pointer font-light border-b-[1px]" onClick={(e)=>{handleClick(e);}}>{place.attributes.name}</div>
                                                            ))}
                                                        </div>
                                                    </Fragment>
                                                ))}
                                            </div>
                                        
                                        </Fragment>
                                )))}
                            
                        
                        </div>
                    </div>
                    
                    <div  className="relative z-[1]">
                        {selection ? (
                            
                            <div className="flex flex-col flex-col-reverse md:mt-0 md:grid md:grid-cols-[2fr_3fr] text-[.833rem]">
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
                                    <div className="mt-5 md:w-fit px-[20px] md:px-0 pb-2 md:pb-0 border-b-[1px] md:border-b-0">
                                        <p className="uppercase">Description</p>
                                        <p className="mt-2 leading-[2] ">{selection?.attributes?.description}</p>

                                    </div>
                                    <div className="mt-5 px-[20px] md:px-0 pb-2 md:pb-0 border-b-[1px]  md:border-b-0">
                                        {selection.attributes?.instagram && (<Link className="inline-block align-middle" href={`${selection.attributes?.instagram}`}><FaInstagram className="text-[1.2rem]"></FaInstagram></Link>)}
                                        {selection.attributes?.siteUrl && (
                                            <div className="text-[#0018a8] border-[#0018a8] borber-b-[1px] inline-block ml-3 align-middle">
                                                <Link className="inline-block align-top" href={selection?.attributes?.siteUrl} target="_blank" rel="noopener noreferrer">{selection?.attributes?.siteUrl}</Link>

                                                <MdOutlineOpenInNew className="ml-3 inline-block align-top text-[#0018a8] w-[12px] h-[12px]"/>
                                            </div>
                                        )}
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
                            <div className="z-[1] flex flex-col flex-col-reverse md:mt-0 md:grid md:grid-cols-[2fr_3fr] text-[.833rem]">
                                <div className="mt-5  md:px-[40px]">
                                    <h1 className="mt-5 px-[20px] md:px-0 font-semibold uppercase text-[1.2rem] md:text-[1.728rem]">{first_location?.attributes?.name},{" "}<span className="font-normal md:text-[1.44rem]">{first_location?.attributes?.country}</span></h1>
                                    <div className="mt-5 pb-2 md:pb-0 md:w-fit px-[20px] md:px-0 uppercase border-black/[.1] border-b-[1px] md:border-b-0">
                                        <div>{first_location?.attributes?.address_line_one}</div>
                                        <div className="mt-2">{first_location?.attributes?.address_line_two}</div>
                                        
                                        <div className="mt-2">{first_location?.attributes?.city}</div>
                                        <div className="mt-2">{first_location?.attributes?.zipcode}</div>
                                    </div>
                                    <div className="md:w-fit mt-5 uppercase px-[20px] pb-2 md:pb-0 md:px-0 border-b-[1px]  md:border-b-0">
                                        <p className="md:inline-block mr-[40px]">discount</p>
                                        <p className="md:inline-block font-bold">{first_location?.attributes?.percentDiscount}%</p>
                                    </div>
                                    <div className="mt-5 md:w-fit  px-[20px] md:px-0 pb-2 md:pb-0 border-b-[1px]  md:border-b-0">
                                        <p className="uppercase">Description</p>
                                        <p className="mt-2 leading-[2] ">{first_location?.attributes?.description}</p>

                                    </div>
                                    <div className="mt-5 px-[20px] md:px-0 pb-5 md:pb-0 border-b-[1px] md:border-b-0">
                                        {first_location.attributes?.instagram && (<Link className="inline-block align-middle" href={`${first_location.attributes?.instagram}`}><FaInstagram className="text-[1.2rem]"></FaInstagram></Link>)}
                                        {first_location.attributes?.siteUrl && (
                                            <div className="text-[#0018a8] border-[#0018a8] border-b-[1px] inline-block ml-3 align-middle">
                                                <Link className="inline-block align-top" href={first_location?.attributes?.siteUrl} target="_blank" rel="noopener noreferrer">{first_location?.attributes?.siteUrl}</Link>

                                                <MdOutlineOpenInNew className="ml-1 inline-block align-top  text-[#0018a8] w-[12px] h-[12px]"/>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-5 md:mt-8 font-semibold px-[20px] pb-2 md:px-0 border-b-[1px]  md:border-b-0">*{" "}{first_location?.attributes?.notes || ""}</div>
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
            pagination:{
                pageSize:50,
            },
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

