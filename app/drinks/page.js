"use client"
import { useEffect, useState } from "react"
import useAxiosGet from "@/app/components/useAxiosGet"
import Link from "next/link"
import Image from "next/image"

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
    <div className="mb-36">
      {error && <h2>{error.message}</h2>}
      {loading && <h1>Loading...</h1>}
      {drinks && (
        <>
          <div className="grid grid-cols-5 gap-1 mt-16 mx-4">
            {drinks.map((items) => (
              <div
                className="p-2 border-4 border-lil-green rounded-3xl bg-amber-100"
                key={items.id}
              >
                <div className="h-40 flex flex-col justify-between">
                  {items.count > 0 && (
                    <Image
                      src={"/checkmark.png"}
                      width={100}
                      height={100}
                      alt={"checkmark"}
                      priority={true}
                      className="absolute -mt-10 ml-28"
                    />
                  )}

                  <Image
                    src={items.image_url}
                    width={20}
                    height={70}
                    alt={"checkmark"}
                    priority={true}
                    className="absolute mt-20 ml-36 opacity-75 h-[70px]"
                  />

                  <h3 className="font-bold">{items.name}</h3>

                  <h4 className="line-clamp-2">{items.tagline}</h4>

                  <h5>
                    price:
                    <span className="font-bold mx-1">{price(items.abv)}</span>
                    kr.
                  </h5>
                  <h2>
                    <button
                      onClick={() => items.count > 0 && setCount(items.id, -1)}
                    >
                      <span className=" bg-lil-green text-yellow-50 rounded-lg px-2">
                        -
                      </span>
                    </button>
                    <span className="font-bold mx-1">{items.count}</span>
                    <button onClick={() => setCount(items.id, +1)}>
                      <span className=" bg-lil-green text-yellow-50 rounded-lg px-2">
                        +
                      </span>
                    </button>
                  </h2>
                </div>
              </div>
            ))}
          </div>
          <Link href={"/order"}>
            <button
              className=" bg-lil-red rounded-lg px-3 py-2 float-right mr-4 my-4"
              onClick={handleClick}
            >
              add to cart
            </button>{" "}
          </Link>
          {gotSavedDrinks && (
            <div className="ml-4">
              <Link href={"/dish"}>
                <button className=" bg-lil-red rounded-lg mt-6 px-3 py-1 mr-2">GO BACK</button>
              </Link>
              <Link href={"/order"}>
                <button className=" bg-lil-red rounded-lg mt-6 px-3 py-1">NEXT</button>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  )
}
