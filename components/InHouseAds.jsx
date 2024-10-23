import Link from "next/link";
import Image from "next/image";

//remove white-space
//

const InHouseAds = ({ad, size, orientation})=>
{

    
    return (
        <div className="border-black/[.1] p-[8px] lg:p-[10px]">
            <Link target="_blank" rel="noopener noreferrer" href={ad?.attributes?.url || "#"} className="w-full cursor pointer">

                <div className={`relative  ad_${size} border-black/[.3]  mx-auto overflow-hidden `} data-orientation={`${orientation || ""}`}>
                    <Image
                    
                
                    alt={ad?.attributes?.alternativeText || "advertisement image"} 
                    className={`${orientation === "vertical" ? "h-full w-auto":"w-full h-auto"} transition-all duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)] object-cover `} 
                    
                    src={
                        ad?.attributes?.image?.data?.attributes?.url ||
                        ad?.attributes?.image?.data?.attributes?.formats?.large?.url ||
                        ad?.attributes?.image?.data?.attributes?.formats?.medium?.url ||
                        ad?.attributes?.image?.data?.attributes?.formats?.small?.url ||
                        ad?.attributes?.image?.data?.attributes?.formats?.thumbnail?.url 

                        }
                    fill
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAusB9FD6Pn0AAAAASUVORK5CYII="
                    placeholder="blur"
                  
                    />
                    <div className="absolute top-4 left-4 drop-shadow-lg w-fit px-2  bg-[#f5f5f5] text-[0.69rem] font-bold tracking-[.05rem]">AD</div>
                </div>
            </Link>
        </div>
    )

}

export default InHouseAds;