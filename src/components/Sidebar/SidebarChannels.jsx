import Channel from "./Channel";
import { setChannelInfo } from "@/lib/features/channelSlice";


export default function SidebarChannels({channels}) {
  
  console.log("channels are: ",channels)
  return (
    <div className="flex flex-col justify-start ">
      {channels.map(({id,channel}) => {
        return (
          <Channel key={id} id={id}
          channelName={channel.channelName}></Channel>
          )
      })}
    </div>
  )
}
