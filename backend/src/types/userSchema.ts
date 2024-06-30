import { z } from 'zod';


const signupSchema = z.object({
     username: z.string().email("Invalid email address"),
     firstName: z.string().min(1, "Name is required"),
     lastName: z.string(),
     password: z.string().min(4, "Password must be at least 4 character long"),
})

const signinSchema = z.object({
     username: z.string().email("Invalid email address"),
     password: z.string().min(4, "Invalid password")
})


export { signinSchema, signupSchema }