

const Loader = ()=>
{
    const loading_txt = "loading!";
    const text_arr = loading_txt.split("");
    return (
        <div className="relative">
            <div className="w-fit mx-auto z-[1] w-[8rem] font-extralight uppercase text-[1.44rem]   md:text-[1.728rem] h-[8rem] rounded-[50%] relative text-ring">
                
                {text_arr.map((letter, index) =>(
                    <span key={index}  style={{"--index": index}}>{letter}</span>
                ))}
                
                
                {text_arr.map((letter, index) =>(
                    <span key={index}  style={{"--oindex": index}}>{letter}</span>
                ))}
              


            </div>
            <div className="absolute w-fit z-[2] left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%]">
                <div className="w-[2px] mx-auto bg-black h-[1.5rem]"></div>
                <div className="w-[1.4rem] h-[1.4rem] border-b-[2px] mt-[-1.5rem] border-r-[2px] border-black rotate-[45deg]"></div>
            </div>
        </div>
    )
}


export default Loader;