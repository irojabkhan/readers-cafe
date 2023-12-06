'use client'

import './globals.css'
import { Provider } from 'react-redux'
import { store } from './_store/store'


export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}
