// pages/auth/login.js
// "use client"
// import Loading from '@/components/Loading';
// import { signIn, useSession } from 'next-auth/react';
// import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from '@/auth';
import React from 'react';
import { FaGoogle } from 'react-icons/fa';
const Login = () => {
  // const session = useSession();
  // const router = useRouter();
  // const params = useSearchParams();

  // const googleSignIn = async () => {
  //   try {

  //     let result = await signIn('google', { callbackUrl: process.env.NEXTAUTH_URL })
  //     // console.log({ result })
  //     if (result) {

  //       router.push("/")
  //     }


  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // if (session?.status == "authenticated") {
  //   const callbackUrl = params.get('callbackUrl');
  //   if (router && callbackUrl) {
  //     router.replace(callbackUrl);
  //   } else {

  //     router.replace("/")
  //   }
  // }
  

  return (
    
      <div className="relative py-16">
        <div className="container relative m-auto px-4 text-gray-500 md:px-12 xl:px-40">
          <div className="m-auto space-y-8 md:w-8/12 lg:w-6/12 xl:w-6/12">
            <div className="rounded-3xl border border-gray-100 bg-white  shadow-2xl shadow-gray-600/10 backdrop-blur-2xl">
              <div className="p-8 py-12 sm:p-16">
                <h2 className="mb-8 text-2xl font-bold text-gray-800">Sign in</h2>
            
                <form action={ async () =>{
                    "use server"
                  await signIn("google")
                } 
                } className="mt-4 grid ">
                  <button type='submit'  className="group border-gray-100 border-2 rounded-full p-2 hover:border-black hover:text-black text-gray-500 transition-all cursor-pointer">
                    <span className="w-full relative flex justify-center items-center gap-3 text-sm md:text-base ">
                      <FaGoogle />
                      <span>Continue with Google</span>
                    </span>
                  </button>

                </form>
              </div>
            </div>
          
          </div>
        </div>
      </div>
  );
};

export default Login;
