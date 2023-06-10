"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import useAxiosGet from "@/app/components/useAxiosGet"
import Link from "next/link"
import SelectDate from "../components/SelectDate"

export default function selectTime() {
  const [dish, setDish] = useState([])
  const [drinks, setDrinks] = useState([])
  const [date, setDate] = useState([])
  const [dateFromStorage, setDateFromStorage] = useState([])
  const [email, setEmail] = useState("")
  const [isValid, setValid] = useState(false)
  const [count, setCount] = useState(1)
  const router = useRouter()

  useEffect(() => {
    let currentOrder = JSON.parse(localStorage.getItem("current-order"))
    let savedDish = currentOrder?.dish || []
    let savedDrinks = currentOrder?.drinks || []
    let savedDate = currentOrder?.order || []
    setDish(savedDish)
    setDrinks(savedDrinks)
    setDateFromStorage(savedDate)
    setEmail(savedDate.email)
    setCount(savedDate.numberOfPeople)
  }, [])

  const handleStartDateChange = (date) => {
    setDate(date)
  }

  const handleChange = (e) => {
    setEmail(e.target.value.toLowerCase())
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,}$/i
    const isValidEmail = emailRegex.test(email)
    setValid(isValidEmail)
  }

  const setNumperOfPeople = (increment) => {
    setCount(count + increment)
  }
console.log("dateFromStorage", dateFromStorage)
  const handleSubmit = (e) => {
    e.preventDefault()
    if (dateFromStorage.dateTime ) {
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
    } else {
      let order = {
        dateTime: date.toString(),
        numberOfPeople: count,
        email: email,
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
    router.push("/receipt")
  }

  return (
    <>
      <div>
        <h1>Select the Date and Time you would like your order</h1>
        <SelectDate
          onStartDateChange={handleStartDateChange} savedDate={dateFromStorage.dateTime}
        />
      </div>
      <h1>Choose number of persons:</h1>
      <h2>
        <button onClick={() => count > 1 && setCount(count - 1)}>x</button>
        {count}
        <button onClick={() => setNumperOfPeople(+1)}>x</button>
      </h2>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input type="text" value={email} onChange={handleChange} />
            {!isValid && <p>Please enter a valid email address.</p>}
          </label>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  )
}
