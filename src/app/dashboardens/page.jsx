'use client'
// app/dashboard/page.tsx
import Header from "@/components/Header"
import SideBarEns from "@/components/SideBarEns"
import DashContent from "@/components/DashContent"
import NavBar from "@/components/ui/NavBar"

export default function Page() {
  return (
    <div className="">
        <NavBar/>
        <div className="flex border ">
            <SideBarEns/>
            
            <DashContent/>
        </div>
    </div>
  )
}