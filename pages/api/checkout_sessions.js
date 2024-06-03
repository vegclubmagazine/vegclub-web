
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)


export default async function handler(req,res)
{
    const {type, amt} = req.body;
    const cash_amt = type === "merchandise" ? 3500 : parseInt(amt * 100);
    if(req.method === "POST"){
        try{
            const session = await stripe.checkout.sessions.create({
                billing_address_collection:"auto",
                shipping_address_collection:{

                 allowed_countries:["GB","DK","BG", "CZ","CY","AT","EE",
                 "FI","FR","DE","GR","HU","IE","IT","LV","LT","LU","MT","NL",
                "PL","PT","RO","SK","SI","ES","SE"],
                },
                

                line_items:[
                    {
                        price_data:{
                            unit_amount:cash_amt,
                            currency:"gbp",
                            product: type === "merchandise" ? "prod_Q0voGFHCdNVMOM":"prod_Q9cEaqPXdA1J1s",
                        },
                        
                        
                        quantity:1
                    }

                ],
                mode:"payment",
                allow_promotion_codes: type === "merchandise" ? true:false,
                payment_method_configuration:"pmc_1P8RskDIMSnhhtR764ENTjX7",
                success_url:`${req.headers.origin}/checkout/?success=true`,
                cancel_url:`${req.headers.origin}/checkout/?cancel=true`
            });
            res.redirect(303, session.url)
        }
        catch(err){
            res.status(err.statusCode || 500).json(err.message);
        }
    }
    else{
        res.setHeader("Allow", "POST");
        res.status(405).end("Method not allowed")
    }
}