import { Fragment } from "react";
import "../styles/globals.css";
import "../styles/main.css";
import Script from "next/script";


function MyApp({Component, pageProps})
{
    return(
        <Fragment>
            <Script 
            async 
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3431599940765829"
            crossOrigin="anonymous"
            ></Script>
            <Component {...pageProps}></Component>
        </Fragment>
    )
}


export default MyApp;