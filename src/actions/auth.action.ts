"use server"
import { revalidatePath } from "next/cache"
import { signIn, signOut } from "../auth"
// import { loginCheckUser } from "@/controllers/user.controller"
import { AuthError } from "next-auth"

export const AdminLogin = async (provider: string) => {
    await signIn(provider, { redirectTo: "/admin/dashboard" })
    revalidatePath("/admin/dashboard")
}

export const Logout = async () => {
    await signOut()
    revalidatePath("/admin/login")
}

export const LoginWithCredential = async (formData: FormData) => {
    const rawFormData = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        role: "ADMIN",
        redirectTo: "/admin/dashboard"
    }
  
    try {
        await signIn("credentials", rawFormData);

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" };
                default:
                    return {
                        error: "Something went wrong!"
                    }
            }
        }
        throw error
    }
}


// async function getImages() {
//     const url =
//       `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/resources/image`
//     const auth = Buffer.from(process.env.NEXT_PUBLIC_API_KEY + ':'
//       + process.env.NEXT_PUBLIC_API_SECRET).toString('base64')
//     const res = await fetch(url, {
//       headers: {
//         Authorization: `Basic ${auth}`
//       }
//     })
//     if (!res.ok) {
//       throw new Error('Failed to fetch data')
//     }
//     return res.json()
//   }