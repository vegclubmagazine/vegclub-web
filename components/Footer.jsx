import {
    FaFacebookSquare,
    FaInstagram,
    FaLinkedinIn,
    FaTwitter,
} from "react-icons/fa";
import Link from "next/link";
const Footer  = ({})=>
{
    return (
        <footer className = "bg-[#000] relative border-box py-5">
            <div className="w-[90%] mx-auto">
                <div className="border-box py-3 border-[#333333]">
                    <img  src="/vegClub_logo_white_2.png" className="mx-auto h-[2.5rem] w-auto"></img>
                </div>
                
                <div className="border-box py-5 border-[#333333] border-b-[1px]">
                    {/*<h4 className="italic mb-5 text-[#fff] font-semibold uppercase">More</h4>*/}
                    <div className="text-[#a2a2a2] font-semibold  flex flex-row justify-evenly md:w-[80%] lg:w-[60%] mx-auto">
                        <p>About</p>
                        
                        <p>Team</p>
                        
                        <p>contact</p>
                        
                        <p>Support Us</p>
                        
                    </div>
                    <div className="mt-5 text-center text-[1.2rem] text-[#A2A2A2]">
                        
                        <Link href="#" className="inline-block mr-3 no-underline" passHref>
                            <FaInstagram></FaInstagram>
                        </Link>
                        
                        {/*<span className="text-[#d6f31f] font-semibold">/</span>*/}
                        <Link href="#" className="inline-block no-underline" passHref>
                            <FaLinkedinIn></FaLinkedinIn>
                        </Link>

                    </div>
                    <div className="text-center text-[0.694rem] mt-2 text-[#A2A2A2]">
                        <p className="inline-block border-[#333] px-1 w-fit border-r-[1px]">Privacy Policy</p>
                        {/*<span className="text-[#01e2c2]">/</span>*/}
                        <p className="inline-block border-[#333] px-1 w-fit ">Cookie Policy</p>



                    </div>
                    <div className="mt-1 text-center text-[0.694rem] text-[#A2A2A2]">© Vegclub Magazine 2024 </div>
                </div>
            </div>
            <div className="w-fit mx-auto mt-3">
                <svg className="inline-block"  focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 14" width="32" height="9.5">
                    <g>
                        <g>
                            <g transform="translate(-1275.000000, -200.000000)">
                                <g  transform="translate(1275.000000, 200.000000)">
                                    <path fillRule="evenodd" clipRule="evenodd" fill="#000" d="M7.4,12.8h6.8l3.1-11.6H7.4C4.2,1.2,1.6,3.8,1.6,7S4.2,12.8,7.4,12.8z"></path>
                                </g>
                            </g>
                        </g>
                        <g>
                            <g transform="translate(-1275.000000, -200.000000)">
                                <g transform="translate(1275.000000, 200.000000)">
                                    <path fillRule="evenodd" clipRule="evenodd" fill="#01e2c2" d="M22.6,0H7.4c-3.9,0-7,3.1-7,7s3.1,7,7,7h15.2c3.9,0,7-3.1,7-7S26.4,0,22.6,0z M1.6,7c0-3.2,2.6-5.8,5.8-5.8
                                    h9.9l-3.1,11.6H7.4C4.2,12.8,1.6,10.2,1.6,7z">
                                    </path>
                                    <path id="x" fill="#000" d="M24.6,4c0.2,0.2,0.2,0.6,0,0.8l0,0L22.5,7l2.2,2.2c0.2,0.2,0.2,0.6,0,0.8c-0.2,0.2-0.6,0.2-0.8,0
                                    l0,0l-2.2-2.2L19.5,10c-0.2,0.2-0.6,0.2-0.8,0c-0.2-0.2-0.2-0.6,0-0.8l0,0L20.8,7l-2.2-2.2c-0.2-0.2-0.2-0.6,0-0.8
                                    c0.2-0.2,0.6-0.2,0.8,0l0,0l2.2,2.2L23.8,4C24,3.8,24.4,3.8,24.6,4z"></path>
                                    <path id="y" fill="#01e2c2" d="M12.7,4.1c0.2,0.2,0.3,0.6,0.1,0.8l0,0L8.6,9.8C8.5,9.9,8.4,10,8.3,10c-0.2,0.1-0.5,0.1-0.7-0.1l0,0
                                    L5.4,7.7c-0.2-0.2-0.2-0.6,0-0.8c0.2-0.2,0.6-0.2,0.8,0l0,0L8,8.6l3.8-4.5C12,3.9,12.4,3.9,12.7,4.1z"></path>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
                <p className="inline-block font-semibold text-[0.833rem] text-[#A2A2A2] ml-2">Manage Preferences</p>
               
            </div>
        </footer>
    )

}
export default Footer;