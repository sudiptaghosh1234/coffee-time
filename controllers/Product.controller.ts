import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createProduct = async (req, res) => {
    const { name, description, price, quantity, image } = req.body;

    try {
        if (req.user && req.user.role === 'ADMIN') {
            const product = await prisma.product.create({
                data: {
                    name,
                    description,
                    price,
                    quantity,
                    image
                }
            })
            console.log(product);
            res.status(200).json({ msg: "Product is created successfully!" });
            
            if (!product) {
                res.status(400).json({ msg: "Could not create product!" });
                return;
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error from con" });
    }
}