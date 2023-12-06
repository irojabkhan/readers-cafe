'use client'

import React from 'react'
import { useGetCoffeeQuery, useAddToCartMutation } from '@/app/_service/api'
import CoffeeCard from '@/app/_components/CoffeeCard/CoffeeCard'
import { useRouter } from 'next/navigation'

function Coffee() {

  const router = useRouter();
  const { data, isSuccess, error, isLoading } = useGetCoffeeQuery();

  const [addToCart] = useAddToCartMutation();

  const handlePreview = (id: string) => {
    router.push(`/coffee/${id}`)
  }

  const handleAddToCart = async (book: any) => {
    const {id, name, price, thumbnail, product_type} = book;
    const quantity = 1;
    await addToCart({id, name, price, thumbnail, product_type, quantity});
  }
  
  return (
    <div className='max-w-[1200px] mx-auto py-10'>
        {isSuccess && 
          <div className='flex justify-between items-center mb-5'>
            <h2 className='text-3xl font-medium'>All Coffees</h2>
          </div>
        }
        <div className='grid grid-cols-4 gap-4'>
          {isLoading && <p>Loading...</p>}
          {error && <p>Something went wrong...</p>}
          {data?.map((coffee) => (
            <CoffeeCard 
              key={coffee.id} 
              id={coffee.id} 
              name={coffee.name} 
              description={coffee.description} 
              caffeineLevel={coffee.caffeineLevel} 
              price={coffee.price} 
              thumbnail={coffee.thumbnail}
              addToCart={() => handleAddToCart(coffee)} 
              onPreview={() => handlePreview(coffee.id || '')}
            />
          ))}
        </div>
    </div>
  )
}

export default Coffee;