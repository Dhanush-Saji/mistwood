'use client'

import { useToast } from "@/components/ui/use-toast";
import { registerFn } from "@/utils/APICalls";
import Image from "next/image";
import { useState, useEffect } from "react"
import { ReloadIcon } from "@radix-ui/react-icons"
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

export default function Register() {
  const data = useSession()
  console.log(JSON.stringify(data))
  const [isLoading, setisLoading] = useState(false)
  const [formData, setformData] = useState({ username: '', email: '', password: '' })
  const registerUser = async (e) => {
    e.preventDefault()
    if(!formData?.username || !formData?.email || !formData?.password){
      toast.error('Please fill the fields')
      return
    }
    setisLoading(true)
    try {
      const res = await registerFn(formData)
      if (res?.status) {
        toast.success(`${res?.message}`)
      } else {
        toast.error(`${res?.message}`)
      }
      setisLoading(false)
    } catch (error) {
      console.error(error);
      toast.error(`${error?.message}`)
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
            Register account
          </h2>
        </div>
        <h1>
          {JSON.stringify(data)}
        </h1>

        <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-4" onSubmit={registerUser}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input value={formData?.username} onChange={(e) => setformData({ ...formData, username: e.target.value })}
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
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
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
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
              </div>
            </div>

            <div>
              <button disabled={isLoading}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {
                  isLoading?<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />:'Register'
                }
                
              </button>
            </div>
          </form>

          <p className="mt-4 text-center text-sm text-gray-500">
            {`Already have an account?`}
            <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-2">
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
