"use client";
import React from 'react'
import CardLayout from '@/app/_components/CardLayout/CardLayout'
import { useGetBooksQuery, useAddToCartMutation } from '@/app/_service/api'
import { useRouter } from 'next/navigation';

function Books() {

  const { data, error, isLoading, isSuccess } = useGetBooksQuery();
  const [addToCart] = useAddToCartMutation();
  const booksShortList = data?.slice(0, 4);
  const router = useRouter();

  const handleViewAll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    router.push('/books')
  }

  const handlePreview = (id: number) => {
    router.push(`/books/${id}`)
  }

  const handleAddToCart = async (book: any) => {
    const {id, name, price, thumbnail, product_type} = book;
    const quantity = 1;
    await addToCart({id, name, price, thumbnail, product_type, quantity});
  }
  
  return (
    <div className='max-w-[1200px] mx-auto'>
        {isSuccess && 
          <div className='flex justify-between items-center mb-5'>
            <h2 className='text-3xl font-medium'>Featured Books</h2>
            <a 
              href="#"
              onClick={handleViewAll}
              className='bg-violet-700 hover:bg-violet-600 text-white hover:text-white px-5 py-2 rounded-md inline-block transition-all'
            >
              View All
            </a>
          </div>
        }
        <div className='grid grid-cols-4 gap-4 books'>
          {isLoading && <p>Loading...</p>}
          {/* {error && <p>{error}</p>} */}
          {booksShortList?.map((book) => (
            <CardLayout 
              id={book.id}
              key={book.id}
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

export default Books