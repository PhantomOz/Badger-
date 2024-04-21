'use client'

import { useEffect } from 'react'

// import { useInkathon } from '@scio-labs/use-inkathon'
// import { toast } from 'react-hot-toast'

// import { Footer } from './components/footer'
import { HomeAcurastSection } from '@/components/landing/home-page-acurast'
import { HomeMidSection } from '@/components/landing/home-page-middle-section'
import { HomeTopSection } from '@/components/landing/home-page-top-section'
import { NavBar } from '@/components/shared/nav-bar'
import { SparklesCore } from '@/components/ui/sparkles'
// import { Partners } from './components/partners'

export default function HomePage() {
  // Display `useInkathon` error messages (optional)
  // const { error } = useInkathon()
  // useEffect(() => {
  //   if (!error) return
  //   toast.error(error.message)
  // }, [error])

  return (
    <>
      <NavBar />
      <div className="blob  relative flex grow flex-col items-center justify-center ">
        {/* Title */}
        <div className="w-full absolute overflow-hidden inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

        <HomeAcurastSection  />
      </div>
      {/* <Footer /> */}
    </>
  )
}
