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
import {useEffect, useRef, useContext} from "react";
import parse, {domToReact} from "html-react-parser";
import Moment from "react-moment";
import { GlobalContext } from "../../context/GlobalContext.js";
import { slugify } from "../../lib/utils.js";

const qs = require('qs');


const Article = ({article, articles}) =>
{
    const {findAuthorByID} = useContext(GlobalContext);

    const options = {
        replace({attribs, children}) {
            if(!attribs)return;
            if(attribs.href){
                return <a href={attribs.href} target="_blank" rel="noopener noreferrer">{domToReact(children)}</a>
            }
            if(attribs.src){

                return <img src={attribs.src} className="w-full object-cover max-h-[450px]"></img>
            }
        }
    }
   
    
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

                canonicalUrl={article?.attributes?.seo?.canonicalURL || SITE_URL + `/${article?.attributes?.slug || ""}`}
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
            <div className="pt-[2rem] border-[#000]">
                <main className="px-[40px]">
                    <div className="text-start  lg:w-[80%] lg:mx-auto pb-2 border-black/[.1] border-b-[1px]">
                        <h2 className="font-bold md:text-[1.2rem] uppercase cursor-pointer duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)] hover:text-black/[.4]"><Link href={`/category/${article?.attributes?.category?.data?.attributes?.slug}`}>{article?.attributes?.category?.data?.attributes?.name}</Link></h2>
                        <h1 className="mt-5 leading-[1.5] font-extrabold  text-[2.448rem] lg:text-[2.986rem]">{article?.attributes?.title}</h1>
                        {/*<p className="mt-5 font-[400] leading-[2] md:text-[1.2rem]">{article?.attributes?.description}</p>*/}                         
                        <div className="mt-5 w-fit">
                            <div className="rounded inline-block align-middle overflow-hidden w-[48px] h-[48px] bg-[#cacaca] mr-3">
                                <img className="w-full h-auto object-cover" src={findAuthorByID(article?.attributes?.author?.data?.id)?.attributes?.avatar?.data?.attributes?.url}/>
                            </div>
                            <div className="text-[0.833rem] inline-block">By <span className="underline cursor-pointer"><Link href={`/team/${slugify(article?.attributes?.author?.data?.attributes?.name)}`}>{article?.attributes?.author?.data?.attributes?.name}</Link></span></div>
                        </div>
                    </div>
                    <div className="w-full border-[#CACACA] mx-auto lg:w-[80%] py-5">
                        <div className ="">
                            <Moment className="inline-block text-[0.833rem]" format="MMMM Do YYYY, h:mm a">{article?.attributes?.date}</Moment>
                            <ul className="inline-block w-fit text-[1.2rem] align-bottom ml-4">
                                <li className="inline-block">
                                    <FacebookShareButton url={`${SITE_URL}/article/${article?.attributes?.slug}`} quote={article?.attributes?.title}>
                                        <FaFacebookSquare className="inline-block cursor-pointer transition-opacity duration-[.32s] ease-[cubic-bezier(.19,1,.22,1)] hover:opacity-30"></FaFacebookSquare>
                                        <Link href='#' className=" text-[0.833rem] font-[400] underline hidden cursor-pointer md:inline-block ml-2">Share</Link>
                                    </FacebookShareButton>
                                </li>
                                <li className="inline-block ml-5">
                                    <TwitterShareButton url={`${SITE_URL}/article/${article?.attributes?.slug}`} title={article?.attributes?.title} related={["vegclub", "vegan", "magazine"]}>
                                        <FaTwitter className="inline-block  cursor-pointer transition-opacity duration-[.32s] ease-[cubic-bezier(.19,1,.22,1)] hover:opacity-30"></FaTwitter>
                                        <Link href='#' className="  text-[0.833rem] font-[400] underline hidden curosr-pointer md:inline-block ml-2">Tweet</Link>
                                    </TwitterShareButton>
                                </li>
                                <li className="inline-block ml-5">
                                   <button className="snapchat-share-button" data-share-url={`${SITE_URL}/article/${article?.attributes?.slug}`}>
                                        <FaSnapchatGhost className="inline-block cursor-pointer transition-opacity duration-[.32s] ease-[cubic-bezier(.19,1,.22,1)] hover:opacity-30"></FaSnapchatGhost>
                                        <Link href='#' className="  text-[0.833rem] font-[400] underline cursor-pointer hidden md:inline-block ml-2">Snap</Link>
                                    </button>    
                                </li>
                            </ul>
                        </div>
                        <div className="relative mt-5 w-full max-h-[450px] object-cover overflow-y-hidden">
                            
                            <img    className="w-full" 
                                    src={   article?.attributes?.media?.data?.attributes?.url ||
                                            article?.attributes?.media?.data?.attributes?.formats?.large?.url ||
                                            article?.attributes?.media?.data?.attributes?.formats?.medium?.url ||
                                            article?.attributes?.media?.data?.attributes?.formats?.small?.url ||
                                            article?.attributes?.media?.data?.attributes?.formats?.thumbnail?.url 
                                            
                                        


                                        }
                            ></img>
                            <div className="absolute bg-[#a2a2a2]/[.42] text-white rounded-lg bottom-3 right-4 text-[.833rem] px-3 py-2 font-semibold">{article?.attributes?.media?.data?.attributes?.alternativeText}</div>

                            

                        </div>
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
                        <div className="mt-[3rem] article-preview leading-[1.8] mb-5 text-[1.2rem]">
                            {article?.attributes?.content && (parse(article?.attributes?.content, options))}
                        </div>
                    </section>
                   
                    
                  
                </main>
                <section className="mt-[80px] text-white border-box py-5 bg-[#000]">
                        <div className="mt-5">
                            <h2 className="uppercase cursor-pointer font-semibold text-[2.074rem] md:text-[2.488rem] pl-[40px] md:text-[1.44rem]">
                                <p>More</p>
                             <p>from <Link href={`/category/${article?.attributes?.category?.data?.attributes?.slug}`}>{article?.attributes?.category?.data?.attributes?.name}</Link></p>
                             </h2>
                            <div className="mt-[2rem]">
                                <ul className="list-none border-[#333] md:grid md:grid-cols-3 md:auto-rows-fr  ">
                                    {articles?.map((article, index) => (
                                        <li className={`border-box text-white border-[#333]  border-b-[1px] md:border-b-0 ${(index + 1) % 3 ? "md:border-r-[1px]":""}`} key={index}>
                                              <div className="flex  flex-row md:grid md:grid-cols-1  h-full">
                                                    
                                                    <div className="hidden md:block w-full overflow-hidden bg-[#00b89d] aspect-[16/9] max-h-[248px]">
                                                        <img    className="w-full h-auto" 
                                                                src={   article?.attributes?.media?.data?.attributes?.url ||
                                                                        article?.attributes?.media?.data?.attributes?.formats?.large?.url ||
                                                                        article?.attributes?.media?.data?.attributes?.formats?.medium?.url ||
                                                                        article?.attributes?.media?.data?.attributes?.formats?.small?.url ||
                                                                        article?.attributes?.media?.data?.attributes?.formats?.thumbnail?.url 
                                                                        
                                                                    
                                        
                                        
                                                                    }
                                                        ></img>  
                                                    </div>
                                                    
                                                    <div className="py-[40px] md:pb-[40px] max-w-[653px] flex flex-col grow pl-[40px] md:block">
                                                                        
                                                        <h1 className="article-title text-white font-bold line-clamp-3 md:line-clamp-5 md:text-[1.44rem] lg:text-[1.728rem]"><span className="underline_span"><Link href={`/article/${encodeURIComponent(article?.attributes?.slug)}`}>{article?.attributes?.title}</Link></span></h1>
                                                        <h2 className="hidden text-white md:line-clamp-4">{article?.attributes?.description}</h2>
                                                        <div className="mt-4 text-[0.833rem]">
                                                            <p className="inline-block text-white uppercase font-light  mt-3 mr-1">{article?.attributes?.author?.data?.attributes?.name}</p>
                                                        
                                                            <Moment className="inline-block text-white font-semibold uppercase  text-[0.833rem]" format="Do MMM YYYY">{article?.attributes?.date}</Moment>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="flex flex-col w-[150px] overflow-hidden md:hidden h-full">
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
                                        </li>
                                    ))}
                                    
                                </ul>

                            </div>
                        </div>
                    </section>
            </div>
        </Layout>
    )
}


export async function getStaticPaths()
{
    const response = await fetch(`${API}/articles`);
    const {data} = await response.json();
    const paths = data?.map((article)=>({
        params:{slug:encodeURIComponent(article?.attributes.slug)}
    }));

    return {paths, fallback:"blocking"};
}


export async function getStaticProps({params}){
    const {slug} = params;
    
    const filters = qs.stringify(
        {
            populate:"*",
            filters:{
                slug:{
                    $eq: slug
                },
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
                        slug
                        title
                        description
                        author{
                            data{
                                id
                                attributes{
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
                    }
                }
            }
        }
        
    `
    const fetch_query_variables = 
    {
        filtervar:{
           
           and:[{category:{
                name:{
                    eq:data[0]?.attributes?.category?.data?.attributes?.name
                }
            },
            },
            {
                not:{
                    id:{
                        eq:data[0]?.id
                    }
                }
            }]
            
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