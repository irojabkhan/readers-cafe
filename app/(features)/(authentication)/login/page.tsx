"use client"
import { signIn } from 'next-auth/react';
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

function page() {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: ''
  })
  const router = useRouter();
  const { data: session, status } = useSession()

  // useEffect(() => {
  //   if (status === "authenticated") {
  //     router.push('/home');
  //     console.log('home');
  //   } else {
  //     router.push('/login');
  //     console.log('login');
      
  //   }
  // }, [status])
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    await signIn('credentials', {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false
    })
    
  }

  return (
    <div className='flex items-center justify-center bg-slate-100 h-[100vh]'>
        <div className='max-w-[400px] bg-white p-10 rounded-lg shadow-sm w-full'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  name='email' 
                  placeholder='Email' 
                  className='w-full bg-slate-50 h-10 rounded-lg px-5 outline-none' 
                  value={userInfo.email}
                  onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                />
                <input 
                  type="text" 
                  name='password' 
                  placeholder='Password' 
                  className='w-full bg-slate-50 h-10 rounded-lg px-5 outline-none'
                  value={userInfo.password}
                  onChange={(e) => setUserInfo({...userInfo, password: e.target.value})}
                />
                <button className='w-full bg-green-400 text-white h-10 rounded-lg px-5 outline-none'>login</button>
            </form>
        </div>
    </div>
  )
}

export default page