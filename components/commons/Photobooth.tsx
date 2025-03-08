"use client"
import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import Link from "next/link"
import * as htmlToImage from 'html-to-image';
import {Camera, CircleX, PanelLeftClose, ArrowDownToLine} from "lucide-react"
import { Overpass } from 'next/font/google';
import Image from 'next/image';

const overpass = Overpass({
  subsets: ["latin"],
  variable: "--font-overpass",
  display: "swap",
})

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
}

const Photobooth: React.FC = () => {

  const webcamRef = useRef<Webcam>(null);
  const [isCameraStarted, setIsCameraStarted] = useState<boolean>(false);
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]); 
  const [text, setText] = useState<string>('picbooth');
  const [backgroundColor, setbackgroundColor] = useState<string>('#ffffff');
  
  const startCamera = () => {
    setIsCameraStarted(true);
  };


  const changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedPhotos((prevPhotos) => [...prevPhotos, imageSrc]); // Menambahkan foto ke daftar
    }
  };


  const retake = () => {
    setCapturedPhotos([]); // Menghapus semua foto
  };


const downloadPhoto = () => {
    htmlToImage.toJpeg 
    (document.getElementById('picbooth')?? document.body, { quality: 1.0 })
  .then((dataUrl) => {
    const link = document.createElement('a');
    link.download = 'picbooth.jpeg';
    link.href = dataUrl;
    link.click();
  });
}



const handlechangeColor = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  setbackgroundColor(e.target.value);
},[setbackgroundColor])






    

  return (
    <div className={`${overpass.className} h-screen w-full pt-10 text-center lg:max-w-6xl mx-auto px-5 `}>
      <div className=''>
        <Link className='flex justify-start items-center gap-x-2 lg:text-lg text-md' href={'/'}> <PanelLeftClose size={20} /> Back </Link>
      </div>
      {!isCameraStarted ? (
        <>
        <h1 className='lg:text-4xl text-2xl font-bold mb-10 mt-48'>Welcome to <span className='text-indigo-400'> PicBooth </span> ! </h1>
        <div className='flex justify-center items-center'>
        <button onClick={startCamera} className='py-3 px-10 rounded-full bg-indigo-400 text-white flex justify-between items-center gap-x-3 ' >
        Start taking pictures <Camera size={20}/>
        </button>
        </div>
        <div className='mt-5 mx-auto px-5 lg:max-w-5xl'>After the session, download your digital copy and share the fun!</div>

        </>
        
      ) : (
        <div className='w-full lg:max-w-5xl mx-auto px-5'>
            <div className='grid md:grid-cols-2 gap-5'>
                <div className='flex flex-col mx-auto'>
          <div>
            <div className=' mt-10'>
              <Webcam
                id='webcam'
                audio={false}
                ref={webcamRef}
                screenshotQuality={1}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                width={640}
                height={280}
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px' 
                }}
              />
              <div className='lg:flex grid gap-x-2 justify-center items-center '>
              <button onClick={capture}   className={`py-3 px-6 rounded-full bg-indigo-400 text-white mt-5 flex items-center gap-x-2 text-center`} >
                Capture Photo <Camera size={20}/>
              </button>
              <button onClick={retake} className='py-3 px-6 rounded-full bg-rose-400 text-white mt-5 flex items-center gap-x-2 text-center' >
                Clear All Photos <CircleX size={20}/>
              </button> 
              </div>
            </div>
          </div>
          </div>

        

          {/* Menampilkan daftar foto yang telah diambil */}
          {capturedPhotos.length > 0 && (
            <div className='flex flex-col mx-auto mb-10'>
              <div className='w-64 p-3' color={backgroundColor}  style={{ backgroundColor: backgroundColor }} id='picbooth' >
              <div className='w-full '>
                {capturedPhotos.map((photo, index) => (
                  <div className='p-3 rounded-lg ' key={index} >
                    <Image src={photo} width={640} height={280}  alt={`Captured ${index + 1}`}  />
                    {/* <p>Photo {index + 1}</p> */}
                  </div>
                ))}
                <span className='text-black' onChange={changeText}>{text}</span>
              </div>
              </div>
              <div>
              <div className='mt-10 text-start'>
                <label htmlFor="">Enter Caption</label>
                </div>
                <div> 
                  <input type="text" className='bg-[#f9f3e9] dark:bg-[#2a2a2c] p-2 rounded-lg w-full mt-3' value={text} onChange={changeText} placeholder="Enter text" />
                  </div>
                <div className='mt-5 mb-3 text-start'>
                  <label htmlFor="" className=''>Picbooth frame color</label>
                  </div>

                  <div className='flex justify-start'>
                    <input type="color"  value={backgroundColor} onChange={handlechangeColor} className='border-none h-9 w-9 outline-none' id='picbooth' />
                  </div>
                </div>
              <button className=' z-50 py-3 px-6 rounded-full dark:bg-[#ffffff] dark:hover:bg-[#f9f3e9] dark:text-black text-[#ffffff] bg-black hover:bg-[#232323] flex justify-center text-center items-center
               gap-x-2 mt-5' onClick={downloadPhoto}>Download Photos <ArrowDownToLine size={20}/></button>
            </div>
          )}
        </div>
        </div> 
      )}
    </div>
  );
};
export default Photobooth;