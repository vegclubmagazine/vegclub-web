import Footer from "../components/Footer";
import { getNthParent } from "../lib/utils";
import { faCircleCheck, faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useRef,useState,useEffect,Fragment, useCallback} from "react";
import Link from "next/link";
import { API } from "../config/api";



const AwardApp = ({countries})=>
{
    const [Loading, setLoading] = useState(true);
    const [Error, setError] = useState(false);
    const [AppSubmitted, setAppSubmitted] = useState(false);
    const [Success, setSuccess] = useState(false)
    const [formValues, setFormValues] = useState({});
    const [invalidInputs, setInvalidInputs] = useState({});
    const [wordCount, setWordCount] = useState(0);
    const [refId,setRefId] = useState(null);
    const formRef = useRef(null);
    const submitRef = useRef(null);
    const uploadRef = useRef(null);
    const previewRef = useRef(null);
    const file_types = ["image/png","image/jpeg"];
    

    useEffect(()=>
    {
        
        setFormValues(prev =>({...prev,["offerings"]:"100% vegan"}))
    },[])
    const checkWordCountExceeded = (words) =>
    {
        let regex = /\w+/g;
        
        let word_count = words.match(regex) ? words.match(regex).length: 0;
        if(word_count > 150) return {word_count: 150, exceeded:true};
        return {word_count: word_count, exceeded:false};

    }
    const handleKeyEvt = (e) =>
    {
        if(e.keyIdentifier =="U+000A" || e.keyIdentifier == "Enter" || e.keyCode == 13){
            e.preventDefault();
            return;
        }
    }
    const handleSubmit = async(e)=>
    {
        e.preventDefault();
        setAppSubmitted(true);
        setLoading(true);
       
      
     

        fetch(`${API}/contestants`, {
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
           
            setRefId(data?.id);
            
        })
        .catch((err)=>
        {
            setLoading(false);
            setError(true);
            if(err instanceof TypeError){
                console.log(err)
                
            }
            else{
                err.json().then((body)=>{
                    console.log(body)
                    
                })
            }
        })
    

      

       
        
    }
    useEffect(()=>{
        if(refId && uploadRef.current && uploadRef.current.files){

            
           
            const formData = new FormData();
           
         
            formData.append("files", uploadRef.current.files[0]);
            formData.append("ref", "api::contestant.contestant");
            formData.append("refId", `${refId}`);
            formData.append("field", "logo");


            fetch(`${API}/upload`,{
                method:"POST",
               
                body:formData
            })
            .then((res)=>{
                if(res.ok){
                    return res.json();
                }

                throw res;
            })
            .then((data)=>{
                setLoading(false);
                setSuccess(true);
            })
            .catch((err)=>{
                setLoading(false);
                setError(true);
                if(err instanceof TypeError){
                    console.log(err);
                }
                else{
                    err.json().then((bdy)=>{
                        console.log(bdy);
                    })
                }
            })





        }

    },[refId])

    const returnFileSize = (number)=>
    {
        if(number < 1024){
            return `${number} bytes`;
        }
        else if(number >= 1024 && number < 1048576){
            return `${(number / 1024).toFixed(1)} KB`;

        }
        else{
            return `${(number/1048576).toFixed(1)} MB`;
        }
    }

    const validFileType = (file) =>
    {
        if(!file_types.includes(file.type) || file.size > (5 * 1048576))return false;

        return true;
    }

    const handleChange = (e)=>
    {

       
        
        if(!previewRef.current) return;
        
        setInvalidInputs(prev => ({...prev,[`${e.target.name}`]:``}));
       

        while(previewRef.current.firstChild)
        {
            previewRef.current.removeChild(previewRef.current.firstChild);
        }

        

        if(!e.target.files.length){

            let para = document.createElement("p");
            para.textContent = "No files currently selected for upload";

            previewRef.current.appendChild(para);
            
            setInvalidInputs(prev => ({...prev,[`${e.target.name}`]:"No files currently selected for upload"}));
        }
        else
        {
            if(validFileType(e.target.files[0])){
                e.target.setCustomValidity("");
                const img = document.createElement("img");
                img.src = URL.createObjectURL(e.target.files[0]);
                img.alt = img.title = e.target.files[0].name;
                img.style.height = "80px";
                img.onload = () => {
                    URL.revokeObjectURL(img.src);
                };

                previewRef.current.appendChild(img);
                
            }
            else{

                e.target.setCustomValidity(`selected file (${e.target.files[0].name}) is invalid. File must be no larger than 5MB and of png/jpeg type file-type:${e.target.files[0].type} file-size:${returnFileSize(e.target.files[0].size)}`
                );
                
                let para = document.createElement("p");
                para.textContent = `selected file (${e.target.files[0].name}) is invalid. File must be no larger than 5MB and of png/jpeg type \n
                 file-type:${e.target.files[0].type} \n
                 file-size:${returnFileSize(e.target.files[0].size)}`;
                previewRef.current.appendChild(para);
                
            }
        }
    }
    
    const handleSelect = (e) =>
    {
        
        setFormValues(prev =>({...prev,[`${e.target.id}`]:e.target.value}));
        setInvalidInputs(prev =>({...prev,[`${e.target.id}`]:""}));
    }
    const handleTextAreaInput = (e)=>
    {
        
        
      


        let {word_count, exceeded} = checkWordCountExceeded(e.target.value);
        
        

        if(exceeded){
            e.target.setCustomValidity("word count exceeded");

            return;
        }
        e.target.setCustomValidity("");
        setWordCount(word_count);
            
        
       
       
        
        setFormValues(prev =>({...prev, [`${e.target.name}`]:e.target.value}));
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
        console.log(e.target.type);
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
        <>
            <div className={`min-h-screen border-black/[.1]  pb-[40px] ${AppSubmitted ? "h-screen overflow-hidden":""}`}>
                {AppSubmitted && (
                    <Fragment>
                        <div className="absolute w-screen h-screen bg-black/[.4] backdrop-blur-sm"></div>
                        <div className="absolute w-[85%]  max-w-[650px] h-fit py-5 left-[50%] bg-[#18181b] translate-x-[-50%] top-[50%] translate-y-[-50%]">

                            {Success ? (
                                    <div className="text-center py-[40px] px-[40px]">
                                       <FontAwesomeIcon  icon={faCircleCheck} className="w-[40px] h-[40px] text-[#01e2c2] mx-auto" ></FontAwesomeIcon>
                                       <div className="text-white md:text-[1.2rem] mt-[40px] mb-5">We have received your application</div>
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

                <div className="bg-black px-[40px] py-[80px]">
                    <h1 className="font-bold text-white text-[1.728rem] md:text-[2.074rem] text-center">VegClub Awards 2024</h1>
                </div>
                <main className="mt-[-40px] lg:mt-[-20px] bg-white w-[95%] md:w-[85%] xl:w-[70%] 2xl:w-[50%] mx-auto">
                    <form id="awardApp" encType="multipart/form-data" method="POST" onSubmit={(e)=>handleSubmit(e)} ref={formRef}>
                        <section className="border-[1px]">
                            <div className="border-b-[1px] px-5 py-2">
                                <h1 className="text-[1.2rem] font-bold">About Restaurant</h1>
                            </div>
                            <div className="p-5 grid md:grid-cols-2 gap-x-5 lg:gap-x-0 gap-y-5  text-[0.833rem]">
                                <div className="lg:w-fit">
                                    <p className="font-bold">Eatery name<span className="text-red-600">*</span></p>
                                    <input className={`mt-2 w-full lg:w-[350px] px-2  border-[1px] ${invalidInputs["eateryName"] ? "border-red-600 border-[1.2px]":""}`}
                                            name="eateryName"
                                            type="text"
                                            value={formValues?.eateryName || ""}
                                            onChange={(e)=> handleInput(e)}
                                        
                                            onInvalid={e => handleInvalid(e)}
                                            required
                                        
                                    ></input>
                                    <div className={`mt-2 lg:w-[350px] text-[.693rem] ${invalidInputs["eateryName"] ? "text-red-600":"text-black/[.4]"}`}>{invalidInputs["eateryName"] || "Please enter the full name of your restaurant."}</div>


                                </div>
                                <div className="mt-5 md:mt-0 lg:w-fit">
                                    <p className="font-bold">Cuisine type<span className="text-red-600">*</span></p>
                                    <input className={`mt-2 px-2 w-full lg:w-[350px] outline-black border-[1px] ${invalidInputs["cuisineType"] ? "border-red-600 border-[1.2px]":""}`}
                                            name="cuisineType"
                                            type="text"
                                            value={formValues?.cuisineType || ""}
                                            onChange={(e)=> handleInput(e)}
                                            onInvalid={(e)=> handleInvalid(e)}
                                            required
                                    ></input>

                                    <div className={`mt-2 lg:w-[350px] ${invalidInputs["cuisineType"] ? "text-red-600":"text-black/[.4]"} text-[0.693rem]`}>
                                        {invalidInputs["cuisineType"] || "Describe the primary cuisine served (e.g., Italian, Asian, Fusion)."}
        
                                    </div>
                                </div>
                                <div className="mt-5 md:mt-0 lg:w-fit">
                                    <fieldset id="offerings" onChange={(e) => {handleSelect(e)}}>
                                        <legend className="font-bold">Vegan offerings<span className="text-red-600">*</span></legend>
                                        <input className="mt-5 cursor-pointer" type="radio" id="100pc" name="offerings" value="100% vegan" defaultChecked/>
                                        <label className="font-bold ml-3"  for="100pc">100% Vegan </label>
                                        <input className="mt-5 ml-5 cursor-pointer" type="radio" id="hybrid" name="offerings" value="non-vegan with vegan options"/>
                                        <label className="font-bold ml-3"  for="hybrid">Non-vegan with vegan options</label>
                                       
                                    </fieldset>
                                    <input type="hidden" name="offerings" value={formValues?.offerings || "100% Vegan"}/>
                                    
                                </div>
                                <div className="mt-5 md:mt-0 lg:w-fit">
                                    <p className="font-bold">Logo of the restaurant</p>
                                    <label className={`mt-3 w-fit block ${invalidInputs["logo"] ? "border-red-600 border-[1.25px]":"border-black/[.1] border-[1px]"} px-2 bg-[#d5d9d9] cursor-pointer`} for="logo">browse...</label>
                                    <input ref={uploadRef} className="hidden" type="file" id="logo" name="logo" accept="image/png, image/jpeg" onChange={(e)=>{handleChange(e)}} onInvalid={(e)=>{handleInvalid(e)}}/>
                                    <div ref={previewRef} className={`mt-2 text-[.693rem] ${invalidInputs["logo"] ?"text-red-600":"text-black/[.4]"} `}>
                                       <p>No files currently selected for upload</p>
                                    </div>
                                </div>


                            </div>
                        </section>
                        <section className="mt-[40px] border-[1px]">
                        <div className="px-5 border-b-[1px] py-2">
                                <h2 className="text-[1.2rem] font-bold">Address</h2>

                            </div>
                            <div className="p-5 text-[0.833rem] grid md:grid-cols-2 gap-x-5 lg:gap-x-0 gap-y-5">
                                <div className="lg:w-fit">
                                    <label className="font-bold">Country<span className="text-red-600">*</span></label>
                                    <div className={`mt-2 lg:w-fit border-[#d5d9d9] border-[1px] ${invalidInputs["country"] ? "border-red-600 border-[1.2px]":""}`}>
                                        <select id="country"  className={`px-2 w-full  lg:w-[350px] bg-#[f3f0f3]`} onChange={e => handleSelect(e)}  onInvalid={e => handleInvalid(e)} required>
                                            <option value="" selected disabled hidden>select</option>
                                            {countries && countries?.map((country) =>(
                                                <option key={country.code} value={country.name}>{country.name}</option>
                                            ))}
                                        </select>

                                        <input type="hidden"
                                                name="country"
                                                value={formValues?.country || ""}
                                                ></input>
                                        
                                    </div>
                                    <div className="text-red-600 mt-2 text-[0.693rem]">{invalidInputs["country"]}</div>

                            
                                </div>
                               
                                <div className="mt-5 md:mt-0 lg:w-fit">
                                    <label className="font-bold block">City<span className="text-red-600">*</span></label>
                                    <input className={`px-2 border-[1px] mt-2 w-full lg:w-[350px] ${invalidInputs["city"] ? "border-red-600 border-[1.2px]":""}`}
                                            name="city"
                                            type="text"
                                            value={formValues?.city || ""}
                                            onChange={(e)=> handleInput(e)}
                                            onInvalid={(e)=> handleInvalid(e)}
                                            required
                                            ></input>
                                    <div className="text-red-600 mt-2 text-[0.693rem]">{invalidInputs["city"]}</div>

                            
                                </div>
                               
                                
                                
                            </div>



                        </section>
                        <section className="mt-[40px] border-[1px]">
                            <div className="py-2 px-5 border-b-[1px]">
                                <h2 className="text-[1.2rem] font-bold">Contact</h2>
                            </div>
                            <div className="p-5 text-[0.833rem]">
                                <div className="">
                                    <label className="block font-bold">Mobile number<span className="text-red-600">*</span></label>
                                    <div className="text-red-600 mt-2 text-[0.693rem]">{invalidInputs["countryCode"]}</div>

                                    <div className={`mt-2`}>
                                        <select id="countryCode" onChange={e => handleSelect(e)} onInvalid={e=>handleInvalid(e)} className={`inline-block px-2 ${invalidInputs["countryCode"] ? "border-red-600 border-[1.2px]":""}`} required>
                                            <option value="" hidden selected disabled>Select</option>
                                            {countries && countries?.map((country) =>(
                                                <option key={country.code} value={country.dial_code}>{country.dial_code}</option>
                                            ))}
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
                                    <div className="ml-[76px] text-red-600 mt-2 text-[0.693rem]">{invalidInputs["mobileNumber"]}</div>
                                </div>
                                <div className="mt-5 grid md:grid-cols-2 gap-x-5 lg:gap-x-0 gap-y-5">
                                    <div className="mt-5 md:mt-0 lg:w-fit">
                                        <p className="font-bold">Contact person name<span className="text-red-600">*</span></p>
                                        <input className={`mt-2 w-full lg:w-[350px] px-2  border-[1px] ${invalidInputs["contactName"] ? "border-red-600 border-[1.2px]":""}`}
                                                name="contactName"
                                                type="text"
                                                value={formValues?.contactName || ""}
                                                onChange={(e)=> handleInput(e)}
                                            
                                                onInvalid={e => handleInvalid(e)}
                                                required
                                            
                                        ></input>
                                        <div className={`mt-2 lg:w-[350px] text-[.693rem] ${invalidInputs["contactName"] ? "text-red-600":"text-black/[.4]"}`}>{invalidInputs["contactName"] || "Please enter the full name of your restaurant."}</div>


                                    </div>
                                    <div className="mt-5 md:mt-0">
                                        <label className="block font-bold">E-Mail<span className="text-red-600">*</span></label>
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
                                    <div className="mt-5 md:mt-0">
                                        <label className="block font-bold">Facebook</label>
                                        <input className="mt-2 px-2 w-full lg:w-[350px] border-[1px]"
                                                name="facebookHandle"
                                                value={formValues?.facebookHandle|| ""}
                                                onChange={(e)=> handleInput(e)}
                                                type="text"

                                        />

                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="mt-[40px] border-[1px]">
                            <div className="px-5 py-2 border-b-[1px]">
                                <h1 className="text-[1.2rem] font-bold">Statement</h1>
                            </div>
                            <div className="p-5 text-[0.833rem]">
                                <div className="">
                                    <label for="statement" className="font-bold block">Why should your restaurant be considered for the award?<span className="text-red-600">*</span> </label>
                                    <textarea form="awardApp" id="statement" name="statement" className={`mt-2 w-full p-2 ${invalidInputs["statement"] ? "border-red-600 border-[1.2px]": "border-[1px]"}`}  rows="8" onChange={e => handleTextAreaInput(e)} value={formValues?.statement||""} onInvalid={(e) => handleInvalid(e)} required></textarea>
                                    <p className="mt-2 text-[.693rem] text-black/[.4]">&#40;{wordCount}/150&#41;</p>
                                    <p className={`${invalidInputs["statement"] ? "text-red-600":"text-black/[.4]"} mt-2 text-[.693rem]`}>{invalidInputs["statement"] || "Briefly describe what makes your restaurant standout (max 150 words)"}</p>
                                </div>
                                <div className="mt-5">
                                    <label for="supplimentaryInfo" className="font-bold block">Additional comments &#40;optional&#41;</label>
                                    <textarea form="awardApp" id="supplimentaryInfo" name="supplimentaryInfo" className="mt-2 w-full lg:w-[50%] border-[1px] p-2" maxLength={1022} rows="5" onChange={e => handleInput(e)} value={formValues?.supplimentaryInfo||""}></textarea>
                                    <p className="text-black/[.4] mt-2 text-[.693rem]">Any other details you'll like to share about your restaurant</p>
                                </div>
                            </div>

                        </section>

                        <div className="text-end mt-[40px]">
                            <button type="submit" className="py-2 bg-[#01e2c2] px-3 tracking-[.08rem]  font-[500] uppercase rounded-[2px]" ref={submitRef} onKeyDown={(e) => handleKeyEvt(e)}>submit</button>
                        </div>
                    </form>
                </main>

            </div>


            
            <Footer/>
        </>

    )
}

export async function getServerSideProps({req,res}){

    res.setHeader(
        "Cache-Control",
        "public", "s-maxage=604800", "stale-while-revalidate=84600"
    )
    const europeanCountryCodes = ["GB","DK","BG", "BE", "EL", "CZ","CY","AT","EE",
                 "FI","FR","DE","GR","HU","HR", "IE","IT","LV","LT","LU","MT","NL",
                "PL","PT","RO","SK","SI","ES","SE", "AL", "AD", "AM", "BY", "BA","FO", "GE",
                "GI","IS","IM","XK","LI","MK","MD","MC","ME","NO","RU","SM","RS","CH","TR","UA",
                "VA"];
    const europeanCountries = [];
   
    const getCountries = new Promise((resolve,reject)=>{

        fetch("https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json")
        .then(response => response.json())
        .then((data) =>{
            resolve(data);
        } )
        .catch(err => reject(err))
    });

    var globalData = await getCountries;
    
    europeanCountryCodes.forEach((cc) =>{
        var found = false;
        globalData = globalData.filter((ctry) =>{

            if(!found && ctry.code === cc){
                europeanCountries.push(ctry);
                found = true;
                return false;
            }
            else {
                return true;
            }
            
        })
    })

   
     

    return {
        props:{
            countries:europeanCountries|| null
        }
    }

}

export default AwardApp;