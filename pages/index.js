import { API, BASE_URL } from "../config/api";
import Layout from "../defaults/Layout";
import {Fragment, useEffect,useState} from "react";
import {PAGINATION_LIMIT} from "../config/meta.js";
import { slugify } from "../lib/utils.js";
import Link from "next/link.js";
import Moment from "react-moment";
import AdUnit from "../components/AdUnit.jsx";
import SquareAdUnit from "../components/SquareAdUnit.jsx";
import GenericArticleFormat from "../components/GenericArticleFormat.jsx";
import Loader from "../components/Loader.jsx";
import InHouseAds from "../components/InHouseAds.jsx";
//import NewsLetterCard from "../components/NewsLetterCard.jsx";

const qs = require("qs");


const Home = ({articles,ads})=>{
   
    const [isLoading, setIsLoading] = useState(false);
    const [atLastPage, setAtLastPage] = useState(false);
    const [LatestArticles,setLatestArticles] = useState([...articles?.nonFeatureArticles?.slice(1)]);
    const [page,setPage] = useState(1);

    const countBeforeAd = 1;
    
    
    const checkAds = (idx)=>
    {

        if(!idx)return null;
        if(idx % (countBeforeAd + 1))return null;
        
        
        
        return ads[(idx/(countBeforeAd + 1)) - 1] ? true: false;
       



    }

    const getAdIndex = idx => (idx/(countBeforeAd + 1)) - 1;

    const loadArticles = ()=>
    {
        setIsLoading(true);
        setPage(prev => prev += 1);

    }

    useEffect(()=> 
    {
        
        
        if(page > 1){
        
            const query = `query getLatestNonFeatureArticles($filtervar:ArticleFiltersInput){
                                articles(filters:$filtervar, pagination:{page:${page}, pageSize:${articles?.nonFeatureArticles?.length || 10}})
                                {
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
                                            date
                                            media{
                                                data{
                                                    attributes{
                                                        url
                                                    }
                                                }
                                            }
                                            category{
                                                data{
                                                    attributes{
                                                        name
                                                        slug
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
                                            
                                        }
                                    }
                                }
            }`;

            const variables = {
                filtervar:{
                    featureArticle:{
                        eq:false
                    }

                }
            };

            fetch
                (`${BASE_URL}/graphql`,
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                        Accept:"application/json",
                    },
                    body:JSON.stringify({
                        query,
                        variables

                    })
                })
                .then((res)=>{
                    return res.json();
                })
                .then(({data}) =>{
                    setIsLoading(false);
                    
                    setAtLastPage(page >= data.articles.meta.pagination.pageCount);
                    setLatestArticles(prev => [...prev,...data.articles.data]);
                })
                .catch((err)=>{
                    console.log(err);
                })
        }

    },[page])


    
    return(
        <Layout>
            <section className="h-fit w-full  border-box border-[#000]/[.1]">
                <div className="w-full">
                    <div className="hidden lg:block border-b-[1px]   ">
                        {ads.large.horizontal?.length ? (
                            <InHouseAds ad={ads.large.horizontal[0]} size={"large"} orientation={"horizontal"}/>
                        ):""}

                    </div>
                    <div className="hidden md:block lg:hidden border-b-[1px]   ">
                        {ads.medium.horizontal?.length ? (
                            <InHouseAds ad={ads.medium.horizontal[0]} size={"medium"} orientation={"horizontal"}/>


                        ):""}
                    </div>
                    <div className="block md:hidden border-b-[1px]   ">
                        {ads.small.horizontal?.length ?(
                            <InHouseAds ad={ads.small.horizontal[0]} size={"small"} orientation={"horizontal"}/>

                        ):""}
                    </div>
                </div>
            </section>
            
            <section className="block md:grid md:grid-cols-[2fr_1fr] overflow-y-hidden">
                <div className="relative border-[#000]/[.1] border-r-[1px]">
                    <div className="w-full bg-[#000]/[.1] overflow-hidden h-fit  md:aspect-[16/9]">
                        <img    className="object-cover w-full h-auto" 
                                src={   articles?.featureArticles[0]?.attributes?.media?.data?.attributes?.url ||
                                        articles?.featureArticles[0]?.attributes?.media?.data?.attributes?.formats?.large?.url ||
                                        articles?.featureArticles[0]?.attributes?.media?.data?.attributes?.formats?.medium?.url ||
                                        articles?.featureArticles[0]?.attributes?.media?.data?.attributes?.formats?.small?.url ||
                                        articles?.featureArticles[0]?.attributes?.media?.data?.attributes?.formats?.thumbnail?.url
                                        
                                    


                                    }
                        ></img>   
                    </div>
                    <div className="relative inline-block py-[40px] pr-[40px] bottom-[40px] left-[10%] md:left-[0%]  bg-[#000] text-start text-white w-[90%] md:w-[75%] lg:w-[50%]">
                        {/*<p className="w-full bg-[#000] text-start text-[#fff] border-box pl-1 text-[0.6rem]"> Damon Winter <span className="text-[#01e2c2] ml-2 mr-2">/</span> Vegclub Magazine <span className="text-[#01e2c2] ml-2 mr-2">/</span> Redux</p>*/}
                        <div className="pl-[40px]">
                            <h3 className = "text-white text-[0.833rem]  inline-block uppercase  font-semibold cursor-pointer w-fit duration-[.34s] ease-in-out hover:text-white/[.6]"><Link href={`/category/${articles?.featureArticles[0]?.attributes?.category?.data?.attributes?.slug}`}>{articles?.featureArticles[0]?.attributes?.category?.data?.attributes?.name}</Link></h3>                
                            <h1 className="article-title mt-4 font-extrabold w-fit leading-[1.5] text-[1.728rem] lg:text-[2.488rem]"><span className="underline_span"><Link href={`/article/${articles?.featureArticles[0]?.attributes?.slug}`}>{articles?.featureArticles[0]?.attributes?.title}</Link></span></h1>
                            <h2 className="mt-4 text-[#a2a2a2] text-[1rem] line-clamp-4 lg:hidden">{articles?.featureArticles[0]?.attributes?.description}</h2>
                            <div className="mt-4 text-[0.833rem]">
                                <p className="inline-block uppercase font-light  mr-1">{articles?.featureArticles[0]?.attributes?.author?.data?.attributes?.name}</p>
                                
                                <Moment className="inline-block font-semibold uppercase  text-[0.833rem]" format="Do MMM YYYY">{articles?.featureArticles[0]?.attributes?.date}</Moment>
                            </div>
                        </div>
                        <div className="absolute h-[200%] w-[100%] bg-black"></div>
                        
                    </div>
                    <div className="hidden relative p-[60px] bottom-[40px] lg:inline-block align-top w-[50%]">
                        <div className="w-full">
                            {/*{ads.square?.length ? (
                                <Fragment>
                                    <p className="text-[0.634rem] w-fit mx-auto mb-2 text-[#CACACA] uppercase">Advertisement</p>

                                    {/*<InHouseAds ad={ads.square[0]}/>
                                </Fragment>
                            ):""}*/}
                            <p className="leading-[1.6] text-[1.02rem] font-[410] line-clamp-3">{articles?.featureArticles[0]?.attributes?.description}</p>
                        </div>
                    </div>
                </div>
                <div className="hidden md:grid">
                    <div className="border-[#000]/[.1] border-b-[1px]">
                        <div className="w-full aspect-[16/15]">
                            <div className="h-full  overflow-hidden bg-[#cacaca]">
                                <img    className="h-full w-auto object-cover" 
                                        src={   articles?.featureArticles[1]?.attributes?.media?.data?.attributes?.url ||
                                                articles?.featureArticles[1]?.attributes?.media?.data?.attributes?.formats?.large?.url ||
                                                articles?.featureArticles[1]?.attributes?.media?.data?.attributes?.formats?.medium?.url ||
                                                articles?.featureArticles[1]?.attributes?.media?.data?.attributes?.formats?.small?.url ||
                                                articles?.featureArticles[1]?.attributes?.media?.data?.attributes?.formats?.thumbnail?.url 
                                                
                                            


                                            }
                                ></img> 
                            </div>
                        </div>
                        <div className=" mx-auto p-[40px]">
                        <h3 className = " text-[0.833rem]  inline-block uppercase  font-semibold cursor-pointer w-fit duration-[.34s] ease-in-out hover:text-black/[.4]"><Link href={`/category/${articles?.featureArticles[1]?.attributes?.category?.data?.attributes?.slug}`}>{articles?.featureArticles[1]?.attributes?.category?.data?.attributes?.name}</Link></h3>                
                            <h1 className="article-title mt-4 font-bold w-fit leading-[1.5] text-[1.44rem] lg:text-[1.728rem]"><span className="underline_span"><Link href={`/article/${articles?.featureArticles[1]?.attributes?.slug}`}>{articles?.featureArticles[1]?.attributes?.title}</Link></span></h1>
                            <div className="mt-4 text-[0.833rem]">
                                <p className="inline-block font-light  uppercase  mr-1">{articles?.featureArticles[1]?.attributes?.author?.data?.attributes?.name}</p>
                                
                                <Moment className="inline-block font-semibold uppercase text-[0.833rem]" format="MMMM Do YYYY">{articles?.featureArticles[1]?.attributes?.date}</Moment>
                            </div>
                        </div>
                    </div>
                    {/*<div className="">
                        
                    
                        
                        <div className="p-[40px]">
                            <h3 className = "text-[0.833rem]  inline-block uppercase  font-semibold cursor-pointer w-fit duration-[.34s] ease-in-out hover:text-black/[.4]"><Link href={`/category/${articles?.featureArticles[2]?.attributes?.category?.data?.attributes?.slug}`}>{articles?.featureArticles[2]?.attributes?.category?.data?.attributes?.name}</Link></h3>                
                            <h1 className="article-title mt-4 font-semibold w-fit leading-[1.5] text-[1.44rem] lg:text-[1.728rem]"><span className="underline_span"><Link href={`/article/${articles?.featureArticles[2]?.attributes?.slug}`}>{articles?.featureArticles[2]?.attributes?.title}</Link></span></h1>
                            <div className="mt-4 text-[0.833rem]">
                                <p className="inline-block font-light  uppercase  mr-1">{articles?.featureArticles[2]?.attributes?.author?.data?.attributes?.name}</p>
                                
                                <Moment className="inline-block font-semibold uppercase  text-[0.833rem]" format="MMMM Do YYYY">{articles?.featureArticles[2]?.attributes?.date}</Moment>
                            </div>
                        </div>
                                        </div>*/}
                </div>
            </section>
            {/*<section className="h-fit w-[90%] mx-auto border-box border-[#CACACA] border-b-[1px]  py-3 text-center">
                <p className="text-[0.634rem] text-[#CACACA] uppercase">Advertisement</p>
                <div className="mx-auto max-w-[450px] w-[80%] h-[90px] bg-[#CACACA] mt-2"></div>
            </section>*/}
            <section className="w-full  border-box h-fit">
                <div className="md:grid md:grid-cols-3">
                    {/*<h1 className=" text-center font-bold  text-[1.44rem]">Recent stories</h1>*/}
                        {articles?.featureArticles?.slice(1,6)?.map((article, index)=>(

                            index < 1  ?(
                                <div className="border-[#000]/[.1] border-b-[1px] md:border-r-[1px] md:hidden" key={index}>
                                    <div className="flex flex-row  md:grid md:grid-cols-1 h-fit">
                                        <div className="flex grow flex-col pl-[40px] justify-center md:hidden py-[20px] pr-[20px]">
                                            <h3 className = "text-[0.833rem] inline-block uppercase transition-all duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)] hover:text-black/[.4]  font-semibold cursor-pointer w-fit"><Link href={`/category/${article?.attributes?.category?.data?.attributes?.slug}`}>{article?.attributes?.category?.data?.attributes?.name}</Link></h3>                
    
                                            <h1 className="article-title mt-3 md:text-[1.44rem] lg:text-[1.728rem] line-clamp-3 font-bold"><span className="underline_span"><Link href={`/article/${article?.attributes?.slug}`}>{article?.attributes?.title}</Link></span></h1>
                                            <div className="mt-3 text-[0.833rem]">
                                                <p className="inline-block font-light uppercase  mt-3 mr-1">{article?.attributes?.author?.data?.attributes?.name}</p>
                                                <Moment className="inline-block font-semibold uppercase  text-[0.833rem]" format="Do MMM YYYY">{article?.attributes?.date}</Moment>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex flex-col w-[150px] h-full overflow-hidden md:h-auto md:w-full  md:aspect-[16/9] mx-auto bg-[#CACACA]">
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
                                        <div className="hidden md:block w-[85%] mt-4 mx-auto pb-3">
                                            <h3 className = "article-title text-[0.833rem] inline-block  font-semibold cursor-pointer w-fit"><span className="underline_span"><Link href={`/category/${article?.attributes?.category?.data?.attributes?.slug}`}>{article?.attributes?.category?.data?.attributes?.name}</Link></span></h3>                

                                            <h1 className="mt-4 font-bold text-[1.44rem] "><Link href={`/article/${article?.attributes?.slug}`}>{article?.attributes?.title}</Link></h1>
                                            <div className="mt-4 text-[0.833rem]">
                                                <p className="inline-block font-light  uppercase  mr-1">{article?.attributes?.author?.data?.attributes?.name}</p>
                                                
                                                <Moment className="inline-block font-semibold uppercase  text-[0.833rem]" format="Do MMM YYYY">{article?.attributes?.date}</Moment>
                                            </div>
                                
                                        </div>

                                    </div>
                                </div>
                            ):(
                                <div className="border-[#000]/[.1] border-b-[1px] md:border-r-[1px] " key={index}>
                                    <div className="flex flex-row md:grid md:grid-cols-1 h-fit">
                                        <div className="flex grow flex-col pl-[40px] justify-center md:hidden py-[20px] pr-[20px]">
                                            <h3 className = "text-[0.833rem]  inline-block uppercase  font-semibold cursor-pointer w-fit transition-all duration-[.34s] eas-[cubic-bezier(.19,1,.22,1)] hover:text-black/[.4]"><Link href={`/category/${article?.attributes?.category?.data?.attributes?.slug}`}>{article?.attributes?.category?.data?.attributes?.name}</Link></h3>                

                                            <h1 className="article-title mt-3 md:text-[1.44rem] lg:text-[1.728rem] font-bold line-clamp-3 md:line-clamp-5"><span className="underline_span"><Link href={`/article/${article?.attributes?.slug}`}>{article?.attributes?.title}</Link></span></h1>
                                            <div className="mt-3 text-[0.833rem]">
                                                <p className="inline-block font-light uppercase  mt-3 mr-1">{article?.attributes?.author?.data?.attributes?.name}</p>
                                                <Moment className="inline-block font-semibold uppercase " format="Do MMM YYYY">{article?.attributes?.date}</Moment>
                                            </div>
                                        </div>
                                        <div className="">
                                            <div className="flex flex-col w-[150px] h-full overflow-hidden  md:h-auto md:w-full  md:aspect-[16/9] mx-auto bg-[#CACACA]">
                                                <img    className="h-full w-auto md:w-full md:h-auto object-cover" 
                                                        src={   article?.attributes?.media?.data?.attributes?.url ||
                                                                article?.attributes?.media?.data?.attributes?.formats?.large?.url ||
                                                                article?.attributes?.media?.data?.attributes?.formats?.medium?.url ||
                                                                article?.attributes?.media?.data?.attributes?.formats?.small?.url ||
                                                                article?.attributes?.media?.data?.attributes?.formats?.thumbnail?.url
                                                            
                                                                
                                                            


                                                            }
                                                ></img>  
                                            </div>
                                        </div>
                                        <div className="hidden md:block p-[40px]">
                                            <h3 className = "text-[0.833rem]  inline-block uppercase  font-semibold cursor-pointer w-fit duration-[.32s] ease-in-out hover:text-black/[.4]"><Link href={`/category/${article?.attributes?.category?.data?.attributes?.slug}`}>{article?.attributes?.category?.data?.attributes?.name}</Link></h3>                

                                            <h1 className="article-title mt-4 font-bold text-[1.44rem] md:line-clamp-3 lg:line-clamp-4 "><span className="underline_span"><Link className="" href={`/article/${article?.attributes?.slug}`}>{article?.attributes?.title}</Link></span></h1>
                                            <div className="mt-4 text-[0.833rem]">
                                                <p className="inline-block font-light uppercase  mr-1">{article?.attributes?.author?.data?.attributes?.name}</p>
                                                
                                                <Moment className="inline-block font-semibold uppercase  text-[0.833rem]" format="Do MMM YYYY">{article?.attributes?.date}</Moment>
                                            </div>
                                
                                        </div>

                                    </div>
                                </div>
                            )
                        ))}
                    
                        
                        
                    
                </div>
            </section>
            <section className="h-fit w-full  border-box border-[#000]/[.1] border-b-[1px]   text-center">
                {/*<p className="text-[0.634rem] text-[#CACACA] uppercase">Advertisement</p>*/}
                <div className="w-full">
                    <div className="hidden lg:block">
                        {ads.large.horizontal?.length ?  (
                            <InHouseAds ad={ads.large.horizontal[1 % ads.large.horizontal.length ]} size={"large"} orientation={"horizontal"}/>
                        ):""}

                    </div>
                    <div className="hidden md:block lg:hidden">
                        {ads.medium.horizontal?.length  ? (
                            <InHouseAds ad={ads.medium.horizontal[1 % ads.medium.horizontal.length  ]} size={"medium"} orientation={"horizontal"}/>


                        ):""}
                    </div>
                    <div className="block md:hidden">
                        {ads.small.horizontal?.length  ?(
                            <InHouseAds ad={ads.small.horizontal[1 % ads.small.horizontal.length]} size={"small"} orientation={"horizontal"}/>

                        ):""}
                    </div>
                </div>
            </section>
            {/*<section>
                <NewsLetterCard></NewsLetterCard>
                        </section>*/}
            <section className="w-full border-black/[.1]">
                <div className="border-b-[1px] text-[2.074rem] md:text-[2.488rem] lg:text-[2.986rem] font-bold  uppercase pt-5 pb-3">
                    <div className="w-fit pl-[40px]">
                        <h2 className="leading-[0.8]">The</h2>
                        <h2>Latest</h2>
                    </div>
                </div>
                <div className="w-full  border-b-[1px] pb-[2rem] md:pb-0">
                    <div className="bg-[#000] px-[40px]  w-full md:px-0 md:grid md:grid-cols-[2fr_1fr] items-center">
                        <div className="hidden  overflow-y-hidden md:block w-full aspect-[16/9]  bg-[#cacaca]">
                            <img    className="w-full h-auto" 
                                    src={   articles?.nonFeatureArticles[0]?.attributes?.media?.data?.attributes?.url ||
                                            articles?.nonFeatureArticles[0]?.attributes?.media?.data?.attributes?.formats?.large?.url ||
                                            articles?.nonFeatureArticles[0]?.attributes?.media?.data?.attributes?.formats?.medium?.url ||
                                            articles?.nonFeatureArticles[0]?.attributes?.media?.data?.attributes?.formats?.small?.url ||
                                            articles?.nonFeatureArticles[0]?.attributes?.media?.data?.attributes?.formats?.thumbnail?.url 
                                           
                                        


                                        }
                            ></img>                          
                        </div>
                        <div className=" mx-auto md:mx-0 md:px-[40px] h-fit  pt-[20px] pb-[80px]">
                            <h3 className = "text-white text-[0.833rem] inline-block uppercase  font-semibold cursor-pointer w-fit duration-[.32s] ease-[cubic-bezier(.19,1,.22,1)] hover:text-white/[.6]"><Link href={`category/${articles?.nonFeatureArticles[0]?.attributes?.category?.data?.attributes?.slug}`}>{articles?.nonFeatureArticles[0]?.attributes?.category?.data?.attributes?.name}</Link>
                                
                            </h3>
                            <h1 className="text-[1.44rem] md:text-[1.728rem] lg:text-[2.074rem] text-white mt-4 font-extrabold article-title"><span className="underline_span"><Link href={`article/${articles?.nonFeatureArticles[0]?.attributes?.slug}`}>{articles?.nonFeatureArticles[0]?.attributes?.title}</Link></span></h1>
                            {/*<div className="h-fit w-fit inline-block align-middle">
                                <i className=" inline-block cursor-pointer ml-2 h-[10px] w-[10px] border-[#40e0d0] border-t-[1px] border-r-[1px] rotate-45"></i>
                            </div>*/}
                            <p className="mt-4 text-[#a2a2a2] text-[1rem]">{articles?.nonFeatureArticles[0]?.attributes?.description}</p>

                            <div className="mt-4 text-white text-[0.833rem]">
                                <p className="inline-block font-light uppercase  mr-1">{articles?.nonFeatureArticles[0]?.attributes?.author?.data?.attributes?.name}</p>
                                
                                <Moment className="inline-block font-semibold uppercase  text-[0.833rem]" format="Do MMM YYYY">{articles?.nonFeatureArticles[0]?.attributes?.date}</Moment>
                            </div>
                        </div>
                        
                    </div>
                    <div className="block md:hidden px-[40px] mt-[-50px]">
                        <div className="aspect-[16/9] overflow-y-hidden bg-[#CACACA]">
                                <img    className="w-full h-auto" 
                                        src={   articles?.nonFeatureArticles[0]?.attributes?.media?.data?.attributes?.url ||
                                                articles?.nonFeatureArticles[0]?.attributes?.media?.data?.attributes?.formats?.large?.url ||
                                                articles?.nonFeatureArticles[0]?.attributes?.media?.data?.attributes?.formats?.medium?.url ||
                                                articles?.nonFeatureArticles[0]?.attributes?.media?.data?.attributes?.formats?.small?.url ||
                                                articles?.nonFeatureArticles[0]?.attributes?.media?.data?.attributes?.formats?.thumbnail?.url
                                                
                                            


                                            }
                                ></img>  

                        </div>
                    </div>
                </div>
                <div className="border-[#000]/[.1] border-b-[1px] lg:grid lg:grid-cols-[2fr_1fr]">
                    <ul className="list-none text-start md:border-r-[1px]">
                        {LatestArticles?.map((article, index)=>(
                            <Fragment>
                               
                                
                                <li className={`${index < LatestArticles.length - 1 ? "border-b-[1px]":""}`} key={index}>
                                    <GenericArticleFormat article={article}/>
                                </li>
                            </Fragment>
                        ))}
                    </ul>
                    <div className="hidden lg:block w-full">
                        {ads.large.vertical?.length ? (
                            <div className="w-full hidden lg:block">
                            
                                <InHouseAds ad={ads.large.vertical[0]} size="large" orientation="vertical"/>
                            </div>

                        ): ""}
                        {ads.medium.vertical?.length ?(
                            <Fragment>
                                <div className="w-full hidden md:block lg:hidden">
                            
                                    <InHouseAds ad={ads.medium.vertical[0]} size="medium" orientation="vertical"/>
                                </div>
                            </Fragment>
                        ):""}
                    </div>
                </div>
                {atLastPage ||(
                    <div className="py-[80px]">
                        
                        {isLoading ? 
                        ( 
                            <Loader/>
                        ):(

                            <div className="w-fit mx-auto uppercase underline font-bold text-[2.074rem] md:text-[2.488rem] lg:text-[2.986rem] cursor-pointer transition-all ease-[cubic-bezier(.19,1,.22,1)] duration-[.34s] hover:text-black/[.4]" onClick={()=>{loadArticles();}}>Load More</div>
                        
                        )}
                       
                    </div>
                )}
            </section>
          
        </Layout>
    )
}

