"use client"
import Link from "next/link";
import { IoCameraOutline } from "react-icons/io5";
import { Comfortaa } from "next/font/google";
import  ModeToggle  from "@/components/atoms/ModeToggle";
import { SparklesText } from "@/components/magicui/sparkles-text";
import Header from "@/components/commons/Header";
import React from 'react'


const comfortaa = Comfortaa({
  subsets: ["latin"],
  variable: "--font-comfortaa",
  display: "swap",
})




export default function Home( ) {
  

  return (
    <>
    <Header/>
   <div className={`${comfortaa.className}  h-screen w-full `} >
    <div className="lg:max-w-6xl mx-auto px-5 pt-44 ">
    <SparklesText text="PicBooth" className="flex justify-center lg:text-6xl text-4xl font-bold" />
      <p className="text-center lg:text-lg text-md ">digital photobooth</p>
    </div>
    <div className=" mt-7 flex justify-center items-center gap-x-5 " >
      <Link href={"/capture"} className="py-3 px-10 rounded-full bg-indigo-400 text-white flex justify-between items-center gap-x-3"> Start <IoCameraOutline size={20}/></Link>
      <ModeToggle/>
    </div>
   </div>
    </>
  );
}
