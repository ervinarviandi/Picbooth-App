"use client"
import React from 'react'
import { useState } from 'react'
import {Info, Copy, CheckCheck} from "lucide-react"
import { Input } from "@/components/ui/input"  
import {Label} from "@/components/ui/label"
import {Button} from "@/components/ui/button"
import { toast } from 'sonner'
// import Acordion from "@/components/organism/Acordion"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

  
  

const Popup = () => {

    const [isClicked, setIsClicked] = useState(false);
    const copyToClipboard = async (copyme: string) => {
        try {
            navigator.clipboard.writeText(copyme);
            setIsClicked(true);
            setTimeout(() => {
                setIsClicked(false);
            }, 200);
        } catch (error) {
            console.log(error);
        }
        toast("✅ Berhasil! Link sudah disalin")
    }
  return (
    <div>
    <Dialog>
  <DialogTrigger><Info size={20} /></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Informasi</DialogTitle>
      <DialogDescription className='lg:text-md text-xs'>
        Terimakasih telah menggunakan aplikasi eTaskify sederhana ini, setiap tugas yang tercatat tidak akan terlihat oleh orang lain  ✌️☺️🪄
      </DialogDescription>
      <DialogDescription className='lg:text-md text-xs'>
        Tidak disarankan untuk mencatat hal-hal pribadi yang bisa disalahgunakan oleh pihak yang tidak bertanggung jawab 👌 
      </DialogDescription>
      {/* <Acordion/> */}
      <DialogTitle className='text-xs pt-3'>Share ke teman-teman yang lain, agar mereka bisa menggunakannya juga !</DialogTitle>
      <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue="https://etaskify.vercel.app"
              readOnly
            />
          </div>
          <Button onClick={() => {copyToClipboard("https://etaskify.vercel.app")}} type="submit" size="sm" className="px-3">
            <span className="sr-only">Copy</span>
            {
                isClicked ? <CheckCheck/> :  <Copy size={15} />
            }
          </Button>
        </div>
        <div className='text-end pt-5'>
            <span className='text-xs'>© 2025 PicBooth all rights reserved</span>
        </div>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default Popup