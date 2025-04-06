"use server"

import { decryptPassword } from "@/lib/aes";
import prisma from "@/lib/db";

export const loginCheckUser = async (email : string,password :string) => {
    
    try{
        // await connectToMongodb()

        const user = await prisma.user.findUnique({
            where:{
                email: email
            }
        })
        if(!user){
            return { 
                message : "Username or password worng.",
                success: false,
            }
        }
        console.log(user)
        const decryptPass = await decryptPassword(user?.password as string);
        // console.log(decryptPass);
        if(!(decryptPass === password)){
            return { 
                message : "Username or password wrong.",
                success: false,
            }
        }
        return { 
                message : "Successfully login.",
                success: true,
                user
                }
        
    }catch(error){
        console.log(error)
        return { 
            message : "Somethings wents wrong.",
            success: false,
        }
    }
}