'use client'
import React, { use } from 'react'
import { Space, Typography, Button } from 'antd'
import {ShoppingCartOutlined} from '@ant-design/icons'
import { useGetCoffeeDetailsQuery, useAddToCartMutation } from '@/app/_service/api'

const { Text, Title } = Typography;

function page({ params }: { params: { id: number } }) {

    const { data:coffee, isFetching, isLoading, isSuccess } = useGetCoffeeDetailsQuery(params.id);

const [addToCart] = useAddToCartMutation();

    const handleAddToCart = async (coffee: any) => {
        const {id, name, price, thumbnail, product_type} = coffee;
        const quantity = 1;
        await addToCart({id, name, price, thumbnail, product_type, quantity});
    }

  return (
    <>
        { coffee &&
            <div className='max-w-[1200px] mx-auto py-10'>
                <div className="flex">
                    <div className="basis-1/2 pr-28">
                        <img src={coffee.thumbnail} alt="" />
                    </div>
                    <div className="basis-1/2">
                        <Space direction='vertical'>
                            <Title level={2}>{coffee.name}</Title>
                            <Text type="secondary">Coffee Level: {coffee.caffeineLevel}</Text>
                            <Text strong>Price: ${coffee.price}</Text>
                            <Text>Description:</Text>
                            <Text type="secondary">{coffee.description}</Text>
                            <a 
                                href="#"
                                onClick={() => handleAddToCart(coffee)}
                                className='
                                    bg-violet-700 
                                    hover:bg-violet-600 
                                    text-white 
                                    hover:text-white 
                                    px-5 py-2 
                                    rounded-md 
                                    inline-block 
                                    mt-10
                                    transition-all'
                                >
                                    <ShoppingCartOutlined className='mr-2' />
                                Add To Cart
                            </a>
                        </Space>
                    </div>
                </div>
            </div>
        }
    </>
  )
}

export default page