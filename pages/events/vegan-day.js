import Layout from "../../defaults/Layout";
import { FaShareAlt, FaRegCalendar} from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { MdIosShare } from "react-icons/md";
import {useState, useEffect, Fragment} from "react";
import Link from "next/link";
import { SITE_URL } from "../../config/api";



const veganDay = ({}) =>
{
    const [ticketCheckoutOpen, setTicketCheckoutOpen] = useState(false);
    useEffect(()=>{
        document.querySelector("html").classList.toggle("drawer-open", ticketCheckoutOpen);
    }, [ticketCheckoutOpen]);

    return (
        <Layout title="Vegan Day | VegClub">
            {ticketCheckoutOpen &&(
               
                <Fragment>
                    <div className="fixed top-0 w-screen h-screen z-[9998] bg-black/[.9]"></div>

                    <div className="fixed z-[9999] w-[80%] lg:w-[70%] 2xl:w-[60%] bg-white  left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] grid grid-cols-[2fr_1fr]">
                        <div className="border-black/[.1] border-r-[1px]">
                            <div className="relative  border-b-[1px] py-5 text-center">
                                <h3 className="text-[1.2rem]">VegClub Anniversary</h3>
                                <p className="mt-3 text-black/[.8]">Fri, 30th August 21:00 - Sat, 31st August 03:00 BST</p>
                            </div>
                            <div className="pt-5">
                                <form method="POST" action={`${SITE_URL}/api/event_checkout_sessions`} className="relative">
                                    
                                    <div className="relative px-[40px] max-h-[200px] overflow-y-scroll">
                                        <div className="mt-3 relative py-[10px] px-2 border-[1px] w-[80%] max-w-[350px] mx-auto"
                                        >
                                            <input className="outline-none decoration-none text-[1.2rem]"
                                            value=""
                                            type="text"
                                            name="PROMO"/>
                                            <div className="text-[0.693rem] bg-white w-fit absolute top-[-8px] left-[5px]  px-2">Promo code</div>
                                        </div>
                                        <div className = "mt-5 border-[1.5px] p-3">
                                            <div className=" pb-3 border-b-[1px] flex flex-row">
                                                <div className="flex grow">
                                                    <h3 className="text-[1.2rem] font-[500]">General Admission</h3>
                                                </div>
                                                <div className="w-[300px]"></div>
                                            </div>
                                            <div className="mt-5">
                                                <div className="font-bold">
                                                    <p className="inline-block align-baseline text-[1.2rem] mr-2">£30</p>
                                                    <p className="text-black/[.6] text-[0.833rem] font-normal inline-block">incl. £2.00 Fee</p>
                                                </div>
                                            </div>
                                            <div className="mt-5">
                                                <p className="text-justify">This ticket guarantees entry into the event before the advertised door closing time</p>
                                            </div>


                                        </div>
                                        <input type="hidden" name="ticketId"/>
                                    </div>
                                    <div className="absolute left-0 bottom-[78px] w-full h-[50px] bg-[linear-gradient(to_bottom,_rgba(255,255,255,0)_10%,_rgba(255,255,255,.9))]"></div>

                                    <div className="py-5 px-[40px] text-end border-t-[1px]">

                                        <button role="submit" className="bg-[#01e2c2] uppercase tracking-[.08rem] font-[500] py-3 px-5 text-center">Checkout</button>



                                    </div>
                                   
                                </form>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
            
            
                <div className={`${ticketCheckoutOpen ? "":""}`}>
                    <section className="relative py-5 w-[80%] mx-auto px-[40px]">
                
                        <div className="w-full bg-[#cacaca] aspect-[16/3]"></div>
                    </section>
                    <main className={`mt-5 px-[40px] w-[80%] mx-auto`}>
                        <div className="pt-5 pb-1 grid grid-cols-[2fr_1fr] items-center">
                            <div className="">
                                <p className="text-[1.2rem] font-[500]">Saturday, 7 September</p>
                            </div>
                            <div className="justify-self-end">
                                <div className="w-fit">
                                    <Link href="#">
                                        <MdIosShare className="text-[1.728rem] text-black/[.7]"/>
                                    </Link>

                                </div>
                            </div>
                        </div>
                        <section className="mt-3 pb-[40px] grid grid-cols-[2fr_1fr] items-start">

                            <div>
                                <h1 className="text-[2.488rem] font-extrabold">Night At The Brewery With Vegclub</h1>
                                <div className="pt-[40px]">
                                    <h2 className="text-[1.728rem] font-bold">Date and time</h2>
                                    <div className=" mt-3">
                                        <FaRegCalendar className="inline-block text-[1rem] align-middle"/>
                                        <div className="inline-block font-[500] align-middle ml-5">Sat, 7 Sep 2024 11:00 BST</div>
                                    </div>
                                    
                                    <h2 className="mt-[40px] text-[1.728rem] font-bold">Location</h2>
                                    <div className="mt-3">
                                        <FontAwesomeIcon icon={faLocationDot} className="inline-block w-[14px] h-[14px]"/>
                                        <div className="inline-block font-[500] align-top ml-5">
                                            <p>London</p>
                                            <p className="mt-2 text-black/[.5] font-regular">6 Glover Drive N18 3HF</p>
                                            
                                            <div className="mt-2">
                                                <Link href="#" className="text-[#0018a8]">Show on map</Link>
                                            </div>

                                        </div>
                                    </div>
                                    <h2 className="mt-[40px] text-[1.728rem] font-bold">Refund policy</h2>
                                    
                                    <p className="mt-3"><span className="underline decoration-dotted decoration-[1px]"><Link href="mailto:contact@vegclubmagazine.co.uk">Contact us</Link></span>{" "}to request a refund</p>

                                    <h2 className="mt-[40px] text-[1.728rem] font-bold">About this event</h2>

                                </div>



                        
                            </div>
                            <div className="border-black/[.1] border-[1px] p-5 ">
                                <div className="text-center">
                                    <p className="font-[500] text-[1.2rem]">£30.00 each</p>
                                </div>
                                <div className="mt-5 w-full mx-auto">
                                    <button className="bg-[#18e2c2] w-full uppercase tracking-[.08rem] font-[500] py-3 px-5 text-center" onClick={()=>{setTicketCheckoutOpen(prev => prev ? false:true);}}>Get tickets</button>
                                </div>
                            </div>
                        
                        </section>

                    </main>
               
                

                </div>
         

        </Layout>
    )


}


export default veganDay;