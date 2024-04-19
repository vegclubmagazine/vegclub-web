import Layout from "../defaults/Layout";
import {API} from "../config/api.js";

import parse from "html-react-parser";


const About = ({about}) =>
{
    return (
        <Layout title="About Us | Vegclub magazine"
                desc="Vegclub magazine was founded with a passion for advocating the many benefits of living a vegan lifestyle, and sharing that passion with readers worldwide."
        >
            <main className="border-black/[.1]">
                <div className="pt-[40px] pl-[40px] pb-5 border-[1px]">
                    <h1 className="text-[1.728rem] font-semibold md:text-[2.074rem] uppercase">About Us</h1>
                </div>
                <div className="lg:text-[1.2rem] pt-5 px-[40px]">
                    {about && (parse(about))}
                </div>
            </main>
        </Layout>
    )
}


export async function getStaticProps() {
    const response = await fetch(`${API}/about`);
    const data = await response.json();
  
    return {
      props: {
        about: data?.data?.attributes?.about || null,
      },
      revalidate: 10,
    };
}

export default About;

