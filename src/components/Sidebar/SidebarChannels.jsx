import Channel from "./Channel";
import { setChannelInfo } from "@/lib/features/channelSlice";


export default function SidebarChannels({channels}) {
  
  console.log("channels are: ",channels)
  return (
    // lg:h-[70%] h-[60%]
    <div className="flex flex-col lg:w-1/5  w-[100vw] h-max  overflow-scroll no-scrollbar backdrop-blur-xl absolute  justify-start ">
      {channels.map(({id,channel}) => {
        return (
          <Channel key={id} id={id}
          channelName={channel.channelName}></Channel>
          )
      })}
    </div>
  )
}
