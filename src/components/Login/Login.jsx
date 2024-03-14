
import { auth, provider } from '@/firebase'
import Image from 'next/image'
import { signInWithPopup } from 'firebase/auth';

export default function Login() {
    const SignIn =async  () => {
        try {
            const res = signInWithPopup(auth, provider);
            user = res.user;
            
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className='flex border-4 bg-white border-color-3  rounded-xl w-1/3  h-max py-4 lg:py-6 mx-auto mt-[55%] lg:mt-20 flex-col justify-center items-center'>
      <Image src="/image.png" width={390} height={350} className='w-[60%] lg:w-auto rounded-lg outline-none'></Image>
      <button className='bg-color-3 hover:scale-105 active:scale-95 text-sm lg:text-lg rounded-lg px-2 lg:px-4 py-1 lg:py-2 mt-10 mb-4 lg:mt-16 lg:mb-6'
      onClick={SignIn}
      >Sign In
      </button>
    </div>
  )
}
