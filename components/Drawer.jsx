import {
    FaFacebookSquare,
    FaInstagram,
    FaLinkedinIn,
    FaTwitter,
} from "react-icons/fa";

import Link from "next/link";
import { useState,useEffect, useRef} from "react";
import { Fragment } from "react";
import Footer from "./Footer";
import {useRouter} from "next/router";

const qs = require('qs');
// ease-[cubic-bezier(.19,1,.22,1)]
const Drawer = ({isOpen, onClose})=>{

    const router = useRouter();
    const searchInputRef = useRef(null);
    
    const handleSubmit = (e) =>
    {
        e.preventDefault();
        const search_query = qs.stringify({
            q:searchInputRef.current.value
        })

        router.replace({
            pathname:'/search',
            query:search_query
        })
        

    }
    

    return (
        <Fragment>
            <div className={`${isOpen ? "fixed opacity-[.1]":"hidden opacity-0"} bg-[#000] h-screen w-screen top-0 right-0 transition-opacity ease-out duration-300 z-[9998]`}></div>
            <nav className ={`${isOpen ?"scale-y-100":"scale-y-0"} fixed top-0    overflow-x-hidden w-screen h-screen md:h-fit md:pb-[3rem] bg-[#fff] z-[9999]`}>
                <div className={`${isOpen ? "opacity-100": "opacity-0"} duration-300 delay-[250ms] ease-in transition-opacity px-[20px] pt-[20px] relative opacity-1`}>
                    <div className="relative mb-2 pb-2 border-black/[.1] border-b-[1px] h-fit">
                        <button className="w-[20%] align-middle" aria-label="Close Menu" onClick={()=>{onClose();}}>
                            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M16 1.77778L14.2222 0L8 6.22222L1.77778 0L0 1.77778L6.22222 8L0 14.2222L1.77778 16L8 9.77778L14.2222 16L16 14.2222L9.77778 8L16 1.77778Z" fill="black"></path>
                            </svg>
                        </button>
                        <div className="inline-block align-middle w-[80%]">
                            <img src="/vegClub_logo_org_2.png" alt="Header" className="h-[3rem] relative left-[30%] translate-x-[-30%]"></img>

                        </div>
                    </div>
                    <div className="md:grid md:grid-cols-[2fr_1fr]">
                        <div className="w-full  border-black/[.1]">
                            <div className="mt-[4rem] uppercase text-[2.074rem] font-bold">
                                <ul className="list-none">
                                    <li className="menu-cat--title cursor-pointer w-fit"><Link href={`/category/news`} ><span className="underline_span">News</span></Link></li>
                                    <li className="menu-cat--title cursor-pointer w-fit"><Link href={`/category/lifestyle-and-food`}><span className="underline_span">Lifestyle & Food</span></Link></li>
                                </ul>
                            </div>
                            <form data-action="Search" role="search" onSubmit={(e)=>handleSubmit(e)} className=" w-[100%] md:w-[90%] mt-[3rem] md:mt-[1rem]">
                                <div className="relative w-[100%] bg-[#f4f4f4] inline-block align-bottom">
                                    <button type="submit" className="search-btn absolute">
                                        <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M6.55892 10.7328C8.86408 10.7328 10.7328 8.86408 10.7328 6.55892C10.7328 4.25376 8.86408 2.38506 6.55892 2.38506C4.25376 2.38506 2.38506 4.25376 2.38506 6.55892C2.38506 8.86408 4.25376 10.7328 6.55892 10.7328ZM6.55892 13.1178C10.1813 13.1178 13.1178 10.1813 13.1178 6.55892C13.1178 2.93653 10.1813 0 6.55892 0C2.93653 0 0 2.93653 0 6.55892C0 10.1813 2.93653 13.1178 6.55892 13.1178Z" fill="black"></path>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M14.5219 15.9015C14.3906 16.0328 14.1777 16.0328 14.0464 15.9015L9.18249 11.0376L11.0376 9.18249L15.9015 14.0464C16.0328 14.1777 16.0328 14.3906 15.9015 14.5219L14.5219 15.9015Z" fill="black">
                                            </path>
                                        </svg>
                                    </button>
                                    <input type="search"
                                      name="q" 
                                      placeholder="Search VegClub..." 
                                     className="z-[1] w-[100%] placeholder:text-[#cacaca] pl-[45px] h-[45px] border-[#cacaca] bg-transparent relative outline-[#01e2c2]"
                                     ref={searchInputRef}
                                     ></input>
                                </div>
                                
                            </form>
                            <div className="w-fit  mt-[3rem] md:mt-[2rem]">
                                    
                                 <Link href="#" className=" inline-block text-[1.44rem]  no-underline" passHref>
                                        <FaInstagram></FaInstagram>
                                </Link>
                                    
                                <Link href="#" className="inline-block text-[1.44rem]  ml-5 no-underline" passHref>
                                    <FaLinkedinIn></FaLinkedinIn>
                                </Link>

                            </div>

                            {/*<h6 className=" font-semibold mb-5 flex">
                                <span className="mr-[10px] italic shrink-0 block">LEARN MORE</span>
                                <span className="block w-[100%] relative bottom-[8px] border-[#cacaca] border-b-[1px]"></span>
                            </h6>
                            <ul className="list-none w-full text-start font-semibold text-[1.2rem]">
                                <li className="mb-3">Team</li>
                                <li className="mb-3">About</li>
                                <li className="mb-3">Contact</li>
                                <li className="mb-3">Support Us</li>
                            </ul>*/}
                        </div>
                        <div className=" w-full  mt-[3rem] md:mt-[4rem]">
                            <ul className="list-none w-full md:grid  md:grid-rows-4 md:grid-flow-col text-start font-bold text-[1.44rem]">
                                <li className="mb-3 pb-3 border-[#cacaca] border-b-[1px]"><Link href="#">Team</Link></li>
                                <li className="mb-3 pb-3 border-[#cacaca]  border-b-[1px]"><Link href="#">About</Link></li>
                                <li className="mb-3 pb-3 border-[#cacaca]  border-b-[1px]"><Link href="#">Contact</Link></li>
                                <li className="mb-3 pb-3 border-[#cacaca] border-b-[1px]"><Link href="#">Loyalty Card</Link></li>
                            </ul>
                            {/*<h6 className="flex mb-3">
                                {/*<span className="shrink-0 italic uppercase text-[1.44rem] mr-[10px] font-bold">Learn more</span>*/}
                                {/*<span className="border-[#cacaca] w-[100%] border-b-[1px] relative bottom-[8px]"></span>
                            </h6>*/}
                            
                            {/*<form data-action="subscribe" role="subscribe" className="mb-[40px] w-full pt-2">
                                <div className="relative mb-5 w-full">
                                    <label className="absolute left-0 text-[#a2a2a2] leading-[3.5rem] w-fit z-[0]">EMAIL</label>
                                    <input type="email" className="h-[3.5rem] bg-transparent w-full z-[1] border-[#333] border-b-[1px]"></input>
                                </div>
                                <input type="submit" className="w-full bg-[#01e2c2] text-center  leading-[2.5rem] tracking-[.08rem] italic cursor-pointer border-[#01e2c2] border-x-[1px] border-y-[1px] hover:bg-[#95e8db] hover:border-[#95e8db] " value="SIGN UP"></input>
                            </form>*/}
                           {/* <div className="w-full text-white mb-[50px]">
                                <h5 className="text-[#a2a2a2] text-[1.2rem] font-semibold">Follow along</h5>
                                <div className="w-[60%] text-[#a2a2a2] grid grid-cols-4 grid-rows-1 mt-5">
                                    <Link href="#" className="text-[1.563rem] no-underline" passHref>
                                        <FaFacebookSquare></FaFacebookSquare>
                                    </Link>
                                    <Link href="#" className="text-[1.563rem] no-underline" passHref>
                                        <FaInstagram></FaInstagram>
                                    </Link>
                                    
                                    <Link href="#" className="text-[1.563rem] no-underline" passHref>
                                        <FaLinkedinIn></FaLinkedinIn>
                                    </Link>

                                </div>

                            </div>*/}
                        </div>
                    </div>
                </div>
            </nav>
            
            
        </Fragment>
       
    )
}


export default Drawer;