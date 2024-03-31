import Layout from "../defaults/Layout";
import {API} from "../config/api.js";

const parse = require("html-react-parser");


const About = ({about}) =>
{
    return (
        <Layout title="About | Vegclub magazine"
                desc="Vegclub magazine was founded with a passion for advocating the many benefits of living a vegan lifestyle, and sharing that passion with readers worldwide."
        >
            <main className="w-[90%] lg:w-4/5 mx-auto mt-3">
                <h1 className="text-[2.042rem] lg:text-[2.488rem] uppercase">About</h1>
                <div className="lg:text-[1.2rem] pt-3">
                    {parse(about)}
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
        about: data?.data?.attributes?.about,
      },
      revalidate: 10,
    };
}

export default About;
