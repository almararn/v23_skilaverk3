"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function orderDrinks() {
  const [dish, setDish] = useState([])
  const [drinks, setDrinks] = useState([])
  const [order, setOrder] = useState([])
  const [filteredDrinks, setFilteredDrinks] = useState([])
  const [orderFinished, setOrderFinished] = useState(false)
  const [cartEmpty, setCartEmpty] = useState(false)
  const [deletingOrder, setDeletingOrder] = useState(false)
  const [deletePromt, setDeletePromt] = useState(false)
  const [orderToOld, setOrderToOld] = useState(false)
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
      redirectHome()
    }
  }, [])

  useEffect(() => {
    drinks?.forEach((drink) => {
      if (drink.count > 0) {
        setFilteredDrinks((filteredDrinks) => [...filteredDrinks, drink])
      }
    })
  }, [drinks])

  useEffect(() => {
    if (new Date(order.dateTime) < new Date()) {
      setOrderToOld(true)
    }
  }, [order])

  const confirmOrder = () => {
    localStorage.setItem(order.email, localStorage.getItem("current-order"))
    localStorage.removeItem("current-order")
    setOrderFinished(true)
    setTimeout(() => {
      router.push("/")
    }, 3000)
  }

  const cancelOrder = () => {
    setOrderFinished(true)
    setDeletingOrder(true)
  }

  const goBack = () => {
    setDeletingOrder(false)
    setOrderFinished(false)
  }

  const confirmedDelete = () => {
    setDeletingOrder(false)
    setDeletePromt(true)
    localStorage.removeItem(order.email)
    setTimeout(() => {
      router.push("/")
    }, 3000)
  }

  const redirectHome = () => {
    setTimeout(() => {
      router.push("/")
    }, 3000)
  }

  const editOrder = () => {
    router.push("/dish")
  }

  const price = (abv) => {
    return Math.round(abv * 200)
  }

  const total = () => {
    let total = 0
    drinks.forEach((drink) => {
      total += drink.count * price(drink.abv)
    })
    if (dish.price) {
      total += dish.price * dish.count
    }
    return total
  }

  return (
    <div className="mx-auto max-w-5xl">
      {!orderFinished ? (
        order.numberOfPeople ? (
          <div className="bg-lil-light mt-28 border-4 border-lil-green rounded-3xl p-8 m-12">
            <h1 className="font-bold mb-1">RECEIPT:</h1>
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
            <h2 className="my-2">
              Total price:<span className="font-bold mx-1">{total()} kr.</span>
            </h2>
            <h2 className="mb-2">
              Customer:<span className="font-bold mx-1">{order.email}</span>
            </h2>
            <div>
              <h2>You have a table reserved at our restaurant</h2>
              <h2>
                For {order.numberOfPeople} people on <span>{weekday}</span>,{" "}
                <span>{day}</span> of <span>{month}</span> <span>{year}</span>{" "}
                at <span>{hours}</span>:<span>{minutes}</span>
              </h2>
            </div>
            {!orderToOld ? (
              <>
                <Link href={"/order"}>
                  <button className=" bg-lil-red rounded-lg mt-6 px-3 py-1">
                    GO BACK
                  </button>
                </Link>
                <button
                  className=" bg-lil-red rounded-lg mt-6 px-3 py-1 mx-4"
                  onClick={editOrder}
                >
                  EDIT ORDER
                </button>
                <button
                  onClick={cancelOrder}
                  className=" bg-lil-red rounded-lg mt-6 px-3 py-1"
                >
                  CANCEL ORDER
                </button>
                <button
                  className=" bg-lil-red rounded-lg mt-6 px-3 py-1 float-right"
                  onClick={confirmOrder}
                >
                  CONFIRM ORDER
                </button>
              </>
            ) : 
            <div className="mt-10 mb-2">
            <Link href={"/"}>
                  <button className=" bg-lil-red rounded-lg px-3 py-1 float-right">
                    GO BACK TO HOMEPAGE
                  </button>
                </Link><h1 className="">-- This order is to old to be modified --</h1>
            </div>
            }
          </div>
        ) : !cartEmpty ? (
          <h1>LOADING</h1>
        ) : null
      ) : deletingOrder ? (
        <div className="mt-56 text-center bg-lil-light  border-4 border-lil-green rounded-3xl py-24 m-12">
          <h1>Are you sure you want to delete your order?</h1>
          <button
            className=" bg-lil-green rounded-lg mt-6 px-3 py-1 mr-4"
            onClick={goBack}
          >
            No - GO BACK
          </button>
          <button
            className=" bg-lil-red rounded-lg mt-6 px-3 py-1"
            onClick={confirmedDelete}
          >
            Delete Order
          </button>
        </div>
      ) : (
        <div className="mt-56 text-center bg-lil-light  border-4 border-lil-green rounded-3xl py-24 m-12">
          {deletePromt ? (
            <h1>Your order has been deleted</h1>
          ) : (
            <h1>Your order has been received</h1>
          )}
          <h2>You will now be redirected back to the homepage</h2>
        </div>
      )}
      {cartEmpty && (
        <div className="mt-56 text-center bg-lil-light  border-4 border-lil-green rounded-3xl py-24 m-12">
          <h1>Your Cart is empty</h1>
          <h2>You will now be redirected back to the homepage</h2>
        </div>
      )}
    </div>
  )
}
