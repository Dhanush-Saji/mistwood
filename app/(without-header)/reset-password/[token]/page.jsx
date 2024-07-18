'use client'

import { forgotPasswordFn, registerFn, resetPasswordFn, verifyTokenFn } from "@/utils/APICalls";
import { signIn, useSession, } from "next-auth/react";
import { useState, useEffect, useLayoutEffect } from "react"
import { toast } from 'react-toastify'
import Image from 'next/image'
import { ReloadIcon } from "@radix-ui/react-icons";
import GoogleButton from "react-google-button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoadingCircle from "@/components/Loaders/LoadingCircle";
import dynamic from "next/dynamic";
const ErrorLottie = dynamic(() => import("@/components/Loaders/ErrorLottie"), {
  ssr: false,
});

export default function Page({params}) {
  const [isTokenVerified, setisTokenVerified] = useState({isVerified:false,username:''})
  const [pageLoader, setpageLoader] = useState(true)
    const {token} = params;
  const router = useRouter();
  const { data: session, status } = useSession()
  const [isLoading, setisLoading] = useState(false)
  const [formData, setformData] = useState({ password: '',confirmPassword:''})
  useLayoutEffect(() => {
    if (status === 'authenticated') {
      router.replace('/'); // Redirect to homepage on successful login
    }
  }, [session, status, router])
  const resetPasswordCallFn = async (e) => {
    e.preventDefault()
    if (!formData?.password || !formData?.confirmPassword) {
      toast.error('Enter your password')
      return
    }
    setisLoading(true)
    try {
      let payload = {
        token,password:formData?.password
      }
        const res = await resetPasswordFn(payload)
        if (res?.status) {
          toast.success(`${res?.message}`)
          router.push('/login')
        } else {
          toast.error(`${res?.message}`)
        }
      } catch (error) {
        console.error(error);
        toast.error(`${error?.message}`)
    }finally{
        setisLoading(false)
      }
  };
  const verifyToken = async () => {
    try {
      let payload = {token}
      const res = await verifyTokenFn(payload)
      if (res?.status) {
        toast.success(`${res?.message}`)
        setisTokenVerified({username:res?.username,isVerified:true})
      } else {
        toast.error(`${res?.message}`)
      }
    } catch (error) {
      console.error(error);
      toast.error(`${error?.message}`)
    }finally{
      setpageLoader(false)
    }
  };
  useEffect(()=>{
    if(token && !isTokenVerified?.isVerified){
      verifyToken()
    }
  },[token])
  return (
    pageLoader?
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <LoadingCircle />
    </div>
    :isTokenVerified?.isVerified?<>
      <div className="bg-white overflow-hidden h-[100vh]">
      <header className="absolute inset-x-0 top-0 z-50 p-6 lg:px-8">
          <div className="flex lg:flex-1">
          <Link href={'/'}>
            <Image src={'/images/logo.png'} alt='logo' height={50} width={50} />
            </Link>
          </div>
      </header>

      <div className="relative isolate px-6 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="h-[100vh] flex">
          <div className="text-center m-auto min-w-[84vw] sm:min-w-[25rem]">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Hi {isTokenVerified?.username}
            </h1>
            <p className="mt-0 text-md leading-8 text-gray-600">
             set your new password here
            </p>
            <div className="mt-3">
          <form className="space-y-4" onSubmit={resetPasswordCallFn}>
          <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-1">
                <input value={formData?.password} onChange={(e) => setformData({ ...formData, password: e.target.value })}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Enter password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password
                </label>
              </div>
              <div className="mt-1">
                <input value={formData?.confirmPassword} onChange={(e) => setformData({ ...formData, confirmPassword: e.target.value })}
                  id="confirmPassword"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Enter password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button disabled={isLoading}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {
                  isLoading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : 'Reset Password'
                }

              </button>
            </div>
          </form>
          <p className="mt-4 text-center text-sm text-gray-500">
            <Link href="/login" className="font-semibold leading-6">
              Back to login
            </Link>
          </p>
        </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
    </div>
    </>:
    <>
    <div className="bg-white overflow-hidden h-[100vh]">
    <div className="relative isolate px-6 lg:px-8">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="h-[100vh] flex">
        <div className="text-center m-auto min-w-[84vw] sm:min-w-[25rem]">
        <ErrorLottie />
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Oops..!
          </h1>
          <p className="mt-0 text-md leading-8 text-gray-600">
           Seems like your token is expired
          </p>
          <div className="mt-3">
        <Link href="/login" className="font-semibold leading-6">
            <button 
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go to Login
            </button>
          </Link>
      </div>
        </div>
      </div>
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  </div>
    </>
  )
}
