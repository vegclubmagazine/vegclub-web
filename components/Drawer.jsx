import {
    FaFacebookSquare,
    FaInstagram,
    FaLinkedinIn,
    FaTwitter,
    FaFacebook,
    FaTiktok,
    
} from "react-icons/fa";

import {MdOpenInNew} from "react-icons/md";

import Link from "next/link";
import { useState,useEffect, useRef, useContext} from "react";
import { Fragment } from "react";
import Footer from "./Footer";
import {useRouter} from "next/router";
import { GlobalContext } from "../context/GlobalContext";
const qs = require('qs');
// ease-[cubic-bezier(.19,1,.22,1)]
const Drawer = ({isOpen, onClose})=>{
    
    const {Categories} = useContext(GlobalContext)

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
            <div className={`${isOpen ? "fixed opacity-[.5]":"hidden opacity-0"} bg-[#000] h-screen w-screen top-0 right-0 transition-opacity ease-out duration-300 z-[9998]`}></div>
            <nav className ={`${isOpen ?"visible scale-y-100":"invisible scale-y-0"} fixed top-0 duration-[.34s] origin-top-right transition-visibility ease-[cubic-bezier(0.19,1,0.22,1)] overflow-y-scroll   w-screen h-screen pb-[40px]  md:h-fit md:pb-[3rem] bg-[#18181b] z-[9999]`}>
                <div className={`${isOpen ? "opacity-100 duration-300 delay-[250ms] ease-in transition-opacity": "opacity-0"} px-[20px] pt-[20px] pb-[40px] md:pb-0  relative`}>
                    <div className="relative mb-2 pb-2 border-[#333] border-b-[1px] h-fit">
                        <button className="w-[20%] pl-[20px] align-middle" aria-label="Close Menu" onClick={()=>{onClose();}}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M16 1.77778L14.2222 0L8 6.22222L1.77778 0L0 1.77778L6.22222 8L0 14.2222L1.77778 16L8 9.77778L14.2222 16L16 14.2222L9.77778 8L16 1.77778Z" fill="white"></path>
                            </svg>
                        </button>
                        <div className="inline-block align-middle w-[80%]">
                            <Link href="/"><img src="/vegClub_logo_white_2.png" alt="Header" className="h-[2.8rem] relative left-[30%] translate-x-[-30%]"></img></Link>

                        </div>
                    </div>
                    <div className="pl-[20px] md:flex md:flex-row md:flex-grow">
                        <div className="md:w-[50%] border-black/[.1]">
                            <div className="mt-[4rem] pt-4 text-white uppercase text-[1.728rem] font-bold">
                                <ul className="list-none">
                                    <li className="cursor-pointer py-2 w-fit ease-[cubic-bezier(.19,1,.22,1)] duration-[.34s] hover:text-white/[.4]"><Link href={`/about`} ><span className="">About Us</span></Link></li>

                                    <li className="cursor-pointer w-fit py-2 ease-[cubic-bezier(.19,1,.22,1)] duration-[.34s] hover:text-white/[.4]"><Link href={`/team`} ><span className="">Meet the Team</span></Link></li>
                                    <li className="w-fit py-2">
                                        <div className="group/mainLink mr-2 flex flex-col cursor-pointer overflow-hidden h-[36.2833px] transition-all duration-[.68s] ease-[cubic-bezier(.19,1,.22,1)] hover:h-[125px]">Loyalty Program
                                            <Link href="/vegclubloyalty" className="mt-2 opacity-0 text-end text-[1.2rem] transition-opacity group-hover/mainLink:duration-[.5s] group-hover/mainLink:ease-linear   duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)] hover:text-white/[.4] group-hover/mainLink:opacity-100">Get Loyalty Card</Link>
                                            <Link href="/restaurants" className="mt-3 text-end opacity-0  text-[1.2rem] group-hover/mainLink:duration-[.8s]  group-hover/mainLink:ease-linear duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)] hover:text-white/[.4] group-hover/mainLink:opacity-100">Restaurants</Link>

                                        </div>
                                        {/*<div className="inline-block  align-middle w-[30px] h-[30px]">
                                            <img className="w-fit h-auto" src="/loyalty_button_asset.png"/>
                                        </div>*/}

                                    </li>
                                    <li className="cursor-pointer py-2 w-fit ease-[cubic-bezier(.19,1,.22,1)] duration-[.34s] hover:text-white/[.4]">
                                        <Link className="" href={`/donate`} >donate</Link>
                                        
                                       
                       
                                        
                                    </li>
                                    <li className="cursor-pointer py-2 w-fit ease-[cubic-bezier(.19,1,.22,1)] duration-[.34s] hover:text-white/[.4]">
                                        <Link className="" href={`/contact`} >Contact Us</Link>
                                        
                                       
                       
                                        
                                    </li>

                                
                                </ul>
                            </div>
                            <form data-action="Search" role="search" onSubmit={(e)=>handleSubmit(e)} className=" w-[100%] md:w-[90%] mt-[3rem] md:mt-[1rem]">
                                <div className="relative w-[100%] bg-[#a2a2a2] inline-block align-bottom">
                                    <button type="submit" className="search-btn absolute">
                                        <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M6.55892 10.7328C8.86408 10.7328 10.7328 8.86408 10.7328 6.55892C10.7328 4.25376 8.86408 2.38506 6.55892 2.38506C4.25376 2.38506 2.38506 4.25376 2.38506 6.55892C2.38506 8.86408 4.25376 10.7328 6.55892 10.7328ZM6.55892 13.1178C10.1813 13.1178 13.1178 10.1813 13.1178 6.55892C13.1178 2.93653 10.1813 0 6.55892 0C2.93653 0 0 2.93653 0 6.55892C0 10.1813 2.93653 13.1178 6.55892 13.1178Z" fill="white"></path>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M14.5219 15.9015C14.3906 16.0328 14.1777 16.0328 14.0464 15.9015L9.18249 11.0376L11.0376 9.18249L15.9015 14.0464C16.0328 14.1777 16.0328 14.3906 15.9015 14.5219L14.5219 15.9015Z" fill="white">
                                            </path>
                                        </svg>
                                    </button>
                                    <input type="search"
                                      name="q" 
                                      placeholder="Search VegClub..." 
                                     className="z-[1] w-[100%] placeholder:text-white/[.6] pl-[45px] h-[45px] border-[#cacaca] bg-transparent relative font-semibold text-white  outline-[#01e2c2]"
                                     ref={searchInputRef}
                                     ></input>
                                </div>
                                
                            </form>
                            <div className="w-fit  mt-[3rem] text-white md:mt-[2rem]">
                                    
                                 <Link href="https://www.instagram.com/vegclubmagazine/" className=" inline-block text-[1.44rem]  no-underline ease-[cubic-bezier(.19,1,.22,1)] duration-[.34s] hover:text-white/[.4]" passHref>
                                        <FaInstagram></FaInstagram>
                                </Link>
                                    
                                <Link href="https://www.linkedin.com/company/vegclubeurope/" className="inline-block text-[1.44rem]  ml-5 no-underline ease-[cubic-bezier(.19,1,.22,1)] duration-[.34s] hover:text-white/[.4]" passHref>
                                    <FaLinkedinIn></FaLinkedinIn>
                                </Link>
                                {/*<Link href="#" className="inline-block text-[1.44rem]  ml-5 no-underline ease-[cubic-bezier(.19,1,.22,1)] duration-[.34s] hover:text-white/[.4]" passHref>
                                    <FaFacebook></FaFacebook>
                                </Link>
                                <Link href="#" className="inline-block text-[1.44rem]  ml-5 no-underline ease-[cubic-bezier(.19,1,.22,1)] duration-[.34s] hover:text-white/[.4]" passHref>
                                    <FaTiktok></FaTiktok>
                                    </Link>*/}

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
                        <div className=" md:w-[50%] text-white  mt-[3rem] md:mt-[4rem]">
                            <ul className="list-none w-full md:grid md:gap-x-8  md:grid-rows-5 md:grid-flow-col text-start font-bold text-[1.728rem] uppercase">
                                {Categories?.length && Categories?.map((category, index)=>(
                                    <li className={`py-4 border-[#333] ${!index ? "border-b-[1px]" : index === (Categories.length - 1) ? "border-b-[1px] md:border-b-0" : index  % (((parseInt(index/5)+ 1)* 5)-1) ? "border-b-[1px]": "border-b-[1px] md:border-b-0"} ease-[cubic-bezier(.19,1,.22,1)] duration-[.34s] hover:text-white/[.4]`} key={index}><Link href={`/category/${category?.attributes?.slug}`}>{category?.attributes?.name}</Link></li>
                                    
                                ))}   
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
                    <div className="w-[20px]"></div>
                </div>
            </nav>
            
            
        </Fragment>
       
    )
}


export default Drawer;