export async function getServerSideProps({req,res}){
    res.setHeader(
        "Cache-Control",
        "public", "s-maxage=604800", "stale-while-revalidate=84600"
    )
    // sort fetched articles into feature and non-feature articles
    
    var feature_articles = [],
        non_feature_articles = [],
        ads_square = [],
        ads_large_horizontal = [],
        ads_large_vertical = [],

        ads_medium_horizontal = [],
        ads_medium_vertical = [],
        ads_small_horizontal = [],
        ads_small_vertical = [];
    
    const filters = qs.stringify(
        {
            populate:"*",
            pagination:{
                pageSize:PAGINATION_LIMIT,
                page:"1"
            },
            sort:["date:desc"],


        },
        {encodeValuesOnly:true}
    )

    const ad_filters = qs.stringify(
        {
            populate:"*",
            pagination:{
                pageSize:PAGINATION_LIMIT,
                page:"1"
            },
            filters:{
                showOnHomePage:{
                    $eq:true
                }
            },
            sort:["publishedAt:desc"]
        }
    )
    



    const response = await fetch(`${API}/articles?${filters}`);
    const adsResponse = await fetch(`${API}/advertisments?${ad_filters}`);

    const data = await response.json();
    const adsData = await adsResponse.json();


    var visible_articles;
    for(let i=0;i < data?.data.length; i ++)
    {
        let publish_date = new Date(data?.data[i]?.attributes?.date);
        
        let current_date = new Date();
        if(current_date >= publish_date){
            
            visible_articles = data?.data?.slice(i)
            break;
        }

    }
    for(let i =0; i < visible_articles?.length; i++)
    {
        if(visible_articles[i]?.attributes?.featureArticle)
        {
            feature_articles.push(visible_articles[i])
        }
        else{
            non_feature_articles.push(visible_articles[i])
        }

    }
    for(let i = 0, ads = adsData?.data; i < ads?.length; i++){
        if(ads[i].attributes.shape === "rectangle"){
            if(ads[i].attributes.size === "large"){
                
                if(ads[i].attributes.orientation === "horizontal"){
                    ads_large_horizontal.push(ads[i])
                }
                else{
                    ads_large_vertical.push(ads[i])

                }
            }
            else {
                if(ads[i].attributes.size === "medium"){
                    if(ads[i].attributes.orientation === "horizontal"){
                        ads_medium_horizontal.push(ads[i])
                    }
                    else{
                        ads_medium_vertical.push(ads[i])
    
                    }
                }
                else{
                    if(ads[i].attributes.orientation === "horizontal"){
                        ads_small_horizontal.push(ads[i])
                    }
                    else{
                        ads_small_vertical.push(ads[i])
    
                    }
                }
            }
        }
        else{
            ads_square.push(ads[i]);
        }
    }
   
     
    return {
        props:{
            articles: {
                featureArticles: feature_articles || null,

                nonFeatureArticles: non_feature_articles || null,

                
                
            },
            ads:{
                square: ads_square || null,
                large:{
                    horizontal: ads_large_horizontal || null,
                    vertical: ads_large_vertical || null,
                },
                medium:{
                    horizontal: ads_medium_horizontal || null,
                    vertical: ads_medium_vertical || null,
                },
                small:{
                    horizontal: ads_small_horizontal || null,
                    vertical: ads_small_vertical || null,
                },
            }
        }
    }


}



export default Home;