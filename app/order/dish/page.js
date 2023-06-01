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
  const { data, loading, error } = useAxiosGet(
    "https://themealdb.com/api/json/v1/1/random.php"
  )

  useEffect(() => {
    let currentOrder = JSON.parse(localStorage.getItem("current-order"))
    let savedDish = currentOrder?.dish || []

    if (data && savedDish.length == 0) {
      setDish(data.meals[0])
      Object.entries(data.meals[0]).map((item) => {
        if (item[0].includes("strIngredient")) {
          if (item[1] != "" && item[1] != null) {
            setIngredients((ingredients) => [...ingredients, item[1]])
          }
        }
      })
    } else {
      setDish(savedDish)
      Object.entries(savedDish).map((item) => {
        if (item[0].includes("strIngredient")) {
          if (item[1] != "" && item[1] != null) {
            setIngredients((ingredients) => [...ingredients, item[1]])
          }
        }
      })
    }
  }, [data])

  useEffect(() => {
    setPrice(price + ingredients.length * 80)
  }, [ingredients])

  let handleClick = function () {
    const newDish = { ...dish, count: count }
    localStorage.setItem(
      "current-order",
      JSON.stringify({ dish: newDish, drinksDemo: newDish })
    )
  }

  return (
    <>
      {error && <h2>{error.message}</h2>}
      {loading && <h1>Loading...</h1>}
      {dish.strMealThumb && (
        <>
          <h2 className="text-lg font-bold">{dish.strMeal}</h2>
          <h3>{dish.strCategory}</h3>
          <h3>
            Ingredients:{" "}
            <span>
              {ingredients.map((items, index) => (
                <span key={index}>{items} </span>
              ))}
            </span>
          </h3>
          <Image
            src={dish.strMealThumb}
            width={200}
            height={200}
            alt={"dish01"}
            priority={true}
          ></Image>
          <h2>How It's made:</h2>
          <p>{dish.strInstructions}</p>
          {price !== 2500 && <h2>Price: {price} kr.</h2>}
          <h2>
            {" "}
            <button onClick={() => count > 1 && setCount(count - 1)}>
              X
            </button>{" "}
            {count} <button onClick={() => setCount(count + 1)}>X</button>
          </h2>
          <Link href={"order/drinks"}>
            <button onClick={handleClick}>add to cart</button>
          </Link>
        </>
      )}
    </>
  )
}
