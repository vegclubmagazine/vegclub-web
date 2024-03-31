import { Fragment } from "react";
import "../styles/globals.css";
import "../styles/main.css";
import Script from "next/script";
import { GlobalProvider } from "../context/GlobalContext";


function MyApp({Component, pageProps})
{
    return(
        <GlobalProvider>
        
          
            <Component {...pageProps}></Component>
        </GlobalProvider>
        
    )
}


export default MyApp;