"use client"
import { useEffect, useState } from "react"
import Swiper from "./components/Swiper"
import Link from "next/link"

export default function Home() {
  const [email, setEmail] = useState("")
  const [isValid, setIsValid] = useState(false)
  const [orderFound, setOrderFound] = useState(false)
  const [orderNotFound, setOrderNotFound] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    let items = localStorage.getItem(email)
    if (items) {
      setOrderFound(true)
    } else {
      setOrderNotFound(true)
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
    <>
      <h1 className="text-center font-extrabold">MAIN PAGE</h1>
      <div className="">
        <Swiper />
        <Link href={"/dish"}>ORDER</Link>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Please enter your email address to find order</p>
            Email:
            <input type="text" value={email} onChange={handleChange} />
          </label>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      {orderFound && (
        <div>
          <h2>Your order was found</h2>
          <Link onClick={saveItem} href={"/receipt"}>
            EDIT ORDER
          </Link>
        </div>
      )}
      {orderNotFound && (
        <div>
          <h2>Your order was not found</h2>
        </div>
      )}
    </>
  )
}
