import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

const Header = () => {
  return (
    <div className=' justify-between flex px-5 py-5 items-center'>
        <div>Logo</div>
        <div className='flex gap-3 items-center'>
        <Select>
  <SelectTrigger className="w-[180px]">
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
<button>Login</button>
<div>Cart</div>
        </div>

    </div>
  )
}

export default Header