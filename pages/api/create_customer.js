

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req,res)
{

    const {email,owner_or_manager_name,
        restaurantName, mobileNumber,
         address_line_one,city,zipCode} = req.body;
   
    if(req.method === "POST"){
        try{
            const customer = await stripe.customers.create({
                name:owner_or_manager_name,
                email:email,
                phone:mobileNumber,
                description:"affiliate application",
                metadata:{
                    restaurant_name:restaurantName

                },
            });

            res.status(200).json({});
        }
        catch(err){
            res.status(err.statusCode || 500).json(err.message);
        }
    }
    else{
        res.setHeader("Allow", "POST");
        res.status(405).end("Method not allowed");
    }

        

        
     
     

}