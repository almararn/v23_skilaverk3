"use client"
import { useEffect, useState } from "react"
import Image from "next/image"

const orderDish = () => {
  const [dish, setDish] = useState([])
  const [ingredients, setIngredients] = useState([])
  const [price, setPrice] = useState(2500)

  useEffect(() => {
    fetch("https://themealdb.com/api/json/v1/1/random.php")
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setDish(data.meals[0])
      })
  }, [])

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

  return (
    <>
      <h2 className="text-lg font-bold">{dish.strMeal}</h2>
      <h3>
        {dish.strArea}, {dish.strCategory}
      </h3>
      {dish.length !== 0 && (
        <>
          <h3>
            Ingredients:
            {ingredients.map((items, index) => (
              <span key={index}>{items} </span>
            ))}
          </h3>
          <Image
            src={dish.strMealThumb}
            width={200}
            height={200}
            alt={"dish01"}
            priority={true}
          ></Image>
        </>
      )}
      {price !== 2500 && <h2>Price: {price} kr.</h2>}
    </>
  )
}

export default orderDish
