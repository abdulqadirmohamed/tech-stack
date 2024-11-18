import { object, string } from "zod";

export const RegisterSchema = object({
    name: string().min(1, "Name must be more then 1 character"),
    email: string().email('Invalid email'),
    password: string()
        .min(6, "Password must be more then 6 characters")
        .max(32, "Password must be less then 32 characters"),
    confirmPassword: string()
        .min(6, "Password must be more then 6 characters")
        .max(32, "Password must be less then 32 characters"),
}).refine((data)=> data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"]
});
export const signInSchema = object({
    email: string().email('Invalid email'),
    password: string()
        .min(6, "Password must be more then 6 characters")
        .max(32, "Password must be less then 32 characters"),
});