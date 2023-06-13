"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import useAxiosGet from "@/app/components/useAxiosGet"
import Link from "next/link"

export default function orderDish() {
  const [dish, setDish] = useState([])
  const [ingredients, setIngredients] = useState([])
  const [price, setPrice] = useState(2500)
  const [count, setCount] = useState(1)
  const [drinks, setDrinks] = useState([])
  const [dishFromStorage, setDishFromStorage] = useState(false)
  const [newDish, setNewDish] = useState()
  const [dateFromStorage, setDateFromStorage] = useState([])
  const url = "https://themealdb.com/api/json/v1/1/random.php"
  const { data, loading, error } = useAxiosGet(url, newDish)

  useEffect(() => {
    let currentOrder = JSON.parse(localStorage.getItem("current-order"))
    let savedDish = currentOrder?.dish || []
    let savedDrinks = currentOrder?.drinks || []
    let savedDate = currentOrder?.order || []
    setDrinks(savedDrinks)
    setDateFromStorage(savedDate)
    if ((data && savedDish.length == 0) || newDish) {
      setDish(data.meals[0])
    } else {
      setDish(savedDish)
      if (savedDish.count) {
        setCount(savedDish.count)
      }
    }
    if (currentOrder && !newDish) {
      setDishFromStorage(true)
    }
  }, [data])

  useEffect(() => {
    Object.entries(dish).map((item) => {
      if (item[0].includes("strIngredient")) {
        if (item[1] != "" && item[1] != null) {
          setIngredients((ingredients) => [...ingredients, item[1]])
        }
      }
    })
  }, [dish])

  useEffect(() => {
    setPrice(price + ingredients.length * 80)
  }, [ingredients])

  let totalPrice = () => {
    return price * count
  }

  const handleClick = () => {
    const newDish = { ...dish, count: count, price: price }
    let order = {
      dateTime: dateFromStorage.dateTime?.toString(),
      numberOfPeople: dateFromStorage.numberOfPeople,
      email: dateFromStorage.email,
    }
    localStorage.setItem(
      "current-order",
      JSON.stringify({
        dish: newDish,
        drinks: drinks,
        order,
      })
    )
  }

  const getNewDish = () => {
    setNewDish(Math.random())
    setIngredients([])
    setPrice(2500)
    setCount(1)
    setDishFromStorage(false)
  }

  return (
    <div className="mt-24 max-w-5xl mx-auto mb-20">
      <div className="ml-24 mt-24">
        {error && <h2>{error.message}</h2>}
        {loading && <h1>Loading...</h1>}
      </div>
      {dish.strMealThumb && (
        <div className="justify-evenly border-4 border-lil-green rounded-3xl p-8 mt-10 mx-12 bg-lil-light">
          <div className="grid grid-cols-3">
            <div className="col-span-2">
              <h2 className="text-xl font-bold">{dish.strMeal}</h2>
              <h3>{dish.strCategory}</h3>
              <h3>
                Ingredients:{" "}
                <span>
                  {ingredients.map((items, index) => (
                    <span key={index}>{items} </span>
                  ))}
                </span>
              </h3>
              <div className="flex justify-between items-center mt-8">
                <div className="text-xl">
                  {totalPrice && (
                    <h2>
                      Price: <span className="font-bold">{totalPrice()}</span>{" "}
                      kr.
                    </h2>
                  )}
                </div>
                <div>
                  <h2>
                    <button onClick={() => count > 1 && setCount(count - 1)}>
                      <span className=" bg-lil-green text-yellow-50 font-bold rounded-lg px-3 py-1">
                        -
                      </span>
                    </button>
                    <span className="text-xl font-bold mx-3">{count}</span>
                    <button onClick={() => setCount(count + 1)}>
                      <span className=" bg-lil-green text-yellow-50 font-bold rounded-lg px-3 py-1">
                        +
                      </span>{" "}
                    </button>
                  </h2>
                </div>
                <div>
                  <button
                    className=" bg-lil-green rounded-lg px-3 py-2"
                    onClick={getNewDish}
                  >
                    Get New Dish
                  </button>
                </div>
              </div>
            </div>
            <div className="col-span-1 flex justify-end">
              <div className="object-none">
                <Image
                  src={dish.strMealThumb}
                  width={250}
                  height={250}
                  alt={"dish01"}
                  priority={true}
                  className="rounded-3xl object-none"
                ></Image>
              </div>
            </div>
          </div>
          <h2 className="font-bold">How It's made:</h2>
          <p>{dish.strInstructions}</p>
          <div className="mt-4">
            <Link href={"/"}>
              <button
                className=" bg-lil-red rounded-lg px-3 py-2 mr-2"
                onClick={getNewDish}
              >
                GO BACK
              </button>
            </Link>
            {dishFromStorage && (
              <Link href={"/drinks"}>
                <button className=" bg-lil-red rounded-lg px-3 py-2">
                  NEXT
                </button>
              </Link>
            )}
            <Link href={"/drinks"}>
              <button
                className=" bg-lil-red rounded-lg px-3 py-2 float-right"
                onClick={handleClick}
              >
                Add To Cart
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
