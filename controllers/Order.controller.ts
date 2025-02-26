import { Payment_Status, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";


const prisma = new PrismaClient();

export const makeOrder = async (req: Request, res: Response) => {
    const { userID, shipping_address, productId, quantity, payment_method } = req.body;


    try {

        if (userID !== req.user.id) {
            res.status(401).json({ msg: "You must log in" });
            return;
        }
        const product = await prisma.product.findUnique(
            {
                where: {
                    id: productId
                }
            }
        );

        if (!product) {
            res.status(400).json({ msg: "Product is not available!" });
            return;
        }

        if (product.quantity < quantity) {
            res.status(400).json({ msg: "Quantity exceeds!" });
            return;
        }

        const createdOrder = await prisma.order.create(
            {
                data: {
                    shipping_address,
                    payment_method,
                    productId,
                    quantity,
                    order_status: (Payment_Status=='PAID')?'PROCESSING': 'PENDING'
                }
            }
        );
        (createdOrder.payment_method)?createdOrder.order_status='PROCESSING':createdOrder.order_status='PENDING';
        (createdOrder.payment_method)?createdOrder.payment_status='PAID':createdOrder.payment_status='PENDING';
        if(createdOrder)
        {
            product.quantity-=createdOrder.quantity;
        }


    } catch (error) {
        console.log(error);
    }
}