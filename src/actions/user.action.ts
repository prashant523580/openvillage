"use server"

import { decryptPassword } from "@/lib/aes";
import prisma from "@/lib/db";
import { User,Donor } from "@/types";

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

export const updateProfile = async (payload: User) => {
    const {id,name, phoneNumber, email} = payload;
    await prisma.user.update({
        where: { id: id },
        data: {
          name: name || undefined,
          phoneNumber: phoneNumber || undefined,
          email: email || undefined,
        },
    }
    )
}





export async function createDonor(data: Omit<Donor, 'id' | 'createdAt'>) {
  return await prisma.donor.create({
    data: {
      name: data.name,
      email: data.email,
      amount: data.amount as number,
      projectId: data.projectId,
      userId: data.userId,      // Optional: include userId if the donor is a registered user.
      paymentId: data.paymentId, // Payment identifier, e.g., from a payment gateway.
    //   cardNumber:data.cardNumber,
    //   cvv: data.cvv,
    //   expiryDate:data.expiryDate

    }
  })
}
