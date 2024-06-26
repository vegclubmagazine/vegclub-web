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

const qs = require("qs");



const Member = ({member, articles, meta}) =>
{


    return (
        <Layout title={`${member?.attributes?.name } | Vegclub Magazine`}>
            <div className="">
                <div className="bg-black text-white mx-auto xl:w-[80%] py-5">
                    <div className="pl-0 md:pl-[40px] border-[#333] pb-2  border-b-[1px]">
                        <h1 className=" text-[2.488rem] w-fit mx-auto md:mx-0 font-semibold">{member?.attributes?.name}</h1>
                    </div>
                    <div className="border-black px-[40px]  border-b-[1px] py-[10px] grid md:grid-cols-[2fr_1fr]">
                        <div className="block md:hidden  bg-[#cacaca] mt-5  md:mt-0 w-full mx-auto  w-[80%] max-w-[200px]  aspect-square">
                                <img src={member?.attributes?.image?.data?.attributes?.url ||
                                        member?.attributes?.image?.data?.attributes?.formats?.large?.url ||
                                        member?.attributes?.image?.data?.attributes?.formats?.medium?.url ||
                                        member?.attributes?.image?.data?.attributes?.formats?.small?.url ||
                                        member?.attributes?.image?.data?.attributes?.formats?.thumbnail?.url
                                        } 
                                    className="w-full h-auto object-cover"
                                />
                        </div>
                        <div className=" mx-auto md:mx-0 flex justify-center flex-col mt-8  md:pr-[60px] lg:pr-[100px]">
                            
                            <h2 className="text-[1.44rem] w-fit mx-auto  md:mx-0 font-semibold">{member?.attributes?.position}</h2>
                            <p className="text-[1.2rem] text-[#a2a2a2] w-fit mx-auto md:mx-0 mt-2">{member?.attributes?.pronouns}</p>
                            <p className="mt-8 text-[#a2a2a2] leading-[1.9]">{member?.attributes?.bio}</p>
                            <ul className="list-none mt-8 mx-auto md:mx-0 w-fit">
                               {member?.attributes?.instagram &&( 
                                    <li className="inline-block mr-5">
                                        <Link href={`${member?.attributes?.instagram}`}>
                                            <FaInstagram className="inline-block text-[1.44rem] md:text-[1.728rem] ease-[cubic-bezier(0.19,1,0.22,1)] duration-[.34s] hover:text-white/[.6] "></FaInstagram>
                                            <p className="text-[.833rem] text-[#a2a2a2] hidden md:inline-block">Instagram</p>
                                        </Link>
                                    </li>
                               )}
                                
                               {member?.attributes?.linkedin && (
                                    <li className="inline-block mr-5">
                                        <Link href={`${member?.attributes?.linkedin}`}>
                                            <FaLinkedin className="inline-block text-[1.44rem] md:text-[1.728rem] ease-[cubic-bezier(0.19,1,0.22,1)] duration-[.34s] hover:text-white/[.6]"></FaLinkedin>
                                            <p className="text-[.833rem] text-[#a2a2a2] hidden md:inline-block">LinkedIn</p>
                                        </Link>
                                    </li>
                               )}
                                
                                {member?.attributes?.twitter && (
                                    <li className="inline-block mr-5">
                                        <Link href={`${member?.attributes?.twitter}`}>
                                            <FaTwitter className="inline-block  text-[1.44rem] md:text-[1.728rem] ease-[cubic-bezier(0.19,1,0.22,1)] duration-[.34s] hover:text-white/[.6]"></FaTwitter>
                                            <p className="text-[.833rem] text-[#a2a2a2] hidden md:inline-block">Twitter</p>
                                        </Link>
                                    </li>
                                )}
                                {member?.attributes?.Facebook &&(
                                    <li className="inline-block mr-5">
                                        <Link href={`${member?.attributes?.Facebook}`}>
                                            <FaFacebookF className="inline-block  text-[1.44rem] md:text-[1.728rem] ease-[cubic-bezier(0.19,1,0.22,1)] duration-[.34s] hover:text-white/[.6]"></FaFacebookF>
                                            <p className="text-[.833rem] text-[#a2a2a2] hidden md:inline-block">Facebook</p>
                                        </Link>
                                    </li>
                                )}
                                {member?.attributes?.tiktok && (
                                    <li className="inline-block mr-5">
                                            <Link href={`${member?.attributes?.tiktok}`}>
                                                <FaTiktok className="inline-block  text-[1.44rem] md:text-[1.728rem] cursor-pointer ease-[cubic-bezier(0.19,1,0.22,1)] duration-[.34s] hover:text-white/[.6]"></FaTiktok>
                                                <p className="text-[.833rem] text-[#a2a2a2] hidden md:inline-block">Facebook</p>
                                            </Link>
                                    </li>
                                )}
                                
                            </ul>
                        </div>
                        <div className="hidden md:block bg-[#cacaca] w-full max-w-[350px]  aspect-square">
                            <img src={member?.attributes?.image?.data?.attributes?.url ||
                                      member?.attributes?.image?.data?.attributes?.formats?.large?.url ||
                                      member?.attributes?.image?.data?.attributes?.formats?.medium?.url ||
                                      member?.attributes?.image?.data?.attributes?.formats?.small?.url ||
                                      member?.attributes?.image?.data?.attributes?.formats?.thumbnail?.url
                                    } 
                                 className="w-full h-auto object-cover"
                            />
                        </div>
                    
                        
                        
                    </div>
                
                </div>
                <div className="text-black mt-5 pt-5 pb-2 pl-[40px] border-black/[.1] border-y-[1px]">
                    <h1 className=" text-[2.072rem] md:text-[2.488rem] font-semibold uppercase">Articles</h1>
                </div>
                {articles?.length ?(
                    <div>
                        <div className="border-black/[.1] border-b-[1px] lg:grid lg:grid-cols-[2fr_1fr]">
                            <div className="border-r-[1px]">
                                {articles?.map((article, index)=>(
                                    
                                    <GenericArticleFormat article={article} key={index}/>
                                ))}
                                
                            </div>
                            
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