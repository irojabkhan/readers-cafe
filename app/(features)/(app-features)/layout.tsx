'use client'
import React from 'react'
import { Layout } from 'antd';
import HeaderLayout from '../../_components/Header/HeaderLayout'
import FooterLayout from '../../_components/Footer/FooterLayout'

const { Content } = Layout;

function layout({ children } : { children: React.ReactNode}) {
  return (
    <Layout className="layout flex flex-col !w-full min-h-screen">
      <HeaderLayout />
      <Content style={{ padding: '0 50px', flex: 1, }}>
        <div className="site-layout-content">
          { children }
        </div>
      </Content>
      <FooterLayout />
    </Layout>
  )
}

export default layout