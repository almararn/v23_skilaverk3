"use client"
import { useEffect, useState } from "react"
import useAxiosGet from "@/app/components/useAxiosGet"
import Link from "next/link"

export default function orderDrinks() {
  const [dish, setDish] = useState([])
  const [drinks, setDrinks] = useState([])
  const [dateFromStorage, setDateFromStorage] = useState([])
  const [gotSavedDrinks, setGotSavedDrinks] = useState(false)
  const [noDrinks, setNoDrinks] = useState(true)
  const { data, loading, error } = useAxiosGet(
    "https://api.punkapi.com/v2/beers"
  )
  useEffect(() => {
    let currentOrder = JSON.parse(localStorage.getItem("current-order"))
    let savedDish = currentOrder?.dish || []
    let savedDrinks = currentOrder?.drinks || []
    let savedDate = currentOrder?.order || []
    if (data && savedDrinks.length == 0) {
      let newList = []
      data.forEach((obj) => {
        newList.push({ ...obj, count: 0 })
      })
      setDrinks(newList)
    } else {
      setDrinks(savedDrinks)
    }
    setDish(savedDish)
    setDateFromStorage(savedDate)
    if (savedDrinks.length > 0) {
      setGotSavedDrinks(true)
    }
  }, [data])

  const setCount = (id, increment) => {
    setDrinks((drinks) =>
      drinks.map((obj) =>
        obj.id === id ? { ...obj, count: obj.count + increment } : obj
      )
    )
  }

  useEffect(() => {
    let list = []
    drinks.map((obj) => {
      if (obj.count > 0) {
        list.push(obj.count)
      }
    })
    if (list.length > 0) {
      setNoDrinks(false)
    } else {
      setNoDrinks(true)
    }
  }, [drinks])

  const price = (abv) => {
    return Math.round(abv * 200)
  }

  const handleClick = () => {
    let order = {
      dateTime: dateFromStorage.dateTime?.toString(),
      numberOfPeople: dateFromStorage.numberOfPeople,
      email: dateFromStorage.email,
    }
    localStorage.setItem(
      "current-order",
      JSON.stringify({
        dish: dish,
        drinks: drinks,
        order,
      })
    )
  }

  return (
    <>
      {error && <h2>{error.message}</h2>}
      {loading && <h1>Loading...</h1>}
      {drinks && (
        <>
          {drinks.map((items) => (
            <div className="p-2" key={items.id}>
              <h3 className="font-bold">{items.name}</h3>
              <h4>{items.tagline}</h4>
              <h5>{items.description}</h5>
              <h5>price: {price(items.abv)} kr.</h5>
              <h2>
                {" "}
                <button
                  onClick={() => items.count > 0 && setCount(items.id, -1)}
                >
                  X
                </button>
                {items.count}
                <button onClick={() => setCount(items.id, +1)}>X</button>
              </h2>
            </div>
          ))}
          <Link href={"/order"}>
            <button onClick={handleClick}>add to cart</button>{" "}
          </Link>
          {gotSavedDrinks && (
            <>
              <Link href={"/order"}>
                <button>NEXT</button>
              </Link> {" "}
              <Link href={"/dish"}>
                <button>GO BACK</button>
              </Link>
            </>
          )}
        </>
      )}
    </>
  )
}
