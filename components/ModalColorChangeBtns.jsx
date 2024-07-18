import { RotateCcw } from 'lucide-react'
import React from 'react'

const ModalColorChangeBtns = ({setCurrentColor}) => {
  return (
    <div className='absolute bottom-[50px] right-[50px] flex flex-col gap-3'>
        <div onClick={()=>setCurrentColor('#ad8920')} className="rounded-full w-10 h-10 bg-[#D7C280] cursor-pointer transition-all hover:scale-110"></div>
        <div onClick={()=>setCurrentColor('#ad2424')} className="rounded-full w-10 h-10 bg-[#E17877] cursor-pointer transition-all hover:scale-110"></div>
        <div onClick={()=>setCurrentColor('#000000')} className="rounded-full flex items-center justify-center w-10 h-10 border-[1px] border-gray-400 cursor-pointer transition-all hover:scale-110"><RotateCcw className='text-gray-700' /></div>
  </div>
  )
}

export default ModalColorChangeBtns