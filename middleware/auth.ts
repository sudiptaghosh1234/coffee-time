import jwt from 'jsonwebtoken';
import { PrismaClient, User } from '@prisma/client';
import { RequestHandler, Request, Response, NextFunction } from 'express';
interface ExtendedRequest extends Request
{
    user?: User
}
const prisma = new PrismaClient();

export const isAuthenticated = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    let token: string;

    console.log(req.headers.authorization);

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            //req.headers.authorization="Bearer" "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTE2ZDYzM2YzZDI1MjcyNzAxODk0YyIsImlhdCI6MTcyMDgwNjg3NCwiZXhwIjoxNzIzMzk4ODc0fQ.EnYqKS5FK3F6Pb81P5kyGHWdCeKJSxP_9TiimzORt7Q"
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            
            const user = await prisma.user.findFirst({
                where: {
                    id: decoded.id,
                },
            });
            
            req.user = user;
            next();
        } catch (err) {
            console.log(err);
            res.status(401).json({ msg: "You are not authorized to do this!" });
        }
    }
    if (!token) {
        res.status(401).json({ msg: "You are not authorized to do this!" });
    }
};

export const isAdmin=(req: ExtendedRequest, res: Response, next: NextFunction)=>{
    try {

        if(req.user && req.user.role==='ADMIN')
            {
                next();
            }
            else
            {
                res.status(401).json({ msg: "You are not authorized to do this in admin!" });
            }
        
    } catch (error) {
        console.log(error);
        
    }
    
}
