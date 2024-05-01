import Link from "next/link";
//remove white-space
//

const InHouseAds = ({ad, size, orientation})=>
{
    
    
    return (
        <div className="border-black/[.1]">
            <Link href={ad?.attributes?.url || "#"} className="w-full cursor pointer">

                <div className={`relative  w-[280px] h-[280px] ad_${size} border-black/[.3]  mx-auto overflow-hidden`} data-orientation={`${orientation || ""}`}>
                    <img className={`${orientation === "vertical" ? "h-full w-auto":"w-full h-auto"} object-cover`} src={ad?.attributes?.image?.data?.attributes?.url}/>
                    <div className="absolute top-3 left-2 drop-shadow-lg w-fit px-2 rounded-md bg-[#f5f5f5] text-[0.69rem] tracking-[.05rem]">Ad</div>
                </div>
            </Link>
        </div>
    )

}

export default InHouseAds;