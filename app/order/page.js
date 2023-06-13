"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
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
    <div className="mx-auto max-w-5xl">
      <div className="mt-24 border-4 border-lil-green rounded-3xl p-8 m-12 bg-lil-light">
        <h1 className="font-bold">
          Select the Date and Time you would like your order
        </h1>
        <div className="grid grid-cols-2 mx-auto mt-6 max-w-5xl pr-12">
          <div className="col-span-1 flex justify-center">
            <Calendar
              onStartDateChange={handleStartDateChange}
              savedDate={dateFromStorage.dateTime}
            />
          </div>
          <div className="col-span-1 flex justify-center">
            <div>
              <h1>Choose number of persons:</h1>
              {isValid && (
                <Image
                  src={"/checkmark.png"}
                  width={100}
                  height={100}
                  alt={"checkmark"}
                  priority={true}
                  className="absolute ml-56 mt-6"
                />
              )}
              <h2 className="my-4">
                <button onClick={() => count > 1 && setCount(count - 1)}>
                  <span className=" bg-lil-green text-yellow-50 rounded-lg px-2">
                    -
                  </span>
                </button>
                <span className="font-bold mx-2">{count}</span>
                <button onClick={() => setNumperOfPeople(+1)}>
                  <span className=" bg-lil-green text-yellow-50 rounded-lg px-2">
                    +
                  </span>
                </button>
              </h2>
              <div>
                <form onSubmit={handleSubmit}>
                  <label>
                    <span>Email: </span>
                    <input
                      type="text"
                      value={email}
                      onChange={handleChange}
                      className="bg-lil-light border-2  border-lil-green rounded-lg px-2 py-1 mt-2 "
                    />
                  </label>
                  <div>
                    <button
                      className="float-right bg-lil-red rounded-lg mt-6 px-3 py-1"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              {!orderIsEmpty && (
                <>
                  <Link href={"/drinks"}>
                    <button className=" bg-lil-red rounded-lg mt-6 px-3 py-1 mr-2">
                      GO BACK
                    </button>
                  </Link>
                  <Link href={"/receipt"}>
                    <button className=" bg-lil-red rounded-lg mt-6 px-3 py-1">
                      NEXT
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
