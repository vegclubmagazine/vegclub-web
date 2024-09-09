import Link from "next/link";
import Layout from "../../defaults/Layout"
import {useState} from "react";



const affiliates = ({})=>
{
    const [faq1, setFaq1] = useState(false);
    const [faq2, setFaq2] = useState(false);
    const [faq3, setFaq3] = useState(false);

    return (
        <Layout title="Become An Affiliate | VegClub Magazine">
            <section className="tombStone bg-black py-5">
                <div className="px-[40px] pb-[20px] lg:pb-0 flex flex-col-reverse lg:block  lg:w-[950px] mx-auto relative lg:h-[250px]">
                    <div className="text-white w-fit   pt-[20px] lg:absolute  lg:z-[2] lg:left-[75px]">
                        <h1 className="font-bold text-[1.728rem] md:text-[2.072rem] lg:text-[2.488rem]">Become Affiliated</h1>
                        <h3 className="text-[1.2rem] md:text-[1.44rem] mt-5 max-w-[500px] font-extralight">Sign up to accept our loyalty card at your establishment.</h3>
                        <Link href={"/affiliates/application"} className="block mt-5 w-fit bg-[#01e2c2] py-2 px-3 text-black text-[0.833rem] uppercase font-semibold">Apply now</Link>
                        
                    </div>
                
                    <div className="block lg:hidden py-[30px]  md:py-[50px]">
                        <img src="/affiliate_asset_tb_unified.png" className="mx-auto w-[180px] md:w-[250px] h-auto"/>

                    </div>
                    <img className=" hidden lg:block lg:absolute lg:left-[400px] lg:top-[45px]  lg:z-[1] w-[120px] mx-auto lg:w-[250px] h-auto" src="/affiliate_asset_polkafor_grey.png"/>
                    <img className="hidden lg:block lg:absolute lg:z-[2] left-[530px] w-[350px] h-auto mx-auto" src="/affilliate_asset.png"/>
                    <div className="hidden lg:block lg:absolute lg:left-[760px] lg:top-[30px]  lg:w-[90px] lg:h-[90px] lg:z-[3] bg-[#01e2c2] rounded-[50%] mx-auto"/>
                    
                </div>
            </section>
            <section className="py-5 px-[40px]  lg:mx-auto">
                <h2 className="text-[1.728rem] lg:text-[2.074rem] font-bold text-center">How does it work ?</h2>
                <div className="grid gap-y-5 lg:gap-y-0 lg:grid-cols-3 lg:gap-x-5  mt-5 lg:mt-[60px]">
                    <div>
                        <img src="/affiliate-asset-signup_one.png" className="w-[80px] h-[80px] mx-auto"/>
                        <div className="text-center mt-5 w-[30px] mx-auto text-[1.2rem] h-[30px] py-[3px] text-white font-semibold rounded-[50%] bg-black">1</div>
                        <h3 className="w-fit mt-2 mx-auto text-[1.44rem] font-semibold">Apply</h3>
                        <p className="text-center  mt-3">Take a few minutes out to fill out our application</p>
                    </div>

                    <div>
                        <img src="/affiliate-asset-form_1.png" className="w-[80px] h-[80px] mx-auto"/>
                        <div className="text-center mt-5 w-[30px] mx-auto text-[1.2rem] h-[30px] py-[3px] text-white font-semibold rounded-[50%] bg-black">2</div>
                        <h3 className="w-fit mt-2 mx-auto text-[1.44rem] font-semibold">Stay in touch</h3>
                        <p className="text-center  mt-3">Expect an e-mail from us within 3 days of your application being submitted. We may request supplimentary information to better evaluate if you fit our criteria</p>



                    </div>
                    <div>
                        <img src="/affiliate-asset-cards.png" className="w-[80px] h-[80px] mx-auto"/>
                        <div className="text-center mt-5 w-[30px] mx-auto text-[1.2rem] h-[30px] py-[3px] text-white font-semibold rounded-[50%] bg-black">3</div>
                        <h3 className="w-fit mt-2 mx-auto text-[1.44rem] font-semibold">You're in</h3>
                        <p className="text-center  mt-3">Once approved and the admission fee of £8.25 is paid, you will be able to accept our loyalty cards at the negotiated discount</p>




                    </div>
                   
                </div>
            </section>
            <section className="py-5 mt-5 border-black/[.1] border-y-[1px] overflow-x-auto px-[10px] lg:px-[40px]">
                <div className="flex flex-row items-center  w-fit lg:w-[90%] md:mx-auto lg:justify-between">
                    <img src="/affiliate_asset_logos_one.png" className="w-auto h-[30px] lg:h-[40px] mr-5 lg:mr-0 relative top-[5px] lg:top-[8px] opacity-40"/>
                    <img src="/CANTINE-KAPUNKA-LOGO-V2-STREETFOOD-ROUGE-one.png" className="w-auto h-[25px] mr-5 lg:mr-0 lg:h-[30px] opacity-40"/>
                    <img src="/evnewblack10_retina_one.png" className="w-auto h-[60px] lg:h-[70px] mr-5 lg:mr-0 opacity-40"/>
                    <img src="/capulat_montague_logo_one.png" className="w-auto h-[12px] lg:h-[15px] mr-5 lg:mr-0 opacity-40"/>
                    <img src="/Veg-Box-logo-svg_one.png" className="w-auto h-[97px] lg:h-[107px] mr-5 lg:mr-0 opacity-40"/>

                </div>
            </section>
            <section className="mt-5 pt-5 pb-[40px] px-[40px]">
                <h2 className="text-[2.074rem] font-bold w-fit mx-auto">FAQs</h2>
                <div className="mt-5 w-full  lg:w-[70%]  mx-auto border-black/[.1] border-[1px]">
                    <div className="px-[40px] has-[:hover]:bg-[#f3f2f1]">
                        <div className="border-b-[1px]   py-5 relative group" onClick={() => {setFaq1(prev => prev ? false:true)}}>
                            <div className="relative pr-[40px] lg:pr-0 cursor-pointer">
                                <h3 className="font-bold text-[1.2rem] md:text-[1.44rem]">How do I sign up to this program ?</h3>
                                <div className={`absolute w-[40px] h-[40px] cursor-pointer border-[1px] rounded-[50%] top-[50%] translate-y-[-50%] right-0 group-hover:bg-black ${faq1 ? "bg-black": ""}`}>
                                    <div className={`mx-auto relative border-r-[2px] w-[12px] h-[12px] border-b-[2px] ${faq1 ? "border-[#f3f2f1] rotate-[225deg] mt-[15px]": "border-black mt-[11.515px] group-hover:border-[#f3f2f1] rotate-[45deg]"}`}></div>
                                </div>
                            </div>
                            
                            <div className={`${faq1 ? "":"hidden"}`}>
                                <p className="mt-5">Submit your application <Link href="/affiliates/application" className="underline text-[#0018a8]">here</Link></p>
                                <p className="mt-5">We will review your application and approve it if 
                                you meet the qualifying criteria.</p>
                            </div>
                        </div>
                    </div>
                    <div className="px-[40px] has-[:hover]:bg-[#f3f2f1]">
                        <div className="border-b-[1px] py-5 relative group" onClick={() => {setFaq2(prev => prev ? false:true)}}>
                            <div className="relative pr-[40px] lg:pr-0 cursor-pointer">
                                <h3 className="font-bold text-[1.2rem] md:text-[1.44rem]">How do I qualify for this program ?</h3>
                                <div className={`absolute w-[40px] h-[40px] cursor-pointer border-[1px] rounded-[50%] top-[50%] translate-y-[-50%] right-0 group-hover:bg-black ${faq2 ? "bg-black": ""}`}>
                                    <div className={`mx-auto relative border-r-[2px] w-[12px] h-[12px] border-b-[2px] ${faq2 ? "border-[#f3f2f1] rotate-[225deg] mt-[15px]": "border-black mt-[11.515px] group-hover:border-[#f3f2f1] rotate-[45deg]"}`}></div>
                                </div>
                            </div>
                            <div className={`${faq2 ? "":"hidden"}`}>
                                <p className="mt-5">Vegan establishments that meet the
                                basic prerequisites can participate in 
                                this programme. For further information, contact us at <Link href="mailto:loyalty@vegclubmagazine.com" className="text-[#0018a8] underline">loyalty@vegclubmagazine.com</Link>
                                </p>
                            </div>
                        </div>


                        
                    </div>
                    <div className="px-[40px] has-[:hover]:bg-[#f3f2f1]">
                        <div className="border-b-[1px] py-5 relative group" onClick={() => {setFaq3(prev => prev ? false:true)}}>
                            <div className="relative pr-[40px] lg:pr-0 cursor-pointer">
                                <h3 className="font-bold text-[1.2rem] md:text-[1.44rem]">How do we determine the discount 
                                you will offer ?</h3>
                                <div className={`absolute w-[40px] h-[40px] cursor-pointer border-[1px] rounded-[50%] top-[50%] translate-y-[-50%] right-0 group-hover:bg-black ${faq3 ? "bg-black": ""}`}>
                                    <div className={`mx-auto relative border-r-[2px] w-[12px] h-[12px] border-b-[2px] ${faq3 ? "border-[#f3f2f1] rotate-[225deg] mt-[15px]": "border-black mt-[11.515px] group-hover:border-[#f3f2f1] rotate-[45deg]"}`}></div>
                                </div>
                            </div>
                            <div className={`${faq3 ? "":"hidden"}`}>
                                <p className="mt-5">You will be able to specify the type of discount
                                your establishment offers during the application process.</p>

                                <p className="mt-5">To see examples of discounts some of our clients offer, <Link href="/restaurants" className="underline text-[#0018a8]">click here</Link></p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
          

        </Layout>
    )
}

export default affiliates;