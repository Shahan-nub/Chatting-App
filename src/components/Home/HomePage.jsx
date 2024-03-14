"use client"
import { login, logout, selectUser } from '@/lib/features/userSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '../Sidebar/Sidebar';
import Chat from '../Chat/Chat';
import Login from '../Login/Login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase';


export default function HomePage() {
  const [menuState,setMenuState] = useState(false);
  const hideInputOnMenu = (open) => {
    setMenuState(open);
  }

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      console.log(authUser);
      if(authUser){
        // logged in
        dispatch(login({
          uid: authUser.uid.slice(0,6),
          photo:authUser.photoURL,
          email:authUser.email,
          displayName:authUser.displayName,
        }))
      } else {
        // logged out
        dispatch(logout())
      }
    })
  },[dispatch])
  return (
    <div className="flex fixed w-screen h-screen">
       {user ? (
        <>
          <Sidebar hideInputOnMenu={hideInputOnMenu}></Sidebar>
          <Chat menuState={menuState}></Chat>
        </>
      ) : (
        <Login/>
      )}
    </div>
  )
}
