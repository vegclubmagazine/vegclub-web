import Layout from "../../defaults/Layout";




const Category = ({cat, meta}) =>
{
    return(
        <Layout>
            <div className="border-box pb-3 border-[#000]  w-[90%] mx-auto">
                <h1 className="uppercase italic font-semibold text-[1.44rem]">{cat?.title}</h1>
            </div>
            <div className="w-full border-[#cacaca] border-t-[1px]">
                    <ul className="grid grid-cols-1 auto-rows-fr">
                        <li className="border-[#CACACA] border-b-[1px]">
                            <div className="grid grid-cols-[60%_40%] h-full">
                                <div className="pt-[10px] pb-5 pl-[20px] text-black">
                                    
                                    <h1 className=" font-semibold">Title goes right here</h1>
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
                        <li className="border-[#CACACA] border-b-[1px]">
                            <div className="grid grid-cols-[60%_40%] h-full">
                                <div className="pt-[10px] pb-5 pl-[20px] text-black">
                                    
                                    <h1 className=" font-semibold">Title goes right here</h1>
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
                        
                        <li className="border-[#CACACA] border-b-[1px]">
                            <div className="grid grid-cols-[60%_40%] h-full">
                                <div className="pt-[10px] pb-5 pl-[20px] text-black">
                                    
                                    <h1 className=" font-semibold">Title goes right here</h1>
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
            <div className="w-fit mx-auto py-5">
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