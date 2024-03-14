import db, { collectionRef } from "@/firebase";
import { selectChannelId } from "@/lib/features/channelSlice";
import { collection, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";

export default function Message({ messageInfo }) {
  const { message, tsString, user } = messageInfo;
  let ts = null;

  tsString &&
    (ts = tsString.slice(0,5));


  const pfp = user.photo;
  return (
    <div className="flex w-full items-center py-1 lg:py-2">
      <Image
        loader={() => pfp}
        src={pfp}
        alt="userpfp"
        width={35}
        height={35}
        className="rounded-full mx-2 lg:mx-4"
      ></Image>
      <div className="flex flex-col lg:w-auto sm:w-[90%] w-[80%]">
        <div className="flex items-center justify-between">
          <h3 className="text-slate-300 text-sm lg:text-base font-semibold mr-4 lg:mr-8">
            {user.displayName}
          </h3>
          <p className="text-[.6rem] lg:text-xs font-semibold text-color-1 self-end">
            {ts}
          </p>
        </div>
        <p className="text-xs lg:text-[15px] font-extralight text-slate-200">{message}</p>
      </div>
    </div>
  );
}
