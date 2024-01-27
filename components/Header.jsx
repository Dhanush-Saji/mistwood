import React from 'react'
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
  

const Header = () => {
  return (
    <div className='justify-between flex px-6 sm:px-4 py-3items-center fixed w-full z-[10] bg-white h-[10vh] items-center'>
      <Link href={'/'} prefetch={false}>
        <div className='flex gap-1 items-center'>
          <Image src={'/images/logo.png'} alt='logo' height={50} width={50} />
          <div className='flex flex-col ml-1'>
          <span className='text-[1.2rem] font-[800] text-[#27282a] dark:text-[#eeeeee]'>Mistwood</span>
          <span className='text-[0.7rem] font-[700] text-[#27282a] dark:text-[#eeeeee] mt-[-10px]'>Furniture</span>

          </div>
        </div>
          </Link>
        <div className='gap-3 items-center hidden sm:flex'>
<Link href={'/shop'} prefetch={false}>
<h1 className='text-[#464646]'>Shop</h1>
</Link>
<h1 className='text-[#464646]'>Contact</h1>
<DarkModeToggle />
<Link href={'/cart'}>
<div className='rounded-full text-[#27282a] p-1.5 relative flex items-center justify-center'>
  <ShoppingCart />
<span className='w-5 h-5 flex items-center justify-center bg-[#ffde3c] absolute right-[-5px] top-[-5px] text-xs font-bold rounded-full'>12</span>
</div>
</Link>
<DropdownMenu>
      <DropdownMenuTrigger asChild className="focus-visible:!ring-0 focus-visible:!ring-offset-0">
        <Image alt='avatar' src={Avatar} width='45' className='' />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
      <DropdownMenuLabel>Welcome Dhanush!</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
</DropdownMenu>

        </div>
        <div className='flex sm:hidden gap-2'>
        <Link href={'/cart'} prefetch={false}>
        <div className='rounded-full text-[#27282a] p-1.5 relative flex items-center justify-center'><ShoppingCart />
        <span className='w-5 h-5 flex items-center justify-center bg-[#ffde3c] absolute right-[-5px] top-[-5px] text-xs font-bold rounded-full'>12</span>
        </div>
        </Link>
          <MobileNavbar />
        </div>

    </div>
  )
}

export default Header