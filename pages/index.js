import Layout from "../defaults/Layout";


const Home = ({})=>{
    return(
        <Layout>
            <section className="block md:grid md:grid-cols-[2fr_1fr]">
                <div className="relative border-[#cacaca] border-r-[1px]">
                    <div className="w-full bg-[#CACACA] aspect-[16/9]">
                    </div>
                    <div className="relative inline-block  left-[10%] md:left-[0%] mt-[-50px] bg-[#000] text-start text-white w-[90%] md:w-[75%] lg:aspect-[4/3] lg:w-[50%] py-[30px]">
                        {/*<p className="w-full bg-[#000] text-start text-[#fff] border-box pl-1 text-[0.6rem]"> Damon Winter <span className="text-[#01e2c2] ml-2 mr-2">/</span> Vegclub Magazine <span className="text-[#01e2c2] ml-2 mr-2">/</span> Redux</p>*/}
                        <div className="w-[90%] mx-auto">
                            <p className="uppercase font-semibold italic">News</p>
                            <h1 className="mt-4 font-semibold  text-[1.44rem] lg:text-[1.728rem]">The Art World Before And After Thelma Golden</h1>
                            <h2 className="mt-4 text-[#a2a2a2] text-[1rem] lg:hidden">When Golden was a young curator in the nineties, her shows, centering Black artists, were unprecedented. Today, those artists are the stars of the art market.</h2>
                            <div className="mt-4 text-[0.833rem]">
                                <p className="inline-block  uppercase italic mr-1">Calvin Tommkins</p>
                                <span className="text-[#01e2c2]">/</span>
                                <p className="inline-block font-semibold uppercase italic"> 23 FEB 2024</p>
                            </div>
                        </div>
                    </div>
                    <div className="hidden lg:inline-block w-[50%]">
                        <div className="w-[90%] mx-auto">
                            <p>When Golden was a young curator in the nineties, her shows, centering Black artists, were unprecedented. Today, those artists are the stars of the art market.</p>
                        </div>
                    </div>
                </div>
                <div className="hidden md:grid md:grid-rows-2 lg:grid-rows-[60%_40%]">
                    <div className="border-[#cacaca] border-b-[1px]">
                        <div className="w-full aspect-[16/9]">
                            <div className="h-full bg-[#cacaca]"></div>
                        </div>
                        <div className="h-[50%] w-[90%] mx-auto">
                            <h1 className="mt-[3rem] font-semibold text-[1.44rem]">The Art World Before And After Thelma Golden </h1>
                            <div className="mt-4 text-[0.833rem]">
                                <p className="inline-block  uppercase italic mr-1">Calvin Tommkins</p>
                                <span className="text-[#01e2c2]">/</span>
                                <p className="inline-block font-semibold uppercase italic"> 23 FEB 2024</p>
                            </div>
                        </div>
                    </div>
                    <div className="border-[#cacaca]">
                        
                        <div className="mt-[3rem] w-[90%] mx-auto">
                            <h1 className=" font-semibold text-[1.44rem]">The Art World Before And After Thelma Golden</h1>
                            <div className="mt-4 text-[0.833rem]">
                                <p className="inline-block  uppercase italic mr-1">Calvin Tommkins</p>
                                <span className="text-[#01e2c2]">/</span>
                                <p className="inline-block font-semibold uppercase italic"> 23 FEB 2024</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*<section className="h-fit w-[90%] mx-auto border-box border-[#CACACA] border-b-[1px]  py-3 text-center">
                <p className="text-[0.634rem] text-[#CACACA] uppercase">Advertisement</p>
                <div className="mx-auto max-w-[450px] w-[80%] h-[90px] bg-[#CACACA] mt-2"></div>
            </section>*/}
            <section className="w-full  border-box h-fit pb-3">
                <div className="md:grid md:grid-cols-3">
                    {/*<h1 className=" text-center font-bold italic text-[1.44rem]">Recent stories</h1>*/}
                    
                        <div className="border-[#CACACA] border-b-[1px] md:border-r-[1px]">
                            <div className="grid grid-cols-[60%_40%] md:grid-cols-1 h-fit">
                                <div className="md:hidden pt-[10px] pb-5 ml-[5%] text-black">
                                    
                                    <h1 className=" font-semibold">Title goes right here</h1>
                                    <div className="mt-3 text-[0.833rem]">
                                        <p className="inline-block uppercase italic mt-3 mr-1">Author</p>
                                        <p className="inline-block uppercase italic font-semibold">23 feb 2024</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="h-full md:h-auto md:w-full aspect-square md:aspect-[16/9] mx-auto bg-[#CACACA]">

                                    </div>
                                </div>
                                <div className="hidden md:block w-[90%] mt-4 mx-auto pb-3">
                               
                                    <h1 className="font-semibold text-[1.44rem] ">The Art World Before And After Thelma Golden</h1>
                                    <div className="mt-4 text-[0.833rem]">
                                        <p className="inline-block  uppercase italic mr-1">Calvin Tommkins</p>
                                        <span className="text-[#01e2c2]">/</span>
                                        <p className="inline-block font-semibold uppercase italic"> 23 FEB 2024</p>
                                    </div>
                        
                                </div>

                            </div>
                        </div>
                        <div className="border-[#CACACA] border-b-[1px] border-r-[1px]">
                            <div className="grid grid-cols-[60%_40%] md:grid-cols-1 h-fit">
                                <div className="md:hidden pt-[10px] pb-5 ml-[5%] text-black">
                                    
                                    <h1 className=" font-semibold">Title goes right here</h1>
                                    <div className="mt-3 text-[0.833rem]">
                                        <p className="inline-block uppercase italic mt-3 mr-1">Author</p>
                                        <p className="inline-block uppercase italic font-semibold">23 feb 2024</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="h-full md:h-auto md:w-full aspect-square md:aspect-[16/9] mx-auto bg-[#CACACA]">

                                    </div>
                                </div>
                                <div className="hidden md:block w-[90%] mt-4 mx-auto pb-3">
                               
                                    <h1 className="font-semibold text-[1.44rem]">The Art World Before And After Thelma Golden</h1>
                                    <div className="mt-4 text-[0.833rem]">
                                        <p className="inline-block  uppercase italic mr-1">Calvin Tommkins</p>
                                        <span className="text-[#01e2c2]">/</span>
                                        <p className="inline-block font-semibold uppercase italic"> 23 FEB 2024</p>
                                    </div>
                        
                                </div>

                            </div>
                        </div>
                        
                        <div className="border-[#CACACA] border-b-[1px]">
                            <div className="grid grid-cols-[60%_40%] md:grid-cols-1 h-fit">
                                <div className="md:hidden pt-[10px] pb-5 ml-[5%] text-black">
                                    
                                    <h1 className=" font-semibold">Title goes right here</h1>
                                    <div className="mt-3 text-[0.833rem]">
                                        <p className="inline-block uppercase italic mt-3 mr-1">Author</p>
                                        <p className="inline-block uppercase italic font-semibold">23 feb 2024</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="h-full md:h-auto md:w-full aspect-square md:aspect-[16/9] mx-auto bg-[#CACACA]">

                                    </div>
                                </div>
                                <div className="hidden md:block w-[90%] mt-4 mx-auto pb-3">
                               
                                    <h1 className="font-semibold text-[1.44rem]">The Art World Before And After Thelma Golden</h1>
                                    <div className="mt-4 text-[0.833rem]">
                                        <p className="inline-block  uppercase italic mr-1">Calvin Tommkins</p>
                                        <span className="text-[#01e2c2]">/</span>
                                        <p className="inline-block font-semibold uppercase italic"> 23 FEB 2024</p>
                                    </div>
                        
                                </div>

                            </div>
                        </div>
                    
                </div>
            </section>
            <section className="h-fit w-full  border-box border-[#CACACA] border-b-[1px]  pt-3 pb-4 text-center">
                <p className="text-[0.634rem] text-[#CACACA] uppercase">Advertisement</p>
                <div className="mx-auto max-w-[450px] w-[80%] h-[90px] bg-[#CACACA] mt-2"></div>
            </section>
            <section className="w-full">
                <div className="w-full border-[#cacaca] border-b-[1px] pb-[2rem] md:pb-0">
                    <div className="bg-[#000] w-full">
                    
                        <div className="md:inline-block w-[90%] mx-auto md:ml-[5%] h-fit md:w-[40%] pt-[20px] pb-[80px]">
                            <h3 className = "text-white article-title inline-block uppercase italic font-semibold cursor-pointer w-fit"><span className="underline_span">News</span>
                                
                            </h3>
                            <h1 className="text-[1.44rem] text-white mt-4 font-semibold">The Art World Before And After Thelma Golden</h1>
                            {/*<div className="h-fit w-fit inline-block align-middle">
                                <i className=" inline-block cursor-pointer ml-2 h-[10px] w-[10px] border-[#40e0d0] border-t-[1px] border-r-[1px] rotate-45"></i>
                            </div>*/}
                            <p className="mt-4 text-[#a2a2a2] text-[1rem]">When Golden was a young curator in the nineties, her shows, centering Black artists, were unprecedented. Today, those artists are the stars of the art market.</p>

                            <div className="mt-4 text-white text-[0.833rem]">
                                <p className="inline-block uppercase italic mr-1">Calvin Tommkins</p>
                                <span className="text-[#01e2c2]">/</span>
                                <p className="inline-block font-semibold uppercase italic"> 23 FEB 2024</p>
                            </div>
                        </div>
                        <div className="hidden md:inline-block w-[50%] align-top aspect-[16/9] ml-[2.5%] bg-[#cacaca]"></div>
                    </div>
                    <div className="block md:hidden aspect-[16/9]  w-[90%]  mx-auto  mt-[-50px] bg-[#CACACA]"></div>
                </div>
                <div className="border-[#CACACA]  md:w-[80%] md:border-r-[1px]">
                    <ul className="list-none text-start">
                        
                        <li className="border-[#CACACA] border-b-[1px]">
                            <div className="grid grid-cols-[60%_40%] md:grid-cols-[55%_45%] h-full">
                                <div className="pt-[10px] pb-5 ml-[5%] md:mx-auto md:w-[80%] text-black">
                                    
                                    <h1 className="font-semibold md:text-[1.44rem]">The Art World Before And After</h1>
                                    <h2 className="hidden md:block mt-4">When Golden was a young curator in the nineties, her shows, centering Black artists, were unprecedented. Today, those artists are the stars of the art market.</h2>
                                    <div className="mt-4 text-[0.833rem]">
                                        <p className="inline-block uppercase italic mt-3 mr-1">Author</p>
                                        <p className="inline-block uppercase italic font-semibold">23 feb 2024</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="h-full md:h-auto md:w-[80%] md:mx-auto  aspect-square md:aspect-[16/9] mx-auto bg-[#CACACA]">

                                    </div>
                                </div>

                            </div>
                        </li>
                        
                        <li className="border-[#CACACA] border-b-[1px]">
                            <div className="grid grid-cols-[60%_40%] md:grid-cols-[55%_45%] h-full">
                                <div className="pt-[10px] pb-5 ml-[5%] md:mx-auto md:w-[80%] text-black">
                                    
                                    <h1 className="font-semibold md:text-[1.44rem]">The Art World Before And After</h1>
                                    <h2 className="hidden md:block mt-4">When Golden was a young curator in the nineties, her shows, centering Black artists, were unprecedented. Today, those artists are the stars of the art market.</h2>
                                    <div className="mt-4 text-[0.833rem]">
                                        <p className="inline-block uppercase italic mt-3 mr-1">Author</p>
                                        <p className="inline-block uppercase italic font-semibold">23 feb 2024</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="h-full md:h-auto md:w-[80%] md:mx-auto  aspect-square md:aspect-[16/9] mx-auto bg-[#CACACA]">

                                    </div>
                                </div>

                            </div>
                        </li>
                        
                        
                        <li className="border-[#CACACA] border-b-[1px]">
                            <div className="grid grid-cols-[60%_40%] md:grid-cols-[55%_45%] h-full">
                                <div className="pt-[10px] pb-5 ml-[5%] md:mx-auto md:w-[80%] text-black">
                                    
                                    <h1 className="font-semibold md:text-[1.44rem]">The Art World Before And After</h1>
                                    <h2 className="hidden md:block mt-4">When Golden was a young curator in the nineties, her shows, centering Black artists, were unprecedented. Today, those artists are the stars of the art market.</h2>
                                    <div className="mt-4 text-[0.833rem]">
                                        <p className="inline-block uppercase italic mt-3 mr-1">Author</p>
                                        <p className="inline-block uppercase italic font-semibold">23 feb 2024</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="h-full md:h-auto md:w-[80%] md:mx-auto  aspect-square md:aspect-[16/9] mx-auto bg-[#CACACA]">

                                    </div>
                                </div>

                            </div>
                        </li>
                        
                    </ul>
                </div>
            </section>
            <section className="w-full">
                <div className="w-full border-[#cacaca] border-b-[1px] pb-[2rem] md:pb-0">
                    <div className="bg-[#000] w-full">
                    
                        <div className="md:inline-block mx-auto w-[90%]  h-fit  md:ml-[5%] md:w-[40%] pt-[20px] pb-[80px]">
                            <h3 className = "text-white article-title inline-block uppercase italic font-semibold cursor-pointer w-fit"><span className="underline_span">Lifestyle & Food</span>
                                
                            </h3>
                            <h1 className="text-[1.44rem] text-white mt-4 font-semibold">The Art World Before And After Thelma Golden</h1>
                            {/*<div className="h-fit w-fit inline-block align-middle">
                                <i className=" inline-block cursor-pointer ml-2 h-[10px] w-[10px] border-[#40e0d0] border-t-[1px] border-r-[1px] rotate-45"></i>
                            </div>*/}
                            <p className="mt-4 text-[#a2a2a2] text-[1rem]">When Golden was a young curator in the nineties, her shows, centering Black artists, were unprecedented. Today, those artists are the stars of the art market.</p>

                            <div className="mt-4 text-white text-[0.833rem]">
                                <p className="inline-block uppercase italic mr-1">Calvin Tommkins</p>
                                <span className="text-[#01e2c2]">/</span>
                                <p className="inline-block font-semibold uppercase italic"> 23 FEB 2024</p>
                            </div>
                        </div>
                        <div className="hidden md:inline-block w-[50%] align-top aspect-[16/9] ml-[2.5%] bg-[#cacaca]"></div>
                    </div>
                    <div className="block md:hidden aspect-[16/9]  w-[90%]  mx-auto  mt-[-50px] bg-[#CACACA]"></div>
                </div>
                <div className="border-[#CACACA]  md:w-[80%] md:border-r-[1px]">
                    <ul className="list-none text-start">
                        
                        <li className="border-[#CACACA] border-b-[1px]">
                            <div className="grid grid-cols-[60%_40%] md:grid-cols-[55%_45%] h-full">
                                <div className="pt-[10px] pb-5 ml-[5%] md:mx-auto md:w-[80%] text-black">
                                    
                                    <h1 className="font-semibold md:text-[1.44rem]">The Art World Before And After</h1>
                                    <h2 className="hidden md:block mt-4">When Golden was a young curator in the nineties, her shows, centering Black artists, were unprecedented. Today, those artists are the stars of the art market.</h2>
                                    <div className="mt-4 text-[0.833rem]">
                                        <p className="inline-block uppercase italic mt-3 mr-1">Author</p>
                                        <p className="inline-block uppercase italic font-semibold">23 feb 2024</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="h-full md:h-auto md:w-[80%] md:mx-auto  aspect-square md:aspect-[16/9] mx-auto bg-[#CACACA]">

                                    </div>
                                </div>

                            </div>
                        </li>
                        
                        <li className="border-[#CACACA] border-b-[1px]">
                            <div className="grid grid-cols-[60%_40%] md:grid-cols-[55%_45%] h-full">
                                <div className="pt-[10px] pb-5 ml-[5%] md:mx-auto md:w-[80%] text-black">
                                    
                                    <h1 className="font-semibold md:text-[1.44rem]">The Art World Before And After</h1>
                                    <h2 className="hidden md:block mt-4">When Golden was a young curator in the nineties, her shows, centering Black artists, were unprecedented. Today, those artists are the stars of the art market.</h2>
                                    <div className="mt-4 text-[0.833rem]">
                                        <p className="inline-block uppercase italic mt-3 mr-1">Author</p>
                                        <p className="inline-block uppercase italic font-semibold">23 feb 2024</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="h-full md:h-auto md:w-[80%] md:mx-auto  aspect-square md:aspect-[16/9] mx-auto bg-[#CACACA]">

                                    </div>
                                </div>

                            </div>
                        </li>
                        
                        
                        <li className="border-[#CACACA] border-b-[1px]">
                            <div className="grid grid-cols-[60%_40%] md:grid-cols-[55%_45%] h-full">
                                <div className="pt-[10px] pb-5 ml-[5%] md:mx-auto md:w-[80%] text-black">
                                    
                                    <h1 className="font-semibold md:text-[1.44rem]">The Art World Before And After</h1>
                                    <h2 className="hidden md:block mt-4">When Golden was a young curator in the nineties, her shows, centering Black artists, were unprecedented. Today, those artists are the stars of the art market.</h2>
                                    <div className="mt-4 text-[0.833rem]">
                                        <p className="inline-block uppercase italic mt-3 mr-1">Author</p>
                                        <p className="inline-block uppercase italic font-semibold">23 feb 2024</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="h-full md:h-auto md:w-[80%] md:mx-auto  aspect-square md:aspect-[16/9] mx-auto bg-[#CACACA]">

                                    </div>
                                </div>

                            </div>
                        </li>
                        
                    </ul>
                </div>
            </section>
        </Layout>
    )
}


export default Home;