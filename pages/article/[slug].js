import Link from "next/link";
import Layout from "../../defaults/Layout";
import {
    FacebookShareButton,
    TwitterShareButton,
    


} from "react-share";
import {
    FaFacebook,
    FaFacebookF,
    FaLink,
    FaFacebookSquare,
    
    FaLinkedinIn,
    
    FaTwitter,
    FaSnapchat,
    FaSnapchatGhost,
} from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {API, BASE_URL, SITE_URL} from "../../config/api.js"
import {useEffect, useRef} from "react";
import parse from "html-react-parser";
import Moment from "react-moment";

const qs = require('qs');


const Article = ({article, articles}) =>
{
    
    
    useEffect(()=>
    {
        
        (function(d,s,id){
            let js;
            let sjs = d.getElementsByTagName(s)[0];
            if(d.getElementById(id))return;
            js = d.createElement(s);
            js.id = id;
            js.src = "https://sdk.snapkit.com/js/v1/create.js";
            sjs.parentNode.insertBefore(js,sjs)

        })(document,"script", "snapkit-creative-kit-sdk");

        window.snapKitInit = function(){
            snap.creativekit.initalizeShareButtons(
                document.getElementsByClassName("snapchat-share-button")
            )
        }
    },[])


    
    //const [shareBtnActive, setShareBtnActive] = useState(0);
    return (
        <Layout title={article?.attributes?.title || "Page Not Found"}
                canonicalUrl={article?.attributes?.seo?.canonicalURL}
                image={
                    article?.attributes?.seo?.metaImge?.data?.attributes?.url ||
                    article?.attributes?.media?.data?.attributes?.formats?.medium?.url
                }
                desc={
                    article?.attributes?.seo?.metaDescription ||
                    article?.attributes?.description ||
                    "This page does not exist yet."
                }
                keywords={
                    article?.attributes?.seo?.keywords ||
                    article?.attributes?.keywords ||
                    "vegclub magazine, magazine, article, vegan, vegclub, veggy"

                }

                >
            <div className="w-[90%] mx-auto pt-[2rem] border-[#000] border-t-[3px]">
                <main>
                    <div className="text-start  lg:w-[80%] lg:mx-auto pb-2 border-black/[.1] border-b-[1px]">
                        <h2 className="italic font-bold md:text-[1.2rem] uppercase">{article?.attributes?.category?.data?.attributes?.name}</h2>
                        <h1 className="mt-5 text-[1.728rem] font-semibold md:font-bold md:text-[2.074rem] lg:text-[2.448rem]">{article?.attributes?.title}</h1>
                        <p className="mt-5 font-[400] md:text-[1.2rem]">{article?.attributes?.description} </p>                           
                        <div className="mt-5 w-fit">
                            <div className="rounded inline-block align-middle w-[48px] h-[48px] bg-[#cacaca] mr-3"></div>
                            <div className="italic text-[0.833rem] inline-block">By <span className="underline">{article?.attributes?.author?.data?.attributes?.name}</span></div>
                        </div>
                    </div>
                    <div className="w-full border-[#CACACA] mx-auto lg:w-[80%] py-5">
                        <div className ="">
                            <Moment className="inline-block text-[0.833rem]" format="MMMM Do YYYY, h:mm a">{article?.attributes?.date}</Moment>
                            <ul className="inline-block w-fit text-[1.2rem] align-bottom ml-4">
                                <li className="inline-block">
                                    <FacebookShareButton url={`${SITE_URL}/article/${article?.attributes?.slug}`} quote={article?.attributes?.title}>
                                        <FaFacebookSquare className="inline-block cursor-pointer transition-opacity duration-[.32s] ease-[cubic-bezier(.19,1,.22,1)] hover:opacity-30"></FaFacebookSquare>
                                        <Link href='#' className=" italic text-[0.833rem] font-[400] underline hidden cursor-pointer md:inline-block ml-2">Share</Link>
                                    </FacebookShareButton>
                                </li>
                                <li className="inline-block ml-5">
                                    <TwitterShareButton url={`${SITE_URL}/article/${article?.attributes?.slug}`} title={article?.attributes?.title} related={["vegclub", "vegan", "magazine"]}>
                                        <FaTwitter className="inline-block  cursor-pointer transition-opacity duration-[.32s] ease-[cubic-bezier(.19,1,.22,1)] hover:opacity-30"></FaTwitter>
                                        <Link href='#' className=" italic text-[0.833rem] font-[400] underline hidden curosr-pointer md:inline-block ml-2">Tweet</Link>
                                    </TwitterShareButton>
                                </li>
                                <li className="inline-block ml-5">
                                   <button className="snapchat-share-button" data-share-url={`${SITE_URL}/article/${article?.attributes?.slug}`}>
                                        <FaSnapchatGhost className="inline-block cursor-pointer transition-opacity duration-[.32s] ease-[cubic-bezier(.19,1,.22,1)] hover:opacity-30"></FaSnapchatGhost>
                                        <Link href='#' className=" italic text-[0.833rem] font-[400] underline cursor-pointer hidden md:inline-block ml-2">Snap</Link>
                                    </button>    
                                </li>
                            </ul>
                        </div>
                        <div className="mt-5 w-full max-h-[450px] object-cover overflow-y-hidden">
                            
                            <img    className="w-full" 
                                    src={   article?.attributes?.media?.data?.attributes?.url ||
                                            article?.attributes?.media?.data?.attributes?.formats?.large?.url ||
                                            article?.attributes?.media?.data?.attributes?.formats?.medium?.url ||
                                            article?.attributes?.media?.data?.attributes?.formats?.small?.url ||
                                            article?.attributes?.media?.data?.attributes?.formats?.thumbnail?.url 
                                            
                                        


                                        }
                            ></img>
                            

                        </div>
                        <div className="mt-1 text-[0.694rem] uppercase tracking-[0.03rem] text-[#cacaca]  mx-auto">Image caption</div>
                        {/*<div className="w-full mx-auto md:w-[70%] lg:w-[83.33%] pb-3 border-[#cacaca] border-b-[1px]">
                            <div className={`${shareBtnActive ? "share-btn--expanded": "share-btn--retract"} mt-5`}>
                                <button className={`w-fit border-box ${shareBtnActive ? "bg-[#01e2c2] pl-3" : "border-[#cacaca] border-[1px] px-3"}  py-2`} onClick={()=> setShareBtnActive( shareBtnActive ? 0: 1)}>
                                    <p className="inline-block text-[0.833rem] tracking-[.05rem] uppercase italic">share</p>
                                    <i className={`${shareBtnActive && "invisible"} inline-block ml-3`}>
                                        <svg width={15} height={15} fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M7.335.272a.25.25 0 01.337 0l4.623 4.204a.25.25
                                            0 01.017.353l-.336.37a.25.25 0 01-.353.016L8.004 1.926v7.9a.25.25
                                            0 01-.25.25h-.5a.25.25 0 01-.25-.25V1.924l-3.62 3.291a.25.25 
                                            0 01-.353-.016l-.336-.37a.25.25 0 01.016-.353L7.335.272zM.5 7.545a.25.25 
                                            0 00-.25.25v6.75c0 .138.112.25.25.25h14a.25.25 0 00.25-.25v-6.75a.25.25 
                                            0 00-.25-.25H14a.25.25 0 00-.25.25v6H1.25v-6a.25.25 0 00-.25-.25H.5z"
                                            fill="#000"></path>
                                        </svg>
                                    </i>
                                </button>
                                <div className={`share-methods--ctnr  w-fit bg-[#01e2c2] border-box ease-linear pr-3 py-2`}>
                                    <FaLink className="inline-block cursor-pointer"></FaLink>
                                    <FaFacebookF className="inline-block ml-5 cursor-pointer"></FaFacebookF>
                                    <FontAwesomeIcon className="inline-block ml-5 cursor-pointer" icon={"fa-brands fa-x-twitter"}></FontAwesomeIcon>
                                    <FaLinkedinIn className="inline-block ml-5 cursor-pointer"></FaLinkedinIn>

                                </div>
                            </div>
                        </div>*/}
                    </div>
                    <section className="mt-[3rem] lg:w-[80%] mx-auto">
                        {/*<p className="font-semibold  leading-[1.7] italic">
                            When Golden was a young curator in the nineties, her shows, centering Black artists, were unprecedented. Today, those artists are the stars of the art market.
                        </p>*/}
                        <div className="mt-[3rem] article-preview leading-[1.7] mb-5">
                            {parse(article?.attributes?.content)}
                        </div>
                    </section>
                    <section className="mt-[3rem] border-box py-5 bg-[#01e2c2] w-[100vw] ml-[-5.5%]">
                        <div className="w-[90%]  mx-auto mt-5">
                            <h2 className="uppercase text-[1.2rem] md:text-[1.44rem]  italic">More from {" "} <span className="font-semibold underline cursor-pointer"><Link href={`/category/${article?.attributes?.category?.data?.attributes?.name}`}>{article?.attributes?.category?.data?.attributes?.name}</Link></span></h2>
                            <div className="mt-[2rem]">
                                <ul className="list-none border-[#00b89d] md:grid md:grid-cols-3 md:auto-rows-fr md:border-b-[1px] ">
                                    {articles?.map((art, index) => (
                                        <li className={`mt-3 border-box border-[#00b89d] border-b-[1px] md:border-b-0 ${(index + 1) % 3 ? "md:border-r-[1px]":""} pb-5`} key={index}>
                                            <div className="grid grid-cols-[70%_30%] grid-rows-1 md:grid-cols-1">
                                                <div className="hidden md:block w-full object-cover bg-[#00b89d] aspect-[16/9]">
                                                        <img    className="w-full"
                                                                src = {
                                                                        art?.attributes?.media?.data?.attributes?.formats?.large?.url ||
                                                                        art?.attributes?.media?.data?.attributes?.formats?.medium?.url ||
                                                                        art?.attributes?.media?.data?.attributes?.formats?.small?.url ||
                                                                        art?.attributes?.media?.data?.attributes?.formats?.thumbnail?.url ||
                                                                        art?.attriibutes?.media?.data?.attributes?.url
                                                                    }
                                                        ></img>

                                                </div>
                                                <div className="w-full text-black mt-[2rem] mx-auto md:w-[90%]">
                                                    <h2 className="font-semibold text-[1.2rem] leading-[1.125]">{art?.attributes?.title}</h2>
                                                    <p className="hidden md:block lg:hidden mt-[1rem]">{art?.attributes?.description}</p>
                                                <div className="flex w-fit mt-[1rem] flex-row">
                                                        <p className="text-[0.833rem] uppercase italic">{art?.attributes?.author?.data?.attributes?.name}</p>
                                                        <Moment className="font-semibold uppercase italic ml-1 text-[0.833rem]" format="Do MMM YYYY">{article?.attributes?.date}</Moment>

                                                    </div>
                                                </div>
                                                <div className="block md:hidden"> 
                                                    <div className="h-full aspect-square object-cover mx-auto bg-[#00b89d]">
                                                        <img    className="w-full"
                                                                src = { art?.attributes?.media?.data?.attributes?.url ||
                                                                        art?.attributes?.media?.data?.attributes?.formats?.large?.url ||
                                                                        art?.attributes?.media?.data?.attributes?.formats?.medium?.url ||
                                                                        art?.attributes?.media?.data?.attributes?.formats?.small?.url ||
                                                                        art?.attributes?.media?.data?.attributes?.formats?.thumbnail?.url 
                                                                        
                                                                    }
                                                        ></img>

                                                    </div>
                                                </div>

                                            </div>
                                        </li>
                                    ))}
                                    
                                </ul>

                            </div>
                        </div>
                    </section>
                    
                  
                </main>
            </div>
        </Layout>
    )
}


