import { API } from "../config/api";
import Layout from "../defaults/Layout";
import {useEffect} from "react";
import {PAGINATION_LIMIT} from "../config/meta.js";
import { slugify } from "../lib/utils.js";
import Link from "next/link.js";
import Moment from "react-moment";
import AdUnit from "../components/AdUnit.jsx";
import SquareAdUnit from "../components/SquareAdUnit.jsx";


const qs = require("qs");


const Home = ({articles})=>{


    
    return(
        <Layout>
            <section className="block md:grid md:grid-cols-[2fr_1fr] overflow-y-hidden">
                <div className="relative border-[#000]/[.1] border-r-[1px]">
                    <div className="w-full bg-[#000]/[.1] overflow-y-hidden aspect-[4/3] md:aspect-[16/9]">
                        <img    className="object-cover w-full" 
                                src={   articles?.featureArticles[0]?.attributes?.media?.data?.attributes?.url ||
                                        articles?.featureArticles[0]?.attributes?.media?.data?.attributes?.formats?.large?.url ||
                                        articles?.featureArticles[0]?.attributes?.media?.data?.attributes?.formats?.medium?.url ||
                                        articles?.featureArticles[0]?.attributes?.media?.data?.attributes?.formats?.small?.url ||
                                        articles?.featureArticles[0]?.attributes?.media?.data?.attributes?.formats?.thumbnail?.url
                                        
                                    


                                    }
                        ></img>  
                    </div>
                    <div className="relative inline-block py-[40px] bottom-[40px] left-[10%] md:left-[0%]  bg-[#000] text-start text-white w-[90%] md:w-[75%] lg:w-[50%]">
                        {/*<p className="w-full bg-[#000] text-start text-[#fff] border-box pl-1 text-[0.6rem]"> Damon Winter <span className="text-[#01e2c2] ml-2 mr-2">/</span> Vegclub Magazine <span className="text-[#01e2c2] ml-2 mr-2">/</span> Redux</p>*/}
                        <div className="w-[90%] mx-auto ">
                            <p className="uppercase font-semibold italic">{articles?.featureArticles[0]?.attributes?.category?.data?.attributes?.name}</p>
                            <h1 className="mt-4 font-semibold leading-[1.5] text-[1.44rem] lg:text-[1.728rem]  duration-[.34s] ease-in-out hover:text-white/[.6]"><Link href={`/article/${articles?.featureArticles[0]?.attributes?.slug}`}>{articles?.featureArticles[0]?.attributes?.title}</Link></h1>
                            <h2 className="mt-4 text-[#a2a2a2] text-[1rem] lg:hidden">{articles?.featureArticles[0]?.attributes?.description}</h2>
                            <div className="mt-4 text-[0.833rem]">
                                <p className="inline-block uppercase italic mr-1">{articles?.featureArticles[0]?.attributes?.author?.data?.attributes?.name}</p>
                                <span className="text-[#01e2c2]">/</span>
                                {/*<Moment className="inline-block font-semibold uppercase italic text-[0.833rem]" format="Do MMM YYYY">{articles?.featureArticles[0]?.attributes?.date}</Moment>*/}
                            </div>
                        </div>
                        <div className="absolute h-[200%] w-[100%] bg-black"></div>
                        
                    </div>
                    <div className="hidden relative bottom-[40px] p-[40px] lg:inline-block align-top w-[50%]">
                        <div className="pt-[40px]">
                            <p>{articles?.featureArticles[0]?.attributes?.description}</p>
                        </div>
                    </div>
                </div>
                <div className="hidden md:grid md:grid-rows-2 lg:grid-rows-[60%_40%]">
                    <div className="border-[#000]/[.1] border-b-[1px]">
                        <div className="w-full aspect-[16/9]">
                            <div className="h-full object-cover overflow-y-hidden bg-[#cacaca]">
                                <img    className="w-full h-auto" 
                                        src={   articles?.featureArticles[1]?.attributes?.media?.data?.attributes?.url ||
                                                articles?.featureArticles[1]?.attributes?.media?.data?.attributes?.formats?.large?.url ||
                                                articles?.featureArticles[1]?.attributes?.media?.data?.attributes?.formats?.medium?.url ||
                                                articles?.featureArticles[1]?.attributes?.media?.data?.attributes?.formats?.small?.url ||
                                                articles?.featureArticles[1]?.attributes?.media?.data?.attributes?.formats?.thumbnail?.url 
                                                
                                            


                                            }
                                ></img> 
                            </div>
                        </div>
                        <div className="w-[90%] mx-auto pt-[40px] pr-[40px]">
                            <h1 className="font-semibold text-[1.44rem] lg:text-[1.728rem] duration-[.34s] ease-in-out hover:text-black/[.4]"><Link href={`/article/${articles?.featureArticles[1]?.attributes?.slug}`}>{articles?.featureArticles[1]?.attributes?.title}</Link></h1>
                            <div className="mt-4 text-[0.833rem]">
                                <p className="inline-block  uppercase italic mr-1">{articles?.featureArticles[1]?.attributes?.author?.data?.attributes?.name}</p>
                                <span className="text-[#01e2c2]">/</span>
                                {/*<Moment className="inline-block font-semibold uppercase italic text-[0.833rem]" format="MMMM Do YYYY">{articles?.featureArticles[1]?.attributes?.date}</Moment>*/}
                            </div>
                        </div>
                    </div>
                    <div className="">
                        
                        <div className="h-full pt-[40px] w-[90%] mx-auto pr-[40px]">
                            <h1 className=" font-semibold text-[1.44rem] lg:text-[1.728rem] duration-[.34s] ease-in-out hover:text-black/[.4]"><Link href={`/article/${articles?.featureArticles[2]?.attributes?.slug}`}>{articles?.featureArticles[2]?.attributes?.title}</Link></h1>
                            <div className="mt-4 text-[0.833rem]">
                                <p className="inline-block  uppercase italic mr-1">{articles?.featureArticles[2]?.attributes?.author?.data?.attributes?.name}</p>
                                <span className="text-[#01e2c2]">/</span>
                                {/*<Moment className="inline-block font-semibold uppercase italic text-[0.833rem]" format="MMMM Do YYYY">{articles?.featureArticles[2]?.attributes?.date}</Moment>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*<section className="h-fit w-[90%] mx-auto border-box border-[#CACACA] border-b-[1px]  py-3 text-center">
                <p className="text-[0.634rem] text-[#CACACA] uppercase">Advertisement</p>
                <div className="mx-auto max-w-[450px] w-[80%] h-[90px] bg-[#CACACA] mt-2"></div>
            </section>*/}
            <section className="w-full  border-box h-fit pb-3">
                <div className="md:grid md:grid-cols-3">
                    {/*<h1 className=" text-center font-bold italic text-[1.44rem]">Recent stories</h1>*/}
                        {articles?.featureArticles?.slice(1,6)?.map((article, index)=>(

                            index < 2  ?(
                                <div className="border-[#000]/[.1] border-b-[1px] md:border-r-[1px] md:hidden" key={index}>
                                    <div className="flex flex-row  md:grid md:grid-cols-1 h-fit">
                                        <div className="flex grow flex-col justify-center md:hidden py-[20px] pr-[20px] ml-[5%]">
                                            
                                            <h1 className="md:text-[1.44rem] lg:text-[1.728rem] font-semibold"><Link href={`/article/${article?.attributes?.slug}`}>{article?.attributes?.title}</Link></h1>
                                            <div className="mt-3 text-[0.833rem]">
                                                <p className="inline-block uppercase italic mt-3 mr-1">{article?.attributes?.author?.data?.attributes?.name}</p>
                                                {/*<Moment className="inline-block font-semibold uppercase italic text-[0.833rem]" format="Do MMM YYYY">{article?.attributes?.date}</Moment>*/}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="w-[150px] overflow-y-hidden object-cover md:h-auto md:w-full aspect-square md:aspect-[16/9] mx-auto bg-[#CACACA]">
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
                                        <div className="hidden md:block w-[90%] mt-4 mx-auto pb-3">
                                    
                                            <h1 className="font-semibold text-[1.44rem] "><Link href={`/article/${article?.attributes?.slug}`}>{article?.attributes?.title}</Link></h1>
                                            <div className="mt-4 text-[0.833rem]">
                                                <p className="inline-block  uppercase italic mr-1">{article?.attributes?.author?.data?.attributes?.name}</p>
                                                
                                                {/*<Moment className="inline-block font-semibold uppercase italic text-[0.833rem]" format="Do MMM YYYY">{article?.attributes?.date}</Moment>*/}
                                            </div>
                                
                                        </div>

                                    </div>
                                </div>
                            ):(
                                <div className="border-[#000]/[.1] border-b-[1px] md:border-r-[1px] " key={index}>
                                    <div className="flex flex-row md:grid md:grid-cols-1 h-fit">
                                        <div className="flex grow flex-col justify-center md:hidden py-[20px] pr-[20px] ml-[5%]">
                                            
                                            <h1 className="md:text-[1.44rem] lg:text-[1.728rem] font-semibold"><Link className="duration-[.32s] ease-in-out hover:text-black/[.4]" href={`/article/${article?.attributes?.slug}`}>{article?.attributes?.title}</Link></h1>
                                            <div className="mt-3 text-[0.833rem]">
                                                <p className="inline-block uppercase italic mt-3 mr-1">{article?.attributes?.author?.data?.attributes?.name}</p>
                                                {/*<Moment className="inline-block font-semibold uppercase italic text-[0.833rem]" format="Do MMM YYYY">{article?.attributes?.date}</Moment>*/}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="w-[150px] overflow-y-hidden object-cover md:h-auto md:w-full aspect-square md:aspect-[16/9] mx-auto bg-[#CACACA]">
                                                <img    className="w-full h-auto" 
                                                        src={   article?.attributes?.media?.data?.attributes?.url ||
                                                                article?.attributes?.media?.data?.attributes?.formats?.large?.url ||
                                                                article?.attributes?.media?.data?.attributes?.formats?.medium?.url ||
                                                                article?.attributes?.media?.data?.attributes?.formats?.small?.url ||
                                                                article?.attributes?.media?.data?.attributes?.formats?.thumbnail?.url
                                                            
                                                                
                                                            


                                                            }
                                                ></img>  
                                            </div>
                                        </div>
                                        <div className="hidden md:block w-[90%] mt-4 mx-auto pb-3">
                                    
                                            <h1 className="font-semibold text-[1.44rem] "><Link className="duration-[.32s] ease-in-out hover:text-black/[.4]" href={`/article/${article?.attributes?.slug}`}>{article?.attributes?.title}</Link></h1>
                                            <div className="mt-4 text-[0.833rem]">
                                                <p className="inline-block  uppercase italic mr-1">{article?.attributes?.author?.data?.attributes?.name}</p>
                                                
                                                {/*<Moment className="inline-block font-semibold uppercase italic text-[0.833rem]" format="Do MMM YYYY">{article?.attributes?.date}</Moment>*/}
                                            </div>
                                
                                        </div>

                                    </div>
                                </div>
                            )
                        ))}
                    
                        
                        
                    
                </div>
            </section>
            <section className="h-fit w-full  border-box border-[#000]/[.1] border-b-[1px]  pt-3 pb-4 text-center">
                <p className="text-[0.634rem] text-[#CACACA] uppercase">Advertisement</p>
                <div className="mx-auto w-fit mt-2">
                    <AdUnit/>
                </div>
            </section>
            <section className="w-full">
                <div className="w-full border-[#cacaca] border-b-[1px] pb-[2rem] md:pb-0">
                    <div className="bg-[#000] w-full md:grid md:grid-cols-[2fr_1fr] items-center">
                        <div className="hidden  overflow-y-hidden md:block w-full aspect-[16/9]  bg-[#cacaca]">
                            <img    className="w-full h-auto" 
                                    src={    articles?.lifestyleAndFood[0]?.attributes?.media?.data?.attributes?.url ||
                                            articles?.lifestyleAndFood[0]?.attributes?.media?.data?.attributes?.formats?.large?.url ||
                                            articles?.lifestyleAndFood[0]?.attributes?.media?.data?.attributes?.formats?.medium?.url ||
                                            articles?.lifestyleAndFood[0]?.attributes?.media?.data?.attributes?.formats?.small?.url ||
                                            articles?.lifestyleAndFood[0]?.attributes?.media?.data?.attributes?.formats?.thumbnail?.url 
                                           
                                        


                                        }
                            ></img>                          
                        </div>
                        <div className="w-[90%] md:w-full mx-auto md:pl-[20px] h-fit  pt-[20px] pb-[80px]">
                            <h3 className = "text-white article-title inline-block uppercase italic font-semibold cursor-pointer w-fit"><span className="underline_span"><Link href={`category/${articles?.lifestyleAndFood[0]?.attributes?.category?.data?.attributes?.slug}`}>{articles?.lifestyleAndFood[0]?.attributes?.category?.data?.attributes?.name}</Link></span>
                                
                            </h3>
                            <h1 className="text-[1.44rem] md:text-[1.728rem] lg:text-[2.074rem] text-white mt-4 font-semibold duration-[.34s] ease-in-out hover:text-white/[.6]"><Link href={`article/${articles?.lifestyleAndFood[0]?.attributes?.slug}`}>{articles?.lifestyleAndFood[0]?.attributes?.title}</Link></h1>
                            {/*<div className="h-fit w-fit inline-block align-middle">
                                <i className=" inline-block cursor-pointer ml-2 h-[10px] w-[10px] border-[#40e0d0] border-t-[1px] border-r-[1px] rotate-45"></i>
                            </div>*/}
                            <p className="mt-4 text-[#a2a2a2] text-[1rem]">{articles?.lifestyleAndFood[0]?.attributes?.description}</p>

                            <div className="mt-4 text-white text-[0.833rem]">
                                <p className="inline-block uppercase italic mr-1">{articles?.lifestyleAndFood[0]?.attributes?.author?.data?.attributes?.name}</p>
                                <span className="text-[#01e2c2]">/</span>
                                {/*<Moment className="inline-block font-semibold uppercase italic text-[0.833rem]" format="Do MMM YYYY">{articles?.lifestyleAndFood[0]?.attributes?.date}</Moment>*/}
                            </div>
                        </div>
                        
                    </div>
                    <div className="block md:hidden aspect-[16/9] overflow-y-hidden w-[90%]  mx-auto  mt-[-50px] bg-[#CACACA]">
                            <img    className="w-full h-auto" 
                                    src={   articles?.lifestyleAndFood[0]?.attributes?.media?.data?.attributes?.url ||
                                            articles?.lifestyleAndFood[0]?.attributes?.media?.data?.attributes?.formats?.large?.url ||
                                            articles?.lifestyleAndFood[0]?.attributes?.media?.data?.attributes?.formats?.medium?.url ||
                                            articles?.lifestyleAndFood[0]?.attributes?.media?.data?.attributes?.formats?.small?.url ||
                                            articles?.lifestyleAndFood[0]?.attributes?.media?.data?.attributes?.formats?.thumbnail?.url
                                            
                                        


                                        }
                            ></img>  

                    </div>
                </div>
                <div className="border-[#000]/[.1] lg:grid lg:grid-cols-[2fr_1fr]">
                    <ul className="list-none text-start md:border-r-[1px]">
                        {articles?.lifestyleAndFood?.slice(1).map((article, index)=>(
                            
                            <li className="border-b-[1px] md:py-[40px]" key={index}>
                                <div className="flex flex-row lg:grid lg:grid-cols-2  h-full">
                                    
                                    <div className="hidden  md:block w-[33.3%] lg:w-full aspect-[16/9] object-cover overflow-y-hidden max-h-[248px]">
                                        <img    className="w-full h-auto" 
                                                src={   article?.attributes?.media?.data?.attributes?.url ||
                                                        article?.attributes?.media?.data?.attributes?.formats?.large?.url ||
                                                        article?.attributes?.media?.data?.attributes?.formats?.medium?.url ||
                                                        article?.attributes?.media?.data?.attributes?.formats?.small?.url ||
                                                        article?.attributes?.media?.data?.attributes?.formats?.thumbnail?.url 
                                                        
                                                    


                                                    }
                                        ></img>  
                                    </div>
                                    
                                    <div className="py-[40px] justify-center flex flex-col grow ml-[5%] lg:block md:ml-0 pr-[40px] md:pl-[20px] text-black">
                                        
                                        <h1 className="font-semibold md:text-[1.44rem] lg:text-[1.728rem] duration-[.34s] ease-in-out hover:text-black/[.4]"><Link href={`/article/${article?.attributes?.slug}`}>{article?.attributes?.title}</Link></h1>
                                        <h2 className="hidden md:block mt-4">{article?.attributes?.description}</h2>
                                        <div className="mt-4 text-[0.833rem]">
                                            <p className="inline-block uppercase italic mt-3 mr-1">{article?.attributes?.author?.data?.attributes?.name}</p>
                                        
                                            <Moment className="inline-block font-semibold uppercase italic text-[0.833rem]" format="Do MMM YYYY">{article?.attributes?.date}</Moment>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="w-[150px] overflow-y-hidden object-cover md:hidden h-full md:h-auto md:w-[80%] md:mx-auto  aspect-square md:aspect-[16/9] mx-auto bg-[#CACACA]">
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

                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="hidden lg:block w-fit pt-[40px] pl-[20px]">
                        <SquareAdUnit/>
                    </div>
                </div>
            </section>
            <section className="w-full">
                <div className="w-full border-[#cacaca] border-b-[1px] pb-[2rem] md:pb-0">
                    <div className="bg-[#000] w-full md:grid md:grid-cols-[2fr_1fr] items-center">
                        <div className="hidden  overflow-y-hidden md:block w-full aspect-[16/9]  bg-[#cacaca]">
                            <img    className="w-full h-auto" 
                                    src={   articles?.news[0]?.attributes?.media?.data?.attributes?.url ||
                                            articles?.news[0]?.attributes?.media?.data?.attributes?.formats?.large?.url ||
                                            articles?.news[0]?.attributes?.media?.data?.attributes?.formats?.medium?.url ||
                                            articles?.news[0]?.attributes?.media?.data?.attributes?.formats?.small?.url ||
                                            articles?.news[0]?.attributes?.media?.data?.attributes?.formats?.thumbnail?.url 
                                            
                                        


                                        }
                            ></img>                       
                         </div>
                        <div className="w-[90%] md:w-full mx-auto md:pl-[20px] h-fit  pt-[20px] pb-[80px]"> 
                            <h3 className = "text-white article-title inline-block uppercase italic font-semibold cursor-pointer w-fit"><span className="underline_span"><Link href={`category/${articles?.news[0]?.attributes?.category?.data?.attributes?.slug}`}>{articles?.news[0]?.attributes?.category?.data?.attributes?.name}</Link></span>
                                
                            </h3>
                            <h1 className="text-[1.44rem] md:text-[1.728rem] lg:text-[2.074rem] text-white mt-4 font-semibold duration-[.34s] ease-in-out hover:text-white/[.6]"><Link href={`article/${articles?.news[0]?.attributes?.slug}`}>{articles?.news[0]?.attributes?.title}</Link></h1>
                            {/*<div className="h-fit w-fit inline-block align-middle">
                                <i className=" inline-block cursor-pointer ml-2 h-[10px] w-[10px] border-[#40e0d0] border-t-[1px] border-r-[1px] rotate-45"></i>
                            </div>*/}
                            <p className="mt-4 text-[#a2a2a2] text-[1rem]">{articles?.news[0]?.attributes?.description}</p>

                            <div className="mt-4 text-white text-[0.833rem]">
                                <p className="inline-block uppercase italic mr-1">{articles?.news[0]?.attributes?.author?.data?.attributes?.name}</p>
                                <span className="text-[#01e2c2]">/</span>
                                {/*<Moment className="inline-block font-semibold uppercase italic ml-2 text-[0.833rem]" format="MMMM Do YYYY">{articles?.news[0]?.attributes?.date}</Moment>*/}
                            </div>
                        </div>
                        
                    </div>
                    <div className="block md:hidden aspect-[16/9] overflow-y-hidden w-[90%]  mx-auto  mt-[-50px] bg-[#CACACA]">
                            <img    className="w-full h-auto" 
                                    src={   articles?.news[0]?.attributes?.media?.data?.attributes?.url ||
                                            articles?.news[0]?.attributes?.media?.data?.attributes?.formats?.large?.url ||
                                            articles?.news[0]?.attributes?.media?.data?.attributes?.formats?.medium?.url ||
                                            articles?.news[0]?.attributes?.media?.data?.attributes?.formats?.small?.url ||
                                            articles?.news[0]?.attributes?.media?.data?.attributes?.formats?.thumbnail?.url
                                            
                                        


                                        }
                            ></img>  

                    </div>
                </div>
                <div className="border-[#000]/[.1]   lg:grid lg:grid-cols-[2fr_1fr]">
                    <ul className="list-none text-start md:border-r-[1px]">
                        {articles?.news?.slice(1).map((article, index)=>(
                            
                            <li className="border-b-[1px] md:py-[40px]" key={index}>
                                <div className="flex justify-center flex-row lg:grid lg:grid-cols-2  h-full">
                                    
                                    <div className="hidden object-cover  md:block w-[33.3%] lg:w-full aspect-[16/9] overflow-y-hidden max-h-[248px]">
                                        <img    className="w-full h-auto" 
                                                src={   article?.attributes?.media?.data?.attributes?.url ||
                                                    article?.attributes?.media?.data?.attributes?.formats?.large?.url ||
                                                        article?.attributes?.media?.data?.attributes?.formats?.medium?.url ||
                                                        article?.attributes?.media?.data?.attributes?.formats?.small?.url ||
                                                        article?.attributes?.media?.data?.attributes?.formats?.thumbnail?.url
                                                        
                                                    


                                                    }
                                        ></img>                                     
                                    </div>
                                    
                                    <div className="py-[40px] pr-[40px] flex grow flex-col ml-[5%] md:block md:ml-0 md:pl-[20px]">
                                        
                                        <h1 className="font-semibold md:text-[1.44rem] lg:text-[1.728rem]  duration-[.34s] ease-in-out hover:text-black/[.4]"><Link href={`/article/${article?.attributes?.slug}`}>{article?.attributes?.title}</Link></h1>
                                        <h2 className="hidden md:block mt-4">{article?.attributes?.description}</h2>
                                        <div className="mt-4 text-[0.833rem]">
                                            <p className="inline-block uppercase italic mt-3 mr-1">{article?.attributes?.author?.data?.attributes?.name}</p>
                                        
                                            {/*<Moment className="inline-block font-semibold uppercase italic text-[0.833rem]" format="Do MMM YYYY">{article?.attributes?.date}</Moment>*/}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="md:hidden w-[150px] object-cover md:h-auto md:w-[80%] md:mx-auto  aspect-square md:aspect-[16/9] mx-auto bg-[#CACACA]">
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

                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="hidden lg:block w-fit pt-[40px] pl-[20px]">
                        <SquareAdUnit/>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export async function getServerSideProps({req,res}){
    res.setHeader(
        "Cache-Control",
        "public", "s-maxage=604800", "stale-while-revalidate=84600"
    )
    //get most recent
    //get articles based on genre
    //spotlight specific articles specified
    var feature_articles = [],
        non_feature_articles = [],
        lifestyle_and_food,
        news;
    
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
    
    const response = await fetch(`${API}/articles?${filters}`);
    

    const data = await response.json();
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
   
    lifestyle_and_food = non_feature_articles?.filter((article) =>
    {
        return article?.attributes?.category?.data?.attributes?.name === "Lifestyle & Food"
    })

    news = non_feature_articles?.filter((article) =>
    {
        return article?.attributes?.category?.data?.attributes?.name === "News"
    })
     
    return {
        props:{
            articles: {
                featureArticles: feature_articles || null,
                lifestyleAndFood: lifestyle_and_food || null,
                news: news || null
                
            }
        }
    }


}



export default Home;