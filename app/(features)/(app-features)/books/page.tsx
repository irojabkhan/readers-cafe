'use client'

import React from 'react'
import { useGetBooksQuery, useAddToCartMutation } from '@/app/_service/api'
import CardLayout from '@/app/_components/CardLayout/CardLayout';
import { useRouter } from 'next/navigation';

function Books() {

  const { data, isSuccess, error, isLoading } = useGetBooksQuery();

  const router = useRouter();

  const [addToCart] = useAddToCartMutation();

const handleAddToCart = async (book: any) => {
  const {id, name, price, thumbnail, product_type} = book;
  const quantity = 1;
  await addToCart({id, name, price, thumbnail, product_type, quantity});  
}

  const handlePreview = (id: number) => {
    router.push(`/books/${id}`)
  }
  
  return (
    <div className='max-w-[1200px] mx-auto py-10'>
        {isSuccess && 
          <div className='flex justify-between items-center mb-5'>
            <h2 className='text-3xl font-medium'>All Books</h2>
          </div>
        }
        <div className='grid grid-cols-4 gap-4 books'>
          {isLoading && <p>Loading...</p>}
          {error && <p>Something went wrong...</p>}
          {data && data.map((book) => (
            <CardLayout 
              key={book.id} 
              id={book.id} 
              name={book.name} 
              author={book.author} 
              price={book.price} 
              img={book.thumbnail} 
              addToCart={() => handleAddToCart(book)} 
              onPreview={() => handlePreview(book.id)}
            />
          ))}
        </div>
    </div>
  )
}

export default Books;