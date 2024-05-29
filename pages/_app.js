import { Fragment } from "react";
import "../styles/globals.css";
import "../styles/main.css";
import Script from "next/script";
import { GlobalProvider } from "../context/GlobalContext";


function MyApp({Component, pageProps})
{
    return(
        <>
            <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-968FBW9QX9"/>
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-968FBW9QX9');`
                }
            </Script>
            <GlobalProvider>
            
            
            
                <Component {...pageProps}></Component>

            </GlobalProvider>
        </>
            
        
        
    )
}


export default MyApp;