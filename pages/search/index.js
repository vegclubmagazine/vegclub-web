import {useEffect, useState, useRef, useCallback, Fragment } from "react";
import {useRouter} from "next/router";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";
import Layout from "../../defaults/Layout.jsx";
const qs = require("qs");

const Search = ()=>
{
    const searchInputRef = useRef();
    const [results,setResults] = useState([]);
    const [metaResults, setMetaResults] = useState([]);
    const [stringQuery, setStringQuery] = useState("")
    const router = useRouter();
    const [viewArticleResults, setViewArticleResults] = useState(true);
    const [viewAuthorResults, setViewAuthorResults] = useState(false);
    const {query} = router;
    const {q} = query;

    const { q: string } = qs.parse(query);
    const searchFunc = ( ) =>
    {

        const search_query = 
        `
            query FilterBySearch($filterVarOne: ArticleFiltersInput, $filterVarTwo: AuthorFiltersInput)
            {
                articles(filters:$filtervarone)
                {
                    data{
                        attributes
                        {
                            description
                            title
                            slug
                            image{
                                data{
                                    attributes{
                                        url
                                        caption
                                    }
                                }
                            }
                            author
                        }
                    }
                },
                authors(filters:$filtervartwo)
                {
                    data{
                        attributes{
                            name
                        }
                    }
                }
            }
        `;

        const filter_variables = {
            filtervarone:{
                
                title:{
                    contains:q

                },
                or:{
                    description:{
                        contains:q
                    }
                }
                
            },

            filtervartwo:{
                fullname:{
                    contains:q
                }

            }
        }
        if(q){
            axios.post(`${BASE_URL}/graphql`,
            {
                query:search_query,
                variables:JSON.stringify(filter_variables),
                headers:{
                    "Content-Type":"application/json"
                }
                
            })
            .then(({data})=>{
                
                setResults(data?.data);

            })
            .catch((err)=>{
                console.log(err);
            })
        }
        

    }
    const handleSubmit = (e) =>
    {
       
        e.preventDefault();
        
        const query_filter = qs.stringify({q: searchInputRef.current.value});

        router.replace({
            pathname:"/search",
            query:query_filter
        });

        searchFunc();

    }
    useEffect(()=>{
        searchFunc()
    },[])
    useEffect(()=>{
        setStringQuery(string || "")
    },[q])
    useEffect(()=>{
        viewAuthorResults && (setViewArticleResults(false));
    },[viewAuthorResults])

    return (
        <Layout>
            <div className="w-full min-h-[100vh]">
                <div className="w-full bg-white border-box md:pt-[4rem] pb-5">
                    <form onSubmit={(e)=>handleSubmit(e)}>
                        <input ref={searchInputRef} className="placeholder:text-[1.44rem]  placeholder:text-[#000]/[.4] placeholder:font-semibold placeholder:italic placeholder:uppercase border-[#000] border-b-[1px]  w-[80%] relative left-[50%] translate-x-[-50%] leading-[.2rem] text-[1.44rem] text-[#000] font-bold  focus:outline-none"
                        type="search"
                        name ="query"
                        placeholder="Search..."
                        value={stringQuery}
                        autoComplete="off"
                        onChange={(e)=> setStringQuery(e.target.value)}
                        
                        
                        
                        ></input>
                    </form>
                    

                </div>
                <div className="w-full mt-5">
                   
                    <div className="mt-3">
                        <div className="border-[#cacaca] border-b-[1px]">
                            <div className="w-[80%] mx-auto leading-[2.3rem]">
                                <button className="w-[50%] border-[#000] border-b-[2px] text-center outline-none  uppercase italic font-semibold text-[black]" onClick={()=>setViewArticleResults(true)}>Articles<span className="ml-2">({results.length})</span></button>
                                <button className="w-[50%] text-center outline-none  uppercase italic font-semibold text-[#000]/[.4]" onClick={()=>setViewAuthorResults(true)}>Authors<span className="ml-2">({results.length})</span></button>
                            </div>
                        </div>
                        <div className = "">
                            {viewArticleResults ? 
                                results.length ? (
                                    <Fragment>
                                        <ul className="decoration-none list-none border-[#cacaca] md:w-[50%] md:border-r-[1px]">
                                            {results.map((article, index)=>(
                                            <li className={`border-box border-[#CACACA] ${index < results?.length ? "border-b-[1px]":""}`} key={index}>
                                                    <div className="pt-[10px] pb-5 w-[90%] mx-auto h-fit relative md:top-[50%] md:translate-y-[-50%] text-black">
                                        
                                                        <h2 className=" font-semibold">{article?.title}</h2>
                                                        <div className="mt-3 text-[0.833rem]">
                                                            <p className="inline-block uppercase italic mt-3 mr-1">{article?.author}</p>
                                                            <p className="inline-block uppercase italic font-semibold">23 feb 2024</p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="h-full aspect-square mx-auto bg-[#CACACA]">

                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="w-fit mx-auto py-5">
                                            {meta?.page > 1 && (<div className="inline-block cursor-pointer  mr-3  underline italic uppercase font-semibold">newer</div>)}
                                            <div className="w-fit inline-block align-middle  italic uppercase font-semibold">
                                                <div className="text-center ">
                                                    {meta?.page}
                                                </div>
                                                <div className="text-center  border-[#000] border-t-[3px]">
                                                    {meta?.pageCount}
                                                </div>
                                            </div>
                                            {meta?.page >= meta?.pageCount || (<div className="inline-block ml-3 cursor-pointer  underline italic uppercase font-semibold">older</div>)}
                                        </div>
                                    </Fragment>
                                ):(
                                    <div className="mt-[3rem] w-[80%] mx-auto">
                                        <p className="font-semibold italic text-[1.2rem]">
                                            We couldn’t find any article results for this search term.
                                        </p>
                                        <div className="mt-3 text-[1.2rem]">
                                            Search suggestions:
                                            <ul className="list-disc ml-5 mt-3">
                                                <li>Make sure all words are spelled correclty</li>
                                                <li className="mt-3"> Use more generalwords in search term</li>
                                                <li className="mt-3">Try rephrasing the search term</li>
                                            </ul>

                                        </div>
                                    </div>
                                )

                                
                            : results.length ? (
                                <Fragment>
                                    <ul className="decoration-none list-none border-[#cacaca] md:w-[50%] md:border-r-[1px]">
                                            {results.map((article, index)=>(
                                            <li className={` border-box border-[#CACACA] ${index < results?.length ? "border-b-[1px]":""}`} key={index}>
                                                    <div className="pt-[10px] pb-5 w-[90%] mx-auto h-fit relative md:top-[50%] md:translate-y-[-50%] text-black">
                                        
                                                        <h2 className=" font-semibold">{article?.title}</h2>
                                                        <div className="mt-3 text-[0.833rem]">
                                                            <p className="inline-block uppercase italic mt-3 mr-1">{article?.author}</p>
                                                            <p className="inline-block uppercase italic font-semibold">23 feb 2024</p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="h-full aspect-square mx-auto bg-[#CACACA]">

                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                    </ul>
                                    <div className="w-fit mx-auto py-5">
                                        {meta?.page > 1 && (<div className="inline-block cursor-pointer  mr-3  underline italic uppercase font-semibold">newer</div>)}
                                        <div className="w-fit inline-block align-middle  italic uppercase font-semibold">
                                            <div className="text-center ">
                                                {meta?.page}
                                            </div>
                                            <div className="text-center  border-[#000] border-t-[3px]">
                                                {meta?.pageCount}
                                            </div>
                                        </div>
                                        {meta?.page >= meta?.pageCount || (<div className="inline-block ml-3 cursor-pointer  underline italic uppercase font-semibold">older</div>)}
                                    </div>
                                </Fragment>
                            ):(
                                <div className="mt-[3rem] w-[80%] mx-auto">
                                    <p className="font-semibold italic text-[1.2rem]">
                                        We couldn’t find any article results for this search term.
                                    </p>
                                    <div className="mt-3 text-[1.2rem]">
                                        Search suggestions:
                                        <ul className="list-disc ml-5 mt-3">
                                            <li>Make sure all words are spelled correclty</li>
                                            <li className="mt-3"> Use more generalwords in search term</li>
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