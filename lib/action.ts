"use server";
import prisma from "./prisma";
import { RegisterSchema, signInSchema } from "./zod";
import { hashSync } from "bcrypt-ts";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

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
        const userAlreadyExist = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if (userAlreadyExist?.id) {

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


// export const signInCredentials = async (prevState: unknown, formData: FormData) => {
//     const validateFields = RegisterSchema.safeParse(Object.fromEntries(formData.entries()));
//     if (!validateFields.success) {
//         return {
//             error: validateFields.error.flatten().fieldErrors,
//         };
//     }
//     const { email, password } = validateFields.data;

//     try {
//         await signIn("credentials", { email, password, redirectTo: "/dashboard" })
//     } catch (error) {
//         if (error instanceof AuthError) {
//             switch (error.type) {
//                 case "CredentialsSignin":
//                     return { message: "Invalid credentials" }
//                 default:
//                     return { message: "Something went wrong" }
//             }
//         }
//         throw error
//     }
// }

export const signInCredentials = async (prevState: unknown, formData: FormData) => {
    // Validate the form data
    const validateFields = signInSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!validateFields.success) {
        return {
            error: validateFields.error.flatten().fieldErrors,
        };
    }

    const { email, password } = validateFields.data;

    try {
        // Attempt sign-in
        const response = await signIn("credentials", {
            email,
            password,
            redirect: false, // Prevent automatic redirection
        });

        if (response?.error) {
            // Handle authentication errors
            return { message: response.error };
        }

        // Redirect to dashboard after successful sign-in
        return { redirect: "/dashboard" };
    } catch (error) {
        // Handle unexpected errors
        return { message: "Something went wrong. Please try again." };
    }
};