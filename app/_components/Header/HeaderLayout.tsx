'use client'
import React, { useState, useEffect } from 'react'
import { Layout, Menu, MenuProps } from 'antd';
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const { Header } = Layout;

const menuItems = [
  {
    label: 'Home',
    key: 'home',
    icon: <MailOutlined />,
    link: '/home',
  },
  {
    label: 'Books',
    key: 'books',
    icon: <AppstoreOutlined />,
    link: './books'
  },
  {
    label: 'Coffee',
    key: 'coffee',
    icon: <AppstoreOutlined />,
    link: './coffee'
  },
  {
    label: 'Cart',
    key: 'cart',
    icon: <AppstoreOutlined />,
    link: '/cart'
  }
];

export default function HeaderLayout() {
  const currentPath = usePathname();
  const [current, setCurrent] = useState('home');

  const path = currentPath.slice(1);

  useEffect(() => {
    setCurrent(path);
  }, [path])

  const handleActive: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  return (
    <Header className='flex items-center bg-white'>
        <div className="demo-logo"></div>
        <Menu className='flex-1' onClick={handleActive} selectedKeys={[current]} mode="horizontal">
          {menuItems && menuItems.map((menu) => (
            <Menu.Item key={menu.key} icon={menu.icon}>
              <Link href={menu.link}>{menu.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
    </Header>
  )
}
