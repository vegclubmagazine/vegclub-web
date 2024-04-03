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
    

    
    FaTwitter,
    FaTwitterSquare,
    FaSnapchat,
    FaSnapchatGhost,
} from "react-icons/fa";

import Moment from "react-moment";
import { PAGINATION_LIMIT } from "../../config/meta";
import {API, BASE_URL} from "../../config/api.js";
import { slugToName } from "../../lib/utils.js";

const qs = require("qs");



const Member = ({member, articles, meta}) =>
{


    return (
        <Layout title={`${member?.attributes?.name } | Vegclub Magazine`}>
            <div className="">
                <div className="bg-black text-white  pt-5 pb-5">
                    <div className="pl-0 md:pl-[40px] border-[#333] pb-2  border-b-[1px]">
                        <h1 className=" text-[2.488rem] w-fit mx-auto md:mx-0 font-semibold">{member?.attributes?.name}</h1>
                    </div>
                    <div className="border-black px-[40px]  border-b-[1px] py-[10px] grid md:grid-cols-[2fr_1fr]">
                        <div className="block md:hidden  bg-[#cacaca] mt-5  md:mt-0 w-full mx-auto  w-[80%] max-w-[200px]  aspect-square">
                                <img src={member?.attributes?.media?.data?.attributes?.url ||
                                        member?.attributes?.media?.data?.attributes?.formats?.large?.url ||
                                        member?.attributes?.media?.data?.attributes?.formats?.medium?.url ||
                                        member?.attributes?.media?.data?.attributes?.formats?.small?.url ||
                                        member?.attributes?.media?.data?.attributes?.formats?.thumbnail?.url
                                        } 
                                    className="w-full h-auto object-cover"
                                />
                        </div>
                        <div className=" mx-auto md:mx-0 flex justify-center flex-col mt-8  md:pr-[60px] lg:pr-[100px]">
                            
                            <h2 className="text-[1.44rem] w-fit mx-auto  md:mx-0 font-semibold">{member?.attributes?.position}</h2>
                            <p className="text-[1.2rem] text-[#a2a2a2] w-fit mx-auto md:mx-0 mt-2">{member?.attributes?.pronouns}</p>
                            <p className="mt-8 text-[#a2a2a2] leading-[1.6]">{member?.attributes?.bio}</p>
                            <ul className="list-none mt-8 mx-auto md:mx-0 w-fit">
                               {member?.attributes?.instagram &&( 
                                    <li className="inline-block mr-5">
                                        <FaInstagram className="inline-block text-[1.2rem] sm:text-[1.2rem] md:text-[1.728rem] mr-5"></FaInstagram>
                                        <p className="text-[.833rem] text-[#a2a2a2] hidden md:inline-block">Instagram</p>
                                    </li>
                               )}
                                
                               {member?.attributes?.linkedin && (
                                    <li className="inline-block mr-5">
                                        <FaLinkedin className="inline-block text-[1.2rem] sm:text-[1.44rem] md:text-[1.728rem] mr-5"></FaLinkedin>
                                        <p className="text-[.833rem] text-[#a2a2a2] hidden md:inline-block">LinkedIn</p>
                                    </li>
                               )}
                                
                                {member?.attributes?.twitter && (
                                    <li className="inline-block mr-5">
                                        <FaTwitter className="inline-block mr-5 text-[1.2rem] sm:text-[1.44rem] md:text-[1.728rem]"></FaTwitter>
                                        <p className="text-[.833rem] text-[#a2a2a2] hidden md:inline-block">Twitter</p>

                                    </li>
                                )}
                                {member?.attributes?.Facebook &&(
                                    <li className="inline-block mr-5">
                                        <FaFacebookF className="inline-block mr-5 text-[1.2rem] sm:text-[1.44rem] md:text-[1.728rem]"></FaFacebookF>
                                        <p className="text-[.833rem] text-[#a2a2a2] hidden md:inline-block">Facebook</p>
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div className="hidden md:block bg-[#cacaca] w-full max-w-[350px]  aspect-square">
                            <img src={member?.attributes?.media?.data?.attributes?.url ||
                                      member?.attributes?.media?.data?.attributes?.formats?.large?.url ||
                                      member?.attributes?.media?.data?.attributes?.formats?.medium?.url ||
                                      member?.attributes?.media?.data?.attributes?.formats?.small?.url ||
                                      member?.attributes?.media?.data?.attributes?.formats?.thumbnail?.url
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
                                    
                                    <div className="flex flex-row  justify-center border-black/[.1] border-b-[1px] lg:grid lg:grid-cols-2 md:py-[40px]" key={index}>
                                        <div className="hidden bg-[#cacaca] md:block md:w-[33.33%] max-h-[248px] aspect-[16/9] lg:w-full">
                                            <img  className="h-full w-auto" 
                                                  src={   article?.attributes?.media?.data?.attributes?.url ||
                                                        article?.attributes?.media?.data?.attributes?.formats?.large?.url ||
                                                        article?.attributes?.media?.data?.attributes?.formats?.medium?.url ||
                                                        article?.attributes?.media?.data?.attributes?.formats?.small?.url ||
                                                        article?.attributes?.media?.data?.attributes?.formats?.thumbnail?.url
                                                        
                                                    


                                                    }
                                            ></img>  

                                        </div>
                                        <div className="pr-[40px] justify-center flex grow flex-col ml-[5%] md:block md:ml-0 md:pl-[20px]">
                                                    
                                                    <h1 className="font-semibold md:text-[1.44rem] lg:text-[1.728rem]  duration-[.34s] ease-in-out hover:text-black/[.4]"><Link href={`/article/${article?.attributes?.slug}`}>{article?.attributes?.title}</Link></h1>
                                                    <h3 className="hidden md:block mt-4">{article?.attributes?.description}</h3>
                                                    <div className="mt-4 text-[0.833rem]">
                                                        <p className="inline-block uppercase font-light italic mt-3 mr-1">{article?.attributes?.author?.data?.attributes?.name}</p>
                                                    
                                                        <Moment className="inline-block font-semibold uppercase italic text-[0.833rem]" format="Do MMM YYYY">{article?.attributes?.date}</Moment>
                                                    </div>
                                                    
                                                
                                                
                                        </div>
                                        <div className="md:hidden w-[150px] object-cover   aspect-square  bg-[#CACACA]">
                                                        <img    className="h-full w-auto" 
                                                                src={   article?.attributes?.media?.data?.attributes?.url ||
                                                                        article?.attributes?.media?.data?.attributes?.formats?.large?.url ||
                                                                        article?.attributes?.media?.data?.attributes?.formats?.medium?.url ||
                                                                        article?.attributes?.media?.data?.attributes?.formats?.small?.url ||
                                                                        article?.attributes?.media?.data?.attributes?.formats?.thumbnail?.url
                                                                        
                                                                    


                                                                    }
                                                        ></img>  
                                        </div>
                                    </div>
                                ))}
                                
                            </div>
                            
                        </div>
                        <div className="py-5 w-fit mx-auto">
                                {meta?.pagination?.page > 1 && (<div className="inline-block cursor-pointer  mr-3  underline italic uppercase font-semibold"><Link href={`/team/${member}/?page=${(meta?.pagination?.page || 1) + 1}`}>newer</Link></div>)}
                                <div className="w-fit inline-block align-middle  italic uppercase font-semibold">
                                        <div className="text-center ">
                                            {meta?.pagination?.page || 1}
                                        </div>
                                        <div className="text-center  border-[#000] border-t-[3px]">
                                            {meta?.pagination?.pageCount || 1}
                                        </div>
                                </div>
                                {meta?.pagination?.page >= meta?.pagination?.pageCount || (<div className="inline-block ml-3 cursor-pointer  underline italic uppercase font-semibold"><Link href={`/team/${member}/?page=${(meta?.pagination?.page || 1) + 1}`}>older</Link></div>)}
                                


                        </div>
                    </div>)
                    :(
                        <div className="mx-auto w-fit text-[2.072rem] md:text-[2.488rem] font-bold text-black/[.4] py-8">No Results</div>
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
                                            pageCount
                                        }
                                    }
                                    data{
                                      
                                      attributes{
                                        title
                                        slug
                                        description
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
        articles:{
          author:{
            fullname:{
              eq:_member
            }
          }
         

          

        },
        and:{
          articles:{
            PublishDate:{
              lt: currentDate
            }
          }
        }
       
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