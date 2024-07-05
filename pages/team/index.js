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
import { Fragment, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import {useContext} from "react";

const qs = require("qs");



const Team = ({excerpt,team}) =>
{
    const {isMemberAuthor} = useContext(GlobalContext);
   
    return (
        <Layout title="Meet The Team | VegClub Magazine">
            
            <div className="border-black/[.1] p-[40px] pb-3">
                <h1 className="w-fit uppercase font-semibold text-[2.488rem]">Meet The Team</h1>
            </div>
            <div className="px-[40px] border-black/[.1]">
                <div className="pt-[40px] xl:grid xl:grid-cols-12 border-t-[1px]">
                    <div className="col-start-2 col-span-10 mb-[40px]">
                        {team?.map((member,index)=>(
                            <Fragment>
                                <div className="hidden md:flex flex-row border-b-[1px] py-[40px]" key={index}>
                                    <div className="w-[240px] h-[240px] rounded-[100%] shrink-0  overflow-hidden">
                                        
                                        <img src={member?.attributes?.image?.data?.attributes?.url} className="w-full h-auto object-cover"/>
                                        
                                    </div>
                                    <div className="flex flex-col flex-grow text-[1.2rem] pl-[60px]">
                                            <h2 className="text-[1.44rem] lg:text-[1.728rem] font-bold">{member?.attributes?.name}</h2>
                                            <p className="font-semibold mt-3">{member?.attributes?.position}</p>
                                            <p className="mt-3 font-light">{member?.attributes?.pronouns}</p>
                                            <p className="mt-3 text-justify">{member?.attributes?.bio}</p>
                                            <ul className="list-none mt-5 text-black text-[1.44rem] sm:text-[1.728rem]">
                                                {member?.attributes?.instagram && (
                                                    <Link className="px-3 bg-[#f7f5f7] py-1 rounded-[5px]  mr-5" href={`${member?.attributes?.instagram}`}>
                                                        <FaInstagram className="inline-block text-[1.2rem] mr-2 transition-all duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)] hover:text-black/[.4]"></FaInstagram>
                                                        <p className="inline-block text-[0.833rem] align-middle">instagram</p>
                                                    </Link>
                                                )}
                                                {member?.attributes?.Facebook && (
                                                <Link className="bg-[#f7f5f7] rounded-[5px] px-3 py-1 mr-5" href={`${member?.attributes?.Facebook}`}>
                                                    <FaFacebook className="inline-block mr-2 text-[1.2rem] duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)] hover:text-black/[.4]"></FaFacebook>
                                                    <p className="inline-block text-[0.833rem] align-middle">Facebook</p>

                                                </Link>
                                                )}
                                                {member?.attributes?.twitter && (
                                                <Link className="bg-[#f7f5f7] rounded-[5px]  px-3 py-1 mr-5" href={`${member?.attributes?.twitter}`}>
                                                    <FaTwitter className="inline-block text-[1.2rem] mr-2 duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)] hover:text-black/[.4]"></FaTwitter>
                                                    <p className="inline-block text-[0.833rem] align-middle">Twitter</p>

                                                </Link>
                                                )}
                                                {member?.attributes?.linkedin && (
                                                <Link className="bg-[#f7f5f7] rounded-[5px] px-3 py-1 mr-5"  href={`${member?.attributes?.linkedin}`}>
                                                    <FaLinkedin className="inline-block text-[1.2rem] mr-2 duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)] hover:text-black/[.4]"></FaLinkedin>
                                                    <p className="text-[0.833rem] inline-block align-middle">Linkedin</p>
                                                </Link>
                                                )}
                                                {member?.attributes?.tiktok && (
                                                    <li className="inline-block mr-5">
                                                            <Link className="bg-[#f7f5f7] rounded-[5px]  px-3 py-1" href={`${member?.attributes?.tiktok}`}>
                                                                <FaTiktok className="inline-block text-[1.2rem] mr-2 duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)] hover:text-black/[.4]"></FaTiktok>
                                                                <p className="text-[0.833rem] inline-block align-middle">Tiktok</p>
   
                                                            </Link>
                                                    </li>
                                                )}
                                            </ul>

                                            {isMemberAuthor(member?.attributes?.name) && (
                                                <div className="mt-5">
                                                    <Link className = "basic-link" href={`team/${slugify(member?.attributes?.name)}`}>
                                                        <span className="underline_span">
                                                            <p className="inline-block text-[1rem]  sm:text-[1.2rem] align-middle mr-2 font-semibold uppercase duration-[.34s]">View Articles</p>
                                                            <div className="inline-block align-middle border-black/[.4] border-t-[1px] border-r-[1px] rotate-[45deg] w-[8px] h-[8px]"></div>
                                                        </span>
                                                    </Link>
                                                </div>
                                            )}

                                    </div>
         
                                    
                                    
                                </div>
                                <div className="block md:hidden border-b-[1px] py-[40px]">
                                    <div className="flex  flex-row " key={index}>
                                        <div className="w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] rounded-[100%] shrink-0  overflow-hidden">
                                            
                                            <img src={member?.attributes?.image?.data?.attributes?.url} className="w-full h-auto object-cover"/>
                                            
                                        </div>
                                        <div className="flex flex-col grow pl-[20px] sm:pl-[60px]">
                                            <h2 className="text-[1.44rem] lg:text-[1.728rem] font-bold">{member?.attributes?.name}</h2>
                                            <p className="font-semibold  mt-3">{member?.attributes?.position}</p>

                                            <p className="mt-3 text-[0.833rem] font-light">{member?.attributes?.pronouns}</p>
                                            <ul className="list-none  mt-2 text-black text-[1.44rem] sm:text-[1.728rem]">
                                                    {member?.attributes?.instagram && (
                                                        <Link className="sm:px-3 mt-3 sm:bg-[#f7f5f7] w-fit rounded-[5px] sm:py-1  sm:mr-5 mr-2" href={`${member?.attributes?.instagram}`}>
                                                            <FaInstagram className="inline-block text-[1.2rem] mr-2 transition-all duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)] hover:text-black/[.4]"></FaInstagram>
                                                            <p className="hidden sm:inline-block text-[0.833rem] align-middle">instagram</p>
                                                        </Link>
                                                    )}
                                                    {member?.attributes?.Facebook && (
                                                    <Link className="sm:bg-[#f7f5f7] mt-3 w-fit sm:rounded-[5px]  sm:px-3 sm:py-1 mr-2 sm:mr-5" href={`${member?.attributes?.Facebook}`}>
                                                        <FaFacebook className="inline-block mr-2 text-[1.2rem] duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)] hover:text-black/[.4]"></FaFacebook>
                                                        <p className="hidden sm:inline-block text-[0.833rem] align-middle">Facebook</p>

                                                    </Link>
                                                    )}
                                                    {member?.attributes?.twitter && (
                                                    <Link className="sm:bg-[#f7f5f7] mt-3 sm:rounded-[5px] sm:px-3 sm:py-1 mr-2 sm:mr-5" href={`${member?.attributes?.twitter}`}>
                                                        <FaTwitter className="inline-block text-[1.2rem] mr-2 duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)] hover:text-black/[.4]"></FaTwitter>
                                                        <p className="hidden sm:inline-block text-[0.833rem] align-middle">Twitter</p>

                                                    </Link>
                                                    )}
                                                    {member?.attributes?.linkedin && (
                                                    <Link className="mt-3 w-fit sm:bg-[#f7f5f7] sm:rounded-[5px] sm:px-3 sm:py-1 mr-2 sm:mr-5"  href={`${member?.attributes?.linkedin}`}>
                                                        <FaLinkedin className="inline-block text-[1.2rem] mr-2 duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)] hover:text-black/[.4]"></FaLinkedin>
                                                        <p className="text-[0.833rem] hidden sm:inline-block align-middle">Linkedin</p>
                                                    </Link>
                                                    )}
                                                    {member?.attributes?.tiktok && (
                                                        <li className="inline-block mr-5 mt-3 w-fit mr-2 sm:mr-5">
                                                                <Link className="sm:bg-[#f7f5f7] w-fit rounded-[5px]  sm:px-3 sm:py-1" href={`${member?.attributes?.tiktok}`}>
                                                                    <FaTiktok className="inline-block text-[1.2rem] mr-2 duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)] hover:text-black/[.4]"></FaTiktok>
                                                                    <p className="hidden text-[0.833rem] sm:inline-block align-middle">Tiktok</p>
    
                                                                </Link>
                                                        </li>
                                                    )}
                                            </ul>
                                            {isMemberAuthor(member?.attributes?.name) && (
                                                <div className="mt-5">
                                                    <Link className = "basic-link" href={`team/${slugify(member?.attributes?.name)}`}>
                                                        <span className="underline_span">
                                                            <p className="inline-block text-[0.833rem]  align-middle mr-2 font-semibold uppercase duration-[.34s]">View Articles</p>
                                                            <div className="inline-block align-middle border-black/[.4] border-t-[1px] border-r-[1px] rotate-[45deg] w-[8px] h-[8px]"></div>
                                                        </span>
                                                    </Link>
                                                </div>
                                             )}

                                        </div>
                                       
                                       

                                    </div>
                                    <p className="mt-8 text-justify">{member?.attributes?.bio}</p>
                                       
                                            
                                               
                                            
                                   
         
                                    
                                    
                                </div>
                            </Fragment>
                        ))}
                            
                        

                    </div>
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
            sort:["precedence:asc"]
       
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