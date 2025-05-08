// app/api/payment/success/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import * as crypto from 'crypto';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const donationId = searchParams.get('donationId');
    const encodedData = searchParams.get('data');

    if (!donationId || !encodedData) {
      return NextResponse.redirect(`${process.env.AUTH_URL}/donation/failure`);
    }

    // Decode base64 data
    const decodedData = Buffer.from(encodedData, 'base64').toString('utf-8');
    const responseData = JSON.parse(decodedData);

    // Verify signature
    const secret = process.env.ESEWA_SECRET_KEY!;
    const signatureMessage = [
      `transaction_code=${responseData.transaction_code}`,
      `status=${responseData.status}`,
      `total_amount=${responseData.total_amount}`,
      `transaction_uuid=${responseData.transaction_uuid}`,
      `product_code=${responseData.product_code}`,
      `signed_field_names=${responseData.signed_field_names}`
    ].join(',');
    
    const validSignature = crypto
      .createHmac('sha256', secret)
      .update(signatureMessage)
      .digest('base64');

    if (validSignature !== responseData.signature) {
      throw new Error('Invalid signature');
    }

    // Update donation record
    await prisma.donor.update({
      where: { id: donationId },
      data: {
        transactionStatus: 'SUCCESS',
        transactionId: responseData.transaction_uuid,
        esewaPid: responseData.product_code
      }
    });

    return NextResponse.redirect(`${process.env.AUTH_URL}/donation/success`);

  } catch (error) {
    console.error('Success callback error:', error);
    return NextResponse.redirect(`${process.env.AUTH_URL}/donation/failure`);
  }
}
// import prisma from "@/lib/db";
// import { NextResponse } from "next/server";

// // app/api/payment/success/route.ts
// export async function POST(req: Request) {
//     const { donationId, transactionId, transactionCode , totalAmount } = await req.json();
    
//     // Verify payment with eSewa API
//     const verification = await fetch('https://rc-epay.esewa.com.np/api/epay/main/v2/verify', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${process.env.ESEWA_SECRET_KEY}`
//       },
//       body: JSON.stringify({
//         transaction_uuid: donationId,
//         total_amount: totalAmount
//       })
//     });
  
//     if (verification.ok) {
//       await prisma.donor.update({
//         where: { id: donationId },
//         data: {
//           transactionStatus: 'SUCCESS',
//           transactionId,
//           esewaPid: transactionCode
//         }
//       });
//       return NextResponse.redirect(`${process.env.AUTH_URL}/donation/success`);
//     }
  
//     await prisma.donor.update({
//       where: { id: donationId },
//       data: { transactionStatus: 'FAILED' }
//     });
//     return NextResponse.redirect(`${process.env.AUTH_URL}/donation/failure`);
//   }