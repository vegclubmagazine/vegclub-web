import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {Fade as Hamburger} from "hamburger-react";
import { faSearch, FaInstagram, FaLinkedinIn, FaUser, FaTrophy} from "react-icons/fa";
import {FaXmark} from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useState, useEffect,useContext,useRef} from "react";
import { useScrollDirection } from "react-use-scroll-direction";
import Drawer from "../components/Drawer";
import Footer from "../components/Footer";
import CookiesConsentBanner from "../components/CookiesConsentBanner";
import { slugify } from "../lib/utils";
import { BASE_URL } from "../config/api";
import { GlobalContext} from "../context/GlobalContext";
import Script from "next/script";


const qs=require('qs');

const Layout = (
{   title,
    children,
    image,
    desc,
    canonicalUrl,
    keywords,
    metaImage,
    metaDesc,
    metaTitle,
    bodyStyles

 


}) =>
{

    const [minNav,setMinNav] = useState(false);
    const {isScrolling,isScrollingDown} = useScrollDirection();
    const [isOpen,setIsOpen] = useState(false);
    const [ lastScrollY, setLastScrollY] = useState(0);
    const {Categories, UserState} = useContext(GlobalContext);

    const {user, logout} = UserState;
    
    const openDrawer = ()=>
    {
        return setIsOpen(prev => prev ? false: true);
    }
    const onClose = ()=>
    {
        return setIsOpen(false);
    }
    const router = useRouter();
    const navSearchInputRef = useRef(null);
    
    const handleSubmit = (e) =>
    {
        e.preventDefault();
        const search_query = qs.stringify({
            q:navSearchInputRef.current.value
        })

        router.replace({
            pathname:'/search',
            query:search_query
        })
        

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
                <title>{ title || "VegClub Magazine" }</title>
                <meta name="keywords" content={keywords}></meta>
                <meta name="description" content={desc}></meta>
                <link rel="shortcut icon" href="favicon.ico"></link>

                <meta content="en_US" property="og:locale"></meta>

                <meta content={metaTitle || title || "Vegclub Magazine"} property="og:title"></meta>
                
                <meta content="https://vegclubmagazine.com" property="og:site"></meta>
                <meta content="Vegclub Magazine" property="og:site_name"></meta>
                <meta content={metaImage || image} property="og:image"></meta>
                <meta content={canonicalUrl || "https://vegclubmagazine.com" } property="og:url"></meta>
                <meta property="og:description" content={metaDesc || desc}></meta>
                <meta property="og:type" content="website"></meta>

                <meta property="twitter:title" content={metaTitle || title} />
                <meta property="twitter:description" content={metaDesc || desc} />
                <meta property="twitter:image" content={metaImage || image} />
            
            </Head>
            
        
            
            
            <nav className={`fixed top-0 w-full z-[999] `}>
                
                
                {minNav || (
                    <>
                        {/*<div className={`bg-black py-3 px-[40px]`}>
                            <div className="awards-banner  relative bg-[#01e2c2] py-3 px-[80px]">
                                <FaXmark className="text-black text-[1.2rem] absolute right-[5px] top-[5px]"></FaXmark>
                                <div className="mx-auto w-fit select-none">
                                    <p className="text-center  md:text-[1.728rem] 2xl:text-[2.074rem]">
                                        Put your vegan restuarant up against the others
                                        
                                    </p>


                                </div>
                            </div>
                       </div>*/}
                        <div className="py-3 hidden md:block text-end pr-[40px] border-[#333] border-b-[1px]  bg-black">
                                    <div className="inline-block text-[0.833rem] py-2  bg-[#01e2c2] px-3 w-fit rounded-[2px]">
                                            <Link className=" duration-[.34s] ease-in-out font-semibold uppercase hover:text-black/[.4]" href="/vegclubloyalty">Loyalty Program</Link>
                                            {/*<div className="inline-block align-middle">
                                                <img src="/loyalty_button_asset.png" className="h-[15px] w-[15px]"></img>
                                            </div>*/}
                                        </div>
                                {/*{user  ? (
                                    <div className="inline-block align-middle w-fit cursor-pointer">
                                        <FaUser className="text-[#a2a2a2] text-[1rem] mr-2 inline-block align-middle"></FaUser>
                                        <div className="inline-block  align-middle text-[#a2a2a2] font-light">{user?.name}</div>
                                    </div>
                                ):(
                                    <>
                                        <div className="inline-block align-middle w-fit cursor-pointer mr-[2.2rem]">
                                            <FaUser className="text-[#a2a2a2] text-[1rem] mr-2 inline-block align-middle"></FaUser>
                                            <div className="inline-block underline decoration-[#a2a2a2] decoration-[1.5px] align-middle text-[#a2a2a2] font-light">Sign In</div>
                                        </div>
                                
                                        <div className="inline-block text-[0.833rem] py-2  bg-[#01e2c2] px-3 w-fit rounded-[2px]">
                                            <Link className=" duration-[.34s] ease-in-out font-semibold uppercase hover:text-black/[.4]" href="/vegclubloyalty">Loyalty Program</Link>
                                            {/*<div className="inline-block align-middle">
                                                <img src="/loyalty_button_asset.png" className="h-[15px] w-[15px]"></img>
                                            </div>
                                        </div>
                                    </>
                                )}*/}
                        </div>
                    </>
                )}

             
                <div className={`w-full grid  items-center bg-[#18181b] grid-cols-3 ${minNav ? "h-[4.5rem] drop-shadow-md":"h-[6rem] md:grid-cols-2"} transition-all duration-[0.34s] ease-in-out  border-[#333] border-b-[1px]`}>
                    <div className="inline-block align-middle w-fit">
                        
                        <div className="pl-[30px] inline-block align-middle  h-fit w-fit">
                            <Hamburger  color="#fff" rounded size={20} toggle={()=>openDrawer()} />
                        </div>
                        <div className={`hidden ${minNav ? "hidden":"md:inline-block"} ml-5 align-middle w-fit`}>
                            <Link href="/"><img src="/vegClub_logo_white_2.png"  alt="Header" className={` ${minNav ? "h-[2.2rem]":"h-[2.8rem]"} transition-all duration-[.34s] ease-in-out delay-200 relative left-[50%] translate-x-[-50%]`}></img></Link>
                        </div>
                        
                    </div>
                    <div className={`${minNav ? "block":"md:hidden"} mx-auto w-fit`}>
                        <Link href="/"><img src="/vegClub_logo_white_2.png"  alt="Header" className={` ${minNav ? "h-[2.2rem]":"h-[2.8rem]"} transition-all duration-[.34s] ease-in-out delay-200 relative left-[50%] translate-x-[-50%]`}></img></Link>
                    </div>
                    { minNav || (
                        <div className={"hidden lg:inline-block  w-full font-semibold  md:text-[0.833rem] text-end pr-[40px]"}>
                           
                           {/*<div className="inline-block py-2  bg-[#01e2c2] px-3 w-fit mr-[1.5rem]">
                                    <Link className=" duration-[.34s] ease-in-out hover:text-white/[.4]" href="/loyalty-card">Loyalty Program</Link>
                                    <div className="inline-block align-middle">
                                        <img src="/loyalty_button_asset.png" className="h-[15px] w-[15px]"></img>
                                    </div>
                                
                                
                    </div>*/}
                            {/*<button className="align-middle pr-[40px]">
                                <svg className="w-[16px] h-[16px]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M6.55892 10.7328C8.86408 10.7328 10.7328 8.86408 10.7328 6.55892C10.7328 4.25376 8.86408 2.38506 6.55892 2.38506C4.25376 2.38506 2.38506 4.25376 2.38506 6.55892C2.38506 8.86408 4.25376 10.7328 6.55892 10.7328ZM6.55892 13.1178C10.1813 13.1178 13.1178 10.1813 13.1178 6.55892C13.1178 2.93653 10.1813 0 6.55892 0C2.93653 0 0 2.93653 0 6.55892C0 10.1813 2.93653 13.1178 6.55892 13.1178Z" fill="white"></path>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M14.5219 15.9015C14.3906 16.0328 14.1777 16.0328 14.0464 15.9015L9.18249 11.0376L11.0376 9.18249L15.9015 14.0464C16.0328 14.1777 16.0328 14.3906 15.9015 14.5219L14.5219 15.9015Z" fill="white">
                                    </path>
                                </svg>
                </button>*/}
                            <form data-action="Search" role="search" onSubmit={(e)=>handleSubmit(e)} className="hidden md:inline-block w-[60%] max-w-[429px]">
                                <div className="relative w-[100%]  bg-white inline-block align-bottom rounded-[2px] pl-[70px] pr-[40px]">
                                    <div className="absolute left-0 py-2 top-[4.5px]">
                                        <div className="px-2 border-black/[.1] leading-[2] border-r-[1px]">
                                            <p className="text-[.833rem]  font-semibold uppercase">Search</p>

                                        </div>
                                    </div>
                                    <button type="submit" className="absolute bg-[#01e2c2] p-3 rounded-[2px] cursor-pointer right-[2px] top-[2px]">
                                        <svg  width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M6.55892 10.7328C8.86408 10.7328 10.7328 8.86408 10.7328 6.55892C10.7328 4.25376 8.86408 2.38506 6.55892 2.38506C4.25376 2.38506 2.38506 4.25376 2.38506 6.55892C2.38506 8.86408 4.25376 10.7328 6.55892 10.7328ZM6.55892 13.1178C10.1813 13.1178 13.1178 10.1813 13.1178 6.55892C13.1178 2.93653 10.1813 0 6.55892 0C2.93653 0 0 2.93653 0 6.55892C0 10.1813 2.93653 13.1178 6.55892 13.1178Z" fill="black"></path>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M14.5219 15.9015C14.3906 16.0328 14.1777 16.0328 14.0464 15.9015L9.18249 11.0376L11.0376 9.18249L15.9015 14.0464C16.0328 14.1777 16.0328 14.3906 15.9015 14.5219L14.5219 15.9015Z" fill="black">
                                            </path>
                                        </svg>
                                    </button>
                                    <input type="search"
                                      name="q" 
                                      
                                      className="z-[1] w-[100%] text-[1rem] text-[#18181b] font-normal placeholder:text-[#000] pl-[2px] h-[45px] border-[#cacaca] bg-transparent relative outline-none"
                                      ref={navSearchInputRef}
                                     ></input>
                                </div>
                                
                            </form>
                        </div>
                    )}
                </div>
                
                <div className="hidden xl:block py-5 bg-[#000] px-[40px]">
                    <ul className="text-white w-fit mx-auto  font-semibold">
                        {Categories?.map((category, index)=>(
                            <li className="inline-block  uppercase pr-2 mr-[2.2rem] curor-pointer ease-[cubic-bezier(.19,1,.22,1)] duration-[.34s] hover:text-white/[.6]" key={category?.id}><Link href={`/category/${category?.attributes?.slug}`}>{category?.attributes?.name}</Link></li>
                        ))}
                    </ul>
                </div>
                
                        

            </nav>
                
            

            <main className={`mt-[6rem] md:mt-[9.8rem] xl:mt-[13.8rem]`}>
                {children}
            </main>
            <CookiesConsentBanner/>
            <Footer></Footer>
            <Drawer isOpen={isOpen} onClose={onClose}></Drawer>
        </>

    )



}


export default Layout;

Layout.defaultProps = {
    title: "VegClub Magazine",
    page: "Home",
    image: "vegClub_logo_original.png",
    keywords:
      "vegan magazine, vegan magazine europe, vegan articles, veganism europe, veganism in the europe, rise of veganism europe, best vegan magazine europe, EU vegan magazine, vegclub EU, veg-club eu, veg club eu",
    desc: "Your Premier European Vegan Magazine",
  };