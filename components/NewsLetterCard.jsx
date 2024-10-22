import { useState } from "react"
import { API, BASE_URL } from "../config/api";
import { FaCheck} from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { subscribeUser } from "@strapi-newsletter/react";
import axios from "axios";
import InputLoader from "./InputLoader";

const NewsLetterCard = ({mode})=>
{
    const [Email, setEmail] = useState("");
    const [isLoading, setIsLoading] =  useState(false);
    const [submitErr, setSubmitErr] = useState(false);
    const [success, setSuccess] = useState(false);
    const handleSubmit = (e)=>
    {
        e.preventDefault();
        setIsLoading(true);
        
        const url = `${API}/readerships`;
        const email =  Email.toLowerCase();

        axios
            .post(url,
            {
                data:{
                    email: email
                }
            })
            .then((res)=>{
                setIsLoading(false);

                setSubmitErr(false);
                setSuccess(true);


            })
            .catch((err)=>{
                
                setIsLoading(false)
                setEmail("")
                setSubmitErr(true)
            });
            
    }

    return (
        <div className={`${mode === "l-mode" ? "bg-white":"bg-[#18181b]"} px-[40px] py-[70px]`}>
            <div className={`w-full ${mode ===  "l-mode" ? "md:max-w-[66.67%]":"md:max-w-[66.67%] lg:max-w-[90%]"}`}>
                <h3 className={`uppercase leading-[1.12] font-bold ${mode === "l-mode" ? "text-black":"text-white"} text-[2.074rem] lg:text-[2.488rem]`}>
                    <p>sign up</p>
                    <p>for the vegclub newsletter.</p>
                </h3>
                <form className="w-full mt-5 flex flex-row" method="POST" onSubmit={(e)=>handleSubmit(e)}>
                    {success ? (
                            <input className={`flex grow pl-[20px] rounded-[2px] ${mode === "l-mode" ? "text-black placeholder:text-black/[.6] bg-[#f3f3f3] outline-black":"text-white placeholder:text-white/[.6] outline-white bg-[#a2a2a2]"} mr-2  py-3 placeholder:font-bold`}
                                    
                                    placeholder="E-mail"
                                    type="email"
                                    name="email"
                                    value={Email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                    disabled
                                    
                                    >

                            </input>
                    ):(
                        <input className={`flex grow pl-[20px] rounded-[2px] ${mode === "l-mode" ? "text-black placeholder:text-white/[.6] outline-black":"text-white placeholder:text-white/[.6] outline-white"} mr-2 bg-[#a2a2a2] py-3 placeholder:font-bold  ${submitErr ? "border-[#ff0000] border-[.5px] outline-none":""}`}
                                    
                                placeholder="E-mail"
                                type="email"
                                name="email"
                                value={Email}
                                onChange={(e)=>setEmail(e.target.value)}
                                
                                
                                >

                         </input>

                         

                    )}

                    <button type="submit" name="subscribe" className={`px-3 text-center min-w-[84.233px] rounded-[2px] ${mode === "l-mode" ? "bg-black text-white":"bg-[#01e2c2] text-black"} text-[.833rem]  uppercase font-semibold`}>{isLoading ? (<InputLoader/>): success ? (<FaCheck className={`block ${mode === "l-mode" ? "text-white":"text-black"} mx-auto text-[1.2rem]`}></FaCheck>): "Subscribe"}</button>
                </form>
                {submitErr && (
                    <div className="mt-2">
                        <FontAwesomeIcon icon={faXmark} className="inline-block text-[#ff0000] w-[12px] h-[12px] mr-1 align-middle"></FontAwesomeIcon>
                        <p className="inline-block align-middle text-[#ff0000] text-[0.694rem]">Something went wrong, please try again</p>
                    </div>
                )}
                <p className={`mt-5 text-[0.833rem] ${mode === "l-mode" ? "text-black":"text-white"}`}>Stay updated on all things vegan in Europe. Get exclusive articles, deals and giveaways delivered straight to your inbox. VegClub Magazine is the number one outlet in Europe and you will not want to miss our unique content.</p>
            </div>
        </div>
    )

}


export default NewsLetterCard;