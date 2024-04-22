import Link from "next/link";
//remove white-space
//

const InHouseAds = ({ad})=>
{
    return (
        <div className="border-black/[.1] border-b-[1px]">
            <Link href={ad?.attributes?.url} className="w-full cursor pointer">
                {/*<div className="text-[0.694rem] w-fit mx-auto text-[#CACACA] uppercase">Advertisement</div>*/}

                <div className={`relative w-full mx-auto overflow-hidden   bg-[#cacaca]`}>
                    <img className="w-fit h-auto object-cover" src={ad?.attributes?.image?.data?.attributes?.url}/>
                    <div className="absolute right-3 bottom-3 px-3 bg-black text-white text-[0.833rem] font-semibold uppercase">Advertisment</div>
                </div>
            </Link>
        </div>
    )

}

export default InHouseAds;