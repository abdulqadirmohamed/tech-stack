import { error } from "console";
import { RegisterSchema } from "./zod"
import { hashSync } from "bcrypt-ts"
import { prisma } from "./prisma";
import { NextResponse } from "next/server";


export const signUpCredentials = async (prevState: unknown, formData: FormData) => {
    const validateFields = RegisterSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!validateFields.success) {
        return {
            error: validateFields.error.flatten().fieldErrors
        }
    }
    const { name, email, password } = validateFields.data
    const hashedPassword = hashSync(password, 10)

    try {
        const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword
            }
        });
        // return NextResponse.json(newUser, { status: 200 })
    } catch (error) {
        console.log("Register error" + error)
        // return NextResponse.json(error, { status: 500 })
    }
}