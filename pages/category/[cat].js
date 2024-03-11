import Layout from "../../defaults/Layout";




const Category = ({cat, meta}) =>
{
    return(
        <Layout>
            <div className="pb-3 border-[#cacaca]  w-[90%] md:w-full md:pb-3 pt-[5rem] md:border-b-[1px] mx-auto">
                <h1 className="uppercase italic font-semibold pl-[15px] text-[1.44rem] md:text-[1.728rem] lg:text-[2.0728rem]">{cat?.title}</h1>
            </div>
            <div className="w-full border-[#cacaca] border-t-[1px] md:border-t-0 md:border-r-[1px] md:w-[60%]">
                    <ul className="grid grid-cols-1 auto-rows-fr">
                        <li className="border-[#CACACA] border-b-[1px]">
                            <div className="grid grid-cols-[60%_40%] h-full">
                                <div className="w-[90%] h-fit relative top-[50%] translate-y-[-50%] mx-auto pb-5 text-black">
                                    
                                    <h1 className=" font-semibold md:text-[1.44rem]">Title goes right here</h1>
                                    <p className="hidden text-[1.2rem] lg:block mt-3">article description goes here</p>
                                    <div className="mt-3 text-[0.833rem]">
                                        <p className="inline-block uppercase italic mt-3 mr-1">Author</p>
                                        <p className="inline-block uppercase italic font-semibold">23 feb 2024</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="h-full aspect-square mx-auto bg-[#CACACA] md:h-auto overflow-hidden md:w-full">

                                    </div>
                                </div>

                            </div>
                        </li>
                        <li className="border-[#CACACA] border-b-[1px]">
                            <div className="grid grid-cols-[60%_40%] h-full">
                                <div className="w-[90%] h-fit relative top-[50%] translate-y-[-50%] mx-auto pb-5 text-black">
                                    
                                    <h1 className=" font-semibold md:text-[1.44rem]">Title goes right here</h1>
                                    <p className="hidden text-[1.2rem] lg:block mt-3">article description goes here</p>
                                    <div className="mt-3 text-[0.833rem]">
                                        <p className="inline-block uppercase italic mt-3 mr-1">Author</p>
                                        <p className="inline-block uppercase italic font-semibold">23 feb 2024</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="h-full aspect-square mx-auto bg-[#CACACA]">

                                    </div>
                                </div>

                            </div>
                        </li>
                        
                        <li className="border-[#CACACA]">
                            <div className="grid grid-cols-[60%_40%] h-full">
                                <div className="w-[90%] h-fit relative top-[50%] translate-y-[-50%] mx-auto pb-5 text-black">
                                    
                                    <h1 className=" font-semibold md:text-[1.44rem]">Title goes right here</h1>
                                    <p className="hidden text-[1.2rem] lg:block mt-3">article description goes here</p>
                                    <div className="mt-3 text-[0.833rem]">
                                        <p className="inline-block uppercase italic mt-3 mr-1">Author</p>
                                        <p className="inline-block uppercase italic font-semibold">23 feb 2024</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="h-full aspect-square mx-auto bg-[#CACACA]">

                                    </div>
                                </div>

                            </div>
                        </li>
                        
                    </ul>

            </div>
            <div className="w-fit mx-auto border-[#cacaca] md:border-t-[1px] py-5 md:w-full md:text-center md:">
               {meta?.page > 1 && (<div className="inline-block cursor-pointer  mr-3  underline italic uppercase font-semibold">newer</div>)}
               <div className="w-fit inline-block align-middle  italic uppercase font-semibold">
                    <div className="text-center ">
                        {meta?.page}
                    </div>
                    <div className="text-center  border-[#000] border-t-[3px]">
                        {meta?.pageCount}
                    </div>
               </div>
               {meta?.page >= meta?.pageCount || (<div className="inline-block ml-3 cursor-pointer  underline italic uppercase font-semibold">older</div>)}
            </div>
        </Layout>

    )
}

export default Category;

Category.defaultProps = 
{
    cat: {
        title:"Fashion & Lifestyle",
        slug: "fashion-and-lifestyle",
    },
    meta:{
        page:1,
        pageCount:30,
    },
};