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
    FaInstagram,
    FaTiktok,

    
    FaTwitter,
    FaTwitterSquare,
    FaSnapchat,
    FaSnapchatGhost,
} from "react-icons/fa";
import { slugify } from "../../lib/utils";
import { API } from "../../config/api";
import { useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import {useContext} from "react";

const qs = require("qs");



const Team = ({excerpt,team}) =>
{
    const {isMemberAuthor} = useContext(GlobalContext);
   
    return (
        <Layout title="Meet The Team | Vegclub Magazine">
            
            <div className="border-black/[.1] pl-[40px] border-box py-3 border-b-[1px]">
                <h1 className="w-fit uppercase font-semibold text-[2.488rem]">Team</h1>
            </div>
            <div className="xl:grid xl:grid-cols-[2fr_1fr]">
                <div className="border-black/[.1] xl:border-r-[1px]">
                    {team?.map((member,index)=>(
                            <div className="flex flex-col md:flex-row border-b-[1px] p-[40px]" key={index}>
                                <div className="w-full flex flex-row md:block md:min-w-[240px] md:max-w-[240px] md:h-[240px] md:aspect-square overflow-hidden">
                                    
                                    <img src={member?.attributes?.image?.data?.attributes?.url} className="w-[240px] md:w-full h-auto object-cover"/>
                                    <div className="inline-block md:hidden align-top pl-[20px]">
                                        <h2 className="text-[1.44rem] lg:text-[1.728rem] font-semibold">{member?.attributes?.name}</h2>
                                        <p className="mt-3 font-light">{member?.attributes?.pronouns}</p>
                                        <p className="font-semibold mt-3">{member?.attributes?.position}</p>
                                        <ul className="list-none mt-3 text-black text-[1.728rem]">
                                            {member?.attributes?.instagram && (<Link href={`${member?.attributes?.instagram}`}><FaInstagram className="inline-block mr-5 transition-all duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)] hover:text-black/[.4]"></FaInstagram></Link>)}
                                            {member?.attributes?.Facebook && (<Link href={`${member?.attributes?.Facebook}`}><FaFacebook className="inline-block mr-5 duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)] hover:text-black/[.4]"></FaFacebook></Link>)}
                                            {member?.attributes?.twitter && (<Link href={`${member?.attributes?.twitter}`}><FaTwitter className="inline-block mr-5 duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)] hover:text-black/[.4]"></FaTwitter></Link>)}
                                            {member?.attributes?.linkedin && (<Link href={`${member?.attributes?.linkedin}`}><FaLinkedin className="inline-block duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)] hover:text-black/[.4]"></FaLinkedin></Link>)}
                                            {member?.attributes?.tiktok && (
                                                <li className="inline-block mr-5">
                                                        <Link href={`${member?.attributes?.tiktok}`}>
                                                            <FaTiktok className="inline-block mr-5 duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)] hover:text-black/[.4]"></FaTiktok>
                                                            
                                                        </Link>
                                                </li>
                                            )}
                                        </ul>

                                        {isMemberAuthor(member?.attributes?.name) && (
                                            <div className="mt-5">
                                                <Link href={`team/${slugify(member?.attributes?.name)}`}>
                                                    <p className="inline-block align-middle mr-2 font-semibold uppercase italic duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)] hover:text-black/[.4]">View Articles</p>
                                                    <div className="inline-block align-middle border-black/[.4] border-t-[1px] border-r-[1px] rotate-[45deg] w-[8px] h-[8px]"></div>
                                                </Link>
                                            </div>
                                        )}

                                    </div>
                                </div>
                                <div className="md:flex-col md:flex md:row md:pl-[20px]">
                                    <h2 className="hidden md:block text-[1.44rem] lg:text-[1.728rem] font-semibold">{member?.attributes?.name}</h2>
                                    <p className="hidden md:block mt-3 font-light">{member?.attributes?.pronouns}</p>
                                    <p className="hidden md:block font-semibold mt-3">{member?.attributes?.position}</p>
                                    <p className="mt-3">{member?.attributes?.bio}</p>
                                    <ul className="hidden md:block list-none mt-3 text-black text-[1.728rem]">
                                        {member?.attributes?.instagram && (<Link href={`${member?.attributes?.instagram}`}><FaInstagram className="inline-block mr-5 transition-all duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)] hover:text-black/[.4]"></FaInstagram></Link>)}
                                        {member?.attributes?.Facebook && (<Link href={`${member?.attributes?.Facebook}`}><FaFacebook className="inline-block mr-5 duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)] hover:text-black/[.4]"></FaFacebook></Link>)}
                                        {member?.attributes?.twitter && (<Link href={`${member?.attributes?.twitter}`}><FaTwitter className="inline-block mr-5 duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)] hover:text-black/[.4]"></FaTwitter></Link>)}
                                        {member?.attributes?.linkedin && (<Link href={`${member?.attributes?.linkedin}`}><FaLinkedin className="inline-block duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)] hover:text-black/[.4]"></FaLinkedin></Link>)}
                                        {member?.attributes?.tiktok && (
                                            <li className="inline-block mr-5">
                                                    <Link href={`${member?.attributes?.tiktok}`}>
                                                        <FaTiktok className="inline-block mr-5 duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)] hover:text-black/[.4]"></FaTiktok>
                                                        
                                                    </Link>
                                            </li>
                                        )}
                                    </ul>

                                    {isMemberAuthor(member?.attributes?.name) && (
                                    <div className="mt-5 hidden md:block">
                                        <Link href={`team/${slugify(member?.attributes?.name)}`}>
                                            <p className="inline-block align-middle mr-2 font-semibold uppercase italic duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)] hover:text-black/[.4]">View Articles</p>
                                            <div className="inline-block align-middle border-black/[.4] border-t-[1px] border-r-[1px] rotate-[45deg] w-[8px] h-[8px]"></div>
                                        </Link>
                                    </div>
                                )}

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