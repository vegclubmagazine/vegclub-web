
import { API,GIVEAWAY_APIKEY,GIVEAWAY_FORMID } from "../config/api";
import Layout from "../defaults/Layout";
import { FaGift } from "react-icons/fa6";
import {useState, useEffect, useRef, Fragment} from "react";
import { getNthParent } from "../lib/utils";
import { faCircleCheck, faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";


const Giveaway = ({})=>
{
    const [formValues, setFormValues] = useState({});
    const [invalidInputs, setInvalidInputs] = useState({});
    const [loading, setLoading] = useState(false);
    const [AppSubmitted, setAppSubmitted] = useState(false);
    const [Error, setError] = useState(false);
    const [Success, setSuccess] = useState(false);
    const formRef = useRef(null);


    const handleSubmit = async(e)=>
    {
            const uri = 'https://api.convertkit.com/v3/forms';

            e.preventDefault();
            setAppSubmitted(true);
            setLoading(true);


            fetch(`${uri}/${GIVEAWAY_FORMID}/subscribe`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    api_key:GIVEAWAY_APIKEY,
                    email:formValues['email'],
                    first_name:formValues['name'],
                    fields:{
                        last_name:formValues['surname'],
                        city:formValues['city']

                    }

                })
            })
            .then((res)=>{
                if(res.ok){
                    return res.json()
    
                }
                throw res;
            })
            .then(({data})=>{
               
                setLoading(false);
                setError(false);
                setSuccess(true);
                
            })
            .catch((err)=>
            {
                setLoading(false);
                setError(true);
                setSuccess(false);
                if(err instanceof TypeError){
                    console.log(err)
                    
                }
                else{
                    err.json().then((body)=>{
                        console.log(body)
                        
                    })
                }
            })

           
          
         
    
            /*fetch(`${API}/giveaways`, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    Accept:"application/json"
                },
               
                body:JSON.stringify({data:formValues})
            })
            .then((res)=>{
                if(res.ok){
                    return res.json()
    
                }
                throw res;
            })
            .then(({data})=>{
               
                setLoading(false);
                setError(false);
                setSuccess(true);
                
            })
            .catch((err)=>
            {
                setLoading(false);
                setError(true);
                setSuccess(false);
                if(err instanceof TypeError){
                    console.log(err)
                    
                }
                else{
                    err.json().then((body)=>{
                        console.log(body)
                        
                    })
                }
            })*/
        
    
          
    
           
            
    }

    const handleFormInput = (e)=>{
        if(!e.target.validity.valid){
            handleClientInvalid(e);

        }
        else{
            setInvalidInputs((prev)=>({...prev,[`${e.target.name}`]: ""}));
        }

        setFormValues((prev)=>({...prev, [`${e.target.name}`]: e.target.value}))

    }
    const handleClientInvalid = (e)=>{
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
    const handleInvalid = (e)=>{

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
                if(e.target.id === "country"){
                    setInvalidInputs(prev => ({...prev,[`${e.target.id}`]:"select country from drop down"}));
                }
                else{
                    setInvalidInputs(prev => ({...prev,[`${e.target.id}`]:"select dial code from drop down"}));


                }
                break;

            case "url":
                setInvalidInputs(prev =>({...prev,[`${e.target.name}`]:"Enter valid url"}));
                break;
            case "textarea":
               
                setInvalidInputs(prev => ({...prev, [`${e.target.name}`]:"This field is required"}))
                break;
            case "file":
                setInvalidInputs(prev =>({...prev,[`${e.target.name}`]:`selected file (${e.target.files[0].name}) is invalid. File must be no larger than 5MB and of png/jpeg type file-type:${e.target.files[0].type} file-size:${returnFileSize(e.target.files[0].size)}`}))
                break;
            default:
                return;



        }

    }
    return (
        <Layout backgroundColor={"#f3f3f3"} title="Giveaway | VegClub Magazine">
           
                <div className=" w-screen relative min-h-screen">

                    {AppSubmitted && (
                        <Fragment>
                            <div className="absolute left-0 top-0 w-screen  h-full bg-black/[.4] backdrop-blur-sm"></div>
                            <div className="absolute w-[85%]  max-w-[650px] h-fit py-5 left-[50%] bg-[#18181b] translate-x-[-50%] top-[50%] translate-y-[-50%] rounded-[12px]">

                                {Success ? (
                                        <div className="text-center py-[40px] px-[40px]">
                                        <FontAwesomeIcon  icon={faCircleCheck} className="w-[40px] h-[40px] text-[#01e2c2] mx-auto" ></FontAwesomeIcon>
                                        <div className="text-white md:text-[1.2rem] mt-[40px] mb-5">We've received your application, an email has been sent to you!</div>
                                        <Link href="/" className="text-white w-fit text-[1.2rem] underline decoration-[3px] underline-offset-4 font-semibold uppercase">
                                                home
                                            </Link>                                  
                                        </div>
                                ): Error ? (
                                    <div className="text-center py-[40px] px-[40px]">
                                        <FontAwesomeIcon  icon={faCircleXmark} className="w-[40px] h-[40px] text-[#01e2c2] mx-auto" ></FontAwesomeIcon>
                                        <div className="text-white md:text-[1.2rem] mt-[40px] mb-5">Something went wrong. Try again later.</div>
                                        <Link href="/" className="text-white w-fit text-[1.2rem] underline decoration-[3px] underline-offset-4 font-semibold uppercase">
                                            home
                                        </Link>


                                    </div>
                                ):(
                                    <div className="text-center py-[40px] px-[40px] shadow-md bg-[#18181b]">
                                        <div className="app_loader mx-auto"></div>
                                        <div className="text-white md:text-[1.2rem] mt-[40px] mb-5">Please stand by while your application is processed...</div>
                                        


                                    </div>
                                )}
                                
                            </div>
                    </Fragment>
                    )}
                    <div className="px-[20px] lg:px-[40px] xl:w-[80%]  mx-auto py-[40px]">
                        <div className="w-full rounded-[30px] py-[20px] bg-[linear-gradient(to_bottom,_rgba(121,233,255,100)_20%,_rgba(1,226,194,100%))] text-center">
                            <FaGift style={{clipPath:"rect(0px 100% 75% 0px)"}} className="text-black text-[1.2rem] lg:text-[2.488rem] mx-auto"></FaGift>
                            <p className="text-[1rem] mt-2 font-normal uppercase">compete for our</p>
                            <h1 className="text-[1.728rem] mt-2 md:text-[2.074rem]  font-bold">
                                <p>Vegan hamper</p>
                                <p>Giveaway.</p>
                            </h1>


                        </div>
                       
                       <div className="mt-[20px] bg-white rounded-[30px] shadow-md p-[20px]">
                            <form id="giveAwayApp" onSubmit={(e)=>handleSubmit(e)} ref={formRef} method="POST" encType="multipart/form-data" className="md:w-[400px] mx-auto">
                                <label for="name" className="block font-semibold text-[1rem]">Name</label>
                                <input 
                                    className={`w-full leading-[2.4] mt-3 placeholder:text-[.833rem] placeholder:text-black/[.6] border-[1px] border-black/[.1] rounded-[12px] text-[1rem] px-[8px] ${invalidInputs["name"] ? "border-red-600 border-[1.2px]":""}`}
                                    placeholder="name"
                                    value={`${formValues?.name || ""}`}
                                    onChange={(e) => handleFormInput(e)}
                                    type="text"
                                    onInvalid={(e) => handleInvalid(e)}
                                    name="name"
                                    required

                                />
                                <div className="text-red-600 mt-2 text-[0.693rem]">{invalidInputs["name"]}</div>

                                <label for="surname" className="mt-5 block font-semibold text-[1rem]">Surname</label>
                                <input 
                                    className={`w-full leading-[2.4] mt-3 placeholder:text-[.833rem] placeholder:text-black/[.6] border-[1px] border-black/[.1] rounded-[12px] text-[1rem] px-[8px] ${invalidInputs["surname"] ? "border-red-600 border-[1.2px]":""}`}
                                    placeholder="surname"
                                    value={`${formValues?.surname || ""}`}
                                    onChange={(e) => handleFormInput(e)}
                                    type="text"
                                    onInvalid={(e)=>handleInvalid(e)}
                                    name="surname"
                                    required

                                />
                                <div className="text-red-600 mt-2 text-[0.693rem]">{invalidInputs["surname"]}</div>

                                <label for="city" className="mt-5 block font-semibold text-[1rem]">City</label>
                                <input 
                                    className={`w-full leading-[2.4] mt-3 placeholder:text-[.833rem] placeholder:text-black/[.6] border-[1px] border-black/[.1] rounded-[12px] text-[1rem] px-[8px] ${invalidInputs["city"] ? "border-red-600 border-[1.2px]":""}`}
                                    placeholder="city"
                                    value={`${formValues?.city || ""}`}
                                    onChange={(e) => handleFormInput(e)}
                                    type="text"
                                    onInvalid={(e) => handleInvalid(e)}
                                    name="city"
                                    required

                                />
                                <div className="text-red-600 mt-2 text-[0.693rem]">{invalidInputs["city"]}</div>

                                <label for="email" className="mt-5 block font-semibold text-[1rem]">E-mail</label>

                                <input 
                                    className={`w-full leading-[2.4] mt-3 placeholder:text-[.833rem] placeholder:text-black/[.6] border-[1px] border-black/[.1] rounded-[12px] text-[1rem] px-[8px] ${invalidInputs["email"] ? "border-red-600 border-[1.2px]":""}`}
                                    placeholder="E-mail"
                                    value={`${formValues?.email || ""}`}
                                    onChange={(e) => handleFormInput(e)}
                                    type="email"
                                    onInvalid={(e)=>handleInvalid(e)}
                                    name="email"
                                    required

                                />
                                <div className="text-red-600 mt-2 text-[0.693rem]">{invalidInputs["email"]}</div>

                                <button type="submit" className=" mt-[40px] block bg-[#01e2c2] py-2 px-3 rounded-[12px] text-[.833rem] tracking-[.018em] uppercase">submit</button>
                            </form>
                        </div>
                    </div>

                </div>

                
            
        </Layout>
    )

}


export default Giveaway;
