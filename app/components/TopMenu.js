import Link from "next/link"
import Image from "next/image"
const topMenu = () => {
  return (
    <nav>
      <ul className="bg-lil-red flex h-16 justify-evenly py-0 mb-8 font-semibold text-lg">
        <li>
          <Link href={"/"}>
            <Image
              src={"/logo_cropped.png"}
              width={250}
              height={50}
              alt={"logo"}
              priority={true}
              className="mt-2"
            ></Image>
          </Link>
        </li>
        <li className="mt-5">Restaurant</li>
        <li className="mt-5">Menu</li>
        <li className="mt-5">Opening Hours</li>
        <li className="mt-5">Contact</li>
      </ul>
    </nav>
  )
}

export default topMenu
