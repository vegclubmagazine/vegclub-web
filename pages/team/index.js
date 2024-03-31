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
                                <img src={member?.attributes?.media?.url} className="w-full h-auto"/>
                            </div>
                            <div className="flex flex-col flex-grow ">
                                <h2 className="text-[1.44rem] lg:text-[1.728rem] font-semibold duration-[.32s] ease-in-out hover:text-black/[.4]"><Link href={`team/${slugify(member?.attributes?.name)}`}>Bolu Talabi</Link></h2>
                                <p className="text-[1.2rem] font-light mt-3">{member?.attributes?.role}</p>
                                <ul className="list-none mt-3 text-black text-[1.44rem]">
                                    <FaInstagramSquare className="inline-block mr-5"></FaInstagramSquare>
                                    <FaFacebookSquare className="inline-block mr-5"></FaFacebookSquare>
                                    <FaTwitterSquare className="inline-block mr-5"></FaTwitterSquare>
                                    <FaLinkedin className="inline-block"></FaLinkedin>

                                </ul>

                            </div>
                        </div>
                ))}
                    
                

            </div>
        </Layout>
    )
}


export async function getServersideProps({req,res}){

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
        sort: ["order:asc"],
        },
        { encodeValuesOnly: true }
    );

    const teamRequest = await fetch(`${API}/teams?${filters}`);
    const team = await teamRequest.json();

    return {
        props: {
        excerpt: excerpt?.data?.attributes?.content,
        team: team?.data,
        },
        revalidate: 10,
    };

}


export default Team;