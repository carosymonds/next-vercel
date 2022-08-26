import Head from 'next/head'
import React from 'react'
import { Navbar } from '../ui';
interface Props {
    children: React.ReactNode;
    title: string;
}

export const Layout:React.FC<Props> = ({children, title}) => {
  return (
    <>
        <Head>
            <title>
                {title}
            </title>
            <meta name="description" content='Info del Poke'></meta>
        </Head>
        <Navbar/>
        <main>
            {children}
        </main>
    </>
  )
}
