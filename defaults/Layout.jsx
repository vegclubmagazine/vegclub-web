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
    const [ lastScrollY, setLastScrollY] = useState(0);
    
    const openDrawer = ()=>
    {
        return setIsOpen(prev => prev ? false: true);
    }
    const onClose = ()=>
    {
        return setIsOpen(false);
    }
    const controlNavBar = ()=>
    {
        if(window.scrollY > 80)
        {
            setMinNav(true);
        }
        else{
            setMinNav(false);
        }
        setLastScrollY(window.scrollY);

    }

    useEffect(()=>{
        window.addEventListener("scroll", controlNavBar);

        return ()=>{
            window.removeEventListener("scroll", controlNavBar)
        }
        
    }, [lastScrollY])
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
            
        
            
            
            <nav className={`fixed top-0 w-full grid grid-cols-3 items-center bg-white ${minNav ? "h-[4.5rem] drop-shadow-md bg-[#fff]/[.9] ":"h-[8rem]"} transition-all duration-[0.34s] ease-in-out z-[999] leading-[8rem] border-[#CACACA]`}>
                    <div className="inline-block align-middle w-fit">
                        
                        <div className="ml-[5%] h-fit w-fit">
                            <Hamburger  color="#000" rounded size={20} toggle={()=>openDrawer()} />
                        </div>
                    </div>
                    <div className=" mx-auto w-fit">
                        <img src="/vegClub_logo_org_2.png" alt="Header" className={` ${minNav ? "h-[2.2rem]":"h-[3rem]"} transition-all duration-[.34s] ease-in-out delay-200 relative left-[50%] translate-x-[-50%]`}></img>
                    </div>
                    {minNav || (
                        <div className="hidden w-full font-semibold md:text-[0.833rem] lg:text-[1rem] lg:inline-block text-end">
                            <div className="inline-block px-3 mr-3">
                                <a href="/category">News</a>
                            </div>
                            <div className="inline-block px-3 mr-3">
                                <a href="/category">Lifestyle & food</a>
                            </div>
                            <button className="align-middle mr-[5%]">
                                <svg className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px] " viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M6.55892 10.7328C8.86408 10.7328 10.7328 8.86408 10.7328 6.55892C10.7328 4.25376 8.86408 2.38506 6.55892 2.38506C4.25376 2.38506 2.38506 4.25376 2.38506 6.55892C2.38506 8.86408 4.25376 10.7328 6.55892 10.7328ZM6.55892 13.1178C10.1813 13.1178 13.1178 10.1813 13.1178 6.55892C13.1178 2.93653 10.1813 0 6.55892 0C2.93653 0 0 2.93653 0 6.55892C0 10.1813 2.93653 13.1178 6.55892 13.1178Z" fill="black"></path>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M14.5219 15.9015C14.3906 16.0328 14.1777 16.0328 14.0464 15.9015L9.18249 11.0376L11.0376 9.18249L15.9015 14.0464C16.0328 14.1777 16.0328 14.3906 15.9015 14.5219L14.5219 15.9015Z" fill="black">
                                    </path>
                                </svg>
                            </button>
                        </div>
                    )}

            </nav>
                
            

            <main className={`mt-[8rem]`}>
                {children}
            </main>
            <Footer></Footer>
            <Drawer isOpen={isOpen} onClose={onClose}></Drawer>
        </>

    )



}


export default Layout;