'use client'

import { forgotPasswordFn, registerFn } from "@/utils/APICalls";
import { signIn, useSession, } from "next-auth/react";
import { useState, useEffect, useLayoutEffect } from "react"
import { toast } from 'react-toastify'
import Image from 'next/image'
import { ReloadIcon } from "@radix-ui/react-icons";
import GoogleButton from "react-google-button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ForgotPassword() {
  const router = useRouter();
  const { data: session, status } = useSession()
  const [isLoading, setisLoading] = useState(false)
  const [formData, setformData] = useState({ email: ''})
  useLayoutEffect(() => {
    if (status === 'authenticated') {
      router.replace('/'); // Redirect to homepage on successful login
    }
  }, [session, status, router])
  const forgotPasswordCallFn = async (e) => {
    e.preventDefault()
    if (!formData?.email) {
      toast.error('Enter you email')
      return
    }
    setisLoading(true)
    try {
        const res = await forgotPasswordFn(formData)
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
  return (
    <>
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
              Forgot Password?
            </h1>
            <p className="mt-0 text-md leading-8 text-gray-600">
             Don't worry, we will send an email to you
            </p>
            <div className="mt-3">
          <form className="space-y-4" onSubmit={forgotPasswordCallFn}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 text-left">
                Email address
              </label>
              <div className="mt-1">
                <input value={formData?.email} onChange={(e) => setformData({ ...formData, email: e.target.value })}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Enter email"
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
                  isLoading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : 'Send'
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
    </>
  )
}
