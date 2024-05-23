import Layout from "../defaults/Layout";
import {useEffect,useCallback,useState} from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import {loadStripe} from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
const Checkout = ()=>
{

    
    

    const searchParams = useSearchParams();
    const params_length = searchParams?.size;
    const success = searchParams.get("success");
    const cancel = searchParams.get("cancel");

    const product_type = searchParams.get("type");
    const cash_amt = searchParams.get("amt")
   
   




    return (
        <Layout title="Checkout | Vegclub Magazine">
            <main className="min-h-[100vh] pt-[60px] bg-[#f5f5f5]">
                
                {success ? (
                    <div className="bg-white mx-auto w-[100%] min-w-[340px] max-w-[676px] text-center sm:w-[80%] p-[40px] text-[1.728rem] md:text-[2.074rem] text-[#01e2c2]">
                        <FontAwesomeIcon className="inline-block align-middle w-[40px] h-[40px] mr-5" icon={faCircleCheck}></FontAwesomeIcon>
                        <h1 className="text-black inline-block align-middle">Your order has been placed</h1>
                    </div>
              

                ): cancel ?(

                    <div className="bg-white mx-auto w-[100%] min-w-[340px] max-w-[676px] text-center sm:w-[80%] p-[40px] text-[1.728rem] md:text-[2.074rem] text-[#fa3e3e]">
                        <FontAwesomeIcon className="inline-block align-middle w-[40px] h-[40px] mr-5" icon={faCircleXmark}></FontAwesomeIcon>
                        <h1 className="inline-block text-black align-middle">Order cancelled</h1>
                    </div>
                    

                ): params_length ? (
                   <h1 className="w-fit mx-auto font-semibold text-[1.728rem] md:text-[2.074rem]">Confirm your order</h1>

                ):("")}
                {product_type == "merchandise" && cash_amt ? (
                    <div className="mt-[40px]  mx-auto w-[100%] sm:w-[80%]  max-w-[676px] min-w-[340px]">
                        <form className="py-[40px] bg-white " action="/api/checkout_sessions" method="POST">
                            <div className="flex flex-row w-[80%] mx-auto max-w-[500px]">
                                <div className="w-[150px] h-fit bg-[#cacaca] overflow-hidden">
                                        <img className="w-full h-auto object-cover" src="/checkout_asset_discount-card-white.jpeg"/>
                                </div>
                                <div className="flex grow pl-[20px] flex-col">
                                    <h2 className="text-[1.44rem] font-semibold">Loyalty Card</h2>
                                    <p className="text-black/[.4] font-semibold text-[1.2rem] mt-3">UK£35</p>
                                </div>
                            </div>
                            <button type="submit" role="link" className="relative left-[50%] translate-x-[-50%] bg-black mt-5 max-w-[500px] text-center uppercase font-semibold text-white py-[12px] px-[20px] w-[80%] transition-all duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)] hover:text-white/[.4]">Checkout</button>
                            <input type="hidden" name="type" value={`merchandise`}/>
                            <input type="hidden" name="amt" value={"35"}/>
                        </form>
                    </div>
                ): product_type == "donation" && cash_amt ? (
                    <div className="mt-[40px]  mx-auto w-[100%] sm:w-[80%]  max-w-[676px] min-w-[340px]">
                        <form className="py-[40px] bg-white " action="/api/checkout_sessions" method="POST">
                            <div className="flex flex-row w-[80%] mx-auto max-w-[500px]">
                                <div className="w-[150px] h-fit bg-[#cacaca] overflow-hidden">
                                        <img className="w-full h-auto object-cover" src="/vegClub_logo.jpg"/>
                                </div>
                                <div className="flex grow pl-[20px] flex-col">
                                    <h2 className="text-[1.44rem] font-semibold">donation</h2>
                                    <p className="text-black/[.4] font-semibold text-[1.2rem] mt-3">UK£{cash_amt}</p>
                                </div>
                            </div>
                            <button type="submit" role="link" className="relative left-[50%] translate-x-[-50%] bg-black mt-5 max-w-[500px] text-center uppercase font-semibold text-white py-[12px] px-[20px] w-[80%] transition-all duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)] hover:text-white/[.4]">Checkout</button>
                            <input type="hidden" name="type" value={`donation`}/>
                            <input type="hidden" name="amt" value={cash_amt}/>
                        </form>
                    </div>

                ):(
                    <>
                        {params_length ||(
                            <div className="bg-white mx-auto  w-[100%] min-w-[340px] max-w-[676px] text-center sm:w-[80%] p-[40px] text-[1.728rem] md:text-[2.074rem]">
                                Unable to Establish Checkout Constraints
                            </div>
                        )}
                        <div className="w-fit mx-auto mt-[40px]">
                            <Link href="/" className="w-fit mx-auto underline font-semibold uppercase text-[1.44rem] md:text-[1.728rem]">Home</Link>
                        </div>
                    </>
                )}
            </main>
        </Layout>
    )
}


export default Checkout;