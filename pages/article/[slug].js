import Link from "next/link";
import Layout from "../../defaults/Layout";
import {
    FaFacebook,
    FaFacebookF,
    FaLink,
    
    FaLinkedinIn,
    FaTwitter,
} from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";




const Article = ({article}) =>
{
    const [shareBtnActive, setShareBtnActive] = useState(0);
    return (
        <Layout>
            <div className="w-[90%] mx-auto">
                <main>
                    <div className="text-center">
                        <h2 className="italic font-semibold  uppercase">Fashion & beauty</h2>
                        <h1 className="mt-5 text-[1.44rem]">The Art World Before And After Thelma Golden</h1>
                        <div className="flex-row mt-3 flex w-fit mx-auto">
                            <p className="text-[0.833rem] italic uppercase">Author</p>
                            <span className="text-[#01e2c2] ml-1">/</span>
                            <p className="text-[0.833rem] font-semibold ml-1 italic uppercase">20 FEB 2024</p>
                        </div>
                    </div>
                    <div className="w-full border-box  pb-3 border-[#CACACA] border-b-[1px] ">
                        <div className="mt-5 w-full">
                            <figure>
                                <img className="object-cover" src="/Screenshot 2023-08-31 210110.png"></img>
                            </figure>

                        </div>
                        <div className="mt-1 text-[0.694rem] uppercase tracking-[0.03rem] text-[#cacaca]">Image caption</div>
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
                    </div>
                    <section className="mt-5 w-[80%] mx-auto">
                        <p className="font-semibold  leading-[1.7] italic text-[1.2rem]">
                            When Golden was a young curator in the nineties, her shows, centering Black artists, were unprecedented. Today, those artists are the stars of the art market.
                        </p>
                        <p className="mt-3 article-preview leading-[1.7] mb-5">Whether you’re a longtime plant-based eater or simply looking to explore the diverse world of vegan cuisine, you’re in for a treat. From cozy neighborhood joints to trendy hotspots</p>
                    </section>
                    <section className="mt-5 border-box py-5 bg-[#01e2c2] w-[100vw] ml-[-5.5%]">
                        <div className="w-[90%] mx-auto mt-5">
                            <h2 className="uppercase text-[1.2rem]  italic">More from {" "} <span className="font-semibold underline cursor-pointer">Fashion & Beauty</span></h2>
                            <div className="mt-[2rem]">
                                <ul className="list-none">
                                    <li className="mt-3 border-box border-[#00b89d] border-b-[1px] pb-5">
                                        <div className="grid grid-cols-[70%_30%] grid-rows-1">
                                            <div className=" text-black">
                                                <h2 className="font-semibold text-[1.2rem] leading-[1.125]">Title goes right here</h2>
                                                <div className="flex w-fit mt-3 flex-row">
                                                    <p className="text-[0.833rem] uppercase italic">Author</p>
                                                    <p className="text-[0.833rem] uppercase ml-1 font-semibold italic">20 Feb 2024</p>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="w-full aspect-square mx-auto bg-[#00b89d]">

                                                </div>
                                            </div>

                                        </div>
                                    </li>
                                    <li className="mt-3 border-box border-[#00b89d] border-b-[1px] pb-5">
                                        <div className="grid grid-cols-[70%_30%] grid-rows-1">
                                            <div className=" text-black">
                                                <h2 className="font-semibold text-[1.2rem] leading-[1.125]">Title goes right here</h2>
                                                <div className="flex w-fit mt-3 flex-row">
                                                    <p className="text-[0.833rem] uppercase italic">Author</p>
                                                    <p className="text-[0.833rem] uppercase ml-1 font-semibold italic">20 Feb 2024</p>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="w-full aspect-square mx-auto bg-[#00b89d]">

                                                </div>
                                            </div>

                                        </div>
                                    </li>
                                    <li className="mt-3 border-box border-[#00b89d]  pb-5">
                                        <div className="grid grid-cols-[70%_30%] grid-rows-1">
                                            <div className=" text-black">
                                                <h2 className="font-semibold text-[1.2rem] leading-[1.125]">Title goes right here</h2>
                                                <div className="flex mt-3 w-fit flex-row">
                                                    <p className="text-[0.833rem] uppercase italic">Author</p>
                                                    <p className="text-[0.833rem] uppercase ml-1 font-semibold italic">20 Feb 2024</p>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="w-full aspect-square mx-auto bg-[#00b89d]">

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