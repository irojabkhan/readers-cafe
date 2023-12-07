
export interface Books {
    id: number;
    name: string;
    description?: string;
    author: string;
    price: number;
    thumbnail: string;
}

export interface Coffee {
    id: number;
    name: string;
    description?: string;
    caffeineLevel: string;
    price: number;
    thumbnail: string;
}

export interface CartItem {
    id: number;
    name: string;
    description?: string;
    caffeineLevel?: string;
    price: number;
    product_type: string,
    quantity?: number,
    thumbnail: string;
}