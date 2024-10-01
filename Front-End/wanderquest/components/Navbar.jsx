'use client'
import React from 'react'
import { useEffect,useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from'../Styles/Navbar.css'
// import {signIn,signOut,useSession,getProviders}from'next-auth/react'
const Navbar = () => {
  const isloggedin=false;
  return (<>
    <h1 className='navbar-leftsiede'>left</h1>
    <h2 className='navbar-middleside'>middle side </h2>
    <h2 className='navbar-rightside'>middle side </h2>
    </>
  )
}

export default Navbar