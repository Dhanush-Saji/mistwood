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
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { ShoppingCart, UserRound } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'
  

const Header = () => {
  return (
    <div className=' justify-between flex px-5 py-5 items-center fixed w-full'>
        <div>Logo</div>
        <div className='flex gap-3 items-center'>
        <Select>
  <SelectTrigger className="w-[180px] bg-transparent border border-[#27282a3a] focus:ring-0 focus:ring-offset-0">
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
    <SelectItem value="system">System</SelectItem>
  </SelectContent>
</Select>

<h1>Shop</h1>
<h1>About Us</h1>
<h1>Contact</h1>
<DropdownMenu>
      <DropdownMenuTrigger asChild className="focus-visible:ring-0 focus-visible:ring-offset-0">
        <Button variant="outline"><UserRound className='text-[#27282aa2]' /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuSeparator />
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