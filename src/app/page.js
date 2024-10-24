"use client"
import Chat from "@/components/Chat/Chat";
import HomePage from "@/components/Home/HomePage";
import Sidebar from "@/components/Sidebar/Sidebar";
import { DiscordStore } from "@/lib/store";
import { Provider } from "react-redux";

export default function Home() {
  return (
    <div className="text-roboto-500 font-roboto-500 roboto-font">
      <Provider store={DiscordStore}>
        <HomePage></HomePage>
      </Provider>
    </div>
  );
}
