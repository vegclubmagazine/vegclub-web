import Layout from "../defaults/Layout";
import Link from "next/link";
import {API} from "../config/api.js";

import parse,{domToReact} from "html-react-parser";



const Contact = ({body})=>

{

    const options = {
        replace({attribs, children}) {
            if(!attribs)return;
            if(attribs.href){
                return <a href={attribs.href} target="_blank" rel="noopener noreferrer" className="article-preview">{domToReact(children)}</a>
            }
           
            /*f(attribs.style && attribs.style.match(regex))
            {
                const listStyle = attribs.style.split(":")[1].match(regex2);
               
                return <ul style={{listStyle:`${listStyle[1]}`}} className="pl-[25px] md:pl-[30px]">{domToReact(children)}</ul>
                
            }*/
          

        }
    }
    return(
        <Layout title= "Contact Us | VegClub Magazine">
            <main className="border-black/[.1] pb-[20vh]">
                <h1 className="pl-[40px] text-[2.074rem] font-bold uppercase pt-[40px] pb-5 border-b-[1px]">Contact Us</h1>

            
                <div className="pt-[40px] px-[40px] grid text-[1.2rem]">
                    <div>

                        {body && (parse(body, options))}
                        {/*<p className="">We'd love to hear your feedback and suggestions or answer questions, so please do get in touch.

                        </p>
                        <p className="mt-3">Here's who to contact, depending on your enquiry:
                        </p>
                        <h2 className="mt-[60px]  font-semibold uppercase text-[1.44rem]">Advertising</h2>
                        <p className="mt-5">If you'd like to discuss advertising opportunities, please email
                            
                            {"  "}<Link className="underline decoration-[#01e2c2] decoration-[4px] font-bold" href="mailto:advertising@vegclubmagazine.com">advertising@vegclubmagazine.com</Link>.

                        </p>
                        <h2 className="mt-[60px] font-semibold uppercase text-[1.44rem]">PRODUCTS OR RESTAURANT FOR REVIEW</h2>
                        <p className="mt-5">If you have a product or a restaurant you'd like reviewed, please email 
                            
                            {"  "}<Link className="underline decoration-[#01e2c2] decoration-[4px] font-bold" href="mailto:editorial@vegclubmagazine.com">editorial@vegclubmagazine.com</Link>.

                        </p>
                        <h2 className="mt-[60px] font-semibold uppercase text-[1.44rem]">Press release</h2>
                        <p className="mt-5">If you have a press release for the editorial team, please email
                            
                            {"   "}<Link className="underline decoration-[#01e2c2] decoration-[4px] font-bold" href="mailto:press@vegclubmagazine.com">press@vegclubmagazine.com</Link>.

                        </p>
                        <h2 className="mt-[60px] font-semibold uppercase text-[1.44rem]">Loyalty program</h2>
                        <p className="mt-5">If you’d like to join our loyalty program as a physical member or as an eatery, please email 
                            
                            {"  "}<Link className="underline decoration-[#01e2c2] decoration-[4px] font-semibold" href="mailto:loyalty@vegclubmagazine.com">loyalty@vegclubmagazine.com</Link>.

                        </p>
                        <h2 className="mt-[60px] font-semibold uppercase text-[1.44rem]">join the team</h2>
                        <p className="mt-5">If you’re a journalist or a content creator and you’d like to join our team, please email
                            
                            {" "}<Link className="font-semibold decoration-[#01e2c2] decoration-[4px] underline" href="mailto:joinus@vegclubmagazine.com">joinus@vegclubmagazine.com</Link>.

                        </p>
                        <h2 className="mt-[60px] font-semibold uppercase text-[1.44rem]">franchise</h2>
                        <p className="mt-5">If you’d like to receive information about how to become a VegClub franchisee in a European country, please email 
                            
                            {" "}<Link className="font-semibold decoration-[#01e2c2] decoration-[4px] underline" href="mailto:franchise@vegclubmagazine.com">franchise@vegclubmagazine.com</Link>.

                        </p>
                        <h2 className="mt-[60px] font-semibold uppercase text-[1.44rem]">GENERAL ENQUIRIES</h2>
                        <p className="mt-5">If you'd like to contact VegClub Magazine for general enquiries, please email 
                            
                            {" "}<Link className="mt-5 underline decoration-[#01e2c2] decoration-[4px] font-semibold" href="mailto:contact@vegclubmagazine.com">contact@vegclubmagazine.com</Link>.

                        </p>*/}





                    </div>
                </div>
            </main>

        </Layout>
    )
    
}

export async function getStaticProps() {
    const response = await fetch(`${API}/contact`);
    const data = await response.json();
  
    return {
      props: {
        body: data?.data?.attributes?.body || null,
      },
      revalidate: 10,
    };
}


export default Contact;