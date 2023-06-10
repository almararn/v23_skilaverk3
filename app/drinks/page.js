"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import useAxiosGet from "@/app/components/useAxiosGet"
import Link from "next/link"

export default function orderDrinks() {
  const [dish, setDish] = useState([])
  const [drinks, setDrinks] = useState([])
  const { data, loading, error } = useAxiosGet(
    "https://api.punkapi.com/v2/beers"
  )
  useEffect(() => {
    let currentOrder = JSON.parse(localStorage.getItem("current-order"))
    let savedDish = currentOrder?.dish || []
    let savedDrinks = currentOrder?.drinks || []

    if (data && savedDrinks.length == 0) {
      let newList = []
      data.forEach(obj => {
        newList.push({...obj, "count" : 0})    
      })
      setDrinks(newList)
    } else {
      setDrinks(savedDrinks)
    }
    setDish(savedDish)
  }, [data])

  const setCount = (id, increment) => {
    setDrinks(drinks => drinks.map(obj =>
        obj.id === id ? { ...obj, count: obj.count + increment } : obj
      ));
  }

  const handleClick = () => {
    localStorage.setItem(
      "current-order",
      JSON.stringify({ dish: dish, drinks: drinks })
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
              <h2>
                {" "}
                <button onClick={() => items.count > 0 && setCount(items.id, -1)}>
                  X
                </button>
                {items.count}<button onClick={() => setCount(items.id, +1)}>X</button>
              </h2>
            </div>
          ))}
                    <Link href={"/order"}>
            <button onClick={handleClick}>add to cart</button>
          </Link>
        </>
      )}
    </>
  )
}
