import { useRouter } from "next/router";
import Layout from "../../defaults/Layout";
import Footer from "../../components/Footer";
import { useState, useRef, useEffect, Fragment } from "react";
import { getNthParent } from "../../lib/utils";
import { API } from "../../config/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FaHome } from "react-icons/fa";

import Link from "next/link";

const qs = require("qs");

const Application = ({}) =>
{
    const router = useRouter();

    const [Loading, setLoading] = useState(true);
    const [Error, setError] = useState(false);
    const [AppSubmitted, setAppSubmitted] = useState(false);
    const [Success, setSuccess] = useState(false)
    const [formValues, setFormValues] = useState({});
    const [invalidInputs, setInvalidInputs] = useState({});
    const formRef = useRef(null);
    

    useEffect(()=>
    {
        setFormValues(prev =>({...prev,["discount"]:"5"}))
    },[])
    const handleSubmit = (e)=>
    {
        e.preventDefault();
        setAppSubmitted(true);
        setLoading(true);
        
       Promise.all([

            fetch(`${API}/affiliates`, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    Accept:"application/json"
                },
                body:JSON.stringify({data:formValues})
            }),
            fetch("/api/create_customer", {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    Accept:"application/json"
                },

                body:JSON.stringify(formValues)
            })
           
        ])
        .then((res)=>{
            return res.map(r => r.json())
        })
        .then((data)=>{
            setLoading(false);
            setSuccess(true);
        })
        .catch((err)=>
        {
            setError(true);
            console.log(err)
        })
       
        
    }
    
    const handleSelect = (e) =>
    {
        
        setFormValues(prev =>({...prev,[`${e.target.id}`]:e.target.value}));
        setInvalidInputs(prev =>({...prev,[`${e.target.id}`]:""}));
    }

    const handleInput = (e) =>
    {
        if(!e.target.validity.valid){
            handleClientInvalid(e);
        }
        else{
            setInvalidInputs(prev =>({...prev,[`${e.target.name}`]:""}))
        }

        setFormValues(prev =>({...prev,[`${e.target.name}`]:e.target.value}));
    }
    const handleClientInvalid = (e) =>
    {
        
        switch(e.target.type){

            case "text":
                setInvalidInputs(prev =>({...prev, [`${e.target.name}`]:"This field is required"}))

                break;

            case "tel":
                
                if(e.target.value){
                    setInvalidInputs(prev =>({...prev,[`${e.target.name}`]:"Enter valid telephone number"}))
                }
                else{

                    setInvalidInputs(prev =>({...prev,[`${e.target.name}`]:"This field is required"}));


                }
                break;

            case "email":
                if(e.target.value){
                    setInvalidInputs(prev =>({...prev,[`${e.target.name}`]:"Enter valid email"}))


                }
                else{

                    setInvalidInputs(prev =>({...prev,[`${e.target.name}`]:"This field is required"}));


                }
                break;
            case "url":
                setInvalidInputs(prev =>({...prev,[`${e.target.name}`]:"Enter valid url"}));
                break;
            default:
                return;
                
                


        }

    }

    const handleInvalid = (e) =>
    {
        
        e.preventDefault();
       
        if(!formRef.current)return;
        if(e.target === formRef.current.querySelector(":invalid")){
            let scrollToNode = getNthParent(e.target, 4);
            scrollToNode.scrollIntoView();
        }
        switch(e.target.type){

            case "text":
                setInvalidInputs(prev =>({...prev, [`${e.target.name}`]:"This field is required"}))
                break;
            case "tel":
                if(e.target.value){
                    setInvalidInputs(prev =>({...prev,[`${e.target.name}`]:"Enter valid telephone number"}))
                }
                else{

                    setInvalidInputs(prev =>({...prev,[`${e.target.name}`]:"This field is required"}));


                }
                break;
            case "email":
                if(e.target.value){
                    setInvalidInputs(prev =>({...prev,[`${e.target.name}`]:"Enter valid email"}))


                }
                else{

                    setInvalidInputs(prev =>({...prev,[`${e.target.name}`]:"This field is required"}));


                }
                break;
            case "select-one":
                setInvalidInputs(prev => ({...prev,[`${e.target.id}`]:"select country from drop down"}));
                break;

            case "url":
                setInvalidInputs(prev =>({...prev,[`${e.target.name}`]:"Enter valid url"}));
                break;
            default:
                return;



        }
    }



    return (
        <>
            <main className={`min-h-screen border-black/[.1] pb-[40px] ${AppSubmitted ? "h-screen overflow-hidden": ""}`}>
                {AppSubmitted && (
                    <Fragment>
                        <div className="absolute w-screen h-screen bg-black/[.4] backdrop-blur-sm"></div>
                        <div className="absolute w-[85%]  max-w-[650px] h-fit py-5 left-[50%] bg-[#18181b] translate-x-[-50%] top-[50%] translate-y-[-50%]">

                            {Success ? (
                                    <div className="text-center">
                                       <FontAwesomeIcon  icon={faCircleCheck} className="w-[40px] h-[40px] text-[#01e2c2] mx-auto" ></FontAwesomeIcon>
                                       <div className="text-white md:text-[1.2rem] mt-[80px] mb-5">We have received your application</div>
                                       <Link href="/" className="text-white w-fit text-[1.2rem] underline decoration-[3px] underline-offset-4 font-semibold uppercase">
                                            home
                                        </Link>                                  
                                    </div>
                            ): Error ? (
                                <div className="text-center">
                                    <FontAwesomeIcon  icon={faCircleXmark} className="w-[40px] h-[40px] text-[#01e2c2] mx-auto" ></FontAwesomeIcon>
                                    <div className="text-white md:text-[1.2rem] mt-[80px] mb-5">Something went wrong. Try again later.</div>
                                    <Link href="/" className="text-white w-fit text-[1.2rem] underline decoration-[3px] underline-offset-4 font-semibold uppercase">
                                        home
                                    </Link>


                                </div>
                            ):(
                                <div className="text-center py-[80px] px-[40px] shadow-md bg-[#18181b]">
                                    <div className="app_loader mx-auto"></div>
                                    <div className="text-white md:text-[1.2rem] mt-[80px] mb-5">Please stand by while your application is processed...</div>
                                    


                                </div>
                            )}
                            
                        </div>
                    </Fragment>
                )}
                <div className="bg-black px-[40px] py-[80px]">
                    <h1 className="font-bold text-white text-[1.728rem] md:text-[2.074rem] text-center">Complete your affiliate application</h1>
                </div>
                <div className="mt-[-40px] lg:mt-[-20px] bg-white w-[95%] md:w-[85%] xl:w-[70%] 2xl:w-[50%] mx-auto">
                    <form id="affiliateApp" method="POST" onSubmit={e => handleSubmit(e)} ref={formRef}>
                        <div className="border-[1px]">
                            <div className="px-5 border-b-[1px] py-2">
                                <h2 className="text-[1.2rem] font-bold">About Restaurant</h2>

                            </div>
                            <div className="p-5 grid md:grid-cols-2 gap-x-5 lg:gap-x-0 gap-y-5  text-[0.833rem]">
                                <div className="lg:w-fit">
                                    <p className="font-bold">Restaurant name<span className="text-red-600">*</span></p>
                                    <input className={`mt-2 w-full lg:w-[350px] px-2  border-[1px] ${invalidInputs["restaurantName"] ? "border-red-600 border-[1.2px]":""}`}
                                            name="restaurantName"
                                            type="text"
                                            value={formValues?.restaurantName || ""}
                                            onChange={(e)=> handleInput(e)}
                                        
                                            onInvalid={e => handleInvalid(e)}
                                            required
                                        
                                    ></input>
                                    <div className="text-red-600 mt-2 text-[0.693rem]">{invalidInputs["restaurantName"]}</div>


                                </div>
                                <div className="mt-5 md:mt-0 lg:w-fit">
                                    <p className="font-bold">Owner/Manager name<span className="text-red-600">*</span></p>
                                    <input className={`mt-2 w-full lg:w-[350px] outline-black border-[1px] ${invalidInputs["owner_or_manager_name"] ? "border-red-600 border-[1.2px]":""}`}
                                        name="owner_or_manager_name"
                                        type="text"
                                        value={formValues?.owner_or_manager_name || ""}
                                        onChange={(e)=> handleInput(e)}
                                        onInvalid={(e)=> handleInvalid(e)}
                                        required
                                    ></input>
                                    <div className="text-red-600 mt-2 text-[0.693rem]">{invalidInputs["owner_or_manager_name"]}</div>

                                </div>
                                <div className="mt-5 md:mt-0 lg:w-fit">
                                    <p className="font-bold">Cuisine type<span className="text-red-600">*</span></p>
                                    <input className={`mt-2 w-full lg:w-[350px] outline-black border-[1px] ${invalidInputs["cuisineType"] ? "border-red-600 border-[1.2px]":""}`}
                                            name="cuisineType"
                                            type="text"
                                            value={formValues?.cuisineType || ""}
                                            onChange={(e)=> handleInput(e)}
                                            onInvalid={(e)=> handleInvalid(e)}
                                            required
                                    ></input>
                                    <div className="text-red-600 mt-2 text-[0.693rem]">{invalidInputs["cuisineType"]}</div>

                                    <div className="mt-2 lg:w-[350px] text-black/[.4] text-[0.693rem]">
                                        A qualitative description detailing the culinary background of your restaurant.For example: Mexican; Italian etc.
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="border-[1px] mt-[40px]">
                            <div className="px-5 border-b-[1px] py-2">
                                <h2 className="text-[1.2rem] font-bold">Address</h2>

                            </div>
                            <div className="p-5 text-[0.833rem] grid md:grid-cols-2 gap-x-5 lg:gap-x-0 gap-y-5">
                                <div className="lg:w-fit">
                                    <label className="font-bold">Country<span className="text-red-600">*</span></label>
                                    <div className={`mt-2 lg:w-fit border-[#d5d9d9] border-[1px] ${invalidInputs["country"] ? "border-red-600 border-[1.2px]":""}`}>
                                        <select id="country"  className="px-2 w-full  lg:w-[350px] bg-#[f3f0f3]" onChange={e => handleSelect(e)}  onInvalid={e => handleInvalid(e)} required>
                                            <option value="" selected disabled hidden>select</option>
                                            <option value="GB">england</option>
                                            <option>england</option>
                                            <option>england</option>
                                            <option>england</option>
                                        </select>

                                        <input type="hidden"
                                                name="country"
                                                value={formValues?.country || ""}
                                                ></input>
                                        
                                    </div>
                                    <div className="text-red-600 mt-2 text-[0.693rem]">{invalidInputs["country"]}</div>

                            
                                </div>
                                <div className="mt-5 md:mt-0 lg:w-fit">
                                    <label className="font-bold block">Address line 1<span className="text-red-600">*</span></label>
                                    <input className={`border-[1px] mt-2 w-full lg:w-[350px] ${invalidInputs["address_line_one"] ? "border-red-600 border-[1.2px]":""}`}
                                            name="address_line_one"
                                            type="text"
                                            value={formValues?.address_line_one|| ""}
                                            onChange={(e)=> handleInput(e)}
                                            onInvalid={(e)=> handleInvalid(e)}
                                            required
                                            ></input>
                                    <div className="text-red-600 mt-2 text-[0.693rem]">{invalidInputs["address_line_one"]}</div>

                            
                                </div>
                                <div className="mt-5 md:mt-0 lg:w-fit">
                                    <label className="font-bold block">Address line 2</label>
                                    <input className="border-[1px] mt-2 w-full lg:w-[350px]"
                                            name="address_line_two"
                                            type="text"
                                            value={formValues?.address_line_two || ""}
                                            onChange={(e)=> handleInput(e)}></input>
                            
                                </div>
                                <div className="mt-5 md:mt-0 lg:w-fit">
                                    <label className="font-bold block">Address line 3</label>
                                    <input className="border-[1px] mt-2 w-full lg:w-[350px]"
                                            name="address_line_three"
                                            type="text"
                                            value={formValues?.address_line_three || ""}
                                            onChange={(e)=> handleInput(e)}></input>
                            
                                </div>
                                <div className="mt-5 md:mt-0 lg:w-fit">
                                    <label className="font-bold block">City<span className="text-red-600">*</span></label>
                                    <input className={`border-[1px] mt-2 w-full lg:w-[350px] ${invalidInputs["city"] ? "border-red-600 border-[1.2px]":""}`}
                                            name="city"
                                            type="text"
                                            value={formValues?.city || ""}
                                            onChange={(e)=> handleInput(e)}
                                            onInvalid={(e)=> handleInvalid(e)}
                                            required
                                            ></input>
                                    <div className="text-red-600 mt-2 text-[0.693rem]">{invalidInputs["city"]}</div>

                            
                                </div>
                                <div className="mt-5 md:mt-0 lg:w-fit">
                                    <label className="font-bold block">State,Province or Region<span className="text-red-600">*</span></label>
                                    <input className={`border-[1px] mt-2 w-full lg:w-[350px] ${invalidInputs["state_province_region"] ? "border-red-600 border-[1.2px]":""}`}
                                            name="state_province_region"
                                            type="text"
                                            value={formValues?.state_province_region|| ""}
                                            onChange={(e)=> handleInput(e)}
                                            onInvalid={(e)=> handleInvalid(e)}
                                            required
                                            ></input>
                                    <div className="text-red-600 mt-2 text-[0.693rem]">{invalidInputs["state_province_region"]}</div>

                            
                                </div>
                                <div className="mt-5 md:mt-0 lg:w-fit">
                                    <label className="font-bold block">ZIP or Postal code<span className="text-red-600">*</span></label>
                                    <input className={`border-[1px] mt-2 w-full lg:w-[350px] ${invalidInputs["zipCode"] ? "border-red-600 border-[1.2px]":""}`}
                                            name="zipCode"
                                            type="text"
                                            value={formValues?.zipCode|| ""}
                                            onChange={(e)=> handleInput(e)}
                                            onInvalid={(e)=> handleInvalid(e)}
                                            required
                                            
                                            ></input>
                                    <div className="text-red-600 mt-2 text-[0.693rem]">{invalidInputs["zipCode"]}</div>

                            
                                </div>
                                
                            </div>


                        </div>
                        <div className="mt-[40px] border-[1px]">
                            <div className="py-2 px-5 border-b-[1px]">
                                <h2 className="text-[1.2rem] font-bold">Contact</h2>
                            </div>
                            <div className="p-5 text-[0.833rem]">
                                <div className="">
                                    <label className="block font-bold">Mobile number<span className="text-red-600">*</span></label>
                                    <div className="mt-2">
                                        <select id="countryCode" onChange={e => handleSelect(e)} onInvalid={e=>handleInvalid(e)} className="inline-block px-2">
                                            <option value="" hidden selected disabled>Select</option>
                                        </select>
                                        <input type="hidden" name="countryCode" value={formValues?.countryCode || ""}/>
                                        <input className={`inline-block lg:w-[350px] ml-3 border-[1px] px-2 placeholder:text-[0.693rem] placeholder:text-black/[.4] ${invalidInputs["mobileNumber"] ? "border-red-600 border-[1.2px]":""}`}
                                                name="mobileNumber"
                                                placeholder="ex: 555 123 4567"
                                                value={formValues?.mobileNumber || ""}
                                                onChange={(e)=> handleInput(e)}
                                                onInvalid={e => handleInvalid(e)}
                                                type="tel"
                                                pattern="[0-9]{10,11}"
                                                required
                                        />

                                    </div>
                                    <div className="text-red-600 mt-2 text-[0.693rem]">{invalidInputs["mobileNumber"]}</div>
                                </div>
                                <div className="mt-5 grid md:grid-cols-2 gap-x-5 lg:gap-x-0 gap-y-5">
                                    <div className="mt-5 md:mt-0">
                                        <label className="block font-bold">Owner/Manager E-Mail<span className="text-red-600">*</span></label>
                                        <input className={`px-2 mt-2 w-full lg:w-[350px] border-[1px] ${invalidInputs["email"] ? "border-red-600 border-[1.2px]":""}`}
                                                name="email"
                                                value={formValues?.email|| ""}
                                                onChange={(e)=> handleInput(e)}
                                                onInvalid={e => handleInvalid(e)}
                                                type="email"
                                                required
                                        />
                                        <div className="text-red-600 mt-2 text-[0.693rem]">{invalidInputs["email"]}</div>


                                    </div>
                                    <div className="mt-5 md:mt-0">
                                        <label className="block font-bold">Website</label>
                                        <input className={`mt-2 px-2 w-full lg:w-[350px] border-[1px] placeholder:text-[0.693rem] placeholder:text-black/[.4] ${formValues["siteUrl"] ? "border-red-600 border-[1.2px]":""}`}
                                                name="siteUrl"
                                                placeholder="ex: https://foobar.org"
                                                value={formValues?.siteUrl || ""}
                                                onChange={(e)=> handleInput(e)}
                                                onInvalid={(e)=> handleInvalid(e)}
                                                type="url"
                                                pattern="https://.*"
                                        />
                                        <div className="mt-2 text-red-600 text-[0.693rem]">{invalidInputs["siteUrl"]}</div>
                                    </div>
                                    <div className="mt-5 md:mt-0">
                                        <label className="block font-bold">Instagram</label>
                                        <input className="mt-2 px-2 w-full lg:w-[350px] border-[1px]"
                                                name="instagramHandle"
                                                value={formValues?.instagramHandle|| ""}
                                                onChange={(e)=> handleInput(e)}
                                                type="text"

                                        />

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-[40px] border-[1px]">
                            <div className="px-5 py-2 border-b-[1px]">
                                <h2 className="text-[1.2rem] font-bold">Discount</h2>
                            </div>

                            <div className="p-5 grid md:grid-cols-2 gap-x-5 lg:gap-x-0 text-[0.833rem]">
                                <div>
                                    <fieldset id="discount" onChange={(e) => {handleSelect(e)}}>
                                        <legend className="font-bold">What discount would you like to offer ?<span className="text-red-600">*</span></legend>
                                        <input className="mt-5 cursor-pointer" type="radio" id="5pc" name="discount" value="5" defaultChecked/>
                                        <label className="font-bold ml-3"  for="5pc">5%</label>
                                        <input className="mt-5 ml-5 cursor-pointer" type="radio" id="10pc" name="discount" value="10"/>
                                        <label className="font-bold ml-3"  for="10pc">10%</label>
                                        <input className="mt-5 ml-5 cursor-pointer" type="radio" id="15pc" name="discount" value="15"/>
                                        <label className="font-bold ml-3"  for="15pc">15%</label>
                                        <input className="mt-5 ml-5 cursor-pointer" type="radio" id="20pc" name="discount" value="20"/>
                                        <label className="font-bold ml-3"  for="20pc">20%</label>
                                    </fieldset>
                                    <input type="hidden" name="dicount" value={formValues?.discount || "5"}/>
                                    
                                </div>
                                <div className="mt-5 md:mt-0">
                                    <label for="supplimentaryInfo" className="font-bold block">Further details about the discount you want to offer</label>
                                    <textarea form="affiliateApp" id="supplimentaryInfo" name="supplimentaryInfo" className="mt-2 w-full lg:w-[350px] border-[1px] p-2" maxLength={1022} rows="5" onChange={e => handleInput(e)} value={formValues?.supplimentaryInfo||""}></textarea>
                                    <p className="text-black/[.4] mt-2 text-[.693rem]">Ex: discount exclusive to dining-in orders</p>
                                </div>
                            </div>
                        </div>
                        <div className="text-end mt-[40px]">
                            <button type="submit" className="py-2 bg-[#01e2c2] px-3 tracking-[.08rem]  font-[500] uppercase">submit</button>
                        </div>

                    </form>
                </div>

            </main>
            <Footer/>
        </>


    


    )

}

export async function getServerSideProps({req,res}){

    res.setHeader()

}



export default Application;