import Head from 'next/head'
import React from 'react'
import { Login } from '../components/Login/Login'
import { LoginProvider } from '../contexts/LoginContext'

export default function Home() {
  return (
    <div>
      <LoginProvider>
        <Head>
          <title>Game List</title>
        </Head>

        <Login />
      </LoginProvider>
    </div>
  )
}
