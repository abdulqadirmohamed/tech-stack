"use server";
import prisma from "./prisma";
import { RegisterSchema } from "./zod";
import { hashSync } from "bcrypt-ts";

export const signUpCredentials = async (prevState: unknown, formData: FormData) => {
    const validateFields = RegisterSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!validateFields.success) {
        return {
            error: validateFields.error.flatten().fieldErrors,
        };
    }

    const { name, email, password } = validateFields.data;
    const hashedPassword = hashSync(password, 10);

    try {
        const userAlreadyExist  = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if(userAlreadyExist?.id){
            
        }
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        return {
            success: true,
            data: newUser,
        };
    } catch (err: any) {
        return {
            message: 'Failed to register user'
        };
    }
};
