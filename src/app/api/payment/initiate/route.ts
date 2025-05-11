/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import CryptoJS from "crypto-js";

export async function POST(req: Request) {
  try {
    const { amount, projectId, userId, name, email } = await req.json();

    // Validate inputs
    if (!amount || !projectId || !name || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount < 1) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    // Calculate amounts with 13% VAT
    const baseAmount = Number(numericAmount.toFixed(2));
    const taxAmount = Number((baseAmount * 0.13).toFixed(2));
    const totalAmount = Number((baseAmount + taxAmount).toFixed(2));

    // Create donor record
    const donor = await prisma.donor.create({
      data: {
        name,
        email,
        amount: baseAmount,
        projectId,
        userId,
        transactionStatus: 'PENDING',
        paymentId: uuidv4()
      }
    });

    // Generate signature
    const transactionUuid = uuidv4();
    const message = [
      `total_amount=${totalAmount.toFixed(2)}`,
      `transaction_uuid=${transactionUuid}`,
      `product_code=${process.env.ESEWA_MERCHANT_ID}`
    ].join(',');

    const signature = CryptoJS.HmacSHA256(
      message,
      process.env.ESEWA_SECRET_KEY!
    ).toString(CryptoJS.enc.Base64);

    return NextResponse.json({
      paymentUrl: 'https://rc-epay.esewa.com.np/api/epay/main/v2/form',
      params: {
        amount: baseAmount.toFixed(2),
        tax_amount: taxAmount.toFixed(2),
        total_amount: totalAmount.toFixed(2),
        product_service_charge: "0.00",
        product_delivery_charge: "0.00",
        transaction_uuid: transactionUuid,
        product_code: process.env.ESEWA_MERCHANT_ID!,
        signature,
        success_url: `${process.env.AUTH_URL}/donation/success?donationId=${donor.id}`,
        failure_url: `${process.env.AUTH_URL}/donation/failure?donationId=${donor.id}`,
        signed_field_names: 'total_amount,transaction_uuid,product_code'
      }
    });

  } catch (error: any) {
    console.error("Payment error:", error);
    return NextResponse.json(
      { error: error.message || "Payment failed" },
      { status: 500 }
    );
  }
}