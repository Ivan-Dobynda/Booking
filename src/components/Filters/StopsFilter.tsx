import React from "react"
import RadioFilter from "./RadioFilter"

interface FilterTypes {}

const StopsFilter = ({}: FilterTypes) => {
  const options = [
    { label: "Direct only", value: "0" },
    { label: "1 stop at most", value: "1" },
    { label: "2 stops at most", value: "2" },
  ]

  return <RadioFilter title='Stops' name='max_connections' options={options} />
}

export default StopsFilter
