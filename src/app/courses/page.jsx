'use client'

import Footer from '@/components/Footer'
import Maincourse from '@/components/Maincourse'
import SideBar from '@/components/SideBar'
import NavBar from '@/components/ui/NavBar'
import { useState } from 'react'

export default function Page() {
    const [course,setCourse]=useState("Developement web")
  return (
    <div className='flex flex-col w-full'>
        <NavBar />
      
      
      <div className=' flex '>
        <SideBar  onSelect={setCourse} activeState={course}/>
        <Maincourse  module={course}/>
      </div>
      <Footer/>
    </div>
  )
}