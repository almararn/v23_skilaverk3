import { useEffect, useState } from "react"
import axios from "axios"

export default function useAxiosGet(url) {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    axios
      .get(url)
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        setError(error)
      })
      .finally(() => {
        setLoading(false)
      })
      //TODO: remove this console.log
    console.log("data fetched with axios")
  }, [url])

  return { data, loading, error }
}
