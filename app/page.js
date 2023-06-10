import Swiper from "./components/Swiper";
import Link from "next/link";

export default function Home() {
  return (
   <>
   <h1 className='text-center font-extrabold'>MAIN PAGE</h1>
   <div className="">
    <Swiper />
    <Link href={"/dish"}>ORDER</Link>
   </div>
   </> 
   
  )
}
