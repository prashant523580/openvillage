/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";
import { useState } from "react";
// import { X } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
// import GoFundMeWidget from "./GoFunfMeWidget";
// import Link from "next/link";
// import Script from "next/script";
import { v4 as uuidv4 } from 'uuid';
import { createDonor } from "@/actions/user.action";

interface PaymentFormProps {
    projectId: string;
}

export default function DonateForm({ projectId }: PaymentFormProps) {
    const session = useSession();
    // const [show, setShow] = useState(false);
    const { data } = useSession();
    const [formData, setFormData] = useState<any>({
        name: session?.data?.user.name,
        email: session?.data?.user.email,
        amount: 0,
    });
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isGoSubmitting, setIsGoSubmitting] = useState(false);
    const transactionUuid = uuidv4();

    const handleSubmit = async (paymentMethod: "esewa" | "gofund") => {
        if (paymentMethod == "esewa") {
            handleEsewaPayment()
        } else {
            setIsGoSubmitting(true)
            handleGoFundMePayment()
        }
    }
    const handleGoFundMePayment = async () => { 
        console.log("go fundme Payment")
        try{
            const payload : {
                paymentId: string;
                projectId: string;
                name: string ;
                email: string ;
                amount: number;
            } = {
                ...formData,
                paymentId: transactionUuid,
                projectId
            }
            await createDonor(payload)
            alert("Payment Success.")
            setIsGoSubmitting(false)

        }catch(error){
            alert("Payment Failed.")
            setIsGoSubmitting(false)
            console.error(error)
        }
    }

    const handleEsewaPayment = async () => {
        // e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch('/api/payment/initiate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    amount: Number(formData.amount.toFixed(2)),
                    projectId,
                    userId: data?.user?.id
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Payment initiation failed');
            }

            const { paymentUrl, params } = await response.json();

            // Create hidden form for eSewa submission
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = paymentUrl;
            form.style.display = 'none';

            // Add fields in required order
            const addField = (name: string, value: string) => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = name;
                input.value = value;
                form.appendChild(input);
            };

            addField('amount', params.amount);
            addField('tax_amount', params.tax_amount);
            addField('total_amount', params.total_amount);
            addField('transaction_uuid', params.transaction_uuid);
            addField('product_code', params.product_code);
            addField('product_service_charge', params.product_service_charge);
            addField('product_delivery_charge', params.product_delivery_charge);
            addField('signed_field_names', params.signed_field_names);
            addField('signature', params.signature);
            addField('success_url', params.success_url);
            addField('failure_url', params.failure_url);

            document.body.appendChild(form);
            form.submit();

        } catch (err: any) {
            console.error('Payment Error:', err);
            setError(err.message || 'Payment initiation failed');
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="relative">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Amount (NPR)
                        </label>
                        <input
                            type="number"
                            value={formData.amount || ""}
                            onChange={(e) => setFormData({
                                ...formData,
                                amount: Math.max(1, Number(e.target.value))
                            })}
                            className="w-full p-2 border rounded-md"
                            min="1"
                            step="0.01"
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                </div>
                <div className="donation-btns grid md:grid-cols-2  gap-2 mt-2">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full text-white py-2 rounded-md flex items-center justify-center gap-2 ${isSubmitting ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
                            }`}
                            onClick={() => {
                                session.data?.user ? handleSubmit("esewa") : signIn();
                            }}
                    >
                        {isSubmitting ? (
                            'Processing...'
                        ) : (
                            <>
                                Pay with
                                <Image
                                    src="/images/esewa_logo.png"
                                    alt="eSewa"
                                    width={60}
                                    height={20}
                                    className="h-5 w-auto"
                                />
                            </>
                        )}
                    </button>

                    
                    <button
                        disabled={isGoSubmitting}

                     onClick={() => {
                        session.data?.user ? handleSubmit("gofund") : signIn();
                    }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer"
                    >
                        {
                            isGoSubmitting ?
                                "Processing..."
                            :
                        "Donate on GoFundMe" 
                        }
                        
                    </button>
                </div>



            </div>
          
        </>
    );
}