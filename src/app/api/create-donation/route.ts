import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const { amount, name, email, projectId } = await req.json();

    // Validate input
    if (!amount || !name || !email || !projectId) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Calculate amounts
    const tax_amount = Number((amount * 0.13).toFixed(2)); // 13% VAT
    const total_amount = Number((Number(amount) + tax_amount).toFixed(2));
    const transaction_uuid = uuidv4();

    // Generate signature
    const secret = process.env.ESEWA_SECRET_KEY!;
    const message = [
      `total_amount=${total_amount}`,
      `transaction_uuid=${transaction_uuid}`,
      `product_code=EPAYTEST`
    ].join(',');

    const signature = crypto
      .createHmac('sha256', secret)
      .update(message)
      .digest('base64');

    return NextResponse.json({
      transaction_uuid,
      tax_amount,
      total_amount,
      signature
    });

  } catch (error) {
    console.error("Donation Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}