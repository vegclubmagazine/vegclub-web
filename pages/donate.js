import Layout from "../defaults/Layout";
import {useState, useEffect} from "react";
import { useRouter } from "next/router";
import { FaCcMastercard,
         FaCcVisa,
         FaCcApplePay,
         FaCcPaypal,
         FaCcAmex } from "react-icons/fa";


const qs = require("qs");

const donate = ({})=>
{
    const router = useRouter();
    const [Amt, setAmt] = useState(0);
    const [InputAmt,setInputAmt] = useState("");

    useEffect(()=>{
        setAmt(parseFloat(InputAmt) || 0);
    },[InputAmt])
    const handleSubmit = (e)=>
    {
        e.preventDefault();
        const filters=qs.stringify({type:"donation", amt:Amt})

        router.replace({
            pathname:"/checkout",
            query:filters

        })
    }
    


    const handleChange = (e)=>
    {
        
        if(e.target.validity.valid){
            if(e.target.value ==="."){
                return setInputAmt("0.");
            }
            else{
                return setInputAmt(e.target.value);
            }
        }
        return InputAmt;
        

       

    }



     



    return (
        <Layout title="Donate | VegClub Magazine">
            <div className="bg-black   px-[40px] mb-[50px]">
                <div className="flex flex-row lg:w-[80%] mx-auto">
                    <div className="flex flex-col grow justify-center text-white pr-[20px]">
                        
                        <h1 className="text-[1.2rem] sm:text-[1.44rem] md:text-[1.728rem] lg:text-[2.488rem] xl:text-[2.986rem] font-bold">Donate to keep us in the green</h1>
                        <h3 className="md:text-[1.44rem] mt-3">Limited offer: get a free tote bag when you donate £50 or more*</h3>
                    </div>
                    <div className="min-w-[150px] w-[150px] md:w-[250px] lg:[300px]">
                        <img src="/donate_asset_4.png"></img>
                    </div>
                </div>
                
               
            </div>
            <div className="mx-auto w-[90%] sm:w-[80%] md:w-[450px] px-[40px] py-[20px] bg-white border-[1px] border-black/[.1]">
                <div className="border-b-[1px] text-center">
                    <h2 className="md:text-[1.2rem] font-semibold leading-[2.5]">You have made a pledge of £<span>{Amt || "--"}</span></h2>
                </div>
                <form method="POST"  onSubmit={(e)=>{handleSubmit(e);}}>
                    <div className="mt-5 grid grid-cols-3">
                        <button type="button" className="py-[20px] border-y-[1px] border-l-[1px] text-center" onClick={()=>setAmt(5)}>
                            <p className="md:text-[1.2rem] font-bold">£5</p>
                        </button>
                        <button type="button" className="py-[20px] border-y-[1px] border-l-[1px] text-center" onClick={()=>setAmt(15)}>
                            <p className="md:text-[1.2rem] font-bold">£15</p>
                        </button>
                        <button type="button" className="py-[20px] border-[1px] text-center" onClick={()=>setAmt(20)}>
                            <p className="md:text-[1.2rem] font-bold">£20</p>
                        </button>
                    </div>
                    <input className="w-full outline-none pt-[20px] mt-[40px] border-b-[1px] leading-[2.5] placeholder:text-[1rem] placeholder:md:text-[1.2rem] poppins placeholder:font-semibold placeholder:text-black/[.4]" 
                        type="text"
                        pattern="\d*(\.?\d{0,2})?"
                        value={InputAmt}
                        placeholder="£ - Other Amount"
                        onChange={(e)=>handleChange(e)}
                    />
                    <button type={`${Amt ? "submit" : "button"}`} className={` w-full mt-[40px] text-center font-bold bg-[#01e2c2] py-[20px] md:text-[1.2rem] tracking-[.03rem] uppercase`}>Donate</button>
                </form>
                
            </div>
            <div className="mt-8 text-center  text-black/[.4] mb-5">
                    <p className="mx-auto text-[0.833rem]">Pay with any of the following</p>
                    <ul className="list-none mt-5 w-fit mx-auto">
                        <li className="inline-block align-middle mr-5">
                            <FaCcMastercard className="text-[2.074rem]"></FaCcMastercard>
                        </li>
                        <li className="inline-block align-middle mr-5">
                            <FaCcVisa className="text-[2.074rem]"></FaCcVisa>
                        </li>
                        <li className="inline-block align-middle mr-5">
                            <FaCcPaypal className="text-[2.074rem]"></FaCcPaypal>
                        </li>
                        <li className="inline-block align-middle mr-5">
                            <FaCcApplePay className="text-[2.074rem]"></FaCcApplePay>
                        </li>
                        <li className="inline-block align-middle">
                            <FaCcAmex className="text-[2.074rem]"></FaCcAmex>
                        </li>
                        


                    </ul>
                    <div className="w-[90%] sm:w-[450px] mx-auto mt-5">
                        <p className="text-[0.833rem]">*Tote bag only available for first-time donors on a first come, first served basis while supplies last.All prices are in U.K. sterling pounds</p>
                    </div>
            </div>
        </Layout>
    )

}


export default donate;