export async function getStaticPaths()
{
    const response = await fetch(`${API}/articles`);
    const {data} = await response.json();
    const paths = data?.map((article)=>({
        params:{slug:article?.attributes.slug, id:article?.id, cat:article?.attributes?.category?.data?.attributes?.name}
    }));

    return {paths, fallback:false};
}


export async function getStaticProps({params}){
    const {slug,id,cat} = params;

    const filters = qs.stringify(
        {
            populate:"*",
            slug:{
                $eq: slug
            },

        },
        {encodeValuesOnly:true}

        
    );

    const response = await fetch(`${API}/articles?${filters}`);

    const {data} = await response.json();

    //get articles of the same genre

    const fetch_query = 
    `   
        query FilterArticlesByCategory($filtervar: ArticleFiltersInput){
            articles(filters:$filtervar, pagination:{pageSize:6})
            {
                data{
                    id
                    attributes{
                        Title
                        Description
                        author{
                            data{
                                attributes{
                                    Name
                                }
                            }
                        }
                        Date
                    }
                }
            }
        }
        
    `
    const fetch_query_variables = 
    {
        filtevar:{
            category:{
                name:{
                    eq:data[0]?.attributes?.category?.data?.attributes?.name || cat
                }
            },
            and:{
                id:{
                    not:{
                        eq: data[0]?.id || id
                    }
                }
            }
            
        }
    }
    const secondary_fetch_res = await fetch(`${BASE_URL}/graphql`,
    {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Accept:"application/json",
        },
        body:JSON.stringify({
            query:fetch_query,
            variables:fetch_query_variables,
        })
    })

    const articles_of_genre = await secondary_fetch_res.json();
    
   return{
        props:{
            article: data[0] || null,
            articles: articles_of_genre?.data?.articles?.data || null
        },
        revalidate:10
   } ;


}

export default Article;