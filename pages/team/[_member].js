import Layout from "../../defaults/Layout";
import Link from "next/link";
import {
    FaFacebook,
    FaFacebookF,
    FaLink,
    FaFacebookSquare,
    FaInstagram,
    FaLinkedinIn,
    FaLinkedin,
    FaInstagramSquare,
    FaTiktok,
    

    
    FaTwitter,
    FaTwitterSquare,
    FaSnapchat,
    FaSnapchatGhost,
} from "react-icons/fa";

import Moment from "react-moment";
import { PAGINATION_LIMIT } from "../../config/meta";
import {API, BASE_URL} from "../../config/api.js";
import { slugToName } from "../../lib/utils.js";
import GenericArticleFormat from "../../components/GenericArticleFormat.jsx";
import { useState, useRef, useEffect } from "react";
const qs = require("qs");



const Member = ({member, articles, meta}) =>
{
    const [exceedsLimit, setExceedslimit] = useState(false);
    const textEl = useRef(null);

    const [viewWhole, setViewWhole] = useState(false);

    useEffect(()=>{
        if(textEl.current){
            let parent = textEl.current,
                child =  textEl.current.childNodes[0];
            if(parent.getBoundingClientRect().height < child.getBoundingClientRect().height){
               
                setExceedslimit(true);
            }
        };
    },[])


    return (
        <Layout title={`${member?.attributes?.name } | Vegclub Magazine`}>
            <div className="">
                <div className=" mx-auto p-[40px]">
                    
                    <div className="border-black grid md:flex md:flex-row">
                        <div className="block rounded-[50%]  overflow-hidden  bg-[#cacaca] mt-5  md:mt-0  mx-auto md:mx-0 w-[200px] h-[200px] lg:w-[300px] lg:h-[300px] shrink-0">
                                <img src={member?.attributes?.image?.data?.attributes?.url ||
                                        member?.attributes?.image?.data?.attributes?.formats?.large?.url ||
                                        member?.attributes?.image?.data?.attributes?.formats?.medium?.url ||
                                        member?.attributes?.image?.data?.attributes?.formats?.small?.url ||
                                        member?.attributes?.image?.data?.attributes?.formats?.thumbnail?.url
                                        } 
                                    className="w-full h-auto object-cover"
                                />
                        </div>
                        <div className="mt-5 md:mt-0 md:pl-[20px] lg:pl-[40px] md:flex md:flex-col md:grow">
                            <div className="pl-0">
                                <h1 className=" text-[1.728rem] md:text-[2.488rem] w-fit mx-auto md:mx-0 font-semibold">{member?.attributes?.name}</h1>
                            </div>
                            <div className=" mx-auto md:mx-0 flex justify-center flex-col mt-2  md:pr-[60px] lg:pr-[100px]">
                                
                                <h2 className="text-[1.44rem] w-fit mx-auto  md:mx-0 font-semibold">{member?.attributes?.position}</h2>
                                <p className="text-[1.2rem]  w-fit mx-auto md:mx-0 mt-2">{member?.attributes?.pronouns}</p>
                                <div className="mt-5 hidden md:block">
                                    <ul className="list-none">
                                        {member?.attributes?.instagram &&( 
                                            <li className="inline-block mr-5">
                                                <Link className="px-3 bg-[#f7f5f7] py-1 rounded-[5px]" href={`${member?.attributes?.instagram}`}>
                                                        <FaInstagram className="inline-block text-[1.2rem] mr-2 transition-all duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)] hover:text-black/[.4]"></FaInstagram>
                                                        <p className="inline-block text-[0.833rem] align-middle">instagram</p>
                                                </Link>
                                            </li>
                                        )}
                                        
                                        {member?.attributes?.linkedin && (
                                            <li className="inline-block mr-5">
                                                <Link className="px-3 bg-[#f7f5f7] py-1 rounded-[5px]" href={`${member?.attributes?.linkedin}`}>
                                                    <FaLinkedin className="inline-block mr-2 text-[1.44rem]  ease-[cubic-bezier(0.19,1,0.22,1)] duration-[.34s] hover:text-black/[.6]"></FaLinkedin>
                                                    <p className="inline-block text-[0.833rem] align-middle">Linkedin</p>

                                                </Link>
                                            </li>
                                        )}
                                        
                                        {member?.attributes?.twitter && (
                                            <li className="inline-block mr-5">
                                                <Link className="px-3 bg-[#f7f5f7] py-1 rounded-[5px]"  href={`${member?.attributes?.twitter}`}>
                                                    <FaTwitter className="inline-block mr-2  text-[1.44rem] ease-[cubic-bezier(0.19,1,0.22,1)] duration-[.34s] hover:text-black/[.6]"></FaTwitter>
                                                    <p className="inline-block text-[0.833rem] align-middle">Twitter</p>
                                                </Link>
                                            </li>
                                        )}
                                        {member?.attributes?.Facebook &&(
                                            <li className="inline-block mr-5">
                                                <Link  className="px-3 bg-[#f7f5f7] py-1 rounded-[5px]" href={`${member?.attributes?.Facebook}`}>
                                                    <FaFacebookF className="inline-block mr-2 text-[1.44rem] ease-[cubic-bezier(0.19,1,0.22,1)] duration-[.34s] hover:text-black/[.6]"></FaFacebookF>
                                                    <p className="text-[0.833rem] align-middle inline-block">Facebook</p>
                                                </Link>
                                            </li>
                                        )}
                                        {member?.attributes?.tiktok && (
                                            <li className="inline-block mr-5">
                                                    <Link className="px-3 bg-[#f7f5f7] py-1 rounded-[5px]" href={`${member?.attributes?.tiktok}`}>
                                                        <FaTiktok className="inline-block  text-[1.44rem] cursor-pointer ease-[cubic-bezier(0.19,1,0.22,1)] duration-[.34s] hover:text-black/[.6]"></FaTiktok>
                                                        <p className="inline-block align-middle text-[0.833rem]">Tiktok</p>
                                                    </Link>
                                            </li>
                                        )}
                                        
                                    </ul>
                                </div>
                                <div className={`mt-8 ${viewWhole ? "":"line-clamp-[6]"} leading-relaxed text-justify md:text-[1.2rem]`}ref={textEl}><p>{member?.attributes?.bio}</p></div>
                                {exceedsLimit && (
                                    <div className="w-fit mt-5 mx-auto md:mx-0" role="button" onClick={()=>{setViewWhole(prev => prev ? false:true)}}>
                                        <div className={`w-[16px] h-[16px] border-black/[.4] border-r-[1px] border-b-[1px] ${viewWhole ? "align-bottom rotate-[-135deg]":"rotate-[45deg]"}  inline-block mr-5`}></div>
                                        <div className={`font-semibold uppercase leading-0 inline-block ${viewWhole ? "leading-[2rem]":"align-middle"}`}>{viewWhole ? "view less":"view more"}</div>
                                    </div>
                                )}
                                {/*<ul className="list-none mt-8 mx-auto md:mx-0 w-fit">
                                {member?.attributes?.instagram &&( 
                                        <li className="inline-block mr-5">
                                            <Link href={`${member?.attributes?.instagram}`}>
                                                <FaInstagram className="inline-block mr-2 text-[1.44rem] md:text-[1.728rem] ease-[cubic-bezier(0.19,1,0.22,1)] duration-[.34s] hover:text-white/[.6] "></FaInstagram>
                                                <p className="text-[.833rem]  hidden md:inline-block">Instagram</p>
                                            </Link>
                                        </li>
                                )}
                                    
                                {member?.attributes?.linkedin && (
                                        <li className="inline-block mr-5">
                                            <Link href={`${member?.attributes?.linkedin}`}>
                                                <FaLinkedin className="inline-block mr-2 text-[1.44rem] md:text-[1.728rem] ease-[cubic-bezier(0.19,1,0.22,1)] duration-[.34s] hover:text-white/[.6]"></FaLinkedin>
                                                <p className="text-[.833rem]  hidden md:inline-block">LinkedIn</p>
                                            </Link>
                                        </li>
                                )}
                                    
                                    {member?.attributes?.twitter && (
                                        <li className="inline-block mr-5">
                                            <Link href={`${member?.attributes?.twitter}`}>
                                                <FaTwitter className="inline-block  text-[1.44rem] md:text-[1.728rem] ease-[cubic-bezier(0.19,1,0.22,1)] duration-[.34s] hover:text-white/[.6]"></FaTwitter>
                                                <p className="text-[.833rem]  hidden md:inline-block">Twitter</p>
                                            </Link>
                                        </li>
                                    )}
                                    {member?.attributes?.Facebook &&(
                                        <li className="inline-block mr-5">
                                            <Link href={`${member?.attributes?.Facebook}`}>
                                                <FaFacebookF className="inline-block  text-[1.44rem] md:text-[1.728rem] ease-[cubic-bezier(0.19,1,0.22,1)] duration-[.34s] hover:text-white/[.6]"></FaFacebookF>
                                                <p className="text-[.833rem]  hidden md:inline-block">Facebook</p>
                                            </Link>
                                        </li>
                                    )}
                                    {member?.attributes?.tiktok && (
                                        <li className="inline-block mr-5">
                                                <Link href={`${member?.attributes?.tiktok}`}>
                                                    <FaTiktok className="inline-block  text-[1.44rem] md:text-[1.728rem] cursor-pointer ease-[cubic-bezier(0.19,1,0.22,1)] duration-[.34s] hover:text-white/[.6]"></FaTiktok>
                                                    <p className="text-[.833rem]  hidden md:inline-block">Facebook</p>
                                                </Link>
                                        </li>
                                    )}
                                    
                                    </ul>*/}
                            </div>
                        </div>
                        {/*<div className="hidden md:block rounded-[50%] bg-[#cacaca] w-full max-w-[350px]  aspect-square">
                            <img src={member?.attributes?.image?.data?.attributes?.url ||
                                      member?.attributes?.image?.data?.attributes?.formats?.large?.url ||
                                      member?.attributes?.image?.data?.attributes?.formats?.medium?.url ||
                                      member?.attributes?.image?.data?.attributes?.formats?.small?.url ||
                                      member?.attributes?.image?.data?.attributes?.formats?.thumbnail?.url
                                    } 
                                 className="w-full h-auto object-cover"
                            />
                                </div>*/}
                    
                        
                        
                    </div>
                
                </div>
                <div className="px-[40px] pb-3 md:hidden">
                        <ul className="list-none">
                            {member?.attributes?.instagram &&( 
                                <li className="inline-block mr-5">
                                    <Link href={`${member?.attributes?.instagram}`}>
                                        <FaInstagram className="inline-block mr-2 text-[1.2rem] md:text-[1.728rem] ease-[cubic-bezier(0.19,1,0.22,1)] duration-[.34s] hover:text-black/[.6] "></FaInstagram>
                                        <p className="text-[.833rem]  hidden md:inline-block">Instagram</p>
                                    </Link>
                                </li>
                            )}
                            
                            {member?.attributes?.linkedin && (
                                <li className="inline-block mr-5">
                                    <Link href={`${member?.attributes?.linkedin}`}>
                                        <FaLinkedinIn className="inline-block mr-2 text-[1.2rem] md:text-[1.728rem] ease-[cubic-bezier(0.19,1,0.22,1)] duration-[.34s] hover:text-black/[.6]"></FaLinkedinIn>
                                        <p className="text-[.833rem]  hidden md:inline-block">LinkedIn</p>
                                    </Link>
                                </li>
                            )}
                            
                            {member?.attributes?.twitter && (
                                <li className="inline-block mr-5">
                                    <Link href={`${member?.attributes?.twitter}`}>
                                        <FaTwitter className="inline-block  text-[1.2rem] md:text-[1.728rem] ease-[cubic-bezier(0.19,1,0.22,1)] duration-[.34s] hover:text-black/[.6]"></FaTwitter>
                                        <p className="text-[.833rem]  hidden md:inline-block">Twitter</p>
                                    </Link>
                                </li>
                            )}
                            {member?.attributes?.Facebook &&(
                                <li className="inline-block mr-5">
                                    <Link href={`${member?.attributes?.Facebook}`}>
                                        <FaFacebookF className="inline-block  text-[1.2rem] md:text-[1.728rem] ease-[cubic-bezier(0.19,1,0.22,1)] duration-[.34s] hover:text-black/[.6]"></FaFacebookF>
                                        <p className="text-[.833rem]  hidden md:inline-block">Facebook</p>
                                    </Link>
                                </li>
                            )}
                            {member?.attributes?.tiktok && (
                                <li className="inline-block mr-5">
                                        <Link href={`${member?.attributes?.tiktok}`}>
                                            <FaTiktok className="inline-block  text-[1.2rem] md:text-[1.728rem] cursor-pointer ease-[cubic-bezier(0.19,1,0.22,1)] duration-[.34s] hover:text-black/[.6]"></FaTiktok>
                                            <p className="text-[.833rem]  hidden md:inline-block">Facebook</p>
                                        </Link>
                                </li>
                            )}
                            
                        </ul>
                </div>
                <div className="h-[1px] bg-black/[.1]"></div>
                {articles?.length ?(
                    <div>
                        <div className="border-black/[.1] border-b-[1px] lg:grid lg:grid-cols-[2fr_1fr]">
                            <ul className="list-none md:border-r-[1px]">
                                
                                {articles?.map((article, index)=>(
                                    <li className={`${index < articles.length - 1 ? "border-b-[1px]":""}`} key={index}>
                                        <GenericArticleFormat article={article} key={index}/>
                                    </li>

                                ))}
                                
                            </ul>
                            
                        </div>
                        <div className="py-5 w-fit mx-auto">
                                {meta?.pagination?.page > 1 && (<div className="inline-block cursor-pointer  mr-3  underline italic uppercase font-semibold"><Link href={`/team/${member}/?page=${(meta?.pagination?.page || 1) - 1}`}>newer</Link></div>)}
                                <div className="w-fit inline-block align-middle  uppercase font-semibold">
                                        <div className="text-center ">
                                            {meta?.pagination?.page || 1}
                                        </div>
                                        <div className="text-center  border-[#000] border-t-[3px]">
                                            {meta?.pagination?.pageCount || 1}
                                        </div>
                                </div>
                                {meta?.pagination?.page >= meta?.pagination?.pageCount || (<div className="inline-block ml-3 cursor-pointer  underline  uppercase font-semibold"><Link href={`/team/${member}/?page=${(meta?.pagination?.page || 1) + 1}`}>older</Link></div>)}
                                


                        </div>
                    </div>)

                    :(
                        <div className="w-fit mx-auto border-[#000]/[.1] text-[2.072rem] md:text-[2.488rem] font-bold text-black/[.4] py-8">
                            No Results
                        </div>
                    )}
            </div>

        </Layout>
    )

    

}


