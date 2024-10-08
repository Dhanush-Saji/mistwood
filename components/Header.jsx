'use client'
import React, { useEffect, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ShoppingCart, UserRound } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { DarkModeToggle } from './DarkModeToggle'
import Avatar from '../public/images/avatar.png'
import MobileNavbar from './MobileNavbar'
import { Button } from './ui/button'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { signOut, useSession } from 'next-auth/react'
import SignoutBtn from './Button/SignoutBtn'
import { useUserStore } from '@/lib/zustandStore'
import CartShowBtn from './Button/CartShowBtn'
import { usePathname } from 'next/navigation'


const Header = () => {
  const test = usePathname()
  const { data: session, status } = useSession()
  const userData = session?.userData
  const user = session?.user
  const [lastScroll, setlastScroll] = useState(0)
  const [scrollStatus, setscrollStatus] = useState('scroll-up')
  // const handleScroll = () => {
  //      const currentScroll = window.scrollY
  //      console.log(currentScroll);
  //      if(currentScroll>lastScroll){
  //        setscrollStatus('scroll-down')
  //        setshrinkNavbar(true)
  //      }else if(currentScroll>773){
  //       setscrollStatus('scroll-up')
  //       setshrinkNavbar(true)
  //      }else if(0<currentScroll && currentScroll<10){
  //       setscrollStatus('scroll-up')
  //       setshrinkNavbar(false)
  //      }
  //      setlastScroll(currentScroll)
  // };
  useEffect(() => {
    window.addEventListener('scroll',()=>{
      const currentScroll = window.scrollY
      let isNavbarVisibleFixed = test?.includes('cart') || test?.includes('error') || test?.includes('orders') || test?.includes('shop') || test?.includes('success')
      if(!isNavbarVisibleFixed){
        if(currentScroll>lastScroll){
          setscrollStatus('scroll-down')
        }else if(currentScroll>773){
         setscrollStatus('scroll-up')
        }else if(0<currentScroll && currentScroll<10){
         setscrollStatus('scroll-up')
        }
      }
      setlastScroll(currentScroll)
    });
    // return () => {
    //   window.removeEventListener('scroll', handleScroll);
    // };
  }, [lastScroll]);
  return (
    <div className={`fixed glassNavbar ${scrollStatus == 'scroll-down'?'translate-y-[-100%]':'translate-y-[0%]'} top-0 transition-all duration-300 ease-in-out justify-between flex px-6 sm:px-4 py-3items-center w-full z-[9999] h-[4rem] items-center shadow-md`}>
      <Link href={'/'} prefetch={false}>
        <div className='flex gap-1 items-center'>
          <Image src={'/images/logo.png'} alt='logo' height={50} width={50} />
          <div className={`flex flex-col ml-1`}>
            <span className='text-[1.2rem] font-[800] text-[#27282a]'>Mistwood</span>
            <span className='text-[0.7rem] font-[700] text-[#27282a] mt-[-10px]'>Furniture</span>

          </div>
        </div>
      </Link>
      <div className='gap-3 items-center hidden sm:flex'>
        <Link href={'/shop'} prefetch={false}>
          <h1 className='text-[#27282a]'>Shop</h1>
        </Link>
        <DarkModeToggle />
        {userData && <CartShowBtn />}
        {!userData && <Link href={'/login'} prefetch={false}>
          <Button>Login</Button>
        </Link>}
        {userData && <DropdownMenu >
          <DropdownMenuTrigger asChild className="focus-visible:!ring-0 focus-visible:!ring-offset-0 cursor-pointer">
            <Image alt='avatar' src={user?.image ? user?.image : Avatar} width='45' height='45' className='rounded-full' />
          </DropdownMenuTrigger>
          <DropdownMenuContent style={{zIndex:10000}}>
            <DropdownMenuLabel>Welcome {user?.name || userData?.username}!</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href={'/orders'} prefetch={false}>
                  My Orders
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <SignoutBtn />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>}

      </div>
      <div className='flex sm:hidden gap-2'>
      {userData && <CartShowBtn />}
      {!userData && <Link href={'/login'} prefetch={false}>
          <Button>Login</Button>
        </Link>}
        {userData && <MobileNavbar />}
      </div>

    </div>
  )
}

export default Header