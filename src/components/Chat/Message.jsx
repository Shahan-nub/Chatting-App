
import Image from "next/image";


export default function Message({ messageInfo }) {
  const { message, tsString, user, uploadedFile } = messageInfo;
  // console.log("tsString: ",tsString, "day: ",day)
  let tm = null;
  let time=null;
  if(tsString){
    tm = tsString.split(":");
    time=`${tm[0]}:${tm[1]}`
  }

  console.log(uploadedFile)

  const pfp = user.photo;

  if(message == "" || message == " ") return <></>;



  return (
    <div className="flex w-full items-center py-1 lg:py-2">
      <Image
        loader={() => pfp}
        src={pfp}
        alt="userpfp"
        width={35}
        height={35}
        className="rounded-full mx-2 lg:mx-4 self-start"
      ></Image>
      <div className="flex flex-col lg:w-auto sm:w-[90%] w-[80%]">
        <div className="flex items-center gap-4">
          <h3 className="text-slate-300 text-sm lg:text-base font-semibold mr-4 lg:mr-8 ">
            {user.displayName}
          </h3>
          <p className="text-[.6rem] lg:text-xs font-semibold text-color-1 lg:px-2 self-end">
            {time}
          </p>
        </div>
        {message && <p className="text-xs lg:text-[15px] font-extralight text-slate-200">{message}</p>}
        {uploadedFile && <Image src={uploadedFile} alt="uploaded img" width={500} height={500} className="rounded-lg w-[35%] py-2"/>}
      </div>
    </div>
  );
}
