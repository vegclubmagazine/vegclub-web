import Layout from "../defaults/Layout";
import {useRef, useEffect, useCallback, useState} from "react";

import * as topojson from "topojson-client";
import * as d3 from "d3";

import * as projections from "d3-geo-projection";
import versor from "versor";

// europe with orthanoganic projection of sphere
    /** 
         prehaps just zoom and crop canvas


    */
// fix drag issue
// better overall design

// team page revamp
// contact page
// about page


const drag = (projection) =>
{
    let v0,
        q0,
        r0,
        a0,
        l;
    
    
    function pointer(event, that){
        const t = d3.pointers(event,that);

        if(t.length !== l){
            l = t.length;
            if(l > 1) a0 = Math.atan2(t[1][1] - t[0][1], t[1][0] - t[0][0])
            dragstarted.apply(that, [event,that])
        }

        if(l>1){
            const x = d3.mean(t, p=> p[0]);
            const y = d3.mean(t, p => p[1]);
            const a = Math.atan2(t[1][1] - t[0][1], t[1][0] - t[0][0])
            return [x,y,a];
        }

        return t[0];
    }
    
    function dragstarted(event)
    {
       
        v0 = versor.cartesian(projection.invert([event.x,event.y]));
        r0 = projection.rotate();
        q0 = versor(r0);
    }

    function dragged(event)
    {
        var v1 = versor.cartesian(projection.rotate(r0).invert([event.x,event.y]))
            q1 = versor.multiply(q0, versor.delta(v0,v1)),
            r1 = versor.rotation(q1);

        console.log(r1, r0);
        projection.rotate(r1)
        render();

       /* const p = pointer(event, this);
        if(p[2]){
            const d = (p[2] - a0)/2;
            const s = -Math.sin(d);
            const c = Math.sign(Math.cos(d));
            q1 = versor.multiply([Math.sqrt(1 - s * s),0,0,c * s], q1)
        }

        projection.rotate(versor.rotation(q1));


        if(delta[0] < 0.7)dragstarted.apply(this, [event,this])*/
    
    
    }  
    
    return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged);
}

