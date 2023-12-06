'use client'
import React from 'react'
import Books from './_components/Books/Books'
import Coffee from './_components/Coffee/Coffee'

function Home() {
  return (
    <div className='py-10'>
        <Books />
        <Coffee />
    </div>
  )
}

export default Home