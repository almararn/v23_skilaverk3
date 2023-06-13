"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import Swiper from "./components/Swiper"
import Link from "next/link"

export default function Home() {
  const [email, setEmail] = useState("")
  const [isValid, setIsValid] = useState(false)
  const [orderFound, setOrderFound] = useState(false)
  const [orderNotFound, setOrderNotFound] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isValid) {
      let items = localStorage.getItem(email)
      if (items) {
        setOrderFound(true)
      } else {
        setOrderNotFound(true)
      }
    }
  }

  const saveItem = () => {
    localStorage.setItem("current-order", localStorage.getItem(email))
  }

  useEffect(() => {
    localStorage.removeItem("current-order")
  }, [])

  useEffect(() => {
    if (orderNotFound) {
      setTimeout(() => {
        setOrderNotFound(false)
        setIsValid(false)
        setEmail("")
      }, 3000)
    }
  }, [handleSubmit])

  const handleChange = (e) => {
    setEmail(e.target.value.toLowerCase())
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,}$/i
    const isValidEmail = emailRegex.test(email)
    setIsValid(isValidEmail)
  }

  return (
    <div className="grid sm:grid-cols-2 grid-cols-1 mx-auto mt-32 max-w-5xl pr-12 pb-20">
      <div className="">
        <Swiper />
      </div>
      <div className="justify-evenly border-4 border-lil-green rounded-3xl p-4 bg-gradient-to-r bg-lil-light">
        <p>
          Welcome to Lil'Bits, a cozy and vibrant eatery that will captivate
          your taste buds with its delightful flavors and charming ambiance.
          Nestled in the heart of town, Lil'Bits is a haven for food lovers
          seeking a unique culinary experience. Our talented chefs craft an
          array of delectable dishes using the freshest, locally sourced
          ingredients, ensuring each bite bursts with exquisite flavors.
        </p>
        <div className="float-right bg-lil-red rounded-lg mt-1 px-3 py-1">
          <Link href={"/dish"}>ORDER HERE</Link>
        </div>
      </div>

      <div className="justify-evenly border-4 border-lil-green rounded-3xl p-4 mt-10 ml-12 mr-12 bg-lil-light">
        <form onSubmit={handleSubmit}>
          {isValid && (
            <Image
              src={"/checkmark.png"}
              width={100}
              height={100}
              alt={"checkmark"}
              priority={true}
              className="absolute ml-56"
            />
          )}
          <p className="mb-3">Enter your email address to find order</p>

          <label>
            <span className="font-bold">Email: </span>
            <input
              type="text"
              className="bg-lil-light border-2  border-lil-green rounded-lg px-2 py-1 mt-2"
              value={email}
              onChange={handleChange}
            />
          </label>

          <div className="float-right bg-lil-red rounded-lg mt-16 px-3 py-1">
            <button type="submit">Submit</button>
          </div>
          <div>
            {orderFound && (
              <div className="mt-8">
                <h2>Your order was found</h2>
                <Link onClick={saveItem} href={"/receipt"}>
                  <button className=" bg-lil-red rounded-lg mt-2 px-3 py-1">
                    EDIT ORDER
                  </button>
                </Link>
              </div>
            )}
            {orderNotFound && (
              <div className="mt-3">
                <h2>Your order was not found</h2>
                <h2>Please try again</h2>
              </div>
            )}
          </div>
        </form>
      </div>
      <div className="justify-evenly border-4 border-lil-green rounded-3xl p-4 mt-10 bg-lil-light">
        <p>
          At Lil'Bits, we believe that exceptional food goes hand in hand with
          exceptional service. Our friendly and attentive staff is dedicated to
          ensuring that your visit is nothing short of extraordinary. Whether
          you're enjoying a casual lunch, celebrating a special occasion, or
          simply indulging in a night out, our team will make you feel right at
          home.
        </p>
      </div>
    </div>
  )
}
