import { PrismaClient } from "@prisma/client";


const prisma=new PrismaClient();

export const makeOrder=async(req, res)=>{
    const {userID, shipping_address, productId, quantity, payment_method} =req.body;


    try {

        if(userID!==req.user.id)
            {
                res.status(401).json({msg: "You must log in"});
                return;
            }
            const product=await prisma.product.findUnique(
                {
                    where: {
                        id : productId
                    }
                }
            );

            if(!product)
            {
                res.status(400).json({msg: "Product is not available!"});
                return;
            }

            const createdOrder=await prisma.order.create(
                {
                    data: {
                        shipping_address,
                        payment_method
                    }
                }
            );




        
    } catch (error) {
        console.log(error);    
    }
}