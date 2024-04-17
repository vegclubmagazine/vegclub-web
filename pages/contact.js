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
                        <p className="">For any editorial or advertising enquiries, feel free to contact us at {" "}
                            <Link className="font-semibold underline italic" href="mailto:contact@vegclubmagazine.com">contact@vegclubmagazine.com</Link>
                        </p>
                    </div>
                </div>
            </main>

        </Layout>
    )
    
}

export default Contact;