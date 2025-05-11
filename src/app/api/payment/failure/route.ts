import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// app/api/payment/failure/route.ts
export async function POST(req: NextRequest) {
    const { donationId } = await req.json();
    
    await prisma.donor.update({
      where: { id: donationId },
      data: { transactionStatus: 'FAILED' }
    });
  
    return NextResponse.redirect(`${process.env.AUTH_URL}/donation/failure`);
  }