import React from 'react';
import { Card, Typography } from 'antd';
import { ShoppingCartOutlined, EyeOutlined } from '@ant-design/icons';

const { Meta } = Card;
const { Text } = Typography

interface CoffeeItemProps {
  id?: string,
  name: string,
  description?: string,
  caffeineLevel: string,
  price: number,
  thumbnail: string,
  onPreview: any,
  addToCart: any,
}

const CoffeeCard = ({id, name, description, caffeineLevel, price, thumbnail, onPreview, addToCart}: CoffeeItemProps) => (
  <Card
    id={id}
    hoverable
    className=''
    cover={<img alt="example" src={thumbnail} />}
    actions={[
      <EyeOutlined key="eye" onClick={onPreview} />,
      <ShoppingCartOutlined key="cart" onClick={addToCart} />
    ]}
  >
    <div className='flex justify-between items-start gap-4'>
      <div>
        <Meta title={name} />
        <Text type='secondary' className='mt-1 block italic'>{caffeineLevel}</Text>
      </div>
      <Text className='mt-1 block'>${price}</Text>
    </div>
    
  </Card>
);

export default CoffeeCard;