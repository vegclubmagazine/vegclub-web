import Layout from "../../defaults/Layout"
import Image from "next/image";
import Link from "next/link";
import {
    FaFacebook,
    FaFacebookF,
    FaLink,
    FaFacebookSquare,
    
    FaLinkedinIn,
    FaLinkedin,
    FaInstagramSquare,

    
    FaTwitter,
    FaTwitterSquare,
    FaSnapchat,
    FaSnapchatGhost,
} from "react-icons/fa";
import { slugify } from "../../lib/utils";
import { API } from "../../config/api";
import { useEffect } from "react";

const qs = require("qs");



const Team = ({excerpt,team}) =>
{
    useEffect(()=>{
        console.log(team[3]?.attributes?.image)
    },[])
   
    return (
        <Layout title="Meet The Team | Vegclub Magazine">
            
            <div className="border-black/[.1] pl-[40px] border-box py-3 border-b-[1px]">
                <h1 className="w-fit uppercase font-semibold text-[2.488rem]">Team</h1>
            </div>
            <div className="xl:grid xl:grid-cols-[2fr_1fr]">
                <div className="grid px-[40px] py-[40px] grid-cols-2 md:grid-cols-3  gap-x-5 gap-y-[5rem] auto-rows-max border-black/[.1] border-b-[1px] xl:border-r-[1px]">
                    {team?.map((member,index)=>(
                            <div className="" key={index}>
                                <div className="aspect-square  max-h-[240px] max-w-[240px] overflow-hidden  w-[80%]">
                                    
                                    <img src={member?.attributes?.image?.data?.attributes?.url} className="w-full h-auto"/>
                                </div>
                                <div className="max-w-[240px]">
                                    <h2 className="text-[1.44rem] lg:text-[1.728rem] font-semibold duration-[.32s] ease-in-out hover:text-black/[.4]"><Link href={`team/${slugify(member?.attributes?.name)}`}>{member?.attributes?.name}</Link></h2>
                                    <p className="text-[1.2rem]  font-light mt-3">{member?.attributes?.position}</p>
                                    <ul className="list-none mt-3 text-black text-[1.44rem]">
                                        {member?.attributes?.instagram && (<Link href={`${member?.attributes?.instagram}`}><FaInstagramSquare className="inline-block mr-5"></FaInstagramSquare></Link>)}
                                        {member?.attributes?.Facebook && (<Link href={`${member?.attributes?.Facebook}`}><FaFacebookSquare className="inline-block mr-5"></FaFacebookSquare></Link>)}
                                        {member?.attributes?.twitter && (<Link href={`${member?.attributes?.twitter}`}><FaTwitterSquare className="inline-block mr-5"></FaTwitterSquare></Link>)}
                                        {member?.attributes?.linkedin && (<Link href={`${member?.attributes?.linkedin}`}><FaLinkedin className="inline-block"></FaLinkedin></Link>)}

                                    </ul>

                                </div>
                            </div>
                    ))}
                        
                    

                </div>
            </div>


        </Layout>
    )
}


export async function getServerSideProps({req,res}){

    res.setHeader(
        "Cache-Control",
        "public", "s-maxage=5=604800", "stale-while-revalidate=84600"
    )

    const excerptRequest = await fetch(`${API}/team-excerpt`);

    const excerpt = await excerptRequest.json();

    // Query
    const filters = qs.stringify(
        {
            populate: "*",
       
        },
        { encodeValuesOnly: true }
    );

    const teamRequest = await fetch(`${API}/teams?populate=*`);
    const team = await teamRequest.json();

   

    return {
        props: {
            excerpt: excerpt?.data?.attributes?.content || null,
            team: team?.data || null,
        },
        
    };

}


export default Team;