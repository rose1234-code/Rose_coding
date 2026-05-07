import { text } from '@/lib/date'
import React from 'react'

export default function Footer() {
  return (
    <div className='w-full h-10 px-7 bg-[#fcd9d97a]'>
        <div className=' flex h-full items-center  justify-between px-10'>
            <div className='flex items-center gap-3 '>
                <span className='text-sm text-[#eb5353]'>ROSE CODING</span>
                <div className='text-[10px] text-gray-400'>
                    {text}
                </div>
            </div>
            <div>
                <ul className='flex items-center gap-4 text-gray-400 text-[10px]'>
                    <li>Privacy Policy</li>
                    <li>Terms of services</li>
                    <li>Security </li>
                    <li>Status</li>
                </ul>
            </div>
        </div>
    </div>
  )
}
