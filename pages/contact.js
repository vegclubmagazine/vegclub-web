import Layout from "../defaults/Layout";
import Link from "next/link";



const Contact = ()=>

{
    return(
        <Layout title= "Contact Us | VegClub magazine">
            <main className="border-black/[.1] pb-[20vh]">
                <h1 className="pl-[40px] text-[1.728rem] font-semibold uppercase pt-[40px] pb-5 border-b-[1px]">Contact Us</h1>

            
                <div className="pt-[40px] px-[40px] grid lg:grid-cols-[2fr_1fr]">
                    <div>
                        <p className="font-bold">We'd love to hear your feedback and suggestions or answer questions, so please do get in touch.

                        </p>
                        <p className="mt-5">Here's who to contact, depending on your enquiry:
                        </p>
                        <h2 className="mt-[60px]  font-semibold uppercase text-[1.44rem]">Adertising</h2>
                        <p className="mt-5">If you'd like to discuss advertising opportunities, please email
                            <br></br>
                            <br></br>
                            <Link className="underline font-bold italic" href="mailto:advertising@vegclubmagazine.com">advertising@vegclubmagazine.com</Link>

                        </p>
                        <h2 className="mt-[60px] font-semibold uppercase text-[1.44rem]">PRODUCTS OR RESTAURANT FOR REVIEW</h2>
                        <p className="mt-5">If you have a product or a restaurant you'd like reviewed, please email 
                            <br></br>
                            <br></br>
                            <Link className="underline font-bold italic" href="mailto:editorial@vegclubmagazine.com">editorial@vegclubmagazine.com</Link>

                        </p>
                        <h2 className="mt-[60px] font-semibold uppercase text-[1.44rem]">Press releases</h2>
                        <p className="mt-5">If you have a press release for the editorial team, please send it to 
                            <br></br>
                            <br></br>
                            <Link className="underline font-bold italic" href="mailto:press@vegclubmagazine.com">press@vegclubmagazine.com</Link>

                        </p>
                        <h2 className="mt-[60px] font-semibold uppercase text-[1.44rem]">Loyalty programme</h2>
                        <p className="mt-5">If you’d like to join our loyalty programme as a physical member or as an eatery, please send it to 
                            <br></br>
                            <br></br>
                            <Link className="underline font-semibold italic" href="mailto:loyalty@vegclubmagazine.com">loyalty@vegclubmagazine.com</Link>

                        </p>
                        <h2 className="mt-[60px] font-semibold uppercase text-[1.44rem]">join the team</h2>
                        <p className="mt-5">If you’re a journalist or a content creator and you’d like to join our team, please email
                            <br></br>
                            <br></br>
                            <Link className="font-semibold underline italic" href="mailto:joinus@vegclubmagazine.com">joinus@vegclubmagazine.com</Link>

                        </p>
                        <h2 className="mt-[60px] font-semibold uppercase text-[1.44rem]">GENERAL ENQUIRIES</h2>
                        <p className="mt-5">If you'd like to contact VegClub Magazine for general enquiries, please email 
                            <br></br>
                            <br></br>
                            <Link className="mt-5 underline font-semibold italic" href="mailto:contact@vegclubmagazine.com">contact@vegclubmagazine.com</Link>

                        </p>





                    </div>
                </div>
            </main>

        </Layout>
    )
    
}

export default Contact;