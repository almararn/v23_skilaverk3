"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Calendar from "../components/Calendar"

export default function selectTime() {
  const [dish, setDish] = useState([])
  const [drinks, setDrinks] = useState([])
  const [date, setDate] = useState([])
  const [dateFromStorage, setDateFromStorage] = useState([])
  const [email, setEmail] = useState("")
  const [isValid, setIsValid] = useState(false)
  const [orderIsEmpty, setOrderIsEmpty] = useState(true)
  const [count, setCount] = useState(1)
  const router = useRouter()

  useEffect(() => {
    let currentOrder = JSON.parse(localStorage.getItem("current-order"))
    let savedDish = currentOrder?.dish || []
    let savedDrinks = currentOrder?.drinks || []
    let savedDate = currentOrder?.order || []
    setDish(savedDish)
    setDrinks(savedDrinks)
    if (currentOrder?.order?.numberOfPeople) {
      setDateFromStorage(savedDate)
      setEmail(savedDate.email)
      setCount(savedDate.numberOfPeople)
      setDate(new Date(savedDate.dateTime))
      setOrderIsEmpty(false)
    }
  }, [])

  useEffect(() => {
    if (dateFromStorage.email) {
      setIsValid(true)
    }
  }, [dateFromStorage])

  const handleStartDateChange = (date) => {
    setDate(date)
  }

  const handleChange = (e) => {
    setEmail(e.target.value.toLowerCase())
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,}$/i
    const isValidEmail = emailRegex.test(email)
    setIsValid(isValidEmail)
  }

  const setNumperOfPeople = (increment) => {
    setCount(count + increment)
  }

  const handleSubmit = (e) => {
    let newDate = date
    if (new Date(newDate).getHours() < 16) {
      newDate = new Date(date).setHours(16)
      newDate = new Date(newDate)
    }
    e.preventDefault()
    if (isValid) {
      let order = {
        dateTime: newDate.toString(),
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
      router.push("/receipt")
    }
  }

  return (
    <>
      <div>
        <h1>Select the Date and Time you would like your order</h1>
        <Calendar
          onStartDateChange={handleStartDateChange}
          savedDate={dateFromStorage.dateTime}
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
      {!orderIsEmpty && (
        <>
          <Link href={"/receipt"}>
            <button>NEXT</button>
          </Link> {""}
          <Link href={"/drinks"}>
            <button>GO BACK</button>
          </Link>
        </>
      )}
    </>
  )
}
