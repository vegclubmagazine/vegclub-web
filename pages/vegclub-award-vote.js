import { API, SITE_URL } from "../config/api";
import Layout from "../defaults/Layout"
import { FaMapLocationDot, FaCircleInfo, FaInstagram, FaXmark, FaFacebookF} from "react-icons/fa6";
import { FaShareAlt,  } from "react-icons/fa";
import { FacebookShareButton } from "react-share";
import { MdInfoOutline } from "react-icons/md";
import { CiGlobe, CiFacebook, CiShare2 } from "react-icons/ci";
import { faCircleCheck, faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useEffect, useState, useRef, Fragment, useContext} from "react";
import { GlobalContext } from "../context/GlobalContext";
import Link from "next/link";


const qs = require("qs");

const vote =  ({contestants, countries}) =>
{
    const cardsCtnrRef = useRef(null);
    const [Visibilities, setVisibilities] = useState({});
    const [SelectedCountry, setSelectedCountry] = useState(contestants[0]?.attributes?.country);
    const [InfoDrawerOpen, setInfoDrawerOpen] = useState(false);
    const [PopOutOpen, setPopOutOpen] = useState(false);
    const [Contestant, setContestant] = useState(null);
    const [ClientVoted, setClientVoted] = useState(false);
    const [ForbiddenVote, setForbiddenVote] = useState(false);
    const [Loading, setLoading] = useState(false);

 

    const {getContestantById} = useContext(GlobalContext);

    const handleCountrySelect = (country)=>
    {
        setSelectedCountry(country);

    }

    const handleVote = (e, id, currVote)=>
    {
        if(!document)return;

        if(ClientVoted){

            
            return;


        }
        setLoading(true);
        
        const vote = currVote + 1;
        fetch(`${API}/contestants/${id}`, {
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                Accept:"application/json",
            },
            body:JSON.stringify({data:{vote: vote}})
        })
        .then((response)=>{
            if(response.ok)
            {
                return response.json();
            }
            throw response;
        })
        .then((data)=>{
            document.cookie = "voted=true; expires=Fri, 06 Dec 2024 23:59:59 GMT; SameSite=Lax; Secure";
            setLoading(false);
            setClientVoted(true);
            
        })
        .catch((err)=>{
            if(err instanceof TypeError){
                console.log(err);
            }
            else{
                err.json().then((body)=>{
                    console.log(body, "400");
                })
            }
        })
    }

    const toUrl = (str,type) =>
    {
        
        if(typeof str !== "string") return "#";
        
        const regex = (type === "instagram" ? /www\.instagram\.com/: /www\.facebook\.com/);
        if(str.match(regex)) return str;
        const regex_at = /(@?)(.+)/;
        const match_arr =  str.match(regex_at);
        
        if(match_arr)
        {

            return `https://www.${type}.com/` + match_arr[2]

        }

        

        return str;
    }

    const closeDrawer = ()=>
    {
        setInfoDrawerOpen(false);
    }

    const handleInfoReq = async (e, id)=>
    {

        
        setInfoDrawerOpen(true);
        const contestant = await getContestantById(id);
        
        setContestant(contestant);

        
    }

    useEffect(()=>{


        if(document && document.cookie.split("; ").some((item) => item.startsWith("voted="))){
            setClientVoted(true);
        }

        const options = {
            threshold: 0.3
        };

        const observer = new IntersectionObserver((entries)=>{
            entries.forEach((entry)=>{
                if(entry.isIntersecting){
                    setVisibilities(prev =>({...prev, [`${entry.target.id}`]:true}))

                }
            })
        }, options)

        if(cardsCtnrRef.current){
            cardsCtnrRef.current.childNodes.forEach((child) => observer.observe(child));
        }
      


    },[])
    useEffect(()=>{
        
        document.querySelector("html").classList.toggle("drawer-open", (InfoDrawerOpen || ForbiddenVote));
    }, [InfoDrawerOpen,ForbiddenVote]);
    /*let points = [],
        amp = 20,
        n = 0;
     
    
    
    for(let a = 0; a <= Math.PI; a += Math.PI/5)
    {
        let y = amp * Math.sin(a);
      
        
        points.push(amp-y);
    }

    console.log(points);*/
    

    

   



    return(
        <Fragment>
            <Layout title="VegClub Magazine | Vote">
                <section className="2xl:w-[80%] mx-auto px-[40px] gap-y-[40px] lg:gap-y-0 2xl:px-0 py-[40px] grid grid-rows-2 xl:grid-rows-none xl:grid-cols-2 items-center justify-items-center xl:gap-x-5 overflow-hidden">
                    <div className="relative h-[300px] xl:hidden">
                        <div className="absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] w-[250px] h-[250px] rounded-[50%] bg-[#18181b] px-[20px] py-[20px] z-[2]">
                            <div className="flex flex-row h-[40px] justify-center">
                                <div className="w-[9px]  h-[9px] mr-2 relative top-[20px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
                                        <path d="M 0.5 0  L 0.6469463130731183 0.29774575140626314  L  0.9755282581475768 0.3454915028125263  L 0.7377641290737884 0.5772542485937369
                                        L 0.7938926261462366 0.9045084971874737  L 0.5 0.75 L 0.2061073738537635  0.9045084971874737  L 0.2622358709262116 0.5772542485937369 L 0.02447174185242318 0.3454915028125264
                                        L 0.35305368692688166 0.29774575140626314" fill="white"></path>
                                    </svg>
                                </div>
                                <div className="w-[18px] h-[18px] mr-2 relative top-[8.244294954150536px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
                                        <path d="M 0.5 0  L 0.6469463130731183 0.29774575140626314  L  0.9755282581475768 0.3454915028125263  L 0.7377641290737884 0.5772542485937369
                                        L 0.7938926261462366 0.9045084971874737  L 0.5 0.75 L 0.2061073738537635  0.9045084971874737  L 0.2622358709262116 0.5772542485937369 L 0.02447174185242318 0.3454915028125264
                                        L 0.35305368692688166 0.29774575140626314" fill="white"></path>
                                    </svg>
                                </div>
                                <div className="w-[21px] h-[21px] mr-2 relative top-[0.9788696740969307px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
                                        <path d="M 0.5 0  L 0.6469463130731183 0.29774575140626314  L  0.9755282581475768 0.3454915028125263  L 0.7377641290737884 0.5772542485937369
                                        L 0.7938926261462366 0.9045084971874737  L 0.5 0.75 L 0.2061073738537635  0.9045084971874737  L 0.2622358709262116 0.5772542485937369 L 0.02447174185242318 0.3454915028125264
                                        L 0.35305368692688166 0.29774575140626314" fill="white"></path>
                                    </svg>
                                </div>
                                <div className="w-[18px] h-[18px] mr-2 relative top-[8.244294954150536px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
                                        <path d="M 0.5 0  L 0.6469463130731183 0.29774575140626314  L  0.9755282581475768 0.3454915028125263  L 0.7377641290737884 0.5772542485937369
                                        L 0.7938926261462366 0.9045084971874737  L 0.5 0.75 L 0.2061073738537635  0.9045084971874737  L 0.2622358709262116 0.5772542485937369 L 0.02447174185242318 0.3454915028125264
                                        L 0.35305368692688166 0.29774575140626314" fill="white"></path>
                                    </svg>
                                </div>
                                <div className="w-[9px] h-[9px] mr-2 relative top-[20px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
                                        <path d="M 0.5 0  L 0.6469463130731183 0.29774575140626314  L  0.9755282581475768 0.3454915028125263  L 0.7377641290737884 0.5772542485937369
                                        L 0.7938926261462366 0.9045084971874737  L 0.5 0.75 L 0.2061073738537635  0.9045084971874737  L 0.2622358709262116 0.5772542485937369 L 0.02447174185242318 0.3454915028125264
                                        L 0.35305368692688166 0.29774575140626314" fill="white"></path>
                                    </svg>
                                </div>
                            </div>
                            <div className="text-white">
                                <p className="text-[2.44rem] uppercase font-bold text-center">vegclub</p>
                                <p className="text-[1.2rem] mt-1 uppercase text-center">Vegan restaurant</p>
                                <p className=" uppercase text-center font-light">of the year awards</p>
                                <div className="h-[2px] bg-[#01e2c2] relative mt-3 w-[150px] mx-auto">
                                    <div className="font-light px-3 absolute w-fit left-[50%] translate-x-[-50%] mt-[-.7rem] bg-[#18181b]">2024</div>
                                </div>
                            </div>
                            <div className=" mt-3 flex flex-row h-[40px] justify-center -scale-y-100">
                                <div className="w-[9px]  h-[9px] mr-2 relative top-[20px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
                                        <path d="M 0.5 0  L 0.6469463130731183 0.29774575140626314  L  0.9755282581475768 0.3454915028125263  L 0.7377641290737884 0.5772542485937369
                                        L 0.7938926261462366 0.9045084971874737  L 0.5 0.75 L 0.2061073738537635  0.9045084971874737  L 0.2622358709262116 0.5772542485937369 L 0.02447174185242318 0.3454915028125264
                                        L 0.35305368692688166 0.29774575140626314" fill="white"></path>
                                    </svg>
                                </div>
                                <div className="w-[16px] h-[16px] mr-2 relative top-[8.244294954150536px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
                                        <path d="M 0.5 0  L 0.6469463130731183 0.29774575140626314  L  0.9755282581475768 0.3454915028125263  L 0.7377641290737884 0.5772542485937369
                                        L 0.7938926261462366 0.9045084971874737  L 0.5 0.75 L 0.2061073738537635  0.9045084971874737  L 0.2622358709262116 0.5772542485937369 L 0.02447174185242318 0.3454915028125264
                                        L 0.35305368692688166 0.29774575140626314" fill="white"></path>
                                    </svg>
                                </div>
                                <div className="w-[21px] h-[21px] mr-2 relative top-[0.9788696740969307px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
                                        <path d="M 0.5 0  L 0.6469463130731183 0.29774575140626314  L  0.9755282581475768 0.3454915028125263  L 0.7377641290737884 0.5772542485937369
                                        L 0.7938926261462366 0.9045084971874737  L 0.5 0.75 L 0.2061073738537635  0.9045084971874737  L 0.2622358709262116 0.5772542485937369 L 0.02447174185242318 0.3454915028125264
                                        L 0.35305368692688166 0.29774575140626314" fill="white"></path>
                                    </svg>
                                </div>
                                <div className="w-[16px] h-[16px] mr-2 relative top-[8.244294954150536px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
                                        <path d="M 0.5 0  L 0.6469463130731183 0.29774575140626314  L  0.9755282581475768 0.3454915028125263  L 0.7377641290737884 0.5772542485937369
                                        L 0.7938926261462366 0.9045084971874737  L 0.5 0.75 L 0.2061073738537635  0.9045084971874737  L 0.2622358709262116 0.5772542485937369 L 0.02447174185242318 0.3454915028125264
                                        L 0.35305368692688166 0.29774575140626314" fill="white"></path>
                                    </svg>
                                </div>
                                <div className="w-[9px] h-[9px] mr-2 relative top-[20px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
                                        <path d="M 0.5 0  L 0.6469463130731183 0.29774575140626314  L  0.9755282581475768 0.3454915028125263  L 0.7377641290737884 0.5772542485937369
                                        L 0.7938926261462366 0.9045084971874737  L 0.5 0.75 L 0.2061073738537635  0.9045084971874737  L 0.2622358709262116 0.5772542485937369 L 0.02447174185242318 0.3454915028125264
                                        L 0.35305368692688166 0.29774575140626314" fill="white"></path>
                                    </svg>
                                </div>
                            </div>
                        
                        </div>
                        <div className="absolute left-[50%] translate-x-[-50%] w-[400px] top-[120px] z-[3]">
                            <img src="/awards_asset_foilage.png" className=""></img>
                        </div>
                        <div className="absolute translate-x-[-50%] w-[400px] top-[-10px] z-[1]">
                            <img src="/awards_asset_foilage_bg.png" className=""></img>
                        </div>
                        
                    </div>
                    <div className="">
                        <h1 className="font-extrabold text-[2.073rem] lg:text-[2.488rem] uppercase">
                            Who will be 2024&#39;s
                            <br></br>
                            <span className="">vegan restaurant of the year ?</span>

                        </h1>
                        <p className="mt-5">This year the focus is on  vegan eateries based in europe. We have  narrowed down 
                            our selection to 40 of our favourite places. ordained as vegclub royalty etc etc.
                        
                            
                        </p>
                        <p className="mt-3"> We will announce the winners on -date-
                        </p>
                    </div>
                    <div className="relative h-[400px] hidden xl:block">
                        <div className="absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] w-[350px] h-[350px] rounded-[50%] bg-[#18181b] px-[20px] py-[40px] z-[2]">
                            <div className="flex flex-row h-[60px] justify-center">
                                <div className="w-[13.5px]  h-[13.5px] mr-3 relative top-[30px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
                                        <path d="M 0.5 0  L 0.6469463130731183 0.29774575140626314  L  0.9755282581475768 0.3454915028125263  L 0.7377641290737884 0.5772542485937369
                                        L 0.7938926261462366 0.9045084971874737  L 0.5 0.75 L 0.2061073738537635  0.9045084971874737  L 0.2622358709262116 0.5772542485937369 L 0.02447174185242318 0.3454915028125264
                                        L 0.35305368692688166 0.29774575140626314" fill="white"></path>
                                    </svg>
                                </div>
                                <div className="w-[21px] h-[21px] mr-3 relative top-[12.366442431225806px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
                                        <path d="M 0.5 0  L 0.6469463130731183 0.29774575140626314  L  0.9755282581475768 0.3454915028125263  L 0.7377641290737884 0.5772542485937369
                                        L 0.7938926261462366 0.9045084971874737  L 0.5 0.75 L 0.2061073738537635  0.9045084971874737  L 0.2622358709262116 0.5772542485937369 L 0.02447174185242318 0.3454915028125264
                                        L 0.35305368692688166 0.29774575140626314" fill="white"></path>
                                    </svg>
                                </div>
                                <div className="w-[25px] h-[25px] mr-3 relative top-[1.4683045111453943px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
                                        <path d="M 0.5 0  L 0.6469463130731183 0.29774575140626314  L  0.9755282581475768 0.3454915028125263  L 0.7377641290737884 0.5772542485937369
                                        L 0.7938926261462366 0.9045084971874737  L 0.5 0.75 L 0.2061073738537635  0.9045084971874737  L 0.2622358709262116 0.5772542485937369 L 0.02447174185242318 0.3454915028125264
                                        L 0.35305368692688166 0.29774575140626314" fill="white"></path>
                                    </svg>
                                </div>
                                <div className="w-[21px] h-[21px] mr-3 relative top-[12.366442431225806px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
                                        <path d="M 0.5 0  L 0.6469463130731183 0.29774575140626314  L  0.9755282581475768 0.3454915028125263  L 0.7377641290737884 0.5772542485937369
                                        L 0.7938926261462366 0.9045084971874737  L 0.5 0.75 L 0.2061073738537635  0.9045084971874737  L 0.2622358709262116 0.5772542485937369 L 0.02447174185242318 0.3454915028125264
                                        L 0.35305368692688166 0.29774575140626314" fill="white"></path>
                                    </svg>
                                </div>
                                <div className="w-[13.5px] h-[13.5px] mr-3 relative top-[30px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
                                        <path d="M 0.5 0  L 0.6469463130731183 0.29774575140626314  L  0.9755282581475768 0.3454915028125263  L 0.7377641290737884 0.5772542485937369
                                        L 0.7938926261462366 0.9045084971874737  L 0.5 0.75 L 0.2061073738537635  0.9045084971874737  L 0.2622358709262116 0.5772542485937369 L 0.02447174185242318 0.3454915028125264
                                        L 0.35305368692688166 0.29774575140626314" fill="white"></path>
                                    </svg>
                                </div>
                            </div>
                            <div className="text-white">
                                <p className="text-[2.488rem] uppercase font-bold text-center">vegclub</p>
                                <p className="text-[1.728rem] mt-1 uppercase text-center">Vegan restaurant</p>
                                <p className="text-[1.44rem] uppercase text-center font-light">of the year awards</p>
                                <div className="h-[2px] bg-[#01e2c2] relative mt-3 w-[150px] mx-auto">
                                    <div className="font-light px-3 absolute w-fit left-[50%] translate-x-[-50%] mt-[-.7rem] bg-[#18181b]">2024</div>
                                </div>
                            </div>
                            <div className=" flex flex-row h-[60px] justify-center -scale-y-100">
                                <div className="w-[13.5px]  h-[13.5px] mr-3 relative top-[30px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
                                        <path d="M 0.5 0  L 0.6469463130731183 0.29774575140626314  L  0.9755282581475768 0.3454915028125263  L 0.7377641290737884 0.5772542485937369
                                        L 0.7938926261462366 0.9045084971874737  L 0.5 0.75 L 0.2061073738537635  0.9045084971874737  L 0.2622358709262116 0.5772542485937369 L 0.02447174185242318 0.3454915028125264
                                        L 0.35305368692688166 0.29774575140626314" fill="white"></path>
                                    </svg>
                                </div>
                                <div className="w-[21px] h-[21px] mr-3 relative top-[12.366442431225806px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
                                        <path d="M 0.5 0  L 0.6469463130731183 0.29774575140626314  L  0.9755282581475768 0.3454915028125263  L 0.7377641290737884 0.5772542485937369
                                        L 0.7938926261462366 0.9045084971874737  L 0.5 0.75 L 0.2061073738537635  0.9045084971874737  L 0.2622358709262116 0.5772542485937369 L 0.02447174185242318 0.3454915028125264
                                        L 0.35305368692688166 0.29774575140626314" fill="white"></path>
                                    </svg>
                                </div>
                                <div className="w-[25px] h-[25px] mr-3 relative top-[1.4683045111453943px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
                                        <path d="M 0.5 0  L 0.6469463130731183 0.29774575140626314  L  0.9755282581475768 0.3454915028125263  L 0.7377641290737884 0.5772542485937369
                                        L 0.7938926261462366 0.9045084971874737  L 0.5 0.75 L 0.2061073738537635  0.9045084971874737  L 0.2622358709262116 0.5772542485937369 L 0.02447174185242318 0.3454915028125264
                                        L 0.35305368692688166 0.29774575140626314" fill="white"></path>
                                    </svg>
                                </div>
                                <div className="w-[21px] h-[21px] mr-3 relative top-[12.366442431225806px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
                                        <path d="M 0.5 0  L 0.6469463130731183 0.29774575140626314  L  0.9755282581475768 0.3454915028125263  L 0.7377641290737884 0.5772542485937369
                                        L 0.7938926261462366 0.9045084971874737  L 0.5 0.75 L 0.2061073738537635  0.9045084971874737  L 0.2622358709262116 0.5772542485937369 L 0.02447174185242318 0.3454915028125264
                                        L 0.35305368692688166 0.29774575140626314" fill="white"></path>
                                    </svg>
                                </div>
                                <div className="w-[13.5px] h-[13.5px] mr-3 relative top-[30px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
                                        <path d="M 0.5 0  L 0.6469463130731183 0.29774575140626314  L  0.9755282581475768 0.3454915028125263  L 0.7377641290737884 0.5772542485937369
                                        L 0.7938926261462366 0.9045084971874737  L 0.5 0.75 L 0.2061073738537635  0.9045084971874737  L 0.2622358709262116 0.5772542485937369 L 0.02447174185242318 0.3454915028125264
                                        L 0.35305368692688166 0.29774575140626314" fill="white"></path>
                                    </svg>
                                </div>
                            </div>
                        
                        </div>
                        <div className="absolute left-[50%] translate-x-[-50%] w-[550px] top-[190px] z-[3]">
                            <img src="/awards_asset_foilage.png" className=""></img>
                        </div>
                        <div className="absolute translate-x-[-50%] w-[550px]  z-[1]">
                            <img src="/awards_asset_foilage_bg.png" className=""></img>
                        </div>
                        
                    </div>
                


                </section>
                <section className="py-[40px] bg-[#18181b] mt-5 xl:mt-[40px] px-[40px]">
                    <div className="px-[20px]">
                        <h2 className="text-[1.728rem] md:text-[2.074rem] lg:text-[2.488rem] text-white font-extrabold text-center uppercase">Restaurant of the year</h2>
                        <p className="mt-5 text-[.833rem] md:text-[1rem] text-white font-light text-center">Find below our {contestants?.length} finalists from {Object.keys(countries)?.length} countries within europe, all eligible to become the 2024 vegclub restaurant of the year.</p>
                        <div className="hidden  mt-[40px] lg:flex flex-row flex-wrap justify-center gap-[1rem]">
                            { Object.keys(countries)?.map((country, index)=>(
                                <div role="button" onClick={()=>{handleCountrySelect(country);}}key={index}  className={`cursor-pointer  rounded-[24px] w-[120px] h-[48px] font-[500] flex  text-[.833rem] bg-white hover:bg-[#f3f2f1] transition-all items-center justify-center flex-wrap ${SelectedCountry === country ? "border-[3px] border-[#01e2c2]":""}`}>{country}</div>
                            )) }

                        </div>
                        <select className="lg:hidden mt-[40px] text-[.833rem] w-full px-[20px] cursor-pointer rounded-[8px] py-[10px]">
                            { Object.keys(countries)?.map((country, index)=>(
                                <option  onClick={()=>{handleCountrySelect(country);}} key={index}  className={`text-[.833rem]`}>{country}</option>
                            )) }

                        </select>
                    </div>
                    <div ref={cardsCtnrRef} className="mt-[40px] flex flex-row justify-center flex-wrap gap-[2rem]">
                        {countries[`${SelectedCountry}`]?.map((contestant, index)=>(
                            <div id={`contestant-${index}`} style={{animationDelay:`${(index % 2)/10}s`}}  key={contestant.id} className={`${Visibilities[`contestant-${index}`] ? "animate-[cardAnimIn_.3s_ease-out_forwards]":""} opacity-0 translate-y-[30px] rounded-[1.2rem] flex flex-row items-center bg-white p-[10px] h-[190px] w-[480px] shadow-[0_0_6px_0_rgba(0,0,0,.15)]`}>
                                <div className="h-[80px] md:h-[120px] aspect-square overflow-hidden rounded-[50%]">
                                    <img src={contestant?.attributes?.logo?.data?.attributes?.url} className="h-full w-auto object-cover"/>
                                </div>
                                <div className="flex flex-col px-[20px] grow">
                                    <h3 className="md:text-[1.2rem] font-[500]">{contestant?.attributes?.eateryName}</h3>
                                    <div className="mt-3">
                                        <FaMapLocationDot className="text-black/[.4] text-[.833rem] inline-block"/>
                                        <p className=" text-[.833rem] md:text-[1rem] font-light ml-3 inline-block">{contestant?.attributes?.city}</p>
                                    </div>
                                    <div className="flex flex-row mt-5 w-full">
                                        <div  role="button" onClick={(e)=>{handleInfoReq(e, contestant.id);}} className="h-[40px] rounded-[8px] w-[40px] bg-[#f3f3f3] flex items-center justify-center transition-all duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)] hover:bg-[#d8d8d8]">
                                            <MdInfoOutline className=""/>
                                        </div>
                                        <div role="button" className="h-[40px] rounded-[8px] w-[40px] ml-3 bg-[#f3f3f3] flex items-center justify-center transition-all duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)] hover:bg-[#d8d8d8]">
                                            <Link href={`${toUrl(contestant?.attributes?.instagramHandle, "instagram")}`}>
                                                <FaInstagram className=""/>
                                            </Link>
                                        </div>
                                        {ClientVoted ? (
                                             <button  className="h-[40px] rounded-[8px] ml-3 bg-[#f3f3f3] text-[#d8d8d8] font-[500]  flex items-center grow justify-center transition-all duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)]">
                                                vote
                                            </button>

                                        ):(
                                            <button onClick={(e)=>{handleVote(e, contestant.id, contestant?.attributes?.vote);}}  className="h-[40px] rounded-[8px] ml-3 bg-[#01e2c2] font-[500]  flex items-center grow justify-center transition-all duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)] hover:text-black/[.6]">
                                                {Loading ? (
                                                    <div className="loader-btn"></div>
                                                ):"vote"}
                                                
                                            </button>

                                        )}
                                    
                                      
                                       
                                    </div>
                                </div>


                            </div>
                        ))}
                    </div>
                </section>
                
            </Layout>
            {InfoDrawerOpen && (
                    <Fragment>
                        <div className="bg-black opacity-0 animate-[drawerInMask_.3s_ease-out_forwards] w-screen fixed h-screen z-[9998] top-0 left-0"></div>
                        <div className={`fixed max-w-[100vw] w-[480px] animate-[drawerIn_.3s_ease-out_forwards] h-[100vh] bg-white z-[9999] top-0 left-[-100vw]`}>
                            <div className="w-full h-full relative">
                                <div className="text-end py-3 px-[40px]">
                                    <button onClick={()=>{closeDrawer();}} className="rounded-[8px] bg-[#f3f3f3] w-[25px] py-[5px] transition-all duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)] hover:bg-[#d8d8d8]">
                                        <FaXmark className = "mx-auto"/>
                                    </button>
                                </div>
                                <div className="mt-5 px-[40px] flex flex-row items-center">
                                    <div className="w-[80px] lg:w-[120px] aspect-square rounded-[50%] overflow-hidden">
                                        <img    src={   Contestant?.attributes?.logo?.data?.attributes?.url ||
                                                        Contestant?.attributes?.logo?.data?.attributes?.formats?.large?.url ||
                                                        Contestant?.attributes?.logo?.data?.attributes?.formats?.medium?.url ||
                                                        Contestant?.attributes?.logo?.data?.attributes?.formats?.small?.url ||
                                                        Contestant?.attributes?.logo?.data?.attributes?.formats?.thumbnail?.url 
                                        } 
                                                className="h-full w-auto object-cover"
                                        />
                                    </div>
                                    <div className="pl-5 flex flex-col grow">
                                        <h3 className="text-[1.2rem] font-[500]">{Contestant?.attributes?.eateryName}</h3>
                                        <div className="mt-3">
                                            <FaMapLocationDot className="text-black/[.4] text-[.833rem] inline-block"/>
                                            <p className="font-light ml-3 inline-block">{Contestant?.attributes?.city}</p>
                                        </div>
                                        <div className="mt-3 flex flex-row">
                                            {Contestant?.attributes?.siteUrl && (
                                                <Link className="w-[40px] h-[40px] text-center rounded-[8px] bg-[#f3f3f3] mr-3 transition-all duration-[.34s] ease-[cubic-bezier(.19,1.22,1)] hover:bg-[#d8d8d8] " href={`${Contestant?.attributes?.siteUrl}`}>
                                                    <CiGlobe className="mx-auto relative top-[50%] translate-y-[-50%]"></CiGlobe>
                                                   
                                                </Link>
                                            )}

                                            {Contestant?.attributes?.instagramHandle && (
                                                <Link className="w-[40px] h-[40px] text-center rounded-[8px] bg-[#f3f3f3] mr-3 transition-all duration-[.34s] ease-[cubic-bezier(.19,1.22,1)] hover:bg-[#d8d8d8]" href={`${toUrl(Contestant?.attributes?.instagramHandle, "instagram")}`}>
                                                    <FaInstagram className="mx-auto relative top-[50%] translate-y-[-50%]"></FaInstagram>
                                                   
                                                </Link>
                                            )}
                                            {Contestant?.attributes?.facebookHandle && (
                                                <Link className="w-[40px] h-[40px] text-center rounded-[8px] bg-[#f3f3f3] transition-all duration-[.34s] ease-[cubic-bezier(.19,1.22,1)] hover:bg-[#d8d8d8]" href={`${toUrl(Contestant?.attributes?.facebookHandle,"facebook")}`}>
                                                    <FaFacebookF className="mx-auto relative top-[50%] translate-y-[-50%] font-bold"></FaFacebookF>
                                               

                                                </Link>
                                        )}
                                        </div>
                                        
                                    </div>

                                </div>
                                <p className="mt-[60px] px-[40px] text-justify font-light">{Contestant?.attributes?.statement}</p>
                                <div className="absolute bg-[#18181b] bottom-0 py-[40px]  w-full">
                                    <div className="px-[40px] flex flex-row">
                                        <div role="button" className="w-[40px] h-[40px] mr-3 rounded-[8px] bg-white transition text-center transition-all duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)] hover:bg-[#f3f2f1]">
                                            <FacebookShareButton className="relative top-[50%] translate-y-[-50%] w-fit h-fit"  url={`${SITE_URL}/vegclub-award-vote`}  hashtag={`${Contestant?.attributes?.eateryName}`}>
                                                <CiShare2 className="text-[#18181b] text-[1.2rem]"/>
                                            </FacebookShareButton>
                                        </div>
                                        {ClientVoted ? (
                                            <div role="button" onClick={(e)=>{handleVote(e, Contestant?.id, Contestant?.attributes?.vote);}} className="flex grow rounded-[8px] h-[40px] font-[500] bg-[#f3f3f3] items-center justify-center transition-all duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)] text-[#d8d8d8]">
                                                vote

                                            </div>
                                        ):(
                                            <div role="button" onClick={(e)=>{handleVote(e, Contestant?.id, Contestant?.attributes?.vote);}} className="flex grow rounded-[8px] h-[40px] font-[500] bg-[#01e2c2] items-center justify-center transition-all duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)] hover:text-black/[.6]">
                                                {Loading ? (
                                                    <div className="loader-btn"></div>
                                                ): "vote"}
                                              

                                            </div>
                                        )}
                                    </div>

                                </div>
                            </div>


                        </div>
                    </Fragment>
            )}
            {ForbiddenVote && (
                <Fragment>
                    <div className="bg-black opacity-0  w-screen fixed h-screen z-[99998] top-0 left-0"></div>
                    <div className="bg-[#18181b] max-w-[70vw] w-[600px] fixed translate-y-[-80%] top-[50%] left-[50%] translate-x-[-50%] py-5 px-[40px] z-[99999]">
                            <div className="text-end py-3 px-[40px]">
                                <button onClick={()=>{closePopupDrawer();}} className="rounded-[8px] bg-[#f3f3f3] w-[25px] py-[5px] transition-all duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)] hover:bg-[#d8d8d8]">
                                    <FaXmark className = "mx-auto"/>
                                </button>
                                <div className="mt-5 text-center">
                                    <div className="w-fit mx-auto">
                                        <FontAwesomeIcon icon={faCircleXmark} className="w-[40px] h-[40px] text-[#01e2c2]"/>
                                    </div>
                                    <p className="mt-5 text-[1.2rem] font-[500 text-white">You have voted already.</p>
                                </div>
                            </div>
                    </div>
                </Fragment>
            )}
        </Fragment>


    )
}


export async function getServerSideProps({req,res})
{
    res.setHeader(
        "Cache-Control",
        "public",
        "s-maxage=604800",
        "stale-while-revalidate=84600"
    );

    const countries = {};

    const filters = qs.stringify(
        {
            populate:"*",
        },
        {encodeValuesOnly:true}
    );

    const response = await fetch(`${API}/contestants?${filters}`);

  
    
    const {data} = await response.json();

    if(data && data.length){
        for(let i =0; i < data.length; i ++){

            if(!countries[`${data[i].attributes.country}`]){
                countries[`${data[i].attributes.country}`] = [data[i]];

            }
            else{
                countries[`${data[i].attributes.country}`].push(data[i]);
            }

           
        }
    }


    return {
        props:{
            contestants: data || null,
            countries: countries,
        }
    }


}

export default vote;