import { Fragment } from "react";
import "../styles/globals.css";
import "../styles/main.css";
import Script from "next/script";


function MyApp({Component, pageProps})
{
    return(
        
          
        <Component {...pageProps}></Component>
        
    )
}


export default MyApp;