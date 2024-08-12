import Layout from "../../defaults/Layout";
import Link from "next/link";



const PrivacyPolicy =({}) =>
{
    return (

        <Layout title="VegClub Magazine | Privacy Policy">
            <div className="lg:grid lg:grid-cols-[1fr_3fr] pt-[40px] sm:pl-[40px] sm:pr-[80px]">
                <h1 className="col-start-2 w-full pl-[40px] text-start text-[2.074rem] md:text-[2.488rem] font-bold">Privacy Policy</h1>
            </div>
            <main className="grid lg:grid-cols-[1fr_3fr]  py-[40px] pl-[40px] pr-[40px] sm:pr-[80px] min-h-screen">
                <nav className="hidden lg:block">
                    <ul className="sticky border-r-[1px] border-black/[.1] h-fit pr-[10px] top-[12rem] list-decimal list-inside font-bold text-[1.2rem]">
                        <li className="">
                            <Link className="ml-3 ease-[cubic-bezier(.19,1,.22,1)] duration-[.34s] hover:text-black/[.6]" href="#anchor-sxn1">Information we collect</Link>
                        </li>
                        <li className="pt-5">
                            <Link className="ml-3 ease-[cubic-bezier(.19,1,.22,1)] duration-[.34s] hover:text-black/[.6]"  href="#anchor-sxn2">How we use your information</Link>
                        </li>
                        <li className="pt-5">
                            <Link className="ml-3 ease-[cubic-bezier(.19,1,.22,1)] duration-[.34s] hover:text-black/[.6]"  href="#anchor-sxn3">Data sharing and disclosure</Link>
                        </li>
                       
                        <li className="pt-5">
                            <Link className="ml-3 ease-[cubic-bezier(.19,1,.22,1)] duration-[.34s] hover:text-black/[.6]"  href="#anchor-sxn4">Data security</Link>
                        </li>
                        <li className="pt-5">
                            <Link className="ml-3 ease-[cubic-bezier(.19,1,.22,1)] duration-[.34s] hover:text-black/[.6]"  href="#anchor-sxn5">Your rights</Link>
                        </li>
                        <li className="pt-5">
                            <Link className="ml-3 ease-[cubic-bezier(.19,1,.22,1)] duration-[.34s] hover:text-black/[.6]"  href="#anchor-sxn6">Cookies</Link>
                        </li>
                        <li className="pt-5">
                            <Link className="ml-3 ease-[cubic-bezier(.19,1,.22,1)] duration-[.34s] hover:text-black/[.6]"  href="#anchor-sxn7">Changes to this privacy policy</Link>
                        </li>
                        <li className="pt-5">
                            <Link className="ml-3 ease-[cubic-bezier(.19,1,.22,1)] duration-[.34s] hover:text-black/[.6]"  href="#anchor-sxn8">Contact us</Link>
                        </li>
                    </ul>
                </nav>
                <main className="text-[1rem] sm:pl-[40px]">
                    <p className="">Welcome to VegClub Magazine! We value your privacy and are committed to protecting your personal information. This privacy policy outlines how we collect, use and safeguard your data.</p>
                    <a className="block relative invisible top-[-7rem]" name="anchor-sxn1" ></a>
                    <section  className="mt-[40px]">
                        <h2 className="text-[1.728rem] font-bold">Information we collect</h2>
                        <div className="mt-5">
                            We may collect the following types of information:
                            <br></br>
                            <ul className="list-disc text-[#01e2c2] pl-[20px]">
                                <li className="mt-3">
                                    <p className="text-black">Personal information: Name, email address and other contact details when you subscribe to
                                    our magazine, newsletter or contact us.</p>
                                </li>
                                <li className="mt-3">
                                    <p className="text-black">Usage data: Information on how you access and use our website, including your IP address,
                                    browser type and operating system.</p>
                                </li>
                            </ul>
                        </div>
                    </section>
                    <a className="block relative invisible top-[-7rem]" name="anchor-sxn2" ></a>

                    <section  className="mt-[40px]">
                        <h2 className="text-[1.728rem] font-bold">How we use your information</h2>
                        <div className="mt-5">
                            We use your information for the following purposes:
                            <br></br>
                            <ul className="list-disc text-[#01e2c2] pl-[20px]">
                                <li className="mt-3">
                                    <p className="text-black">To provide and maintain our magazine and website.</p>
                                </li>
                                <li className="mt-3">
                                    <p className="text-black">To send newsletters, promotional materials and other communications you have subscribed
                                    to.</p>
                                </li>
                                <li className="mt-3">
                                    <p className="text-black">To improve our services and website functionality.</p>
                                </li>
                                <li className="mt-3">
                                    <p className="text-black">To respond to your enquiries and provide customer support.</p>
                                </li>
                            </ul>
                        </div>
                    </section>
                    <a className="block relative invisible top-[-7rem]" name="anchor-sxn3" ></a>

                    <section id="sxn3" className="mt-[40px]">
                        <h2 className="text-[1.728rem] font-bold">Data sharing and disclosure</h2>
                        <div className="mt-5">
                        We do not sell or rent your personal information to third parties. We may share your information with:
                            <br></br>
                            <ul className="list-disc text-[#01e2c2] pl-[20px]">
                                <li className="mt-3">
                                    <p className="text-black">Service providers who assist us in operating our website and providing our services.</p>
                                </li>
                                <li className="mt-3">
                                    <p className="text-black">Legal authorities if required by law or to protect our rights.</p>
                                </li>
                               
                            </ul>
                        </div>
                    </section>
                    <a className="block relative invisible top-[-7rem]" name="anchor-sxn4" ></a>

                    <section id="sxn4" className="mt-[40px]">
                        <h2 className="text-[1.728rem] font-bold">Data security</h2>
                        <p className="mt-5">
                        We implement appropriate security measures to protect your personal information from unauthorised access, alteration or destruction. However, no method of transmission over the Internet is completely secure and we cannot guarantee absolute security.
                            
                        </p>
                    </section>
                    <a className="block relative invisible top-[-7rem]" name="anchor-sxn5" ></a>

                    <section id="sxn5" className="mt-[40px]">
                        <h2 className="text-[1.728rem] font-bold">Your rights</h2>
                        <div className="mt-5">
                        You have the right to:
                            <br></br>
                            <ul className="list-disc text-[#01e2c2] pl-[20px]">
                                <li className="mt-3">
                                    <p className="text-black">Access and update your personal information.</p>
                                </li>
                                <li className="mt-3">
                                    <p className="text-black">Unsubscribe from our communications at any time.</p>
                                </li>
                                <li className="mt-3">
                                    <p className="text-black">Request the deletion of your personal data, subject to legal obligations.</p>
                                </li>
                               
                            </ul>
                        </div>
                    </section>
                    <a className="block relative invisible top-[-7rem]" name="anchor-sxn6" ></a>

                    <section id="sxn6" className="mt-[40px]">
                        <h2 className="text-[1.728rem] font-bold">Cookies</h2>
                        <p className="mt-5">
                        We use cookies to enhance your browsing experience. Cookies are small files stored on your device that help us analyse web traffic and improve our website. You can control cookie preferences through your browser settings.

                            
                        </p>
                    </section>
                    <a className="block relative invisible top-[-7rem]" name="anchor-sxn7" ></a>

                    <section id="sxn7" className="mt-[40px]">
                        <h2 className="text-[1.728rem] font-bold">Changes to this privacy policy</h2>
                        <p className="mt-5">
                        We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on our website. Please review this policy periodically for any updates.
                            
                        </p>
                    </section>
                    <a className="block relative invisible top-[-7rem]" name="anchor-sxn8" ></a>

                    <section id="sxn8" className="mt-[40px]">
                        <h2 className="text-[1.728rem] font-bold">Contact us</h2>
                        <div className="mt-5">
                        If you have any questions or concerns about this privacy policy, please contact us at:
                    
                        <div className="my-3">
                            VegClub Magazine
                            <div className="">Email:<span><Link href="mailto:contact@vegclubmagazine.com">contact@vegclubmagazine.com</Link></span></div>
                        </div>
                        <div className="my-3">Thank you for trusting VegClub Magazine with your personal information. We are committed to safeguarding your privacy and ensuring a safe online experience.
                        </div>   
                       
                        
                        By using our website and subscribing to our services, you agree to the terms outlined in this privacy policy.

                        </div>
                    </section>
                </main>
                
            </main>
        </Layout>

    )
}


export default PrivacyPolicy;