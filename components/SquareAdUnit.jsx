import {useEffect} from "react";


const SquareAdUnit = ()=>
{
    useEffect(()=>{
        (window.adsByGoogle = window.adsByGoogle || []).push({})
    }, [])

    return (
        <div className="w-fit mx-auto">
            <ins className="adsbygoogle inline-block w-[300px] h-[250px]"
                
               /* data-ad-client="ca-pub-3431599940765829"
                data-ad-slot="9071372288"*/></ins>
        </div>
    )
}

export default SquareAdUnit;