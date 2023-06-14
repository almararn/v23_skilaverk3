import { useState, useEffect } from "react"
import setHours from "date-fns/setHours"
import setMinutes from "date-fns/setMinutes"
import addDays from "date-fns/addDays"
import DatePicker, { registerLocale } from "react-datepicker"
import enGB from "date-fns/locale/en-GB"
registerLocale("enGB", enGB)
import "react-datepicker/dist/react-datepicker.css"

export default ({ onStartDateChange, savedDate }) => {
  const date = new Date()
  const dateFromStorage = new Date(savedDate)
  const [built, setBuilt] = useState(false)
  const [calChanged, setCalChanged] = useState(false)
  const [storedTime, setStoredTime] = useState(null)
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(date, 0), date.getHours() + 1)
  )

  const isWeekend = (date) => {
    const day = date.getDay()
    return day === 0 || day === 6
  }

  const excludeWeekends = (date) => {
    return !isWeekend(date)
  }

  const handleStartDateChange = (date) => {
    setStartDate(date)
    onStartDateChange(date)
    setCalChanged(true)
  }

  useEffect(() => {
    let nextDate = date
    while (isWeekend(nextDate)) {
      nextDate = addDays(nextDate, 1)
    }
    setStartDate(setHours(setMinutes(nextDate, 0), nextDate.getHours() + 1))
    onStartDateChange(startDate)
  }, [])

  useEffect(() => {
    if (calChanged == false) {
      setStoredTime(dateFromStorage.getTime())
    }
    setBuilt(true)
  }, [dateFromStorage])

  const minTimeHours = () => {
    if (date.getMinutes() > 29) {
      return startDate.getDate() === date.getDate() ? date.getHours() + 1 : 16
    } else {
      return startDate.getDate() === date.getDate() ? date.getHours() : 16
    }
  }

  const minTimeMinutes = () => {
    if (startDate.getDate() === date.getDate()) {
      return date.getMinutes() > 29 ? 0 : 30
    } else {
      return 0
    }
  }

  return (
    <>
      {built && (
        <DatePicker
          inline
          showTimeSelect
          selected={storedTime && !calChanged ? storedTime : startDate}
          onChange={handleStartDateChange}
          minTime={setHours(setMinutes(date, minTimeMinutes()), minTimeHours())}
          maxTime={setHours(setMinutes(date, 0), 23)}
          filterDate={excludeWeekends}
          minDate={date}
          dateFormat="d MMMM, yyyy HH:mm"
          locale="enGB"
        />
      )}
    </>
  )
}
