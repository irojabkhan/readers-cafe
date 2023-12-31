'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function Home() {

  const router = useRouter();
  const { data: session, status } = useSession()

  // useEffect(() => {
  //   if (status === "authenticated") {
  //     router.push('/home');
  //   } else {
  //     router.push('/login');
  //   }
  // }, [status])

  useEffect(() => {
      router.push('/home');
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between hello"></main>
  )
}
