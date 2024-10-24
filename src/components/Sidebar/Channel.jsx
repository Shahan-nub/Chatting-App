import { setMenu } from "@/lib/features/menuSlice";
import { selectChannelName, setChannelInfo } from "@/lib/features/channelSlice";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { CiLock } from "react-icons/ci";

export default function Channel({ id, channelName, password }) {
  const activeChannel = useSelector(selectChannelName);

  const dispatch = useDispatch();
  const handleChannelChange = () => {
    dispatch(
      setChannelInfo({
        channelId: id,
        channelName: channelName,
      })
    );
    dispatch(setMenu());
  };
  return (
    <div
      onClick={() => {
        if (password) {
          const passPrompt = prompt("Enter channel password");
          if (passPrompt === password) {
            handleChannelChange();
          } else {
            alert(
              "Wrong password! Please enter the right password or join a public channel."
            );
          }
        } else {
          handleChannelChange();
        }
      }}
      className={`group flex items-center justify-between text-nowrap text-color-1 font-medium text-sm sm:text-base hover:bg-[#5b5f65] sm:pl-4 pl-3 pr-2 sm:py-2 cursor-pointer py-1 hover:text-white transition-all duration-200 ease-in-out
    ${
      channelName === activeChannel &&
      "bg-[rgb(57_56_61)] text-color-3 font-semibold border-l-8 border-color-3 rounded-l-[4px] lg:rounded-l-lg"
    }
    `}
    >
      <p>
        # {channelName}
      </p> 
      {password && <CiLock className=""></CiLock>}
      {/* <MdDelete onClick={handleDeleteChannel}
        className="hidden group-hover:block text-color-1 hover:text-red-400"></MdDelete> */}
    </div>
  );
}
