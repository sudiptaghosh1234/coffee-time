import { RequestHandler, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
import { registerSchema } from '../schemas/registerSchema';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();


export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const validatedResult = registerSchema.safeParse(req.body);

        if (!validatedResult.success) {
            res.status(400).json({ msg: "Validation failed", data: validatedResult.error.errors });
            return;
        }

        const { name, email, password } = validatedResult.data;

        const uniqueEmail = await prisma.user.findUnique({
            where: { email },
            select: { email: true, name: true },
        });

        if (uniqueEmail) {
            res.status(409).json({ msg: "Email already exists!" });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword },
        });

        if (!user) {
            res.status(401).json({ msg: "User is not created" });
            return;
        }

        res.status(201).json({ msg: "User is created successfully!" }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" }); 
    }
};
