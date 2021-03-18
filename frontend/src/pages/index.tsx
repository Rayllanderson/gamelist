import Head from 'next/head'
import React from 'react'
import { Login } from '../components/Login/Login'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Game List</title>
      </Head>

      <Login />

    </div>
  )
}
