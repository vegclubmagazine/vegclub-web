import {useEffect} from "react";


const AdUnit = ()=>
{

    useEffect(()=>
    {
        (window.adsByGoogle = window.adsByGoogle || []).push({})

    })
    return (
        <div className="w-fit mx-auto">
            <ins className="adsbygoogle inline-block w-[320px] h-[50px] md:w-[728px] md:h-[90px] lg:w-[970px] lg:h-[250px]"
            
            /*data-ad-client="ca-pub-3431599940765829"
            data-ad-slot="4585332363"
            data-ad-format="rectangle horizontal"*/
            >


            </ins>

        </div>
    )
}


export default AdUnit;