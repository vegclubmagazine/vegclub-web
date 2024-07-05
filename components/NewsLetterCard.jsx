import { useState } from "react"
import { API, BASE_URL } from "../config/api";
import { FaCheck} from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { subscribeUser } from "@strapi-newsletter/react";
import axios from "axios";
import InputLoader from "./InputLoader";

const NewsLetterCard = ({})=>
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
        <div className="bg-[#18181b] px-[40px] py-[70px]">
            <div className="w-full md:max-w-[66.67%]">
                <h3 className="uppercase leading-[1.12] font-bold text-white text-[2.074rem] lg:text-[2.488rem]">
                    <p>sign up</p>
                    <p>for the vegclub newsletter.</p>
                </h3>
                <form className="w-full mt-5 flex flex-row" method="POST" onSubmit={(e)=>handleSubmit(e)}>
                    {success ? (
                            <input className="flex grow pl-[20px] text-white mr-2 bg-[#a2a2a2] py-3 placeholder:font-bold placeholder:text-white/[.6] outline-white"
                                    
                                    placeholder="E-mail"
                                    type="email"
                                    name="email"
                                    value={Email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                    disabled
                                    
                                    >

                            </input>
                    ):(
                        <input className={`flex grow pl-[20px] text-white mr-2 bg-[#a2a2a2] py-3 placeholder:font-bold placeholder:text-white/[.6] ${submitErr ? "border-[#ff0000] border-[.5px] outline-none":""}`}
                                    
                                placeholder="E-mail"
                                type="email"
                                name="email"
                                value={Email}
                                onChange={(e)=>setEmail(e.target.value)}
                                
                                
                                >

                         </input>

                         

                    )}

                    <button type="submit" name="subscribe" className={`px-3 text-center min-w-[84.233px] bg-[#01e2c2] text-[.833rem]  uppercase font-semibold`}>{isLoading ? (<InputLoader/>): success ? (<FaCheck className="block text-black mx-auto text-[1.2rem]"></FaCheck>): "Subscribe"}</button>
                </form>
                {submitErr && (
                    <div className="mt-2">
                        <FontAwesomeIcon icon={faXmark} className="inline-block text-[#ff0000] w-[12px] h-[12px] mr-1 align-middle"></FontAwesomeIcon>
                        <p className="inline-block align-middle text-[#ff0000] text-[0.694rem]">Something went wrong, please try again</p>
                    </div>
                )}
                <p className="mt-5 text-[0.833rem] text-white/[.4]">Stay updated on all things vegan in Europe. Get exclusive articles, deals and giveaways delivered straight to your inbox. VegClub Magazine is the number one outlet in Europe and you will not want to miss our unique content.</p>
            </div>
        </div>
    )

}


export default NewsLetterCard;