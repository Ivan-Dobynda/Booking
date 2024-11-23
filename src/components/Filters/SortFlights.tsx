import React from "react"
import SelectFilter from "./SelectFilter"

const SortFlights = () => {
  const options = [
    { label: "Least expensive", value: "total_amount" },
    { label: "Most expensive", value: "-total_amount" },
    { label: "Shortest duration", value: "total_duration" },
    { label: "Longest duration", value: "-total_duration" },
  ]

  return <SelectFilter title='Sort by' name='sort' options={options} defaultValue='total_amount' />
}

export default SortFlights
