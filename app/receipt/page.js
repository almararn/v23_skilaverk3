"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import useAxiosGet from "@/app/components/useAxiosGet"
import Link from "next/link"

export default function orderDrinks() {
  const [dish, setDish] = useState([])
  const [drinks, setDrinks] = useState([])
  const [order, setOrder] = useState([])
  const [filteredDrinks, setFilteredDrinks] = useState([])

  const date = new Date(order.dateTime)
  const year = date.getFullYear()
  const month = date.toLocaleString("en-US", { month: "long" })
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes().toString().padStart(2, "0")
  const weekday = date.toLocaleString("en-US", { weekday: "long" })

  useEffect(() => {
    let currentOrder = JSON.parse(localStorage.getItem("current-order"))
    let savedDish = currentOrder?.dish || []
    let savedDrinks = currentOrder?.drinks || []
    let savedDate = currentOrder?.order || []
    setDish(savedDish)
    setDrinks(savedDrinks)
    setOrder(savedDate)
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
  }

  return (
    <>
      {dish.strMealThumb && (
        <>
          <h1>RECEIPT:</h1>
          <h2>
            {dish.strMeal} - Count: {dish.count}
          </h2>
          <ul>
            {filteredDrinks.map((drink) => (
              <li key={drink.id}>
                {drink.name} - Count: {drink.count}
              </li>
            ))}
          </ul>
          <h2>{order.email}</h2>
          <div>
            <h2>You have a table is reserved at our restaurant on</h2>
            <h2>
              <span>{weekday}</span>, <span>{day}</span> of <span>{month}</span>{" "}
              <span>{year}</span> at <span>{hours}</span>:<span>{minutes}</span>
            </h2>
            <h2>For {order.numberOfPeople} people</h2>
          </div>
        </>
      )}
      <button onClick={handleClick}>CONFIRM ORDER</button>
    </>
  )
}
