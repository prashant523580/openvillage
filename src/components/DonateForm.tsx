"use client";

import { useState } from "react";
// import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import { createDonor } from "@/actions/user.action";
import { useSession } from "next-auth/react";

interface PaymentFormProps {
    projectId: string;
}

export default function DonateForm({ projectId }: PaymentFormProps) {
    // const router = useRouter();
    const [show, setShow] = useState(false);
    const {data} = useSession();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        amount: 0,
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
      
        // Basic validation
        if (!formData.name || !formData.email || !formData.amount || !formData.cardNumber || !formData.expiryDate || !formData.cvv) {
          setError("All fields are required.");
          return;
        }
      
        const paymentId = uuidv4();
      
        try {
          const payload = {
              paymentId,
              name: formData.name,
              email: formData.email,
              amount: formData.amount,
              cardNumber: formData.cardNumber,
              expiryDate: formData.expiryDate,
              cvv: formData.cvv,
              projectId,
              userId: data?.user.id
            }
          const success = await createDonor(payload);
      
          if (success) {
            setSuccess("Payment successful! Thank you for your donation.");
            setTimeout(() => {
                setFormData({
                    amount:0,
                    cardNumber:'',
                    cvv:'',
                    email:'',
                    expiryDate:'',
                    name:""
                })
                setShow(false)
                setError("")
                setSuccess("")
            }, 3000);
          } else {
            setError("An error occurred. Please try again.");
          }
        } catch (err) {
          setError("An error occurred. Please try again.");
          console.error(err);
        }
      };
      
    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     setError(null);
    //     setSuccess(null);

    //     // Basic validation
    //     if (
    //         !formData.name ||
    //         !formData.email ||
    //         !formData.amount ||
    //         !formData.cardNumber ||
    //         !formData.expiryDate ||
    //         !formData.cvv
    //     ) {
    //         setError("All fields are required.");
    //         return;
    //     }

    //     try {
    //         // Mock payment processing (this is just a simulation)
    //         console.log("Processing payment for:", formData);

    //         // Simulate a successful payment
    //         setSuccess("Payment successful! Thank you for your donation.");
    //         setTimeout(() => router.push("/dashboard"), 3000); // Redirect after 3 seconds
    //     } catch (err) {
    //         setError("An error occurred. Please try again.");
    //         console.error(err);
    //     }
    // };

    return (
        <div className=" ">
            <button onClick={() => setShow(!show)} className="px-2 py-1 bg-blue-500 text-white hover:bg-blue-600 cursor-pointer mt-2 rounded-md">Donate</button>

            <div className={`${show ? "translate-y-0" : "translate-y-full"} fixed top-0 bottom-0 left-0 right-0 bg-gray-200 z-50 py-10 overflow-y-auto transition-all`}>
               
               <button onClick={() => setShow(!show)} className="absolute right-8 top-8 text-gray-800 cursor-pointer hover:text-black"><X/></button>
                <div className="max-w-6xl mx-auto">

                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Donate to Project</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Donor Information */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Your Name"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="icionados block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                                Amount
                            </label>
                            <input
                                type="number"
                                id="amount"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                placeholder="100"
                                required
                                min="1"
                            />
                        </div>

                        {/* Card Details */}
                        <div>
                            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                                Card Number
                            </label>
                            <input
                                type="text"
                                id="cardNumber"
                                value={formData.cardNumber}
                                onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                placeholder="1234 5678 9012 3456"
                                required
                                maxLength={19}
                            />
                        </div>
                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                                    Expiry Date
                                </label>
                                <input
                                    type="text"
                                    id="expiryDate"
                                    value={formData.expiryDate}
                                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="MM/YY"
                                    required
                                    maxLength={5}
                                />
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                                    CVV
                                </label>
                                <input
                                    type="text"
                                    id="cvv"
                                    value={formData.cvv}
                                    onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="123"
                                    required
                                    maxLength={4}
                                />
                            </div>
                        </div>

                        {/* Feedback Messages */}
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        {success && <p className="text-green-500 text-sm">{success}</p>}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                        >
                            Donate
                        </button>
                    </form>
                </div>
            </div>

        </div>
    );
}