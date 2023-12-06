'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Home() {

  const router = useRouter();

  useEffect(() => {
    router.push('/home');
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between"></main>
  )
}
