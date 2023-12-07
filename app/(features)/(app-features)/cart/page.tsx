"use client";
import React, { useState, useEffect } from 'react'
import { DeleteOutlined } from '@ant-design/icons';
import { useGetCartItemQuery, useDeleteItemMutation, useUpdateItemMutation } from '@/app/_service/api'
interface CartItem {
    id: number;
    name: string;
    description?: string;
    caffeineLevel?: string;
    price: number;
    product_type: string,
    quantity?: number,
    thumbnail: string;
}

function page() {

    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const { data, isLoading, isSuccess, refetch } = useGetCartItemQuery();
    const [deleteItem] = useDeleteItemMutation();
    const [updateItem] = useUpdateItemMutation();

    useEffect(() => {
        if (data) {
            refetch();
            setCartItems(data as CartItem[]);
        }
    }, [data])

    const itemsLength = cartItems?.length;

    const subTotalPrice = cartItems?.reduce((acc, item) => {
        if (item.quantity !== undefined) {
            const itemPrice = item.price * item.quantity;
            return acc + itemPrice;
        }
        return acc;
    }, 0) || 0;

    const shippingCharge: string = cartItems?.length == 0 ? '0' : (cartItems?.length > 3) ? "4.44" : "9.99";
    const shippingChargeAsNumber: number = parseFloat(shippingCharge);
    const totalAmount = subTotalPrice + shippingChargeAsNumber;

    const handleDeleteCart = async (id: number) => {
        try {

            await deleteItem(id);
            refetch();

        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    const handleUpdateCart = async (item: { id: number; quantity: number }, e: any) => {
        const { id, quantity } = item;
        try {
            const updatedValue = parseInt(e.target.value);
            await updateItem({
                id: id, 
                quantity: updatedValue,
                name: '',
                price: 0,
                product_type: '',
                thumbnail: ''
            })
            refetch();
        } catch (error) {
            console.log(error);
        }
    }
    
  return (
    <div className='max-w-[1200px] mx-auto py-10'>
        <div className="flex gap-4 items-start">
            <div className="basis-4/6 bg-white rounded-lg p-4">
                <h2 className='text-xl font-medium mb-8'>Order Items</h2>
                {cartItems?.map((item: any) => (
                    <div className="flex flex-col gap-4 mt-4" key={item.id}>
                        <div className="flex gap-4 items-center border p-3 rounded-lg w-full">
                            <div className="h-20 w-20 min-w-20 bg-slate-100">
                                <img 
                                    src={item.thumbnail} 
                                    alt=""
                                    className='h-full w-full object-contain' 
                                />
                            </div>
                            <div className="flex-1">
                                <h3 className='text-base font-bold'>{item.name}</h3>
                                <p>Item: {item.product_type}</p>
                            </div>
                            <div className="basis-1/5">
                                <p className='text-sm font-semibold'>Price: ${item.price}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <input 
                                    type="number"
                                    value={item.quantity}
                                    min={0}
                                    onChange={(e) => handleUpdateCart(item, e)}
                                    className='border border-slate-200 border-solid rounded-md h-8 px-2 w-12 outline-none'
                                />
                            </div>
                            <div className='px-2'>
                                <span className='cursor-pointer p-1' onClick={(e) => handleDeleteCart(item.id)}>
                                    <DeleteOutlined className='text-xl' />
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="basis-2/6 bg-white rounded-lg p-4 flex flex-col min-h-[300px]">
                <h2 className='text-xl font-medium'>Summary</h2>
                <div className='pt-7 flex flex-col gap-3 flex-1'>
                    <p className='flex justify-between items-center gap-4'><span>Subtotal ({itemsLength} items)</span> <span>${subTotalPrice?.toFixed(2)}</span></p>
                    <p className='flex justify-between items-center gap-4'>
                        <span>Shipping</span> 
                        <span>${shippingChargeAsNumber}</span>
                    </p>
                    <p className='flex justify-between items-center gap-4 mt-auto border-t pt-4 text-base font-bold'>
                        <span>Total</span>
                        <span>${totalAmount?.toFixed(2)}</span>
                    </p>
                </div>
                <button className='bg-violet-700 hover:bg-violet-600 text-white hover:text-white px-5 py-2 rounded-md inline-block transition-all mt-8'>Checkout</button>
            </div>
        </div>
    </div>
  )
}

export default page