import { setChannelInfo } from "@/lib/features/channelSlice";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";

export default function Channel({id,channelName}) {
  const dispatch = useDispatch();
  const handleChannelChange = () => {
    dispatch(setChannelInfo({
      channelId:id,
      channelName:channelName
    }))
  }
  return (
    <div onClick={handleChannelChange}
    className='group flex items-center justify-between text-color-1 font-medium text-sm sm:text-base hover:bg-[#5b5f65] sm:pl-4 pl-3 pr-2 sm:py-2 cursor-pointer py-1 hover:text-white transition-all duration-150'>
        # {channelName} 
        {/* <MdDelete onClick={handleDeleteChannel}
        className="hidden group-hover:block text-color-1 hover:text-red-400"></MdDelete> */}
    </div>
  )
}
