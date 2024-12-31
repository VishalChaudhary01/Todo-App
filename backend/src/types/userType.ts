import { z } from 'zod';

export const signupSchema = z.object({
     name: z.string().min(1, "Name is required"),
     email: z.string().email("Invalid email address"),
     password: z.string().min(4, "Password must be at least 4 character long"),
})

export const signinSchema = z.object({
     email: z.string().email("Invalid email address"),
     password: z.string().min(4, "Invalid password")
})

export type UserSchemaType = z.infer<typeof signupSchema>
export type SignupSchemaType = z.infer<typeof signupSchema>
export type SigninSchemaType = z.infer<typeof signinSchema>