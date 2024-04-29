
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)


export default async function handler(req,res)
{
    if(req.method === "POST"){
        try{
            const session = await stripe.checkout.sessions.create({

                line_items:[
                    {
                        price:"price_1PAtwoDIMSnhhtR7WtwGvWHu",
                        quantity:1
                    }

                ],
                mode:"payment",
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