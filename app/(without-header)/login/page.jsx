'use client'

import { registerFn } from "@/utils/APICalls";
import { signIn, useSession, } from "next-auth/react";
import { useState, useEffect } from "react"
import { toast } from 'react-toastify'
import Image from 'next/image'
import { ReloadIcon } from "@radix-ui/react-icons";
import GoogleButton from "react-google-button";

export default function Login() {
  const data = useSession()
  const [isLoading, setisLoading] = useState(false)
  const [formData, setformData] = useState({ email: '', password: '' })
  const loginUser = async (e) => {
    e.preventDefault()
    if (!formData?.email || !formData?.password) {
      toast.error('Please fill the fields')
      return
    }
    setisLoading(true)
    try {
      const res = await signIn('credentials', { ...formData, redirect: false })
      if (!res?.ok) {
        toast.error(res?.error)
      } else if (res?.ok) {
        toast.success('Login Successful')
      }
      setisLoading(false)
    } catch (error) {
      console.error(error);
      setisLoading(false)
    }
  };
  return (
    <>
      <div className="flex min-h-[100vh] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className='flex gap-1 items-center justify-center'>
            <Image src={'/images/logo.png'} alt='logo' height={50} width={50} />
            {/* <div className='flex flex-col ml-1'>
          <span className='text-[1.2rem] font-[800] text-[#27282a] dark:text-[#eeeeee]'>Mistwood</span>
          <span className='text-[0.7rem] font-[700] text-[#27282a] dark:text-[#eeeeee] mt-[-10px]'>Furniture</span>

          </div> */}
          </div>
          <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-4" onSubmit={loginUser}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input value={formData?.email} onChange={(e) => setformData({ ...formData, email: e.target.value })}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input value={formData?.password} onChange={(e) => setformData({ ...formData, password: e.target.value })}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div className="text-sm w-full flex">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500  ml-auto">
                    Forgot password?
                  </a>
                </div>
              </div>
            </div>

            <div>
              <button disabled={isLoading}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {
                  isLoading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : 'Sign In'
                }

              </button>
            </div>
          </form>
          <div className="flex w-full mt-2 justify-center items-center">
            <GoogleButton
              onClick={() => signIn('google')}
            />
          </div>
          <p className="mt-4 text-center text-sm text-gray-500">
            {`Don't have an account?`}
            <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-2">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
