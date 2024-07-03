import Link from "next/link";
//remove white-space
//

const InHouseAds = ({ad, size, orientation})=>
{
    
    
    return (
        <div className="border-black/[.1] p-[8px] lg:p-[10px]">
            <Link target="_blank" rel="noopener noreferrer" href={ad?.attributes?.url || "#"} className="w-full cursor pointer">

                <div className={`relative  ad_${size} border-black/[.3]  mx-auto overflow-hidden`} data-orientation={`${orientation || ""}`}>
                    <img className={`${orientation === "vertical" ? "h-full w-auto":"w-full h-auto"} object-cover`} src={ad?.attributes?.image?.data?.attributes?.url}/>
                    <div className="absolute top-4 left-4 drop-shadow-lg w-fit px-2  bg-[#f5f5f5] text-[0.69rem] font-bold tracking-[.05rem]">Ads</div>
                </div>
            </Link>
        </div>
    )

}

export default InHouseAds;