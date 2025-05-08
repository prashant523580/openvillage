import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  
  // Verify payment with eSewa API
  const verification = await fetch('https://rc-epay.esewa.com.np/api/epay/main/v2/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.ESEWA_SECRET_KEY}`
    },
    body: JSON.stringify({
      transaction_uuid: formData.get('transaction_uuid'),
      total_amount: formData.get('total_amount')
    })
  });

  if (verification.ok) {
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/donation/success`);
  }
  
  return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/donation/failure`);
}