const height = (w, outline,projection) =>
{
    const [[x0,y0], [x1,y1]] = d3.geoPath(projection.fitWidth(w,outline)).bounds(outline);
    const dy = Math.ceil(y1 - y0),
          l =  Math.min(Math.ceil(x1 - x0), dy);
    projection.scale(projection.scale() * ((l - 1)/l)).precision(0.2);
    return dy;
    
}

 const CallToAct = ()=>
{
    
    var render = function(){},
        v0,
        r0,
        q0;
 
    const scrollYThresholdRef = useRef();
   
    const [isScrollPassedThreshold, setIsScrollPassedThreshold] = useState(false);
    const w = 600,
          h = 600;
    
    const mapCnvsRef = useRef();
    

    const outline = ({type: "Sphere"});
    
          
    const projection =  d3.geoMercator()
        .center([13, 52])
        .translate([w/2, h/2])
        .scale(w/(1.5));
        
    function dragstarted(event)
    {
        
        v0 = versor.cartesian(projection.invert([event.x - this.offsetLeft,event.y - this.offsetTop]));
        
        r0 = projection.rotate();
        
        q0 = versor(r0);
        
    }
    
    function dragged(event)
    {
       
        var v1 = versor.cartesian(projection.rotate(r0).invert([event.x - this.offsetLeft,event.y - this.offsetTop])),
            q1 = versor.multiply(q0, versor.delta(v0,v1)),
            r1 = versor.rotation(q1);
        projection.rotate(r1);
      
     
        render();

       /* const p = pointer(event, this);
        if(p[2]){
            const d = (p[2] - a0)/2;
            const s = -Math.sin(d);
            const c = Math.sign(Math.cos(d));
            q1 = versor.multiply([Math.sqrt(1 - s * s),0,0,c * s], q1)
        }

        projection.rotate(versor.rotation(q1));


        if(delta[0] < 0.7)dragstarted.apply(this, [event,this])*/
    
    
    }  
    const checkVerticalScroll =  ()=>{
        if(scrollYThresholdRef?.current){
            
            if(scrollYThresholdRef.current.getBoundingClientRect().y < scrollYThresholdRef.current.getBoundingClientRect().height){
                
                
                setIsScrollPassedThreshold(true);
                    
                

            }
            else{
                
                
                
                    
                setIsScrollPassedThreshold(false);
                
            }
            
        }
    }

   
        
   
    useEffect(()=>{

       

        window.addEventListener("scroll", checkVerticalScroll);


        return () =>{
            window.removeEventListener("scroll",checkVerticalScroll);
        }

       
        /*const canvas = mapCnvsRef.current,
              context = canvas.getContext("2d");
        
       /* d3.select(context.canvas)
            .call(d3.drag()
             .on("start", dragstarted)
             .on("drag", dragged)
        )*/
        
        /*d3.json("eu_.topojson").then(eu =>{

            const land = topojson.feature(eu, eu.objects.europe);
           
                
            const path = d3.geoPath(projection,context);
            render = function()
            {
                context.clearRect(0, 0, w, h);
                //context.beginPath(), path(outline), context.fillStyle = "#fff", context.fill();
                context.beginPath(), path(land), context.fillStyle = "#000", context.fill();
                //context.beginPath(), path(outline), context.stroke();
            }

            render();

            

           
           
                
        })*/
    
       
        
    },[]) 
   
       
           


    

    return (
        <Layout title="Loyalty Progam | vegclub magazine">
            <main className="mx-auto border-black/[.1]">
                <div className="relative pl-[40px] lg:pl-0 pt-[40px] pb-[40px] text-white  border-black bg-black">
                    <div className="md:flex md:flex-row-reverse lg:w-[85%] lg:mx-auto">
                        <div className="w-fit mx-auto mb-[40px] md:mx-0 md:mb-0 md:pr-[80px]">
                            <img src="/discount_asset_tb-img_5.png" className="w-auto h-[150px] md:h-[200px]"/>
                        </div>
                        <div className="md:flex md:grow md:flex-col md:justify-end">
                            <h4 className="mb-1 uppercase italic text-[0.833rem] font-semibold">
                            Loyalty card
                            </h4>
                            <h1 className="max-w-[400px] lg:max-w-[600px] font-semibold text-[1.728rem] lg:text-[2.074rem]">
                                Get <span className="font-bold italic">Discounts</span>{"    "}
                                At Our Favourite Vegan <span className="font-bold italic">Restaurants</span>
                            </h1>
                        </div>
                    </div>
                    
                    {/*<div className="relative left-[150px] top-[180px] w-fit">
                        <img width={250} height={250} src="/discount_asset_blank-tag.png"></img>
                    </div>
                    <h4 className= "hidden mt-5 ml-[70px] text-white/[.8] text-[1.2rem] font-extralight w-[200px]">
                        Expand your palette with vegan recipes across europe
    </h4>*/}
                </div>
                <div className="pt-[40px] pb-[20px] px-[40px]">
                    <div className="grid grid-cols-2">
                        <div className="border-r-[1px]">
                            <h3 className="text-[1.44rem] md:text-[1.728rem] uppercase w-fit mx-auto">Price</h3>
                            <p className="mt-5 text-[1rem] text-center">A one off payment of</p>
                            <div className="w-fit mx-auto font-bold text-[1.44rem] text-center">£50</div>
                        </div>
                        <div className="">
                            <h3 className="text-[1.44rem] md:text-[1.728rem] uppercase w-fit mx-auto">Reward</h3>
                            <p className="mt-5 text-[1rem] text-center">A lifetime discount of</p>
                            <div className="w-fit mx-auto font-bold text-[1.738rem]">
                                <p className="w-fit mx-auto text-[1.44rem]">%15</p>
                                <p className="text-center font-normal text-[1rem] text-black/[.4]">At selected restaurants across europe</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 cursor-pointer w-fit mx-auto bg-black p-3 text-white uppercase font-semibold">Buy now</div>
                </div>
                <div className="border-t-[1px] border-b-[1px] py-5 pl-[40px]" ref={scrollYThresholdRef}>
                    <h2 className="text-[1.728rem] lg:text-[2.074rem] uppercase font-semibold">How does it work ?</h2>
                </div>
                <div className="lg:grid lg:grid-cols-[2fr_1fr]">
                    <ul className="text-[1.2rem] border-b-[1px] border-r-[1px]">
                        <li className="flex p-[40px] flex-row border-b-[1px]">
                            <div className="w-[150px]">
                                    <img src="/discount_asset_deliver-img.png" className="w-full h-auto"></img>
                            </div>
                            <div className="flex grow pl-[20px]">
                                <p className="font-bold italic text-[1.2rem] sm:text-[1.728rem] mr-5">1.</p>
                                <p className="text-[1rem] sm:text-[1.2rem]">Order our discount card and get it hand delivered by our dedicated staff.</p>
                            </div>
                        </li>
                        <li className="flex p-[40px]  flex-row border-b-[1px]">
                            <div className="flex grow  pr-[20px]">
                                <p className="font-bold italic text-[1.2rem] sm:text-[1.728rem] mr-5">2.</p>
                                <p className="text-[1rem] sm:text-[1.2rem]">Bring it along with you to any restaurant we've partnered with the next time youre feeling pekish and enjoy your meal at a discount</p>
                            </div>
                            <div className="w-[250px]">
                                <img src="/discount_asset_card-reader.png" className="w-full h-auto"/>
                            </div>
                        </li>
                        <li className="flex p-[40px] flex-row border-b-[1px]">
                            <div className="w-[150px]">
                                <img src="/discount_asset_binoculars.png" className="w-full h-auto"/>
                            </div>
                            <div className="flex grow pl-[20px]">
                                <p className="font-bold italic text-[1.2rem] sm:text-[1.728rem] mr-5">3.</p>
                                <p className="text-[1rem] sm:text-[1.2rem]">Stay on the look out for future recommendations. We'll always be looking to provide you with new culinary experiences</p>
                            </div>
                        </li>

                    </ul>
                </div>
   
               
                <div className={`${isScrollPassedThreshold ? "fixed":"hidden"} bg-white w-[100vw] top-[63px] drop-shadow-md py-2`}>
                        <div className="cursor-pointer w-fit mx-auto  p-3  uppercase transition-all font-semibold duration-[.34s] ease-[cubic-bezier(.19,1,.22,1)] hover:text-black/[.4]">Buy now</div>

                </div>
                
                
                
                {/*<div className="flex items-center">
                    <div className="pl-[40px] w-fit mr-3">
                        <img className="w-[40px] h-[40px]" src="/discount_asset_plane-black.png"></img>
                    </div>
                    <div className="inline-flex align-middle flex-grow h-[2px] bg-black"></div>
</div>*/}
                {/*<div>
                    <div className="mx-auto  rounded border-black border-[4px] w-fit p-3">
                        <img width={50} height={56} src="/discount_asset.png"></img>
                        
                    </div>
    
    </div>*/}
                {/*<canvas width={`${w}px`} height={`${h}px`} className="w-fit mx-auto" ref={mapCnvsRef}>
                    
                

                    
</canvas>*/}  
            </main>

        </Layout>

    )

}


export default CallToAct;
