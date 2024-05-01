'use client'

import {useEffect, useState, useRef, useCallback, Fragment } from "react";

import axios from "axios";
import { BASE_URL } from "../../config/api.js";
import Layout from "../../defaults/Layout.jsx";
import { PAGINATION_LIMIT } from "../../config/meta.js";
import Link from "next/link.js";
import Moment from "react-moment";
import SquareAdUnit from "../../components/SquareAdUnit.jsx";

import { useSearchParams,useRouter, usePathname } from "next/navigation.js";

const qs = require("qs");

const Search = ()=>
{
    const searchInputRef = useRef();
    

    const [ArticleResults,setArticleResults] = useState([]);
    const [AuthorResults, setAuthorResults] = useState([]);
    const [AuthorMeta, setAuthorMeta] = useState([]);
    const [ArticleMeta, setArticleMeta] =useState([]);
  
    const [viewArticleResults, setViewArticleResults] = useState(true);
    const [viewAuthorResults, setViewAuthorResults] = useState(false);

    const [Query, setQuery] = useState("");
    const [Page, setPage] = useState("");
    const [qCheck, setQCheck] = useState(false)
  
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

   

    const searchFunc = useCallback(()=>
    {
        
       
     
        const search_query = 
        `
            query FilterBySearch($filterVarOne: ArticleFiltersInput, $filterVarTwo: AuthorFiltersInput)
            {
                articles(filters:$filterVarOne, pagination:{page:${Page}, pageSize:${PAGINATION_LIMIT}})
                {
                    meta{
                        pagination{
                            pageCount
                        }

                    }
                    data{
                        attributes
                        {
                            description
                            title
                            slug
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
                                        slug
                                        name
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
                },
                authors(filters:$filterVarTwo, pagination:{page:${Page}, pageSize:${PAGINATION_LIMIT}})
                {
                    meta{
                        pagination{
                            pageCount
                        }

                    }
                    data{
                        attributes{
                            name
                            avatar{
                                data{
                                    attributes{
                                        url
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `;

        const filter_variables = {
            filterVarOne:{
                
                
                or:[{title:{contains:Query}}, {description:{contains:Query}}]
                
                
            },

            filterVarTwo:{
                name:{
                    contains:Query
                }

            }
        }
        if(Query){
            fetch(`${BASE_URL}/graphql`,
            {
                method:"POST",

            
                headers:{
                    "Content-Type":"application/json",
                    Accept:"application/json",
                },
                body:JSON.stringify({
                    query:search_query,
                    variables:filter_variables,
                })
                
            })
            .then((response)=>{
                return response.json();
            })
            .then(({data})=>{
                
                setArticleResults(data?.articles?.data);
                setArticleMeta(data?.articles?.meta?.pagination);
                
                setAuthorResults(data?.authors?.data);
                setAuthorMeta(data?.authors?.meta?.pagination)

            })
            .catch((err)=>{
                console.log(err);
            })
        }
        

    },[Query])
    const handleSubmit = (e) =>
    {
       
        e.preventDefault();
        
        const params = new URLSearchParams(searchParams);
        if (searchInputRef.current.value)params.set('q', searchInputRef.current.value);
        
        replace(`${pathname}?${params.toString()}`);
        
        searchFunc();

       

        

    }
    useEffect(()=>{
        setQuery(searchParams.get("q")?.toString() || "");
        setPage(searchParams.get("page")?.toString() || "1");

        
        
     
    
    },[searchParams])

    useEffect(()=>{
        
        if(Query === searchParams.get("q")?.toString()) searchFunc();
    }, [searchFunc])

   
 

  

   
    useEffect(()=>{
        viewAuthorResults && (setViewArticleResults(false));
    },[viewAuthorResults])
    useEffect(()=>{
        viewArticleResults && (setViewAuthorResults(false));
    }, [viewArticleResults])

    return (
        <Layout>
            <div className="w-full min-h-[100vh]">
                <div className="w-full  bg-white border-box md:pt-[4rem] pb-5">
                    <form className="w-[80%] pr-[40px] mx-auto border-[#000] border-b-[1px]" onSubmit={(e)=>handleSubmit(e)}>
                        <input ref={searchInputRef} className="placeholder:text-[1.44rem]  placeholder:text-[#000]/[.4] placeholder:font-semibold  placeholder:uppercase  w-full   leading-[2] text-[1.44rem] md:text-[2.074rem] text-[#000] font-bold  focus:outline-none"
                        type="search"
                        name ="query"
                        placeholder="Search..."
                        
                        value={Query}
                        autoComplete="off"
                        onChange={(e)=>setQuery(e.target.value)}
                        
                        
                        
                        
                        ></input>
                        <button type="submit" className="absolute w-fit mt-[10px] md:mt-[20px] ml-[10px]">
                            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M6.55892 10.7328C8.86408 10.7328 10.7328 8.86408 10.7328 6.55892C10.7328 4.25376 8.86408 2.38506 6.55892 2.38506C4.25376 2.38506 2.38506 4.25376 2.38506 6.55892C2.38506 8.86408 4.25376 10.7328 6.55892 10.7328ZM6.55892 13.1178C10.1813 13.1178 13.1178 10.1813 13.1178 6.55892C13.1178 2.93653 10.1813 0 6.55892 0C2.93653 0 0 2.93653 0 6.55892C0 10.1813 2.93653 13.1178 6.55892 13.1178Z" fill="black"></path>
                                <path fillRule="evenodd" clipRule="evenodd" d="M14.5219 15.9015C14.3906 16.0328 14.1777 16.0328 14.0464 15.9015L9.18249 11.0376L11.0376 9.18249L15.9015 14.0464C16.0328 14.1777 16.0328 14.3906 15.9015 14.5219L14.5219 15.9015Z" fill="black">
                                </path>
                            </svg>
                        </button>
                    </form>
                    

                </div>
                <div className="w-full mt-5">
                   
                    <div className="mt-3">
                        <div className="border-[#cacaca] border-b-[1px]">
                            <div className="w-[80%] mx-auto leading-[2.3rem]">
                                <button className={`w-[50%] border-[#000] ${viewArticleResults ? "border-b-[2px] text-black":"text-[#000]/[.4]"} text-center outline-none  uppercase font-semibold `} onClick={()=>setViewArticleResults(true)}>Articles<span className="ml-2">({ArticleResults?.length || 0})</span></button>
                                <button className={`w-[50%] border-black  ${viewAuthorResults ? "border-b-[2px] text-black":"text-[#000]/[.4]"} text-center outline-none  uppercase font-semibold`} onClick={()=>setViewAuthorResults(true)}>Authors<span className="ml-2">({AuthorResults?.length || 0 })</span></button>
                            </div>
                        </div>
                        <div className = "">
                            {viewArticleResults ? 
                                ArticleResults?.length ? (
                                
                                    <Fragment>
                                        <div className="lg:grid lg:grid-cols-[2fr_1fr] border-black/[.1] border-b-[1px]">
                                            <ul className="decoration-none list-none   lg:border-r-[1px]">
                                                {ArticleResults.map((article, index)=>(
                                                    <li className={`border-box border-black/[.1] ${index < ArticleResults?.length - 1 ? "border-b-[1px]":""}`} key={index}>
                                                            <div className="flex justify-center md:py-[40px] flex-row lg:grid lg:grid-cols-2  h-full">
                                            
                                                                <div className="hidden  md:block w-[33.3%] lg:w-full aspect-[16/9] object-cover overflow-y-hidden">
                                                                    <img    className="w-full h-auto" 
                                                                            src={   article?.attributes?.media?.data?.attributes?.url ||
                                                                                article?.attributes?.media?.data?.attributes?.formats?.large?.url ||
                                                                                    article?.attributes?.media?.data?.attributes?.formats?.medium?.url ||
                                                                                    article?.attributes?.media?.data?.attributes?.formats?.small?.url ||
                                                                                    article?.attributes?.media?.data?.attributes?.formats?.thumbnail?.url 
                                                                                
                                                                                


                                                                                }
                                                                    ></img>  
                                                                </div>
                                                                
                                                                <div className="py-[20px] md:py-0 pr-[40px] flex grow flex-col max-w-[653px] pl-[40px] md:block md:ml-0 md:pl-[20px]">
                                                                    <h3 className = "article-title text-[0.833rem] inline-block uppercase font-semibold cursor-pointer w-fit"><span className="underline_span"><Link href={`/category/${article?.attributes?.category?.data?.attributes?.slug}`}>{article?.attributes?.category?.data?.attributes?.name}</Link></span></h3>                

                                                                    <h1 className="mt-4 font-semibold text-[1.2rem] md:text-[1.728rem] lg:text-[2.074rem]">{article?.attributes?.title}</h1>
                                                                    <h2 className="hidden mt-4 line-clamp-3  sm:line-clamp-5">{article?.attributes?.description}</h2>
                                                                    <div className="mt-4 text-[0.833rem]">
                                                                        <p className="inline-block uppercase  mt-3 mr-1">{article?.attributes?.author?.data?.attributes?.name}</p>
                                                                    
                                                                        <Moment className="inline-block font-semibold uppercase  ml-1 text-[0.833rem]" format="Do MMM YYYY">{article?.attributes?.date}</Moment>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="md:hidden w-[150px] h-full overflow-hidden md:h-auto md:w-[80%] md:mx-auto  md:aspect-[16/9] mx-auto bg-[#CACACA]">
                                                                    <img    className="h-full w-auto object-cover " 
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
                                            <div className="hidden lg:block pt-[40px] w-fit mx-auto">
                                                <SquareAdUnit/>
                                            </div>
                                        </div>
                                        <div className="w-fit mx-auto py-5">
                                            {Page > 1 && (<div className="inline-block cursor-pointer  mr-3  underline uppercase font-semibold"><Link href={{pathname:"/search", query:{q:`${searchParams.get('q').toString()}`, page:`${Page - 1}`}}}>newer</Link></div>)}
                                            <div className="w-fit inline-block align-middle   uppercase font-semibold">
                                                <div className="text-center ">
                                                    {Page}
                                                </div>
                                                <div className="text-center  border-[#000] border-t-[3px]">
                                                    {ArticleMeta?.pageCount}
                                                </div>
                                            </div>
                                            {Page >= ArticleMeta?.pageCount || (<div className="inline-block ml-3 cursor-pointer  underline  uppercase font-semibold"><Link href={{pathname:"/search", query:{q:`${searchParams.get('q').toString()}`, page:`${Page + 1}`}}}>older</Link></div>)}
                                        </div>
                                    </Fragment>
                                ):(
                                    <div className="mt-[3rem] w-[80%] lg:w-[50%] mx-auto">
                                        <p className="font-semibold  text-[1.2rem]">
                                            We couldn’t find any article results for this search term.
                                        </p>
                                        <div className="mt-3 text-[1.2rem]">
                                            Search suggestions:
                                            <ul className="list-disc ml-5 mt-3">
                                                <li>Make sure all words are spelled correclty</li>
                                                <li className="mt-3"> Use more general words in search term</li>
                                                <li className="mt-3">Try rephrasing the search term</li>
                                            </ul>

                                        </div>
                                    </div>
                                )

                                
                            : AuthorResults?.length ? (
                                    <Fragment>
                                        <div className="lg:grid lg:grid-cols-[2fr_1fr] border-black/[.1] border-b-[1px]">
                                            <ul className="decoration-none list-none   lg:border-r-[1px]">
                                                {AuthorResults.map((author, index)=>(
                                                <li className={`border-box border-black/[.1] ${index < ArticleResults?.length ? "border-b-[1px]":""}`} key={index}>
                                                        <div className="flex justify-center md:py-[40px] flex-row lg:grid lg:grid-cols-2  h-full">
                                        
                                                            <div className="hidden  md:block w-[33.3%] lg:w-full aspect-[16/9] object-cover overflow-y-hidden">
                                                                <img    className="w-full h-auto" 
                                                                        src={   
                                                                                author?.attributes?.avatar?.data?.attributes?.url ||
                                                                                author?.attributes?.avatar?.data?.attributes?.formats?.large?.url ||
                                                                                author?.attributes?.avatar?.data?.attributes?.formats?.medium?.url ||
                                                                                author?.attributes?.avatar?.data?.attributes?.formats?.small?.url ||
                                                                                author?.attributes?.avatar?.data?.attributes?.formats?.thumbnail?.url 
                                                                                
                                                                            


                                                                            }
                                                                ></img>  
                                                            </div>
                                                            
                                                            <div className="py-[20px] pl-[40px] pr-[40px] flex grow flex-col md:block md:ml-0 md:pl-[20px]">
                                                                
                                                                <h1 className="font-semibold text-[1.2rem] md:text-[1.728rem] lg:text-[2.074rem]">{author?.attributes?.name}</h1>
                                                                {/*<h2 className="hidden md:block mt-4">{article?.attributes?.Description}</h2>*/}
                                                                {/*<div className="mt-4 text-[0.833rem]">
                                                                    <p className="inline-block uppercase  mt-3 mr-1">{article?.attributes?.author?.data?.attributes?.Name}</p>
                                                                
                                                                    <p className="inline-block uppercase  font-semibold">23 feb 2024</p>
                                                </div>*/}
                                                            </div>
                                                            <div>
                                                                <div className="md:hidden w-[150px] object-cover md:h-auto md:w-[80%] md:mx-auto  aspect-square md:aspect-[16/9] mx-auto bg-[#CACACA]">
                                                                    <img    className="h-full w-auto" 
                                                                            src={   author?.attributes?.avatar?.data?.attributes?.url ||
                                                                                author?.attributes?.avatar?.data?.attributes?.formats?.large?.url ||
                                                                                    author?.attributes?.avatar?.data?.attributes?.formats?.medium?.url ||
                                                                                    author?.attributes?.avatar?.data?.attributes?.formats?.small?.url ||
                                                                                    author?.attributes?.avatar?.data?.attributes?.formats?.thumbnail?.url
                                                                                    
                                                                                


                                                                                }
                                                                    ></img>  
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="hidden lg:block pt-[40px] w-fit mx-auto">
                                                <SquareAdUnit/>
                                            </div>
                                        </div>
                                        <div className="w-fit mx-auto py-5">
                                            {Page > 1 && (<div className="inline-block cursor-pointer  mr-3  underline  uppercase font-semibold"><Link href={{pathname:"/search", query:{q:`${searchParams.get('q').toString()}`, page:`${Page - 1}`}}}>newer</Link></div>)}
                                            <div className="w-fit inline-block align-middle   uppercase font-semibold">
                                                <div className="text-center ">
                                                    {Page}
                                                </div>
                                                <div className="text-center  border-[#000] border-t-[3px]">
                                                    {AuthorMeta?.pageCount}
                                                </div>
                                            </div>
                                            {Page >= AuthorMeta?.pageCount || (<div className="inline-block ml-3 cursor-pointer  underline  uppercase font-semibold"><Link href={{pathname:"/search", query:{q:`${searchParams.get('q').toString()}`, page:`${Page + 1}`}}}>older</Link></div>)}
                                        </div>
                                    </Fragment>
                            ):(
                                <div className="mt-[3rem] w-[80%] lg:w-[50%] mx-auto">
                                    <p className="font-semibold  text-[1.2rem]">
                                        We couldn’t find any author results for this search term.
                                    </p>
                                    <div className="mt-3 text-[1.2rem]">
                                        Search suggestions:
                                        <ul className="list-disc ml-5 mt-3">
                                            <li>Make sure all words are spelled correclty</li>
                                            <li className="mt-3"> Use more general words in search term</li>
                                            <li className="mt-3">Try rephrasing the search term</li>
                                        </ul>

                                    </div>
                                </div>
                                
                            )}
                        </div>
                        

                    </div>
                </div>
                
            </div>
        </Layout>
    )
}

export default Search;