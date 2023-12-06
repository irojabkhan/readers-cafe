'use client'
import React from 'react'
import { Space, Typography, Button } from 'antd'
import {ShoppingCartOutlined} from '@ant-design/icons'
import { useGetBookDetailsQuery, useAddToCartMutation } from '@/app/_service/api'

const { Text, Title } = Typography;

interface BookIDProps {
    id: any
}

function page({ params }: { params: { id: number } }) {

    const { data:book, isFetching, isLoading, isSuccess } = useGetBookDetailsQuery(params.id);
    const [addToCart] = useAddToCartMutation();

    const handleAddToCart = async (book: any) => {
        const {id, name, price, thumbnail, product_type} = book;
        const quantity = 1;
        await addToCart({id, name, price, thumbnail, product_type, quantity});
    }

  return (
    <>
        { book &&
            <div className='max-w-[1200px] mx-auto py-10'>
                <div className="flex">
                    <div className="basis-1/2 pr-28">
                        <img src={book.thumbnail} alt="" />
                    </div>
                    <div className="basis-1/2">
                        <Space direction='vertical'>
                            <Title level={2}>{book.name}</Title>
                            <Text type="secondary">Author: {book.author}</Text>
                            <Text strong>Price: ${book.price}</Text>
                            <Text>Summary:</Text>
                            <Text type="secondary">{book.description}</Text>
                            <a 
                                href="#"
                                onClick={() => handleAddToCart(book)}
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