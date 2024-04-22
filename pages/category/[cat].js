import { PAGINATION_LIMIT } from "../../config/meta";
import Layout from "../../defaults/Layout";
import {slugify } from "../../lib/utils.js";
import {Fragment, useEffect} from "react";
import { API, BASE_URL } from "../../config/api.js";
import Link from "next/link.js";
import Moment from "react-moment";
import InHouseAds from "../../components/InHouseAds.jsx";
import GenericArticleFormat from "../../components/GenericArticleFormat.jsx";


const qs=require("qs");


const Category = ({category, meta, articles,ads}) =>
{
    const articles_before_ad = 2;
   const checkAds = (idx)=>
   {
        if(!idx)return null;
        if(idx%(articles_before_ad + 1)) return null;

        return ads[(idx/(articles_before_ad +1)) - 1] ? true:false;
   }
    const getAdsIdx = (idx) => (idx/(articles_before_ad + 1)) - 1;
    
    return(
        <Layout>
            {articles?.length ? (
                <Fragment>
                    
                    <div className="pb-3 border-black/[.1] md:pb-3 pt-[5rem] pl-[40px]">
                        <h1 className="uppercase font-semibold  text-[1.728rem] md:text-[2.074rem] lg:text-[2.0728rem]">{category}</h1>
                    </div>
                    <div className="w-full  border-t-[1px] border-b-[1px] lg:grid lg:grid-cols-[2fr_1fr]">
                            <ul className="list-none text-start lg:border-r-[1px]">
                                {articles?.map((article, index) => (

                                    <Fragment>
                                        {checkAds(index) && (
                                            <InHouseAds ad={ads[getAdsIdx(index)]} key={ads[getAdsIdx(index)]?.id}/>
                                        )}
                                        <li className={`${index < (articles.length - 1) ? "border-b-[1px]": ""}`} key={index}>
                                            <GenericArticleFormat article={article}/>
                                        </li>
                                    </Fragment>
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
    const filters = qs.stringify(
        {
            populate:"*",
            filters:{
                categories:{
                    slug:{
                        $eq:cat

                    }
                }
            },
            pagination:{
                pageSize:(Math.floor(PAGINATION_LIMIT/6)),
                page:`${page}`
            },
           

        },
        {encodeValuesOnly:true}
    )
    const fetch_query = `
    query ArticlesByCategory($filtervar: ArticleFiltersInput)
    {
        articles(filters:$filtervar, pagination:{page:${page}, pageSize:${PAGINATION_LIMIT}}, sort:"date:desc")
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
                                name
                            }
                        }
                    }
                    slug
                    category{
                        data{
                            attributes{
                                name
                                slug
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
    const adsResponse = await fetch(`${API}/advertisments?${filters}`);


    const {data} = await response.json();
    const adsData = await adsResponse.json();
    
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
            category: data?.articles?.data[0]?.attributes?.category?.data?.attributes?.name || cat ,
            ads: adsData?.data || null,
        }
    }


}

export default Category;