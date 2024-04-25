import Moment from "react-moment";
import Link from "next/link";

const GenericArticleFormat = ({article}) =>
{
    return (
        <div className="flex  md:py-[40px] flex-row lg:grid lg:grid-cols-2  h-full">
                                    
            <div className="hidden  md:block min-w-[33%] w-[33.3%] lg:w-full aspect-[16/9] object-cover overflow-y-hidden max-h-[248px]">
                <img    className="w-full h-auto" 
                        src={   article?.attributes?.media?.data?.attributes?.url ||
                                article?.attributes?.media?.data?.attributes?.formats?.large?.url ||
                                article?.attributes?.media?.data?.attributes?.formats?.medium?.url ||
                                article?.attributes?.media?.data?.attributes?.formats?.small?.url ||
                                article?.attributes?.media?.data?.attributes?.formats?.thumbnail?.url 
                                
                            


                            }
                ></img>  
            </div>
            
            <div className="py-[20px] md:py-0 justify-center max-w-[653px] flex flex-col grow pl-[40px] lg:block  pr-[40px] md:pl-[20px] text-black">
                <h3 className = "text-[0.833rem] inline-block uppercase  font-semibold cursor-pointer w-fit duratin-[.34s] transition-all ease-[cubic-bezier(.19,1,.22,1)] hover:text-black/[.4]"><Link href={`/category/${article?.attributes?.category?.data?.attributes?.slug}`}>{article?.attributes?.category?.data?.attributes?.name}</Link></h3>                
                                
                <h1 className="article-title font-semibold mt-4 md:text-[1.44rem] lg:text-[1.728rem]"><span className="underline_span"><Link href={`/article/${article?.attributes?.slug}`}>{article?.attributes?.title}</Link></span></h1>
                <h2 className="hidden  mt-4 md:line-clamp-4">{article?.attributes?.description}</h2>
                <div className="mt-4 text-[0.833rem]">
                    <p className="inline-block uppercase font-light  mt-3 mr-1">{article?.attributes?.author?.data?.attributes?.name}</p>
                
                    <Moment className="inline-block font-semibold uppercase  text-[0.833rem]" format="Do MMM YYYY">{article?.attributes?.date}</Moment>
                </div>
            </div>
            <div>
                <div className="w-[150px] overflow-hidden md:hidden h-full md:h-auto md:w-[80%] md:mx-auto  aspect-square md:aspect-[16/9] mx-auto bg-[#CACACA]">
                    <img    className="h-full object-cover w-auto" 
                            src={   article?.attributes?.media?.data?.attributes?.url ||
                                    article?.attributes?.media?.data?.attributes?.formats?.large?.url ||
                                    article?.attributes?.media?.data?.attributes?.formats?.medium?.url ||
                                    article?.attributes?.media?.data?.attributes?.formats?.small?.url ||
                                    article?.attributes?.media?.data?.attributes?.formats?.thumbnail?.url 
                                    
                                


                                }
                    ></img>  
                </div>
            </div>

        </div>

    )
}


export default GenericArticleFormat;