import Link from "next/link";
import { FaXmark } from "react-icons/fa6";
import {useState, useEffect, useContext, Fragment} from "react";
import { GlobalContext } from "../context/GlobalContext";


const CookiesConsentBanner = ({}) =>
{
    const [BannerAcknowledged, setBannerAcknowledged] = useState(false);
   
    const [SettingsOpen, setSettingsOpen] = useState(false);
    const [AllowMarketingCookies, setAllowMarketingCookies] = useState(false);
    const {ManagePreferences, setManagePreferences, CookieConsentHandled, setCookieConsentHandled} = useContext(GlobalContext);


    const handlePreferenceUpdate = ()=>
    {
        setManagePreferences(false);
        setSettingsOpen(false);
        setCookieConsentHandled(true);
        document.cookie = "cookie-consent-handled=true; expires=Fri, 24 Oct 2025 25:59:59 GMT; Secure";
        
        
        

    }
    const exitSettings = ()=>
    {
        setManagePreferences(false);
        setSettingsOpen(false);
    }
  
    useEffect(()=>{
        
        document.querySelector("html").classList.toggle("popup-open", SettingsOpen);

    }, [SettingsOpen])
    


    

    return (
        
        <>

        
            {CookieConsentHandled || (
                <div className="relative bg-[#18181b] px-[40px] py-5 border-[#333] border-t-[1px] flex flex-row gap-3">
                    <div role="button" onClick={(e)=>{handlePreferenceUpdate();}} className="absolute cursor-pointer transition-all duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)] w-[20px] py-[3px] right-[40px]  bg-white/[.5] hover:bg-white/[.3] rounded-[2px] text-center">
                        <FaXmark className="text-[#18181b] mx-auto"></FaXmark>
                    </div>
                    <div className="w-fit shrink-0">
                        <img className="w-[40px] s:w-[60px] lg:w-[80px] xl:w-[100px] h-auto" src="/cookie_asset_reg.png"/>
                    </div>
                    <div className="flex grow flex-col">
                        <h4 className="md:text-[1.44rem]  uppercase text-white font-extrabold">
                            our cookies
                            <br></br>
                            <span className="opacity-70">improve your experience.</span>
                        </h4>
                        <p className="text-[.833rem] md:text-[1rem] mt-3 font-light text-white">
                        This website uses cookies and other technologies for website function, analytics, advertising, and performance. These technologies may collect and share your information when using this website. By proceeding on this website, you agree to our Terms and Conditions detailed in our <span className="font-bold underline"><Link href="/legal/privacy-policy">Privacy Policy</Link></span>
                        </p>
                        <div className="mt-5 text-end">
                            <button onClick={()=>{setSettingsOpen(true);}} className=" border-white/[.7] border-[1px] px-3 py-2 text-white/[.7] uppercase font-bold mr-2 rounded-[2px] text-[.693rem] md:text-[.833rem]">Cookie settings</button>
                            <button onClick={()=>{handlePreferenceUpdate();}} className=" border-white/[.7] border-[1px] px-3 py-2 text-white/[.7] uppercase font-bold mr-2 rounded-[2px] text-[.693rem] md:text-[.833rem]">Reject non-essential cookies</button>
                            <button onClick={()=>{handlePreferenceUpdate();}} className=" bg-[#01e2c2] px-3 py-2 text-black uppercase font-bold mr-2 rounded-[2px] text-[.693rem] md:text-[.833rem]">Accept all cookies</button>


                        </div>
                    
                        
                    </div>
                </div>
        
            )}
            {(SettingsOpen || ManagePreferences)  && (
                <Fragment>
                    <div className="animate-[drawerInMask_.3s_ease-out_forwards] fixed bg-black opacity-0 w-screen h-screen z-[9998] top-0 left-0"></div>
                    <div className="translate-y-[0px] opacity-0 animate-[popUpIn_.3s_ease-out_forwards] fixed w-[700px] left-[50%] translate-x-[-50%] top-[50%] max-w-[100vw] h-screen md:h-fit py-[40px] bg-white md:rounded-[6px] px-[20px] md:px-[40px] z-[9999]">
                        <div className="pr-[40px] py-5 relative border-black/[.1] border-b-[1.5px]">
                            <h4 className="font-bold text-[1.728rem] ">Cookie settings</h4>
                            <div role="button" onClick={()=>{exitSettings();}} className="absolute mt-5 right-0 w-[40px] py-[9.92px] top-0 rounded-[6px] bg-[#f3f3f3] transition-all duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)] hover:bg-[#d8d8d8]">
                                <FaXmark className="mx-auto text-black text-[1.44rem]"></FaXmark>
                            </div>
                        </div>
                        <div className="mt-[40px]">
                            
                            <h5 className="text-[1.2rem] font-bold ">Necessary Cookies &#40;Always On&#41;</h5>
                            <div className="flex flex-row justify-center items-center gap-3">
                                <p className="mt-3 grow">These cookies are essential for you to browse and use our website and its features.</p>
                                <div role="button"  className={` shrink-0 w-[70px] h-[35px] p-[2.5px] rounded-[30px] transition-bg duration-[.5s] ease-[cubic-bezier(.19,1,.22,1)] relative bg-[#01e2c2]/[.4]`}>
                                    <div className={`rounded-[50%] relative shadow-sm w-[30px] h-[30px] transition-all duration-[.5s] ease-[cubic-bezier(.19,1,.22,1)] translate-x-[35px] bg-white`}></div>
                                </div>

                            </div>
                        </div>
                        <div className="mt-5 mt-[40px]">
                            <h5 className="text-[1.2rem] font-bold ">Marketing Cookies</h5>
                            <div className="flex flex-row justify-center items-center gap-3">
                                 <p className="mt-3 text-justify">These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites. They are based on uniquely identifying your browser and internet device. If you do not allow these cookies, you will experience less targeted advertising.</p>
                                 <div role="button" onClick={()=>{setAllowMarketingCookies(prev => prev ? false:true);}} className={`shrink-0 w-[70px] h-[35px] p-[2.5px] rounded-[30px] transition-bg duration-[.5s] ease-[cubic-bezier(.19,1,.22,1)] relative ${AllowMarketingCookies ? "bg-[#01e2c2]/[.8]":"bg-[#f3f3f3]"}`}>
                                    <div className={`rounded-[50%] relative shadow-sm w-[30px] h-[30px] transition-all duration-[.5s] ease-[cubic-bezier(.19,1,.22,1)] bg-white ${AllowMarketingCookies ? "translate-x-[35px]":"translate-x-[0px] "} `}></div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-[40px] text-end">
                            <button onClick={()=>{handlePreferenceUpdate();}} className="py-2 px-3 bg-[#01e2c2] font-bold rounded-[6px]">Update Preferences</button>

                        </div>

                       
                    </div>
                </Fragment>
            )}
        </>
        
    )

}


export default CookiesConsentBanner;