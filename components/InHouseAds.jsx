import Link from "next/link";
//remove white-space
//

const InHouseAds = ({ad})=>
{
    return (
        <div className="border-black/[.1] py-5 border-b-[1px]">
            <Link href={ad?.attributes?.url} className="w-fit cursor pointer">
                <div className="text-[0.694rem] w-fit mx-auto text-[#CACACA] uppercase">Advertisement</div>

                <div className="mt-3 relative w-fit mx-auto  my-3 bg-[#cacaca]">
                    <img src={ad?.attributes?.image?.data?.attributes?.url}/>
                </div>
            </Link>
        </div>
    )

}

export default InHouseAds;