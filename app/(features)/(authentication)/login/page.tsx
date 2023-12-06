import React from 'react'

function page() {
  return (
    <div className='flex items-center justify-center bg-slate-100 h-[100vh]'>
        <div className='max-w-[400px] bg-white p-10 rounded-lg shadow-sm w-full'>
            <form className='flex flex-col gap-5'>
                <input type="text" placeholder='Email' className='w-full bg-slate-50 h-10 rounded-lg px-5 outline-none' />
                <input type="text" placeholder='Password' className='w-full bg-slate-50 h-10 rounded-lg px-5 outline-none' />
                <button className='w-full bg-green-400 text-white h-10 rounded-lg px-5 outline-none'>login</button>
            </form>
        </div>
    </div>
  )
}

export default page