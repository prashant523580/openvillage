import { encryptPassword } from "@/lib/aes";
import prisma from "@/lib/db";
// import User from "@/models/user"
// import connectToMongodb from "@/utils/db/dbcon";
import { NextResponse } from "next/server"

export async function POST(){
    // await connectToMongodb();
    const adminObj = {
        name:'Admin',
        phoneNumber:"08197299",
        email:"admin@admin.com",
        // image:"",
        role:"ADMIN",
        // active: true,
        password:"admin",
    }
    try{
        // let superAdminExist = await User.findOne({email: adminObj.email});
        const superAdminExist = await prisma.user.findFirst({
            where:{
                email: adminObj.email
            }
        })
        if(superAdminExist){
            return new NextResponse(null)
        }

            //  await User.create(adminObj);
            await prisma.user.create({
                data:{
                    name: adminObj.name,
                    email: adminObj.email,
                    role: "ADMIN",
                    // ...adminObj,
                    // image:adminObj.image,
                    password: encryptPassword(adminObj.password)
                }
            })
            // console.log(admin);
            return  NextResponse.json({
                success: true
            })
        
        
    }catch(error){
        console.log(error)
        return new NextResponse(null)
    }
}