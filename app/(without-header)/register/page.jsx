'use client'

import { useToast } from "@/components/ui/use-toast";
import { registerFn } from "@/utils/APICalls";
import Image from "next/image";
import { useState, useEffect } from "react"
import { ReloadIcon } from "@radix-ui/react-icons"
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LuEye, LuEyeOff } from "react-icons/lu";

export default function Register() {
  const [passType, setpassType] = useState('password')
  const router = useRouter()
  const session = useSession()
  const [isLoading, setisLoading] = useState(false)
  const [formData, setformData] = useState({ username: '', email: '', password: '' })
  useEffect(() => {
    if (session?.status == 'authenticated') {
      router.replace('/')
    }
  }, [session,router])
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
        router.push('/login')
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
              Hey Welcome !
            </h1>
            <p className="mt-0 text-lg leading-8 text-gray-600">
             Register your account
            </p>
            <div className="mt-3">
          <form className="space-y-4" onSubmit={registerUser}>
          <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900 text-left">
                Username
              </label>
              <div className="mt-1">
                <input value={formData?.username} onChange={(e) => setformData({ ...formData, username: e.target.value })}
                  id="username"
                  name="username"
                  type="text"
                  required
                  placeholder="Enter username"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
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
                  placeholder="Enter your email"
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
              <div className="mt-1 relative">
                <input value={formData?.password} onChange={(e) => setformData({ ...formData, password: e.target.value })}
                  id="password"
                  name="password"
                  type={passType}
                  autoComplete="current-password"
                  required
                  placeholder="Enter password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {passType == 'password' && <LuEye onClick={()=>setpassType('text')} className="text-black text-md scale-125 absolute top-[50%] right-[3%] translate-y-[-50%] cursor-pointer" />}
                {passType == 'text' && <LuEyeOff onClick={()=>setpassType('password')} className="text-black text-md scale-125 absolute top-[50%] right-[3%] translate-y-[-50%] cursor-pointer" />}
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
          <p className="mt-4 text-center text-sm text-gray-500">
            {`Already have an account?`}
            <Link href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-2">
              Login
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
