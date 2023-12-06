import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type { Books, Coffee, CartItem } from './types';

export const api = createApi({
    reducerPath: 'booksApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000'}),
    tagTypes: ['Item'],
    endpoints: (builder) => ({
        getBooks: builder.query<Books[], void>({
            query: () => '/books',
        }),
        getBookDetails: builder.query<Books, number>({
            query: (id) => `/books/${id}`,
        }),
        getCoffee: builder.query<Coffee[], void>({
            query: () => '/coffee',
        }),
        getCoffeeDetails: builder.query<Coffee, number>({
            query: (id) => `/coffee/${id}`,
        }),
        getCartItem: builder.query<CartItem[], void>({
            query: () => '/cart',
        }),
        addToCart: builder.mutation<void, CartItem>({
            query: (item) => ({
                url: '/cart',
                method: 'POST',
                body: item
            }),
            invalidatesTags: ['Item'],
        }),
        deleteItem: builder.mutation<void, CartItem>({
            query: (id) => ({
                url: `/cart/${id}`,
                method: 'DELETE',
                id
            }),
            invalidatesTags: ['Item'],
        }),
        updateItem: builder.mutation<void, CartItem>({
            query: ({id, quantity}) => ({
                url: `/cart/${id}`,
                method: 'PATCH',
                body: { quantity }
            }),
            invalidatesTags: ['Item'],
        })
    }),
})

export const {
    useGetBooksQuery, 
    useGetBookDetailsQuery, 
    useGetCoffeeQuery, 
    useGetCoffeeDetailsQuery,
    useGetCartItemQuery,
    useAddToCartMutation,
    useDeleteItemMutation,
    useUpdateItemMutation
} = api;