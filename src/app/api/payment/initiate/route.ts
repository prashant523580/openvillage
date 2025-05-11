/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import * as crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
    try {
        const { amount, projectId, userId, name, email } = await req.json();

      
        // Validate required fields
        
        if (!amount || !projectId || !name || !email) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }
        // Validate input
    if (!amount || isNaN(amount) || amount < 1) {
        return NextResponse.json(
          { error: "Invalid donation amount" },
          { status: 400 }
        );
      }
        
        // Create donor record with PENDING status
        const donor = await prisma.donor.create({
            data: {
                name,
                email,
                amount: Number(amount),
                projectId,
                userId,
                transactionStatus: 'PENDING',
                paymentId: uuidv4() // Use UUID for payment ID
            }
        });

        // Calculate amounts with proper precision
        // Important validation in your API route
          // Convert to numbers with exactly 2 decimal places
    const baseAmount = Number(Number(amount).toFixed(2));
    const taxAmount = Number((baseAmount * 0.13).toFixed(2));
    const totalAmount = Number((baseAmount + taxAmount).toFixed(2));

        // Signature must be generated with EXACTLY this format

        // Generate transaction UUID
        const transactionUuid = uuidv4();
        const successUrl = new URL(`${process.env.AUTH_URL}/api/payment/success`);
        successUrl.searchParams.append('donationId', donor.id);
        // Validate environment variables
        if (!process.env.ESEWA_SECRET_KEY || !process.env.ESEWA_MERCHANT_ID) {
            throw new Error("eSewa credentials not configured");
        }

        // Generate signature
        // const message = `total_amount=${totalAmount.toFixed(2)},transaction_uuid=${transactionUuid},product_code=${process.env.ESEWA_MERCHANT_ID}`;
        // const message = `total_amount=${totalAmount},transaction_uuid=${transactionUuid},product_code=${process.env.ESEWA_MERCHANT_ID}`;
        // Generate signature with correct values
    const message = [
        `total_amount=${totalAmount.toFixed(2)}`,
        `transaction_uuid=${transactionUuid}`,
        `product_code=${process.env.ESEWA_MERCHANT_ID}`
      ].join(',');
        const signature = crypto
            .createHmac('sha256', process.env.ESEWA_SECRET_KEY)
            .update(message)
            .digest('base64');
            return NextResponse.json({
                paymentUrl: 'https://rc-epay.esewa.com.np/api/epay/main/v2/form',
                params: {
                  amount: baseAmount.toFixed(2),  // Base amount without tax
                  tax_amount: taxAmount.toFixed(2),
                  total_amount: totalAmount.toFixed(2),
                  product_service_charge: "0.00",
                  product_delivery_charge: "0.00",
                  transaction_uuid: transactionUuid,
                  product_code: process.env.ESEWA_MERCHANT_ID!,
                  signature,
                  // success_url: `${process.env.AUTH_URL}/api/payment/success?donationId=${donor.id}`,
                  failure_url: `${process.env.AUTH_URL}/api/payment/failure?donationId=${donor.id}`,
                  success_url: successUrl.toString(),

                  signed_field_names: 'total_amount,transaction_uuid,product_code'
                }
              });

    } catch (error: any) {
        console.error("Payment initiation error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to initiate payment" },
            { status: 500 }
        );
    }
}