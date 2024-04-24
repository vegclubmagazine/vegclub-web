import Layout from "../defaults/Layout";
import {useEffect,useCallback,useState} from "react";
import { useRouter } from "next/router";

import {loadStripe} from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
const Checkout = ()=>
{


    const searchParams = useSearchParams();
    const success = searchParams.get("success");
    const cancel = searchParams.get("cancel");
   
   




    return (
        <Layout title="Checkout | Vegclub Magazine">
            <main className="min-h-[100vh] pt-[60px] bg-[#f5f5f5]">
                {success ? (
                    <div className="bg-white w-[100%] min-w-[340px] max-w-[676px] text-center sm:w-[80%] p-[40px] text-[1.728rem] md:text-[2.074rem] text-[#01e2c2]"></div>
                ): cancel ?(

                    <div className="bg-white w-[100%] min-w-[340px] max-w-[676px] text-center sm:w-[80%] p-[40px] text-[1.728rem] md:text-[2.074rem] text-[#01e2c2]"></div>
                    

                ):(
                    <h1 className="w-fit mx-auto font-semibold text-[1.728rem] md:text-[2.074rem]">Confirm your order</h1>
                )}
                <div className="mt-[40px]  mx-auto w-[100%] sm:w-[80%]  max-w-[676px] min-w-[340px]">
                    <form className="py-[40px] bg-white " action="/api/checkout_sessions" method="POST">
                        <div className="flex flex-row w-[80%] mx-auto max-w-[500px]">
                            <div className="w-[150px] h-[150px] bg-[#cacaca] overflow-hidden">

                            </div>
                            <div className="flex grow pl-[20px] flex-col">
                                <h2 className="text-[1.44rem] font-semibold">Loyalty Card</h2>
                                <p className="text-black/[.4] font-semibold text-[1.2rem] mt-3">UK£50</p>
                            </div>
                        </div>
                        <button type="submit" role="link" className="relative left-[50%] translate-x-[-50%] bg-black mt-5 max-w-[500px] text-center uppercase font-semibold text-white py-[12px] px-[20px] w-[80%] transition-all duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)] hover:text-white/[.4]">Checkout</button>
                    </form>
                </div>
            </main>
        </Layout>
    )
}


export default Checkout;