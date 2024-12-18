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


const Category = ({category, meta, articles, latestCoverArticle, ads}) =>
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
                    <section className="h-fit w-full  border-box border-[#000]/[.1]">
                        <div className="w-full">
                            <div className="hidden lg:block border-b-[1px]   ">
                                {ads?.large?.horizontal?.length ? (
                                    <InHouseAds ad={ads.large.horizontal[0]} size={"large"} orientation={"horizontal"}/>
                                ):""}

                            </div>
                            <div className="hidden md:block lg:hidden border-b-[1px]   ">
                                {ads?.medium?.horizontal?.length ? (
                                    <InHouseAds ad={ads.medium.horizontal[0]} size={"medium"} orientation={"horizontal"}/>


                                ):""}
                            </div>
                            <div className="block md:hidden border-b-[1px]   ">
                                {ads?.small?.horizontal?.length ?(
                                    <InHouseAds ad={ads.small.horizontal[0]} size={"small"} orientation={"horizontal"}/>

                                ):""}
                            </div>
                        </div>
                    </section>
                    {latestCoverArticle && (
                        <div className="border-black/[.1] border-b-[1px] pb-[40px] md:pb-0">
                            <div className="bg-black">
                                <div className="px-[40px] pt-3">
                                    <h1 className="text-white border-[#333] border-b-[1px] font-bold text-[2.074rem] md:text-[2.44rem] lg:text-[2.986rem] uppercase pb-2">{category}</h1>
                                </div>
                                <div className="px-[40px] pt-[20px] lg:pt-0 lg:px-0 lg:grid lg:grid-cols-[2fr_1fr]">
                                    <div className="hidden lg:block w-full aspect-[16/9] overflow-hidden">
                                        <img    className="object-cover w-full h-auto" 
                                                src={   latestCoverArticle[0]?.attributes?.media?.data?.attributes?.url ||
                                                        latestCoverArticle[0]?.attributes?.media?.data?.attributes?.formats?.large?.url   ||
                                                        latestCoverArticle[0]?.attributes?.media?.data?.attributes?.formats?.medium?.url ||
                                                        latestCoverArticle[0]?.attributes?.media?.data?.attributes?.formats?.small?.url   ||
                                                        latestCoverArticle[0]?.attributes?.media?.data?.attributes?.formats?.thumbnail?.url    }
                                        />
                                    </div>
                                    <div className="w-full lg:pl-[40px] lg:pr-[40px] lg:py-[40px]">
                                        <h3 className = "hidden lg:block text-white text-[0.833rem] inline-block uppercase mt-4 font-semibold cursor-pointer w-fit duration-[.32s] ease-[cubic-bezier(.19,1,.22,1)] hover:text-white/[.6]"><Link href={`category/${latestCoverArticle[0]?.attributes?.slug}`}>{category}</Link>
                                
                                         </h3>
                                        <h2 className="text-[1.44rem] md:text-[2.074rem]  text-white mt-4 font-extrabold article-title"><span className="underline_span"><Link href={`/article/${encodeURIComponent(latestCoverArticle[0]?.attributes?.slug)}`}>{latestCoverArticle[0]?.attributes?.title}</Link></span></h2>
                                        {/*<div className="h-fit w-fit inline-block align-middle">
                                            <i className=" inline-block cursor-pointer ml-2 h-[10px] w-[10px] border-[#40e0d0] border-t-[1px] border-r-[1px] rotate-45"></i>
                                                </div>*/}
                                        <p className="mt-4 text-white text-[1rem]">{latestCoverArticle[0].attributes?.description}</p>

                                        <div className="mt-4 text-white text-[0.833rem]">
                                            <p className="inline-block font-light uppercase  mr-1">{latestCoverArticle[0]?.attributes?.author?.data?.attributes?.name}</p>
                                            
                                            <Moment className="inline-block font-semibold uppercase  text-[0.833rem]" format="Do MMM YYYY">{latestCoverArticle[0]?.attributes?.date}</Moment>
                                        </div>
                                    </div>
                                    <div className="mt-[40px] w-full aspect-[16/8] lg:hidden">
                                        
                                    </div>
                                </div>
                                
                            </div>
                            <div className="px-[40px] lg:hidden w-full aspect-[16/9] overflow-hidden mt-[calc(-1*1/2*(100vw-80px))]">
                                            <img    className="w-full h-auto object-cover" 
                                                    src={latestCoverArticle[0]?.attributes?.media?.data?.attributes?.url ||
                                                        latestCoverArticle[0]?.attributes?.media?.data?.attributes?.formats?.large?.url   ||
                                                        latestCoverArticle[0]?.attributes?.media?.data?.attributes?.formats?.medium?.url ||
                                                        latestCoverArticle[0]?.attributes?.media?.data?.attributes?.formats?.small?.url   ||
                                                        latestCoverArticle[0]?.attributes?.media?.data?.attributes?.formats?.thumbnail?.url  }
                                            />
                            </div>
                        </div>
                    )}
                    {/*<section className="h-fit w-full  border-box border-[#000]/[.1]">
                        <div className="w-full">
                            <div className="hidden lg:block border-b-[1px]   ">
                                {ads?.large?.horizontal?.length ? (
                                    <InHouseAds ad={ads.large.horizontal[0]} size={"large"} orientation={"horizontal"}/>
                                ):""}

                            </div>
                            <div className="hidden md:block lg:hidden border-b-[1px]   ">
                                {ads?.medium?.horizontal?.length ? (
                                    <InHouseAds ad={ads.medium.horizontal[0]} size={"medium"} orientation={"horizontal"}/>


                                ):""}
                            </div>
                            <div className="block md:hidden border-b-[1px]   ">
                                {ads?.small?.horizontal?.length ?(
                                    <InHouseAds ad={ads.small.horizontal[0]} size={"small"} orientation={"horizontal"}/>

                                ):""}
                            </div>
                        </div>
                    </section>*/}
                    <div className={`pb-5 border-black/[.1] ${latestCoverArticle ? "pt-5":"pt-[5rem]"} pl-[40px]`}>
                        {latestCoverArticle ? (
                             <div className="w-fit font-bold uppercase text-[2.074rem]  lg:text-[2.488rem]">
                                <h2 className="leading-[0.8]">The</h2>
                                <h2>Latest</h2>
                            </div>
                            
                        ):(
                            <h1 className="uppercase font-semibold  text-[1.728rem] md:text-[2.074rem] ">{category}</h1>

                        )}
                    </div>
                    <div className="w-full  border-t-[1px] border-b-[1px]">
                            <div className="list-none text-start  lg:grid lg:grid-cols-3">
                                {latestCoverArticle ? articles?.filter((article)=>
                                    article?.id !== latestCoverArticle[0].id
                                

                                ).map((article, index) => (

                                    <div key={index} className="flex flex-row  lg:block md:border-r-[1px] border-b-[1px] border-black/[.1]">
                                        <div className="hidden md:block self-center w-[220px]  aspect-[16/9]   lg:w-full  overflow-y-hidden">
                                            <img src={article?.attributes?.media?.data?.attributes?.url ||
                                                    article?.attributes?.media?.data?.attributes?.formats?.large?.url ||
                                                    article?.attributes?.media?.data?.attributes?.formats?.medium?.url ||
                                                    article?.attributes?.media?.data?.attributes?.formats?.small?.url ||
                                                    article?.attributes?.media?.data?.attributes?.formats?.thumbnail?.url 
                                                    
                                            } className="w-full object-cover h-auto"/>
            
            
                                        </div>
                                        <div className="flex grow flex-col max-w-[635px] py-[20px] pl-[40px]  pr-[20px] md:grow-0  md:block lg:px-[40px] lg::mt-4  lg::pb-3">
                                                        <h3 className = "uppercase text-[0.833rem] inline-block  font-semibold cursor-pointer w-fit transition-all duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)]  hover:text-black/[.6]"><Link href={`/category/${article?.attributes?.category?.data?.attributes?.slug}`}>{article?.attributes?.category?.data?.attributes?.name}</Link></h3>                
            
                                                        <h1 className="mt-4 font-bold text-[1.2rem] md:text-[1.44rem] article-title"><span className="underline_span"><Link href={`/article/${encodeURIComponent(article?.attributes?.slug)}`}>{article?.attributes?.title}</Link></span></h1>
                                                        <h2 className="hidden  mt-4 md:line-clamp-4 lg:hidden">{article?.attributes?.description}</h2>

                                                        <div className="mt-4 text-[0.833rem]">
                                                            <p className="inline-block font-light  uppercase  mr-1">{article?.attributes?.author?.data?.attributes?.name}</p>
                                                            
                                                            <Moment className="inline-block font-semibold uppercase  text-[0.833rem]" format="Do MMM YYYY">{article?.attributes?.date}</Moment>
                                                        </div>
                                            
                                        </div>
                                        <div>
                                            <div className="flex flex-col w-[150px] overflow-hidden md:hidden h-full md:h-auto md:w-[80%] md:mx-auto   md:aspect-[16/9] mx-auto bg-[#CACACA]">
                                                <img    className="h-full object-cover w-auto" 
                                                        src={   article?.attributes?.media?.data?.attributes?.url ||
                                                                article?.attributes?.media?.data?.attributes?.formats?.large?.url ||
                                                                article?.attributes?.media?.data?.attributes?.formats?.medium?.url ||
                                                                article?.attributes?.media?.data?.attributes?.formats?.small?.url ||
                                                                article?.attributes?.media?.data?.attributes?.formats?.thumbnail?.url 
                                                                
                                                            


                                                            }
                                                ></img>  
                                            </div>
                                        </div>
        
                                     </div>
                                   
                                ))
                                :(
                                   articles.map((article, index) => (

                                    <div key={index} className="flex flex-row  lg:block md:border-r-[1px] border-b-[1px] border-black/[.1]">
                                        <div className="hidden md:block self-center w-[220px]  aspect-[16/9]   lg:w-full  overflow-y-hidden">
                                            <img src={article?.attributes?.media?.data?.attributes?.url ||
                                                    article?.attributes?.media?.data?.attributes?.formats?.large?.url ||
                                                    article?.attributes?.media?.data?.attributes?.formats?.medium?.url ||
                                                    article?.attributes?.media?.data?.attributes?.formats?.small?.url ||
                                                    article?.attributes?.media?.data?.attributes?.formats?.thumbnail?.url 
                                                    
                                            } className="w-full object-cover h-auto"/>
            
            
                                        </div>
                                        <div className="flex grow flex-col max-w-[635px] py-[20px] pl-[40px]  pr-[20px] md:grow-0  md:block lg:px-[40px] lg::mt-4  lg::pb-3">
                                                        <h3 className = "uppercase text-[0.833rem] inline-block  font-semibold cursor-pointer w-fit transition-all duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)]  hover:text-black/[.6]"><Link href={`/category/${article?.attributes?.category?.data?.attributes?.slug}`}>{article?.attributes?.category?.data?.attributes?.name}</Link></h3>                
            
                                                        <h1 className="mt-4 font-bold text-[1.2rem] md:text-[1.44rem] article-title"><span className="underline_span"><Link href={`/article/${encodeURIComponent(article?.attributes?.slug)}`}>{article?.attributes?.title}</Link></span></h1>
                                                        <h2 className="hidden  mt-4 md:line-clamp-4 lg:hidden">{article?.attributes?.description}</h2>

                                                        <div className="mt-4 text-[0.833rem]">
                                                            <p className="inline-block font-light  uppercase  mr-1">{article?.attributes?.author?.data?.attributes?.name}</p>
                                                            
                                                            <Moment className="inline-block font-semibold uppercase  text-[0.833rem]" format="Do MMM YYYY">{article?.attributes?.date}</Moment>
                                                        </div>
                                            
                                        </div>
                                        <div>
                                            <div className="flex flex-col w-[150px] overflow-hidden md:hidden h-full md:h-auto md:w-[80%] md:mx-auto   md:aspect-[16/9] mx-auto bg-[#CACACA]">
                                                <img    className="h-full object-cover w-auto" 
                                                        src={   article?.attributes?.media?.data?.attributes?.url ||
                                                                article?.attributes?.media?.data?.attributes?.formats?.large?.url ||
                                                                article?.attributes?.media?.data?.attributes?.formats?.medium?.url ||
                                                                article?.attributes?.media?.data?.attributes?.formats?.small?.url ||
                                                                article?.attributes?.media?.data?.attributes?.formats?.thumbnail?.url 
                                                                
                                                            


                                                            }
                                                ></img>  
                                            </div>
                                        </div>
        
                                    </div>
                                        
                                   ))


                                )
                            }
                            
                                
                                
                                
                            </div>

                    </div>
                    <div className="w-fit mx-auto  py-5 md:w-full md:text-center md:">
                    {meta?.pagination?.page > 1 && (<div className="inline-block cursor-pointer  mr-3  underline  uppercase font-semibold"><Link href={`/category/${category}/?page=${(meta?.pagination?.page || 1) + 1}`}>newer</Link></div>)}
                    <div className="w-fit inline-block align-middle uppercase font-semibold">
                            <div className="text-center ">
                                {meta?.pagination?.page}
                            </div>
                            <div className="text-center  border-[#000] border-t-[3px]">
                                {meta?.pagination?.pageCount}
                            </div>
                    </div>
                        {meta?.pagination?.page >= meta?.pagination?.pageCount || (<div className="inline-block ml-3 cursor-pointer  underline uppercase font-semibold"><Link href={`/category/${category}/?page=${(meta?.pagination?.page || 1) + 1}`}>older</Link></div>)}
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
    var latest_cover_article = [];

    const {page = 1} = query;
    const {cat} = params;

    const ads_large_horizontal = [];
    const ads_medium_horizontal = [];
    const ads_small_horizontal = [];
    const ad_filters = qs.stringify(
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
                pageSize:5,
                page:"1"
                
            },
            sort:["publishedAt:desc"]
            
        },
        {encodeValuesOnly:true}
    )
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
                    featureArticle
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
    const ads_response = await fetch(`${API}/advertisments?${ad_filters}`);
    
   

    const ads_data = await ads_response.json();


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
    for(let i =0; i < visible_articles?.length; i++)
    {
        if(visible_articles[i]?.attributes.featureArticle)
        {
            latest_cover_article.push(visible_articles[i]);
            break;

        }
    }
    for(let i = 0, ads = ads_data?.data; i < ads?.length; i++){
        if(ads[i].attributes.shape === "rectangle"){
            if(ads[i].attributes.size === "large"){
                
                if(ads[i].attributes.orientation === "horizontal"){
                    ads_large_horizontal.push(ads[i])
                }
             
            }
            else {
                if(ads[i].attributes.size === "medium"){
                    if(ads[i].attributes.orientation === "horizontal"){
                        ads_medium_horizontal.push(ads[i])
                    }
                 
                }
                else{
                    if(ads[i].attributes.orientation === "horizontal"){
                        ads_small_horizontal.push(ads[i])
                    }
              
                }
            }
        }
       
    }

   

    return {
        props:{
            meta:data?.articles?.meta || null,
            articles: visible_articles || null,
            latestCoverArticle: latest_cover_article.length ? latest_cover_article : null,
            category: data?.articles?.data[0]?.attributes?.category?.data?.attributes?.name || cat ,
            ads:{
                
                large:{
                    horizontal: ads_large_horizontal || null,
                  
                },
                medium:{
                    horizontal: ads_medium_horizontal || null,
                   
                },
                small:{
                    horizontal: ads_small_horizontal || null,
                  
                },
            },
      
        }
    }


}

export default Category;