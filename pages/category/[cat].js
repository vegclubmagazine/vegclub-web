import { PAGINATION_LIMIT } from "../../config/meta";
import Layout from "../../defaults/Layout";
import {slugify } from "../../lib/utils.js";
import {Fragment, useEffect} from "react";
import { API, BASE_URL } from "../../config/api.js";
import Link from "next/link.js";
import Moment from "react-moment";


const Category = ({category, meta, articles}) =>
{
    
    return(
        <Layout>
            {articles?.length ? (
                <Fragment>
                    <div className="pb-3 border-black/[.1] w-[90%] md:w-full md:pb-3 pt-[5rem] mx-auto">
                        <h1 className="uppercase italic font-semibold pl-[15px] text-[1.44rem] md:text-[1.728rem] lg:text-[2.0728rem]">{category}</h1>
                    </div>
                    <div className="w-full  border-t-[1px] border-b-[1px] lg:grid lg:grid-cols-[2fr_1fr]">
                            <ul className="grid grid-cols-1 auto-rows-fr lg:border-r-[1px]">
                                {articles?.map((article, index) => (
                                    <li className={`${index < (articles.length - 1) ? "border-b-[1px]": ""}`} key={index}>
                                        <div className="flex justify-center flex-row lg:grid lg:grid-cols-2 md:py-[40px] h-full">
                                                
                                            <div className="hidden  md:block w-full md:w-[33.3%] lg:w-full aspect-[16/9] overflow-y-hidden object-cover">
                                                    <img    className="w-full h-auto" 

                                                            src={   article?.attriibutes?.media?.data?.attributes?.url ||
                                                                    article?.attributes?.media?.data?.attributes?.formats?.large?.url ||
                                                                    article?.attributes?.media?.data?.attributes?.formats?.medium?.url ||
                                                                    article?.attributes?.media?.data?.attributes?.formats?.small?.url ||
                                                                    article?.attributes?.media?.data?.attributes?.formats?.thumbnail?.url 
                                                                   
                                                                


                                                                }
                                                    ></img>                                             
                                            </div>
                                            
                                            <div className="py-[40px] md:py-0 pr-[40px] flex grow flex-col ml-[5%] lg:block md:ml-0 md:pl-[20px]">
                                                
                                                <h1 className="font-semibold md:text-[1.728rem] lg:text-[2.074rem] duration-[.34s] ease-in-out hover:text-black/[.4]"><Link href={`/article/${article?.attributes?.slug}`}>{article?.attributes?.title}</Link></h1>
                                                <h2 className="hidden md:block mt-4">{article?.attributes?.description}</h2>
                                                <div className="mt-4 text-[0.833rem]">
                                                    <p className="inline-block uppercase italic mt-3 mr-1">{article?.attributes?.author?.data?.attributes?.name}</p>
                                                
                                                    <Moment className="inline-block font-semibold uppercase italic ml-2 text-[0.833rem]" format="MMMM Do YYYY">{article?.attributes?.date}</Moment>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="md:hidden w-[150px] md:h-auto md:w-[80%] object-cover md:mx-auto  aspect-square md:aspect-[16/9] mx-auto bg-[#CACACA]">
                                                    <img    className="w-full h-auto" 
                                                            src={   article?.attriibutes?.media?.data?.attributes?.url ||
                                                                    article?.attributes?.media?.data?.attributes?.formats?.large?.url ||
                                                                    article?.attributes?.media?.data?.attributes?.formats?.medium?.url ||
                                                                    article?.attributes?.media?.data?.attributes?.formats?.small?.url ||
                                                                    article?.attributes?.media?.data?.attributes?.formats?.thumbnail?.url 
                                                                    
                                                                


                                                                }
                                                    ></img>  
                                                </div>
                                            </div>

                                        </div>
                                    </li>
                                ))}
                            
                                
                                
                                
                            </ul>

                    </div>
                    <div className="w-fit mx-auto  py-5 md:w-full md:text-center md:">
                    {meta?.pagination?.page > 1 && (<div className="inline-block cursor-pointer  mr-3  underline italic uppercase font-semibold"><Link href={`/category/${category}/?page=${(meta?.pagination?.page || 1) + 1}`}>newer</Link></div>)}
                    <div className="w-fit inline-block align-middle  italic uppercase font-semibold">
                            <div className="text-center ">
                                {meta?.pagination?.page}
                            </div>
                            <div className="text-center  border-[#000] border-t-[3px]">
                                {meta?.pagination?.pageCount}
                            </div>
                    </div>
                        {meta?.pagination?.page >= meta?.pagination?.pageCount || (<div className="inline-block ml-3 cursor-pointer  underline italic uppercase font-semibold"><Link href={`/category/${category}/?page=${(meta?.pagination?.page || 1) + 1}`}>older</Link></div>)}
                    </div>
                </Fragment>
            ):(
                <div className="w-screen h-screen">
                    <h1 className=" w-fit relative mx-auto  top-[50%] translate-y-[-50%] text-black/[.4] font-bold text-[2.784rem]">No Results</h1>
                </div>
            )}
        </Layout>

    )
}




export async function getServerSideProps({req,res,query, params})
{
    res.setHeader(
        
        "Cache-Control",
        "public", "s-maxage=604800", "stale-while-revalidate=86400"
        
    );

    const {page = 1} = query;
    const {cat} = params
    
    const fetch_query = `
    query ArticlesByCategory($filtervar: ArticleFiltersInput)
    {
        articles(filters:$filtervar, pagination:{page:${page}, pageSize:${PAGINATION_LIMIT}})
        {
            meta{
                pagination{
                    page
                    pageSize
                    pageCount
                }
            }
            data{
                id
                attributes{
                    title
                    description
                    media{
                        data{
                            attributes{
                                url
                            }
                        }
                    }
                    author{
                        data{
                            attributes{
                                Name
                            }
                        }
                    }
                    slug
                    category{
                        data{
                            attributes{
                                name
                            }
                        }
                    }
                    date

                }
            }

        }

    }`;
    const fetch_query_variables =
    
        {
            filtervar:{
                category:
                {
                    slug:{
                        eq: cat
                    }
                },
                
            }
            
    
    
        }
    

    

    const response = await fetch(`${BASE_URL}/graphql`,
    {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Accept: "application/json",
        },
        body:JSON.stringify(
            {
                query:fetch_query,
                variables: fetch_query_variables,
            }
        )

    });

    const {data} = await response.json();
   
    var visible_articles;
    for(let i = 0; i < data?.articles?.data.length; i++)
    {
        let publish_date = new Date(data?.articles?.data[i]?.attributes?.date);
        let current_date = new Date();
        if(current_date >= publish_date){
            
            visible_articles = data?.articles?.data?.slice(i)
            break;
        }
    }
   

    return {
        props:{
            meta:data?.articles?.meta || null,
            articles: visible_articles || null,
            category: data?.articles?.data[0]?.attributes?.category?.data?.attributes?.name || cat 
        }
    }


}

export default Category;