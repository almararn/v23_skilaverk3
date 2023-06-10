import { useState, useEffect } from "react"
import setHours from "date-fns/setHours"
import setMinutes from "date-fns/setMinutes"
import DatePicker, { registerLocale } from "react-datepicker"
import enGB from "date-fns/locale/en-GB"
registerLocale("enGB", enGB)
import "react-datepicker/dist/react-datepicker.css"

export default ({ onStartDateChange, savedDate }) => {
  const date = new Date()
  const dateFromStorage = new Date(savedDate)
  const [built, setBuilt] = useState(false)
  const [storedTime, setStoredTime] = useState()
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(date, 0), date.getHours() + 1)
  )

  console.log("startDate", startDate)
  const handleStartDateChange = (date) => {
    setStartDate(date)
    onStartDateChange(date)
  }

  useEffect(() => {
      setStoredTime(dateFromStorage.getTime())
      setBuilt(true)
  }, [dateFromStorage])

  const minTimeHours = () => {
    if (startDate.getTime() < 16) {
      return startDate.getDate() === date.getDate() ? date.getHours() : 16
    } else {
      return 16
    }
  }

  return (
    <>
      {built && (
        <DatePicker
          inline
          showTimeSelect
          selected={storedTime ? storedTime : startDate}
          onChange={handleStartDateChange}
          minTime={setHours(setMinutes(date, 0), minTimeHours())}
          maxTime={setHours(setMinutes(date, 0), 23)}
          minDate={date}
          dateFormat="d MMMM, yyyy HH:mm"
          locale="enGB"
        />
      )}
    </>
  )
}
