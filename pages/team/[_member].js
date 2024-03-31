import Layout from "../../defaults/Layout";
import Link from "next/link";
import {
    FaFacebook,
    FaFacebookF,
    FaLink,
    FaFacebookSquare,
    
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


const Member = ({member, articles, meta}) =>
{


    return (
        <Layout title={`${member?.attributes?.name } | Vegclub Magazine`}>
            <div className="">
                <div className="bg-black text-white  pt-5">
                    <h1 className="pl-[40px] text-[2.488rem] font-semibold border-white/[.4] pb-2  border-b-[1px]">{member?.attributes?.name}</h1>
                    <div className="border-black  border-b-[1px] grid grid-cols-2 md:grid-cols-[2fr_1fr]">
                        <div className="pl-[40px] flex justify-center flex-col py-[10px] pr-[40px]">
                            <h2 className="text-[1.2rem] md:text-[1.44rem] font-semibold">{member?.attributes?.role}</h2>
                            <p className="mt-[2rem] md:text-[1.2rem]">{member?.attributes?.bio}</p>
                            <ul className="list-none mt-[2rem]">
                                <li className="inline-block mr-5">
                                    <FaInstagramSquare className="inline-block text-[1.728rem] mr-5"></FaInstagramSquare>
                                    <p className="text-[.833rem] hidden md:inline-block underline">Instagram</p>
                                </li>
                                <li className="inline-block mr-5">
                                    <FaLinkedin className="inline-block text-[1.728rem] mr-5"></FaLinkedin>
                                    <p className="text-[.833rem] hidden md:inline-block underline">LinkedIn</p>
                                </li>
                            </ul>
                        </div>
                        <div className="">
                            <img src={member?.attributes?.media?.data?.attributes?.url ||
                                      member?.attributes?.media?.data?.attributes?.formats?.large?.url ||
                                      member?.attributes?.media?.data?.attributes?.formats?.medium?.url ||
                                      member?.attributes?.media?.data?.attributes?.formats?.small?.url ||
                                      member?.attributes?.media?.data?.attributes?.formats?.thumbnail?.url
                                    } 
                                 className="w-full h-auto"
                            />
                        </div>
                    
                        
                        
                    </div>
                
                </div>
                <div className="text-black mt-5 pt-5 pb-2 pl-[40px] border-black/[.1] border-y-[1px]">
                    <h1 className="text-[2.488rem] font-semibold uppercase">Articles</h1>
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
                        <div className="mx-auto w-fit text-[2.072rem] md:text-[2.488rem] font-bold text-black/[.4]">No Results</div>
                    )}
            </div>

        </Layout>
    )

    

}


export async function getServersideProps({req,res,params,query}){

    res.setHeader(
        "Cache-Control",
        "public", "s-maxage=604800", "stale-while-revalidate=84600"
    );
    
    const {_member} = params;
    const {page = 1} = query;

    const filter = qs.stringify({
        filters:{
            name:{
                $eq:_member,
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
    

    const teamResponse = await fetch(`/teams?${filter}`);

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
            member:data?.data[0] || null,
            meta:articlesData?.data?.articles?.meta || null,
            articles: articlesData?.data?.articles?.data || null,
        }
        

    };
}

export default Member;