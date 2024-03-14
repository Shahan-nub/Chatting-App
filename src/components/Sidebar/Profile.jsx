"use client";
import { auth } from "@/firebase";
import { logout, selectUser } from "@/lib/features/userSlice";
import { signOut } from "firebase/auth";
import Image from "next/image";
import { FaMicrophone } from "react-icons/fa";
import { FaHeadphonesSimple } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";

export default function Profile({ userpfp, username, userId }) {
  const SignOut= () => {
    signOut(auth)
  }
  return (
    <div className="flex items-center justify-between sm:py-3 py-2 sm:px-4 px-2">
        <Image
          loader={() => userpfp}
          className="rounded-full w-8 h-8 sm:w-11 sm:h-11 cursor-pointer"
          src={userpfp}
          alt="pfp"
          width={45}
          height={45}
          onClick={SignOut}
        ></Image>

      {/* USERNAME AND ID  */}
      <div className="flex flex-col">
        <h2 className="text-slate-200 font-medium md:font-semibold">
          {username}
        </h2>
        <p className="text-color-1 lg:font-medium font-light"># {userId}</p>
      </div>

      {/* ICONS  */}
      <div className="flex flex-col justify-between items-center text-color-1 sm:text-lg text-base font-medium sm:mr-2">
        <FaMicrophone className="my-2 cursor-pointer hover:text-white"></FaMicrophone>
        <FaHeadphonesSimple className="my-2 cursor-pointer hover:text-white"></FaHeadphonesSimple>
        <IoMdSettings className="my-2 cursor-pointer hover:text-white"></IoMdSettings>
      </div>
    </div>
  );
}
