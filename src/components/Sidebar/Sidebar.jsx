"use client";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import { FiMenu } from "react-icons/fi";
import SidebarChannels from "./SidebarChannels";
import VC from "./VC";
import Profile from "./Profile";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@/lib/features/userSlice";
import { RiArrowDropUpLine } from "react-icons/ri";

import db, { collectionRef } from "@/firebase";
import { collection, addDoc } from "firebase/firestore/lite";
import {
  deleteField,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export default function Sidebar({hideInputOnMenu}) {
  const user = useSelector(selectUser);
  const src = user.photo;
  console.log(src);

  const [open, setOpen] = useState(true);
  const MenuSlider = () => {
    setOpen(!open);
    hideInputOnMenu(open);
  };

  const [channels, setChannels] = useState([]);
  useEffect(() => {
    onSnapshot(collectionRef, (snapshot) => {
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          channel: doc.data(),
        }))
      );
    });
    console.log(channels);
  }, [setChannels]);

  //test

  // let books=[];
  // useEffect(() => {
  //   getDocs(collectionRef)
  //   .then((snapshot) => {
  //     snapshot.docs.forEach((doc) => {
  //       books.push({...doc.data(), id: doc.id})
  //     })
  //     console.log("books: ",books);
  //   }).catch((err) => console.log("err while collecting data",err))
  //   setChannels(books);
  //   console.log("channels: ",channels)
  // }, [setChannels]);

  // add channels

  const handleAddChannel = async () => {
    const newChannelName = prompt("Enter new channel name: ");
    if (newChannelName) {
      try {
        const newChannel = {
          channelName: newChannelName,
        };

        setDoc(doc(collectionRef), newChannel);
      } catch (error) {
        console.log("error while adding channel: ", error);
      }
    }
  };

  // delete channels

  // const handleDeleteChannel =(channelToDEL) => {
  //   console.log(channelToDEL)
  //   const channelRef = doc(db,"channels",channelToDEL);
  //   try {
  //     updateDoc(channelRef,{
  //       channelName:deleteField(channelToDEL)
  //     })
  //   } catch (error) {
  //     console.log("error while deleting channel",error)
  //   }
  // }
  const [channelsDD, setChannelsDD] = useState(false);
  const handleChannelsDD = () => {
    setChannelsDD(!channelsDD);
  };
  return (
    <>
    <FiMenu onClick={MenuSlider} className={`text-slate-200 hover:text-white font-medium md:text-2xl text-lg cursor-pointer lg:hidden ${open ? "hidden":"visible"}`} ></FiMenu>
    <div
      className={`flex lg:visible  flex-col  justify-between bg-dc-bg min-h-screen  h-full lg:w-1/5 md:w-3/5 w-4/5 lg:pt-[9px]
      ${open ? "visible": "hidden "}
    `}
    >
      <div className="flex flex-col">
        {/* USERNAME  */}
        <div className="flex justify-between w-full items-center lg:pb-[12px] px-4  border-color-1 shadow-lg">
          <h2 className="text-slate-200 font-semibold text-lg md:text-3xl">
            Niggaslayer
          </h2>
          <FiMenu onClick={MenuSlider}
          className={`text-slate-200 hover:text-white font-medium md:text-2xl text-lg cursor-pointer lg:hidden`} />
        </div>

        {/* text channels Title */}

        <div className="flex  justify-between items-center py-3 px-4 font-bold">
          <div className="flex items-center">
            {channelsDD ? (
              <RiArrowDropUpLine onClick={handleChannelsDD} className="text-color-1 cursor-pointer hover:text-white hover:scale-105 text-3xl mr-2" />
            ) : (
              <RiArrowDropDownLine onClick={handleChannelsDD} className="text-color-1 cursor-pointer hover:text-white hover:scale-105 text-3xl mr-2" />
            )}

            <h2 className="text-color-1 text-lg cursor-pointer hover:text-white"  onClick={handleChannelsDD}>Text Channels</h2>
          </div>
          <FaPlus
            onClick={handleAddChannel}
            className="text-color-1 cursor-pointer hover:text-white"
          ></FaPlus>
        </div>
        {/* CHANNELS  */}
        <div className={`flex z-50 lg:w-auto w-[42%] ${channelsDD ? "visible" : "hidden"}`}>
          <SidebarChannels channels={channels}></SidebarChannels>
        </div>
      </div>

      <div className="flex flex-col">
        {/* VC  */}
        <VC></VC>

        {/* PFP AND NAME  */}
        <Profile
          userpfp={src}
          username={user.displayName}
          userId={user.uid}
        ></Profile>
      </div>
    </div>
    </>
  );
}
