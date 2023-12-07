'use client'

import React from 'react';
import { Card, Typography } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';

const { Meta } = Card;
const { Text } = Typography;

interface CardLayoutProps {
  id: number;
  name: string;
  description?: string;
  author: string;
  img: string;
  addToCart: any;
  price: number;
  onPreview: any;
}

const CardLayout = ({id, img, name, author, description, price, addToCart, onPreview} : CardLayoutProps) => (
  <Card
    key={id}
    hoverable
    cover={<img alt="example" className='' src={img} />}
    actions={[
      <EyeOutlined key="eye" onClick={onPreview} />,
      <ShoppingCartOutlined key="cart" onClick={addToCart} />
    ]}
  >
    <Meta title={name} />
    <Text type='secondary' className='mt-1 block italic'>{author}</Text>
    {description && <Text className='mt-1 block'>{description}</Text>}
    <Text className='mt-1 block font-medium'>${price}</Text>
  </Card>
);

export default CardLayout;