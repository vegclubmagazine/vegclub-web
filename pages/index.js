import { API, BASE_URL } from "../config/api";
import Layout from "../defaults/Layout";
import {Fragment, useEffect,useState, useCallback} from "react";
import {PAGINATION_LIMIT} from "../config/meta.js";
import { slugify } from "../lib/utils.js";
import Link from "next/link.js";
import Moment from "react-moment";
import AdUnit from "../components/AdUnit.jsx";
import SquareAdUnit from "../components/SquareAdUnit.jsx";
import GenericArticleFormat from "../components/GenericArticleFormat.jsx";
import Loader from "../components/Loader.jsx";
import InHouseAds from "../components/InHouseAds.jsx";
import NewsLetterCard from "../components/NewsLetterCard.jsx";
import { FaArrowRight } from "react-icons/fa";
import { MdHowToVote } from "react-icons/md";
import Image from "next/image";

const qs = require("qs");


const Home = ({articles,ads})=>{


    const [offset, setOffset] = useState(8);
    const [isLoading, setIsLoading] = useState(false);
    const [atLastPage, setAtLastPage] = useState(false);
    const [LatestArticles,setLatestArticles] = useState([...articles?.nonFeatureArticles?.slice(1,7)]);
   
    const [page,setPage] = useState(1);
    const [prevPage, setPrevPage] = useState(1);

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
        
        
        if(page > 1 && prevPage !== page){
        
            const query = `query getLatestNonFeatureArticles($filtervar:ArticleFiltersInput){
                                articles(filters:$filtervar, pagination:{start:${offset}, limit:6}, sort:"date:desc")
                                {
                                    meta{
                                        pagination{
                                            total
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
                    setPrevPage(page);
                    setAtLastPage(offset + 6 >= data.articles.meta.pagination.total);
                    setOffset(prev => prev + 6);
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
                <div className="relative border-[#000]/[.1] border-r-[1px] md:border-r-0">
                    <div className={`w-full bg-[#000]/[.1] overflow-hidden h-fit md:max-h-[540px]`}>
                        <img    className={`asset-loading duration-[.34s] transition-all ease-[cubic-bezier(.19,1,.22,1)] object-cover w-full h-auto`}
                                
                                src={   articles?.featureArticles[0]?.attributes?.media?.data?.attributes?.url ||
                                        articles?.featureArticles[0]?.attributes?.media?.data?.attributes?.formats?.large?.url ||
                                        articles?.featureArticles[0]?.attributes?.media?.data?.attributes?.formats?.medium?.url ||
                                        articles?.featureArticles[0]?.attributes?.media?.data?.attributes?.formats?.small?.url ||
                                        articles?.featureArticles[0]?.attributes?.media?.data?.attributes?.formats?.thumbnail?.url
                                        
                                    


                                    }
                              
                               
                                alt={articles?.featureArticles[0]?.attributes?.alternativeText || "Cover Article Image"}
                                
                        ></img>   
                    </div>
                    <div className="relative inline-block py-[40px] pr-[40px] bottom-[40px] md:pb-[80px] lg:bottom-0 left-[10%] md:left-[0%]  bg-[#000] text-start text-white w-[90%] md:w-full">
                        {/*<p className="w-full bg-[#000] text-start text-[#fff] border-box pl-1 text-[0.6rem]"> Damon Winter <span className="text-[#01e2c2] ml-2 mr-2">/</span> Vegclub Magazine <span className="text-[#01e2c2] ml-2 mr-2">/</span> Redux</p>*/}
                        <div className="pl-[40px] md:px-[40px]">
                            <h3 className = "text-white text-[0.833rem]  inline-block uppercase  font-semibold cursor-pointer w-fit duration-[.34s] ease-in-out hover:text-white/[.6]"><Link href={`/category/${articles?.featureArticles[0]?.attributes?.category?.data?.attributes?.slug}`}>{articles?.featureArticles[0]?.attributes?.category?.data?.attributes?.name}</Link></h3>                
                            <h1 className="article-title mt-4 font-extrabold w-fit leading-[1.5]  text-[2.074rem] lg:text-[2.488rem]"><span className="underline_span"><Link href={`/article/${encodeURIComponent(articles?.featureArticles[0]?.attributes?.slug)}`}>{articles?.featureArticles[0]?.attributes?.title}</Link></span></h1>
                            <h2 className="mt-4 text-white text-[1rem] line-clamp-4 2xl:hidden">{articles?.featureArticles[0]?.attributes?.description}</h2>
                            <div className="mt-8 text-[0.833rem]">
                                <p className="inline-block uppercase font-light  mr-1">{articles?.featureArticles[0]?.attributes?.author?.data?.attributes?.name}</p>
                                
                                <Moment className="inline-block font-semibold uppercase  text-[0.833rem]" format="Do MMM YYYY">{articles?.featureArticles[0]?.attributes?.date}</Moment>
                            </div>
                        </div>
                        <div className="absolute h-[200%] w-[100%] bg-black"></div>
                        
                    </div>
                    <div className="hidden relative p-[60px] bottom-[40px] 2xl:inline-block align-top w-[50%]">
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
                <div className="hidden md:grid md:grid-rows-[540px_280px]">
                    <div className="border-[#000]/[.1]">
                        <div className="w-full aspect-[16/10]">
                            <div className="h-full overflow-hidden">
                                <img    className={` duration-[.34s] transition-all ease-[cubic-bezier(.19,1,.22,1)] object-cover w-full h-auto bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAusB9FD6Pn0AAAAASUVORK5CYII=')] bg-no-repeat bg-cover`}
                                        
                                        src={   articles?.featureArticles[1]?.attributes?.media?.data?.attributes?.url ||
                                                articles?.featureArticles[1]?.attributes?.media?.data?.attributes?.formats?.large?.url ||
                                                articles?.featureArticles[1]?.attributes?.media?.data?.attributes?.formats?.medium?.url ||
                                                articles?.featureArticles[1]?.attributes?.media?.data?.attributes?.formats?.small?.url ||
                                                articles?.featureArticles[1]?.attributes?.media?.data?.attributes?.formats?.thumbnail?.url 
                                                
                                            


                                            }
                                        alt = {articles?.featureArticles[1]?.attributes?.alternativeText || ""}
                                        
                                ></img> 
                            </div>
                        </div>
                        <div className=" mx-auto py-[40px] px-[40px]">
                            <h3 className = "text-[0.833rem]  inline-block uppercase  font-semibold cursor-pointer w-fit duration-[.34s] ease-in-out hover:text-black/[.4]"><Link href={`/category/${articles?.featureArticles[1]?.attributes?.category?.data?.attributes?.slug}`}>{articles?.featureArticles[1]?.attributes?.category?.data?.attributes?.name}</Link></h3>                
                            <h2 className="article-title mt-4 font-bold w-fit leading-[1.5] line-clamp-3 text-[1.44rem]"><span className="underline_span"><Link href={`/article/${encodeURIComponent(articles?.featureArticles[1]?.attributes?.slug)}`}>{articles?.featureArticles[1]?.attributes?.title}</Link></span></h2>
                            {/*<p className="mt-5">{articles?.featureArticles[1]?.attributes?.description}</p>*/}
                            <div className="mt-4 text-[0.833rem]">
                                <p className="inline-block font-light  uppercase  mr-1">{articles?.featureArticles[1]?.attributes?.author?.data?.attributes?.name}</p>
                                
                                <Moment className="inline-block font-semibold uppercase text-[0.833rem]" format="MMMM Do YYYY">{articles?.featureArticles[1]?.attributes?.date}</Moment>
                            </div>
                        </div>
                    </div>
                    <div className="px-[40px]">
                        <div className="py-[40px] border-black/[.1] border-y-[1px]">
                            <h3 className = "text-[1rem] font-semibold select-none  uppercase">Keep us going.</h3>
                            <h2 className="mt-4 mb-6 font-extrabold leading-[1.5] select-none  uppercase text-[1.44rem]">
                                <p>Support our</p>
                                <p>continued effort to</p>
                                <p>provide meaningful vegan content</p></h2>
                            <Link href="/donate" className="text-black rounded-[2px] mx-auto text-[0.833rem] w-fit px-3 py-2 bg-[#01e2c2]  font-semibold uppercase transition-all duration-[.32s] ease-[cubic-bezier(.19,1,.22,1)] hover:text-black/[.6]">donate</Link>
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
                        {articles?.featureArticles?.slice(1,5)?.map((article, index)=>(

                            index < 1  ?(
                                <div className="border-[#000]/[.1] border-b-[1px] md:border-r-[1px] md:hidden" key={index}>
                                    <div className="flex flex-row  md:grid md:grid-cols-1 h-fit">
                                        <div className="flex grow flex-col pl-[40px] justify-center md:hidden py-[20px] pr-[20px]">
                                            <h3 className = "text-[0.833rem] inline-block uppercase transition-all duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)] hover:text-black/[.4]  font-semibold cursor-pointer w-fit"><Link href={`/category/${article?.attributes?.category?.data?.attributes?.slug}`}>{article?.attributes?.category?.data?.attributes?.name}</Link></h3>                
    
                                            <h2 className="article-title mt-3 md:text-[1.44rem] lg:text-[1.728rem] line-clamp-4 font-bold"><span className="underline_span"><Link href={`/article/${encodeURIComponent(article?.attributes?.slug)}`}>{article?.attributes?.title}</Link></span></h2>
                                            <div className="mt-3 text-[0.833rem]">
                                                <p className="inline-block font-light uppercase  mt-3 mr-1">{article?.attributes?.author?.data?.attributes?.name}</p>
                                                <Moment className="inline-block font-semibold uppercase  text-[0.833rem]" format="Do MMM YYYY">{article?.attributes?.date}</Moment>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex flex-col w-[150px] h-full overflow-hidden md:h-auto md:w-full  md:aspect-[16/9] mx-auto bg-[#CACACA]">
                                                <img    className={` duration-[.34s] transition-all ease-[cubic-bezier(.19,1,.22,1)] object-cover h-full w-auto bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAusB9FD6Pn0AAAAASUVORK5CYII=')] bg-no-repeat bg-cover`}
                                                        
                                                        src={   article?.attributes?.media?.data?.attributes?.url ||
                                                                article?.attributes?.media?.data?.attributes?.formats?.large?.url ||
                                                                article?.attributes?.media?.data?.attributes?.formats?.medium?.url ||
                                                                article?.attributes?.media?.data?.attributes?.formats?.small?.url ||
                                                                article?.attributes?.media?.data?.attributes?.formats?.thumbnail?.url
                                                            
                                                                
                                                            


                                                            }
                                                        alt = {article?.attributes?.alternativeText || ""}
                                                      
                                                ></img>  
                                            </div>
                                        </div>
                                        <div className="hidden md:block p-[40px]">
                                            <h3 className = "article-title text-[0.833rem] inline-block  font-semibold cursor-pointer w-fit"><span className="underline_span"><Link href={`/category/${article?.attributes?.category?.data?.attributes?.slug}`}>{article?.attributes?.category?.data?.attributes?.name}</Link></span></h3>                

                                            <h2 className="mt-4 font-bold text-[1.44rem] "><Link href={`/article/${encodeURIComponent(article?.attributes?.slug)}`}>{article?.attributes?.title}</Link></h2>
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

                                            <h2 className="article-title mt-3 md:text-[1.44rem] lg:text-[1.728rem] font-bold line-clamp-4 md:line-clamp-5"><span className="underline_span"><Link href={`/article/${encodeURIComponent(article?.attributes?.slug)}`}>{article?.attributes?.title}</Link></span></h2>
                                            <div className="mt-3 text-[0.833rem]">
                                                <p className="inline-block font-light uppercase  mt-3 mr-1">{article?.attributes?.author?.data?.attributes?.name}</p>
                                                <Moment className="inline-block font-semibold uppercase " format="Do MMM YYYY">{article?.attributes?.date}</Moment>
                                            </div>
                                        </div>
                                        <div className="">
                                            <div className="flex flex-col w-[150px] h-full overflow-hidden  md:h-auto md:w-full  md:aspect-[16/9] mx-auto">
                                                <img    className="h-full w-auto  object-cover" 
                                                        src={   article?.attributes?.media?.data?.attributes?.url ||
                                                                article?.attributes?.media?.data?.attributes?.formats?.large?.url ||
                                                                article?.attributes?.media?.data?.attributes?.formats?.medium?.url ||
                                                                article?.attributes?.media?.data?.attributes?.formats?.small?.url ||
                                                                article?.attributes?.media?.data?.attributes?.formats?.thumbnail?.url
                                                            
                                                                
                                                            


                                                            }
                                                            alt = {article?.attributes?.alternativeText || ""}
                                                ></img>  
                                            </div>
                                        </div>
                                        <div className="hidden md:block p-[40px]">
                                            <h3 className = "text-[0.833rem]  inline-block uppercase  font-semibold cursor-pointer w-fit duration-[.32s] ease-in-out hover:text-black/[.4]"><Link href={`/category/${article?.attributes?.category?.data?.attributes?.slug}`}>{article?.attributes?.category?.data?.attributes?.name}</Link></h3>                

                                            <h2 className="article-title mt-4 font-bold text-[1.44rem] md:line-clamp-4 lg:line-clamp-4 "><span className="underline_span"><Link className="" href={`/article/${encodeURIComponent(article?.attributes?.slug)}`}>{article?.attributes?.title}</Link></span></h2>
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
           <section className="lg:grid lg:grid-cols-[2fr_1fr]">
                <NewsLetterCard></NewsLetterCard>
                <div className="hidden lg:block bg-[#18181b] pl-[40px]  py-[70px] text-white overflow-hidden relative">
                    <div className="">
                        <h3 className={`uppercase leading-[1.4] select-none font-bold  text-[2.074rem] lg:text-[2.488rem]`}>
                            <p>Discounts</p>
                            <p>At a variety of</p>
                            <p>Vegan eateries across europe.</p>

                        </h3>
                    
                        <div className="mt-5 w-fit py-2 px-3 bg-[#01e2c2] rounded-[2px] text-black relative right-0">
                            <Link href="/vegclubloyalty" className=" cursor-pointer text-center min-w-[84.233px] text-[.833rem] uppercase font-semibold">Get loyalty card</Link>
                        </div>
                  

                        {/*<div className="w-fit absolute opacity-300 rotate-[345deg] z-[0] bottom-0 right-0">
                            <img src="/discount_asset_deliver-img.png" className="w-[250px] h-auto"/>
                        </div>*/}

                    </div>
                </div>
            </section>
            <section className="w-full border-black/[.1]">
                <div className="border-b-[1px] text-[2.074rem] md:text-[2.488rem] lg:text-[2.986rem] font-extrabold  uppercase py-[40px]">
                    <div className="w-fit pl-[40px]">
                        <h2 className="leading-[0.8]">The</h2>
                        <h2>Latest</h2>
                    </div>
                </div>
                

                
                {/*<div className="block hidden md:grid md:grid-cols-[1fr_2fr] overflow-y-hidden">
                    <div className="hidden md:grid">
                        <div className="border-[#000]/[.1] border-b-[1px] border-r-[1px]">
                            <div className="w-full aspect-[16/15]">
                                <div className="h-full  overflow-hidden bg-[#cacaca]">
                                    <img    className="h-full w-auto object-cover" 
                                            src={   articles?.nonFeatureArticles[1]?.attributes?.media?.data?.attributes?.url ||
                                                    articles?.nonFeatureArticles[1]?.attributes?.media?.data?.attributes?.formats?.large?.url ||
                                                    articles?.nonFeatureArticles[1]?.attributes?.media?.data?.attributes?.formats?.medium?.url ||
                                                    articles?.nonFeatureArticles[1]?.attributes?.media?.data?.attributes?.formats?.small?.url ||
                                                    articles?.nonFeatureArticles[1]?.attributes?.media?.data?.attributes?.formats?.thumbnail?.url 
                                                    
                                                


                                                }
                                    ></img> 
                                </div>
                            </div>
                            <div className=" mx-auto p-[40px]">
                                <h3 className = " text-[0.833rem]  inline-block uppercase  font-semibold cursor-pointer w-fit duration-[.34s] ease-in-out hover:text-black/[.4]"><Link href={`/category/${articles?.nonFeatureArticles[1]?.attributes?.category?.data?.attributes?.slug}`}>{articles?.nonFeatureArticles[1]?.attributes?.category?.data?.attributes?.name}</Link></h3>                
                                <h1 className="article-title mt-4 font-bold w-fit leading-[1.5] text-[1.44rem] lg:text-[1.728rem]"><span className="underline_span"><Link href={`/article/${encodeURIComponent(articles?.nonFeatureArticles[1]?.attributes?.slug)}`}>{articles?.nonFeatureArticles[1]?.attributes?.title}</Link></span></h1>
                                {/*<p className=" mt-5">{articles?.nonFeatureArticles[1]?.attributes?.description}</p>
                                <div className="mt-4 text-[0.833rem]">
                                    <p className="inline-block font-light  uppercase  mr-1">{articles?.nonFeatureArticles[1]?.attributes?.author?.data?.attributes?.name}</p>
                                    
                                    <Moment className="inline-block font-semibold uppercase text-[0.833rem]" format="MMMM Do YYYY">{articles?.nonFeatureArticles[1]?.attributes?.date}</Moment>
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
                                            </div>
                    </div>
                    <div className="relative border-[#000]/[.1] border-r-[1px]">
                        <div className="w-full bg-[#000]/[.1] overflow-hidden h-fit  md:max-h-[540px]">
                            <img    className="object-cover w-full h-auto" 
                                    src={   articles?.nonFeatureArticles[0]?.attributes?.media?.data?.attributes?.url ||
                                            articles?.nonFeatureArticles[0]?.attributes?.media?.data?.attributes?.formats?.large?.url ||
                                            articles?.nonFeatureArticles[0]?.attributes?.media?.data?.attributes?.formats?.medium?.url ||
                                            articles?.nonFeatureArticles[0]?.attributes?.media?.data?.attributes?.formats?.small?.url ||
                                            articles?.nonFeatureArticles[0]?.attributes?.media?.data?.attributes?.formats?.thumbnail?.url
                                            
                                        


                                        }
                            ></img>   
                        </div>
                        <div className="relative inline-block py-[40px] pr-[40px] bottom-[40px] left-[10%] md:left-[25%]  bg-[#000] text-start text-white w-[90%] md:w-[75%]">
                            {/*<p className="w-full bg-[#000] text-start text-[#fff] border-box pl-1 text-[0.6rem]"> Damon Winter <span className="text-[#01e2c2] ml-2 mr-2">/</span> Vegclub Magazine <span className="text-[#01e2c2] ml-2 mr-2">/</span> Redux</p>
                            <div className="pl-[40px]">
                                <h3 className = "text-white text-[0.833rem]  inline-block uppercase  font-semibold cursor-pointer w-fit duration-[.34s] ease-in-out hover:text-white/[.6]"><Link href={`/category/${articles?.nonFeatureArticles[0]?.attributes?.category?.data?.attributes?.slug}`}>{articles?.nonFeatureArticles[0]?.attributes?.category?.data?.attributes?.name}</Link></h3>                
                                <h1 className="article-title mt-4 line-clamp-4 font-extrabold w-fit leading-[1.5] text-[1.728rem] lg:text-[2.488rem]"><span className="underline_span"><Link href={`/article/${encodeURIComponent(articles?.nonFeatureArticles[0]?.attributes?.slug)}`}>{articles?.nonFeatureArticles[0]?.attributes?.title}</Link></span></h1>
                                <h2 className="mt-4 text-white text-[1rem] line-clamp-4">{articles?.nonFeatureArticles[0]?.attributes?.description}</h2>
                                <div className="mt-4 text-[0.833rem]">
                                    <p className="inline-block uppercase font-light  mr-1">{articles?.nonFeatureArticles[0]?.attributes?.author?.data?.attributes?.name}</p>
                                    
                                    <Moment className="inline-block font-semibold uppercase  text-[0.833rem]" format="Do MMM YYYY">{articles?.nonFeatureArticles[0]?.attributes?.date}</Moment>
                                </div>
                            </div>
                            <div className="absolute h-[200%] w-[100%] bg-black"></div>
                            
                        </div>
                        <div className="hidden relative p-[60px] bottom-[40px] align-top w-[50%]">
                            <div className="w-full">
                                {/*{ads.square?.length ? (
                                    <Fragment>
                                        <p className="text-[0.634rem] w-fit mx-auto mb-2 text-[#CACACA] uppercase">Advertisement</p>

                                        {/*<InHouseAds ad={ads.square[0]}/>
                                    </Fragment>
                                ):""}
                                <p className="leading-[1.6] text-[1.02rem] font-[410] line-clamp-4">{articles?.nonFeatureArticles[0]?.attributes?.description}</p>
                            </div>
                        </div>
                    </div>
                    
                </div>*/}

                <div className="w-full  border-b-[1px] md:border-b-0 pb-[2rem] md:pb-0">
                    <div className="bg-[#000] px-[40px]  w-full md:px-0 md:grid md:grid-cols-[1fr_2fr] items-center">
                        
                        <div className=" mx-auto md:mx-0 md:px-[40px] h-fit  pt-[20px] pb-[80px]">
                            <h3 className = "text-white text-[0.833rem] inline-block uppercase  font-semibold cursor-pointer w-fit duration-[.32s] ease-[cubic-bezier(.19,1,.22,1)] hover:text-white/[.6]"><Link href={`category/${articles?.nonFeatureArticles[0]?.attributes?.category?.data?.attributes?.slug}`}>{articles?.nonFeatureArticles[0]?.attributes?.category?.data?.attributes?.name}</Link>
                                
                            </h3>
                            <h2 className="text-[1.44rem] md:text-[1.728rem] lg:text-[2.074rem] text-white mt-4 font-extrabold article-title line-clamp-4"><span className="underline_span"><Link href={`article/${encodeURIComponent(articles?.nonFeatureArticles[0]?.attributes?.slug)}`}>{articles?.nonFeatureArticles[0]?.attributes?.title}</Link></span></h2>
                            {/*<div className="h-fit w-fit inline-block align-middle">
                                <i className=" inline-block cursor-pointer ml-2 h-[10px] w-[10px] border-[#40e0d0] border-t-[1px] border-r-[1px] rotate-45"></i>
                            </div>*/}
                            <p className="mt-4 text-white line-clamp-4 text-[1rem]">{articles?.nonFeatureArticles[0]?.attributes?.description}</p>

                            <div className="mt-4 text-white text-[0.833rem]">
                                <p className="inline-block font-light uppercase  mr-1">{articles?.nonFeatureArticles[0]?.attributes?.author?.data?.attributes?.name}</p>
                                
                                <Moment className="inline-block font-semibold uppercase  text-[0.833rem]" format="Do MMM YYYY">{articles?.nonFeatureArticles[0]?.attributes?.date}</Moment>
                            </div>
                        </div>
                        <div className="hidden  overflow-y-hidden md:block w-full aspect-[16/9]">
                            <img    className="w-full h-auto object-cover" 
                                    src={   articles?.nonFeatureArticles[0]?.attributes?.media?.data?.attributes?.url ||
                                            articles?.nonFeatureArticles[0]?.attributes?.media?.data?.attributes?.formats?.large?.url ||
                                            articles?.nonFeatureArticles[0]?.attributes?.media?.data?.attributes?.formats?.medium?.url ||
                                            articles?.nonFeatureArticles[0]?.attributes?.media?.data?.attributes?.formats?.small?.url ||
                                            articles?.nonFeatureArticles[0]?.attributes?.media?.data?.attributes?.formats?.thumbnail?.url 
                                           
                                        


                                        }
                                    alt = {articles?.nonFeatureArticles[0]?.attributes?.alternativeText || ""}
                            ></img>                          
                        </div>
                        
                    </div>
                    <div className="block md:hidden px-[40px] mt-[-50px]">
                        <div className="aspect-[16/9] overflow-y-hidden ">
                                <img    className="w-full h-auto" 
                                        src={   articles?.nonFeatureArticles[0]?.attributes?.media?.data?.attributes?.url ||
                                                articles?.nonFeatureArticles[0]?.attributes?.media?.data?.attributes?.formats?.large?.url ||
                                                articles?.nonFeatureArticles[0]?.attributes?.media?.data?.attributes?.formats?.medium?.url ||
                                                articles?.nonFeatureArticles[0]?.attributes?.media?.data?.attributes?.formats?.small?.url ||
                                                articles?.nonFeatureArticles[0]?.attributes?.media?.data?.attributes?.formats?.thumbnail?.url
                                                
                                            


                                            }
                                        alt = {articles?.nonFeatureArticles[0]?.attributes?.alternativeText || ""}
                                ></img>  

                        </div>
                    </div>
                </div>
                <div className="hidden md:grid grid-cols-3">
                    {LatestArticles?.map((article, index)=>(
                        <div key={index} className="border-r-[1px] border-b-[1px] border-black/[.1] pb-[40px]">
                            <div className="aspect-[16/9] overflow-hidden">
                                <img src={article?.attributes?.media?.data?.attributes?.url ||
                                        article?.attributes?.media?.data?.attributes?.formats?.large?.url ||
                                        article?.attributes?.media?.data?.attributes?.formats?.medium?.url ||
                                        article?.attributes?.media?.data?.attributes?.formats?.small?.url ||
                                        article?.attributes?.media?.data?.attributes?.formats?.thumbnail?.url 
                                        
                                } 
                                alt ={article?.attributes?.alternativeText || ""}
                                className="w-full object-cover h-auto"/>


                            </div>
                            <div className="hidden md:block p-[40px]">
                                            <h3 className = "article-title text-[0.833rem] uppercase inline-block  font-semibold cursor-pointer w-fit transition-all duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)]  hover:text-black/[.6]"><Link href={`/category/${article?.attributes?.category?.data?.attributes?.slug}`}>{article?.attributes?.category?.data?.attributes?.name}</Link></h3>                

                                            <h1 className="mt-4 font-bold text-[1.44rem] article-title"><span className="underline_span"><Link href={`/article/${encodeURIComponent(article?.attributes?.slug)}`}>{article?.attributes?.title}</Link></span></h1>
                                            <div className="mt-4 text-[0.833rem]">
                                                <p className="inline-block font-light  uppercase  mr-1">{article?.attributes?.author?.data?.attributes?.name}</p>
                                                
                                                <Moment className="inline-block font-semibold uppercase  text-[0.833rem]" format="Do MMM YYYY">{article?.attributes?.date}</Moment>
                                            </div>
                                
                            </div>

                        </div>
                    ))}
                </div>
                <div className="border-[#000]/[.1] border-b-[1px] md:hidden">
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
            {/*<div className="temp-awards-banner h-[120px] md:h-[150px] lg:h-[250px]  px-[40px] relative  bg-[#01e2c2] text-black">
                
                <div className="absolute lg:static  left-[20px] top-[1rem] w-fit text-[1rem] md:text-[1.44rem] lg:text-[1.728rem] xl:text-[2.074rem] font-bold max-w-[300px] md:max-w-[550px] lg:max-w-fit py-1 md:py-3 lg:py-[40px]  z-[1]">
                    <p className="uppercase font-extrabold">Cast
                      
                         your
                      
                        votes.
                    </p>
                    <p className="mt-2 lg:mt-5 font-normal md:font-light text-[.833rem] md:text-[1rem] lg:text-[1.2rem] ">Vote for your favourite vegan eatery in europe.</p>
                    <div role="button" className="w-fit bg-black text-[#01e2c2] mt-2 lg:mt-5 text-[1rem] h-fit rounded-[5px] py-1 lg:py-3 px-3">
                        <Link className="" href="/vegclub-award-24">
                            <div className="inline-block w-fit mr-2 align-middle">
                                <FaArrowRight className="text-[.693rem] md:text-[.833rem] lg:text-[1rem]"/>
                            </div>
                            <div className="text-[.693rem] md:text-[.833rem] lg:text-[1rem] inline-block align-middle uppercase ">Vote now</div>
                        </Link>
                    </div>
                    {/*<div className="mt-[40px] flex h-fit flex-direction-row">
                        <div className="w-[24px] h-[24px]">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                                <path d="M 0 0 L 0 100 L 100 0" fill="#009680"/>
                            </svg>
                        </div>
                        <div className="w-[24px] h-[24px] ml-5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                                <path d="M 0 0 L 0 100 L 100 0" fill="#009680"/>
                            </svg>
                        </div>
                        <div className="w-[24px] h-[24px] ml-5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                                <path d="M 0 0 L 0 100 L 100 0" fill="#009680"/>
                            </svg>
                        </div>

                    </div>
                </div>
                
                <div className="absolute right-0 top-0 z-[0]">
                    <img className="h-[120px] md:h-[150px] lg:h-[250px]  w-auto" src="/asset_banner_pattern.png"/>
                </div>
                <div className="absolute left-0 top-0 hidden">
                    <img className="h-[100px] md:h-[150px] lg:h-[250px] w-auto rotate-[180deg]" src="/asset_banner_pattern.png"/>
                </div>
            </div>*/}
          
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