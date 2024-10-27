"use client";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import { FiMenu } from "react-icons/fi";
import SidebarChannels from "./SidebarChannels";
import VC from "./VC";
import Profile from "./Profile";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "@/lib/features/userSlice";
import { RiArrowDropUpLine } from "react-icons/ri";
import { IoIosClose } from "react-icons/io";
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
import { selectMenu, setMenu } from "@/lib/features/menuSlice";
import { selectChannelName } from "@/lib/features/channelSlice";

export default function Sidebar() {
  const user = useSelector(selectUser);
  const src = user.photo;
  // console.log(src);

  const menuState = useSelector(selectMenu);
  const dispatch = useDispatch();

  const [channels, setChannels] = useState([]);
  useEffect(() => {
    const response = onSnapshot(collectionRef, (snapshot) => {
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          channel: doc.data(),
        }))
      );
    });
    console.log(channels);
  }, [setChannels]);

  // add channels

  const channelNameRef = useRef();
  const channelPasswordRef = useRef();
  const [showAddChannelForm, setShowAddChannelForm] = useState(false);

  const handleAddChannel = async () => {
    // const newChannelName = prompt("Enter new channel name: ");
    const newChannelName = channelNameRef.current.value;
    const password = channelPasswordRef.current.value;
    if (newChannelName) {
      try {
        const newChannel = {
          channelName: newChannelName,
          channelPassword: password === "" ? null : password,
        };

        setDoc(doc(collectionRef), newChannel);
      } catch (error) {
        console.log("error while adding channel: ", error);
      }
    }
  };

  const [channelsDD, setChannelsDD] = useState(true);
  const handleChannelsDD = () => {
    setChannelsDD(!channelsDD);
  };
  const activeChannel = useSelector(selectChannelName);
  return (
    <>
      {showAddChannelForm && (
        <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md rounded-lg bg-[black] py-4 px-6 lg:py-6 lg:px-8 text-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddChannel();
              setShowAddChannelForm(false);
            }}
            className="flex flex-col gap-3 lg:gap-4 mx-auto font-sans"
          >
            <label className="text-xs lg:text-base font-semibold">
              Channel Name:
            </label>
            <input
              ref={channelNameRef}
              type="text"
              placeholder="Enter your channel name..."
              className="bg-black rounded-sm border-1 border-white  focus:border-white text-white px-3 py-2 text-xs lg:text-base"
            />
            <label className="text-xs lg:text-base whitespace-nowrap">{`Password: (ignore to create public channel)`}</label>

            <input
              ref={channelPasswordRef}
              type="text"
              placeholder="Enter password..."
              className="bg-black rounded-sm border-1 border-white focus:border-white text-white px-3 py-2 text-xs lg:text-base"
            />

            <button
              type="submit"
              className={`bg-white py-2 px-4 rounded-md text-black text-sm mt-3`}
            >
              Create
            </button>
            <button
              type="btn"
              onClick={() => setShowAddChannelForm(false)}
              className={`bg-red-500 py-2 px-4 rounded-md text-white text-xl text-center font-bold`}
            >
              <IoIosClose className="mx-auto"></IoIosClose>
            </button>
          </form>
        </div>
      )}
      {/* ------------- */}

      <div
        className={`flex  flex-col  justify-between bg-dc-bg min-h-screen  h-full lg:w-1/5  w-full lg:pt-[9px] 
      // ${menuState ? "visible" : " hidden lg:flex "}
    `}
      >
        <div className="flex lg:w-[20vw] w-screen flex-col basis-[70%">
          {/* USERNAME  */}
          <div className="flex justify-between w-full items-center lg:pb-[12px] px-4  border-color-1 shadow-lg basis-[10%]">
            <h2 className="text-slate-200 font-semibold text-xl md:text-3xl">
              YAP JOINT
            </h2>
            <FiMenu
              onClick={() => {
                activeChannel && dispatch(setMenu());
              }}
              className={`text-slate-200 hover:text-white font-medium md:text-2xl text-lg cursor-pointer lg:hidden`}
            />
          </div>

          {/* text channels Title */}

          <div className="flex basis-[15%] justify-between items-center py-3 px-4 font-bold">
            <div className="flex items-center">
              {channelsDD ? (
                <RiArrowDropUpLine
                  onClick={handleChannelsDD}
                  className="text-color-1 cursor-pointer hover:text-white hover:scale-105 text-3xl mr-2"
                />
              ) : (
                <RiArrowDropDownLine
                  onClick={handleChannelsDD}
                  className="text-color-1 cursor-pointer hover:text-white hover:scale-105 text-3xl mr-2"
                />
              )}

              <h2
                className="text-color-1 text-lg cursor-pointer hover:text-white"
                onClick={handleChannelsDD}
              >
                Text Channels
              </h2>
            </div>
            <FaPlus
              onClick={() => setShowAddChannelForm(!showAddChannelForm)}
              className="text-color-1 cursor-pointer hover:text-white"
            ></FaPlus>
          </div>
          {/* CHANNELS  */}
          <div
            className={`flex overflow-scroll no-scrollbar basis-[50%] z-50 lg:w-auto sm:w-[60%] w-[42%] ${
              channelsDD ? "visible" : "hidden"
            }`}
          >
            <SidebarChannels channels={channels}></SidebarChannels>
          </div>
        </div>

        <div className="flex flex-col lg:mb-3 sm:mb-5 mb-12">
          {/* VC  */}
          {/* <VC></VC> */}

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
