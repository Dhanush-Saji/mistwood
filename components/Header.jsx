import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
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
import { Button } from './ui/button'
import Image from 'next/image'
import { DarkModeToggle } from './DarkModeToggle'
  

const Header = () => {
  return (
    <div className=' justify-between flex px-4 py-2 items-center fixed w-full'>
        <div className='flex gap-1 items-center'>
          <Image src={'/images/logo.png'} alt='logo' height={52} width={52} />
          <div className='flex flex-col ml-1'>
          <span className='text-[1.4rem] font-[800] text-[#27282a] dark:text-[#eeeeee]'>Mistwood</span>
          <span className='text-[0.9rem] font-[700] text-[#27282a] dark:text-[#eeeeee] mt-[-10px]'>Furniture</span>

          </div>
        </div>
        <div className='gap-3 items-center hidden sm:flex'>
        <Select>
  <SelectTrigger className="w-[180px] bg-transparent border border-[#27282a3a] focus:ring-0 focus:ring-offset-0 text-[#27282a]">
    <SelectValue placeholder="Language" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
    <SelectItem value="system">System</SelectItem>
  </SelectContent>
</Select>

<h1 className='text-[#464646]'>Shop</h1>
<h1 className='text-[#464646]'>About Us</h1>
<h1 className='text-[#464646]'>Contact</h1>
<DarkModeToggle />
<DropdownMenu>
      <DropdownMenuTrigger asChild className="focus-visible:!ring-0 focus-visible:!ring-offset-0">
        <Button variant="outline"><UserRound className='text-[#27282aa2]' /></Button>
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
<Link href={'/cart'} prefetch={false}>
<div className='rounded-full bg-[#9fa889] text-[#4d5835] p-1.5'><ShoppingCart /></div>
</Link>
        </div>

    </div>
  )
}

export default Header