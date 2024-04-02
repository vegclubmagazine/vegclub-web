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
   
    return (
        <Layout title="Meet The Team | Vegclub Magazine">
            
            <div className="border-black/[.1] pl-[40px] border-box py-3 border-b-[1px]">
                <h1 className="w-fit uppercase font-semibold text-[2.488rem]">Team</h1>
            </div>
            <div className="grid px-[40px] py-[40px] grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-5 auto-rows-max border-black/[.1] border-b-[1px]">
                {team?.map((member,index)=>(
                        <div className="" key={index}>
                            <div className="aspect-square overflow-hidden  w-fit">
                                <img src={member?.attributes?.media?.data?.attributes?.url} className="w-full h-auto"/>
                            </div>
                            <div className="flex flex-col flex-grow ">
                                <h2 className="text-[1.44rem] lg:text-[1.728rem] font-semibold duration-[.32s] ease-in-out hover:text-black/[.4]"><Link href={`team/${slugify(member?.attributes?.name)}`}>{member?.attributes?.name}</Link></h2>
                                <p className="text-[1.2rem]  font-light mt-3">{member?.attributes?.position}</p>
                                <ul className="list-none mt-3 text-black text-[1.44rem]">
                                    {member?.attributes?.instagram && (<FaInstagramSquare className="inline-block mr-5"></FaInstagramSquare>)}
                                    {member?.attributes?.Facebook && (<FaFacebookSquare className="inline-block mr-5"></FaFacebookSquare>)}
                                    {member?.attributes?.twitter && (<FaTwitterSquare className="inline-block mr-5"></FaTwitterSquare>)}
                                    {member?.attributes?.linkedin && (<FaLinkedin className="inline-block"></FaLinkedin>)}

                                </ul>

                            </div>
                        </div>
                ))}
                    
                

            </div>
        </Layout>
    )
}


export async function getServerSideProps({req,res}){

    res.setHeader(
        "Cache-Control",
        "public", "s-maxage=604800", "stale-while-revalidate=84600"
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

    const teamRequest = await fetch(`${API}/teams?${filters}`);
    const team = await teamRequest.json();

    console.log(team);

    return {
        props: {
            excerpt: excerpt?.data?.attributes?.content || null,
            team: team?.data || null,
        },
        
    };

}


export default Team;