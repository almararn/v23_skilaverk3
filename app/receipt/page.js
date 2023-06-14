"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import useAxiosGet from "@/app/components/useAxiosGet"
import Link from "next/link"

export default function orderDrinks() {
  const [dish, setDish] = useState([])
  const [drinks, setDrinks] = useState([])
  const [order, setOrder] = useState([])
  const [filteredDrinks, setFilteredDrinks] = useState([])
  const [orderFinished, setOrderFinished] = useState(false)
  const [cartEmpty, setCartEmpty] = useState(false)
  const date = new Date(order.dateTime)
  const year = date.getFullYear()
  const month = date.toLocaleString("en-US", { month: "long" })
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes().toString().padStart(2, "0")
  const weekday = date.toLocaleString("en-US", { weekday: "long" })
  const router = useRouter()

  useEffect(() => {
    let currentOrder = JSON.parse(localStorage.getItem("current-order"))
    let savedDish = currentOrder?.dish || []
    let savedDrinks = currentOrder?.drinks || []
    let savedDate = currentOrder?.order || []
    setDish(savedDish)
    setDrinks(savedDrinks)
    setOrder(savedDate)
    if (!currentOrder) {
      setCartEmpty(true)
    }
  }, [])

  useEffect(() => {
    drinks?.forEach((drink) => {
      if (drink.count > 0) {
        setFilteredDrinks((filteredDrinks) => [...filteredDrinks, drink])
      }
    })
  }, [drinks])

  const handleClick = () => {
    localStorage.setItem(order.email, localStorage.getItem("current-order"))
    localStorage.removeItem("current-order")
    setOrderFinished(true)
    setTimeout(() => {
      router.push("/")
    }, 3000)
  }

  const price = (abv) => {
    return Math.round(abv * 200)
  }

  const setCartStatus = () => {
    
  }

  
  return (
    <>
      {!orderFinished ? (
        order.numberOfPeople ? (
          <>
            <h1>RECEIPT:</h1>
            {dish.strMeal && (
              <h2>
                {dish.count} x {dish.strMeal} @ {dish.price} kr.
              </h2>
            )}
            {drinks && (
              <ul>
                {filteredDrinks.map((drink) => (
                  <li key={drink.id}>
                    {drink.count} x {drink.name} @ {price(drink.abv)} kr.
                  </li>
                ))}
              </ul>
            )}
            <h2>{order.email}</h2>
            <div>
              <h2>You have a table reserved at our restaurant</h2>
              <h2>
                For {order.numberOfPeople} people on <span>{weekday}</span>,{" "}
                <span>{day}</span> of <span>{month}</span> <span>{year}</span>{" "}
                at <span>{hours}</span>:<span>{minutes}</span>
              </h2>
            </div>
            <button onClick={handleClick}>CONFIRM ORDER</button>
          </>
        ) : !cartEmpty ? (
          <h1>LOADING</h1>
        ) : null
      ) : (
        <div className="mt-56 text-center">
          <h1>Your order has been received</h1>
          <h2>You will now be redirected back to the frontpage</h2>
        </div>
      )}
      {cartEmpty && (
        <div className="mt-56 text-center">
          <h1>Your Cart is empty</h1>
          <Link href={"/"}>
            <button className="mt-4">Go back to homepage</button>
          </Link>
        </div>
      )}
    </>
  )
}
