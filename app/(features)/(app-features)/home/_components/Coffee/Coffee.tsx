import CoffeeCard from '@/app/_components/CoffeeCard/CoffeeCard'
import { useGetCoffeeQuery, useAddToCartMutation } from '@/app/_service/api'
import React from 'react'
import { useRouter } from 'next/navigation';

function Coffee() {

  const {data, error, isFetching, isLoading  } = useGetCoffeeQuery();
  const coffeeShortList = data?.slice(0, 4);

  const [addToCart, {}] = useAddToCartMutation();
  
  const router = useRouter()
  
  const handleViewAllCoffee = () => {
    router.push('/coffee')
  }

  const handleAddToCart = async (coffee: any) => {
    const {id, name, price, thumbnail, product_type} = coffee;
    const quantity = 1;
    await addToCart({id, name, price, thumbnail, product_type, quantity});
  }

  const handlePreview = (id: string) => {
    router.push(`/coffee/${id}`)
  }
  return (
    <div className='max-w-[1200px] mx-auto'>
        <div className='flex justify-between items-center mb-5 mt-10'>
            <h2 className='text-3xl font-medium'>Popular Coffee</h2>
            <a 
              href="#"
              onClick={handleViewAllCoffee}
              className='bg-violet-700 hover:bg-violet-600 text-white hover:text-white px-5 py-2 rounded-md inline-block transition-all'
            >
              View All
            </a>
          </div>
        <div className="grid grid-cols-4 gap-4 books">
            {coffeeShortList && coffeeShortList.map((coffee) => (
              <CoffeeCard 
                key={coffee.id} 
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

export default Coffee