export async function getServerSideProps({req,res,params,query}){

    res.setHeader(
        "Cache-Control",
        "public", "s-maxage=604800", "stale-while-revalidate=84600"
    );

    const {_member} = params;
    const {page = 1} = query;

    const filter = qs.stringify({
        filters:{
            name:{
                $eq:slugToName(_member),
            }
        },
        populate:"*"
    });
    const articles_query = `query ArticlesViaAuthor($filtervarOne: ArticleFiltersInput){
                                  articles(filters:$filtervarOne, pagination:{page:${page}, pageSize:${PAGINATION_LIMIT}}){
                                    meta{
                                        pagination{
                                            page
                                            pageCount
                                        }
                                    }
                                    data{
                                      
                                      attributes{
                                        title
                                        slug
                                        description
                                        category{
                                            data{
                                                attributes{
                                                    slug
                                                    name
                                                }
                                            }
                                        }
                                        media{
                                            data{
                                                attributes{
                                                    url
                                                }
                                            }
                                        }
                                        date
                                        author{
                                            data{
                                                attributes{
                                                    name
                                                }
                                            }
                                        }
                                        
                                      }
                                    }
                                  }
    }`;
 
    const currentDate = new Date().toISOString();
    const articles_query_variables = {
      filtervarOne:{

        and:[
        {
          author:{
            name:{
              eq:slugToName(_member)
            }
          }
         

          

        },
        {
          
            publishedAt:{
              lt: currentDate
            }
          
        }]
       
      }

    }
    

    const teamResponse = await fetch(`${API}/teams?${filter}`);

    const {data} = await teamResponse.json();
    

    const articlesResponse = await fetch(`${BASE_URL}/graphql`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Accept:"application/json",
        },

        body:JSON.stringify({
            query: articles_query,
            variables:articles_query_variables,
        })
      
      
      
      

    });
    const articlesData = await articlesResponse.json();
    
    

   
   
    return{
        props:{
            member:data[0] || null,
            meta:articlesData?.data?.articles?.meta || null,
            articles: articlesData?.data?.articles?.data || null,
        }
        

    };
}

export default Member;