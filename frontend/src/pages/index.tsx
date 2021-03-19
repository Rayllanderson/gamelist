import Head from 'next/head'
import React from 'react'
import { Login } from '../components/Login/Login'
import { AuthProvider } from "../contexts/AuthContext";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Game List</title>
      </Head>
      
      <AuthProvider>
        <Login />
      </AuthProvider>
    </div>
  )
}
