import Link from "next/link";
import Layout from "../../defaults/Layout";
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




const Article = ({article}) =>
{
    const [shareBtnActive, setShareBtnActive] = useState(0);
    return (
        <Layout>
            <div className="w-[90%] mx-auto pt-[2rem] border-[#000] border-t-[3px]">
                <main>
                    <div className="text-start md:w-[70%] lg:w-[50%] md:mx-auto pb-2 border-black/[.1] border-b-[1px]">
                        <h2 className="italic font-semibold  uppercase">Fashion & beauty</h2>
                        <h1 className="mt-5 text-[1.728rem] font-semibold md:font-bold md:text-[2.074rem] lg:text-[2.448rem]">The Art World Before And After Thelma Golden</h1>
                        <p className="mt-5 font-[400]"> Article description kept short and sweet goes here </p>                           
                        <div className="mt-5 w-fit">
                            <div className="rounded inline-block align-middle w-[48px] h-[48px] bg-[#cacaca] mr-3"></div>
                            <div className="italic text-[0.833rem] inline-block">By <span className="underline">Author</span></div>
                        </div>
                    </div>
                    <div className="w-full border-[#CACACA] mx-auto lg:w-[60%] py-5">
                        <div className ="">
                            <p className="inline-block align-middle text-[0.833rem]">12 March 2024, 1:20pm</p>
                            <ul className="inline-block w-fit text-[1.2rem] align-middle ml-4">
                                
                                <FaFacebookSquare className="inline-block cursor-pointer transition-opacity duration-[.32s] ease-[cubic-bezier(.19,1,.22,1)] hover:opacity-30"></FaFacebookSquare>
                                <FaTwitter className="inline-block ml-5 cursor-pointer transition-opacity duration-[.32s] ease-[cubic-bezier(.19,1,.22,1)] hover:opacity-30"></FaTwitter>
                                <FaSnapchatGhost className="inline-block ml-5 cursor-pointer transition-opacity duration-[.32s] ease-[cubic-bezier(.19,1,.22,1)] hover:opacity-30"></FaSnapchatGhost>

                            </ul>
                        </div>
                        <div className="mt-5 w-full max-h-[450px] overflow-y-hidden">
                            
                            <img className="object-cover w-full" src="/Screenshot 2023-08-31 210110.png"></img>
                            

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
                    <section className="mt-[3rem] md:w-[70%] lg:w-[50%] lg:text-[1.2rem] mx-auto">
                        {/*<p className="font-semibold  leading-[1.7] italic">
                            When Golden was a young curator in the nineties, her shows, centering Black artists, were unprecedented. Today, those artists are the stars of the art market.
                        </p>*/}
                        <p className="mt-[3rem] article-preview leading-[1.7] mb-5">Whether you’re a longtime plant-based eater or simply looking to explore the diverse world of vegan cuisine, you’re in for a treat. From cozy neighborhood joints to trendy hotspots</p>
                    </section>
                    <section className="mt-[3rem] border-box py-5 bg-[#01e2c2] w-[100vw] ml-[-5.5%]">
                        <div className="w-[90%]  mx-auto mt-5">
                            <h2 className="uppercase text-[1.2rem] md:text-[1.44rem]  italic">More from {" "} <span className="font-semibold underline cursor-pointer">Fashion & Beauty</span></h2>
                            <div className="mt-[2rem]">
                                <ul className="list-none md:grid md:grid-cols-3 md:auto-rows-fr ">
                                    <li className="mt-3 border-box border-[#00b89d] border-b-[1px] md:border-b-0 md:border-r-[1px] pb-5">
                                        <div className="grid grid-cols-[70%_30%] grid-rows-1 md:grid-cols-1">
                                            <div className="hidden md:block w-full bg-[#00b89d] aspect-[16/9]">

                                            </div>
                                            <div className="w-full text-black mt-[2rem] mx-auto md:w-[90%]">
                                                <h2 className="font-semibold text-[1.2rem] leading-[1.125]">Title goes right here</h2>
                                                <p className="hidden md:block mt-[1rem]"> article description</p>
                                               <div className="flex w-fit mt-[1rem] flex-row">
                                                    <p className="text-[0.833rem] uppercase italic">Author</p>
                                                    <p className="text-[0.833rem] uppercase ml-1 font-semibold italic">20 Feb 2024</p>
                                                </div>
                                            </div>
                                            <div className="block md:hidden"> 
                                                <div className="h-full aspect-square mx-auto bg-[#00b89d]">

                                                </div>
                                            </div>

                                        </div>
                                    </li>
                                    <li className="mt-3 border-box border-[#00b89d] border-b-[1px] md:border-b-0 md:border-r-[1px] pb-5">
                                        <div className="grid grid-cols-[70%_30%] grid-rows-1 md:grid-cols-1">
                                            <div className="hidden md:block w-full bg-[#00b89d] aspect-[16/9]">

                                            </div>
                                            <div className="w-full text-black mx-auto md:w-[90%] mt-[2rem]">
                                                <h2 className="font-semibold text-[1.2rem] leading-[1.125]">Title goes right here</h2>
                                                <p className="hidden md:block mt-[1rem]"> article description</p>
                                                <div className="flex w-fit mt-[1rem] flex-row">
                                                    <p className="text-[0.833rem] uppercase italic">Author</p>
                                                    <p className="text-[0.833rem] uppercase ml-1 font-semibold italic">20 Feb 2024</p>
                                                </div>
                                            </div>
                                            <div className="block md:hidden"> 
                                                <div className="h-full aspect-square mx-auto bg-[#00b89d]">

                                                </div>
                                            </div>

                                        </div>
                                    </li>
                                    <li className="mt-3 border-box border-[#00b89d] border-b-[1px] md:border-0 pb-5">
                                        <div className="grid grid-cols-[70%_30%] grid-rows-1 md:grid-cols-1">
                                            <div className="hidden md:block w-full bg-[#00b89d] aspect-[16/9]">

                                            </div>
                                            <div className="w-full text-black mx-auto md:w-[90%] mt-[2rem]">
                                                <h2 className="font-semibold text-[1.2rem] leading-[1.125]">Title goes right here</h2>
                                                <p className="hidden md:block mt-[1rem]"> article description</p>
                                                <div className="flex w-fit mt-[1rem] flex-row">
                                                    <p className="text-[0.833rem] uppercase italic">Author</p>
                                                    <p className="text-[0.833rem] uppercase ml-1 font-semibold italic">20 Feb 2024</p>
                                                </div>
                                            </div>
                                            <div className="block md:hidden"> 
                                                <div className="h-full aspect-square mx-auto bg-[#00b89d]">

                                                </div>
                                            </div>

                                        </div>
                                    </li>
                                    <li className="mt-3 md:mt-0 border-box border-[#00b89d] border-b-[1px] md:border-r-[1px]  pb-5">
                                        <div className="grid grid-cols-[70%_30%] grid-rows-1 md:grid-cols-1">
                                            <div className="hidden md:block w-full bg-[#00b89d] aspect-[16/9]">

                                            </div>
                                            <div className="w-full text-black mx-auto md:w-[90%] mt-[2rem]">
                                                <h2 className="font-semibold text-[1.2rem] leading-[1.125]">Title goes right here</h2>
                                                <p className="hidden md:block mt-[1rem]"> article description</p>
                                                <div className="flex w-fit mt-[1rem] flex-row">
                                                    <p className="text-[0.833rem] uppercase italic">Author</p>
                                                    <p className="text-[0.833rem] uppercase ml-1 font-semibold italic">20 Feb 2024</p>
                                                </div>
                                            </div>
                                            <div className="block md:hidden"> 
                                                <div className="h-full aspect-square mx-auto bg-[#00b89d]">

                                                </div>
                                            </div>

                                        </div>
                                    </li>
                                    <li className="mt-3 md:mt-0 border-box border-[#00b89d] border-b-[1px] md:border-r-[1px]  pb-5">
                                        <div className="grid grid-cols-[70%_30%] grid-rows-1 md:grid-cols-1">
                                            <div className="hidden md:block w-full bg-[#00b89d] aspect-[16/9]">

                                            </div>
                                            <div className="w-full text-black mx-auto md:w-[90%] mt-[2rem]">
                                                <h2 className="font-semibold text-[1.2rem] leading-[1.125]">Title goes right here</h2>
                                                <p className="hidden md:block mt-[1rem]"> article description</p>
                                                <div className="flex w-fit mt-[1rem] flex-row">
                                                    <p className="text-[0.833rem] uppercase italic">Author</p>
                                                    <p className="text-[0.833rem] uppercase ml-1 font-semibold italic">20 Feb 2024</p>
                                                </div>
                                            </div>
                                            <div className="block md:hidden"> 
                                                <div className="h-full aspect-square mx-auto bg-[#00b89d]">

                                                </div>
                                            </div>

                                        </div>
                                    </li>
                                    <li className="mt-3 md:mt-0 border-box border-[#00b89d] border-b-[1px]   pb-5">
                                        <div className="grid grid-cols-[70%_30%] grid-rows-1 md:grid-cols-1">
                                            <div className="hidden md:block w-full bg-[#00b89d] aspect-[16/9]">

                                            </div>
                                            <div className="w-full text-black mx-auto md:w-[90%] mt-[2rem]">
                                                <h2 className="font-semibold text-[1.2rem] leading-[1.125]">Title goes right here here</h2>
                                                <p className="hidden md:block mt-[1rem]"> article description</p>
                                                <div className="flex w-fit mt-[1rem] flex-row">
                                                    <p className="text-[0.833rem] uppercase italic">Author</p>
                                                    <p className="text-[0.833rem] uppercase ml-1 font-semibold italic">20 Feb 2024</p>
                                                </div>
                                            </div>
                                            <div className="block md:hidden"> 
                                                <div className="h-full aspect-square mx-auto bg-[#00b89d]">

                                                </div>
                                            </div>

                                        </div>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </section>
                    
                  
                </main>
            </div>
        </Layout>
    )
}

export default Article;