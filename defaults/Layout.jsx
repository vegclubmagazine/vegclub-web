import Head from "next/head";
import Link from "next/link";
import {Fade as Hamburger} from "hamburger-react";
import { faSearch, FaInstagram, FaLinkedinIn} from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect} from "react";
import { useScrollDirection } from "react-use-scroll-direction";
import Drawer from "../components/Drawer";
import Footer from "../components/Footer";

const Layout = (
{   title,
    children,
    desc,
    metaTitle,
    canonicalUrl,
    metaDescription,
    keywords,
    bodyStyles

 


}) =>
{
    const [minNav,setMinNav] = useState(false);
    const {isScrolling,isScrollingDown} = useScrollDirection();
    const [isOpen,setIsOpen] = useState(false);
    const openDrawer = ()=>
    {
        return setIsOpen(prev => prev ? false: true);
    }
    const onClose = ()=>
    {
        return setIsOpen(false);
    }

    useEffect(()=>{
        if(scrollY > 0){

            setMinNav(true);
        }
        else{
            setMinNav(false);
        }
        
    }, [isScrolling])
    useEffect(()=>{
        document.querySelector("html").classList.toggle("drawer-open", isOpen);
    }, [isOpen]);
    


    return (
        <>
            <Head>
                <meta charSet="UTF-8"></meta>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge"></meta>
                
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <title>{ title || "Vegclub magazine" }</title>
            </Head>
            {minNav ?
                (
                    <nav className="fixed bg-[#fff] top-0 w-full  h-[3.5rem] border-[#CACACA] drop-shadow-md  z-[999] grid grid-cols-3 items-center">
                        <div>
                            
                            <div className="inline-block w-fit ml-[5%] mr-5">
                                <button className="relative w-[17px] h-[17px] " onClick={()=>{openDrawer();}}>
                                    <div className="absolute top-0 w-full h-[3px] bg-black"></div>
                                    <div className="absolute top-[39.65%] w-full h-[3px] bg-black"></div>
                                    <div className="absolute top-[79.3%] w-full h-[3px] bg-black"></div>
                                </button>
                            </div>
                            
                            <div className="hidden md:inline-block align-bottom w-fit mr-5">
                               
                                
                                   
                                <a href="/search" className="">
                                    <svg width="17" height="17" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M6.55892 10.7328C8.86408 10.7328 10.7328 8.86408 10.7328 6.55892C10.7328 4.25376 8.86408 2.38506 6.55892 2.38506C4.25376 2.38506 2.38506 4.25376 2.38506 6.55892C2.38506 8.86408 4.25376 10.7328 6.55892 10.7328ZM6.55892 13.1178C10.1813 13.1178 13.1178 10.1813 13.1178 6.55892C13.1178 2.93653 10.1813 0 6.55892 0C2.93653 0 0 2.93653 0 6.55892C0 10.1813 2.93653 13.1178 6.55892 13.1178Z" fill="black"></path>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M14.5219 15.9015C14.3906 16.0328 14.1777 16.0328 14.0464 15.9015L9.18249 11.0376L11.0376 9.18249L15.9015 14.0464C16.0328 14.1777 16.0328 14.3906 15.9015 14.5219L14.5219 15.9015Z" fill="black">
                                        </path>
                                    </svg>
                                </a>
                                    
                                 
                                   
                               
                            </div>
                            <ul className="inline-block w-fit leading-none  font-semibold align-bottom">
                                <li  className="inline-block  mr-5"><a className="m-0 " href="#">News</a></li>
                                <li className="inline-block"><a className="m-0" href="#">Lifestyle & Food</a></li>
                            </ul>
                        
                            
                        </div>

                        <div className="mx-auto w-fit">
                            <img src="/vegClub_logo_org_2.png" alt="Header" className="h-[2.2rem]"></img>
                        </div>

                        <div className="hidden md:inline-block text-end">
                            <ul className="mr-[5%] inline-block leading-none list-none w-fit font-semibold">
                                
                                <li className="text-[1.2rem]">
                                    <Link href="#" className=" inline-block no-underline" passHref>
                                            <FaInstagram ></FaInstagram>
                                    </Link>
                                        
                                    <Link href="#" className="inline-block ml-5 no-underline" passHref>
                                        <FaLinkedinIn></FaLinkedinIn>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        
                       

                    </nav>
                )
            :
            (
                <nav className="fixed top-0 w-full h-[8rem] leading-[8rem] border-[#CACACA]">
                        <div className="inline-block align-middle w-[20%]">
                            
                            <div className=" h-fit w-fit">
                                <Hamburger color="#000" rounded size={20} toggle={()=>openDrawer()} />
                            </div>
                        </div>
                        <div className="inline-block align-middle  w-[60%]">
                            <img src="/vegClub_logo_org_2.png" alt="Header" className="h-[3rem] relative left-[50%] translate-x-[-50%]"></img>
                        </div>
                       

                </nav>
                
            )}

            <main className={`mt-[8rem]`}>
                {children}
            </main>
            <Footer></Footer>
            <Drawer isOpen={isOpen} onClose={onClose}></Drawer>
        </>

    )



}


export default Layout;