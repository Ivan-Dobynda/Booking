"use client"
import React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { convertToSearchParamsString } from "@/lib/helpers"
import RadioInput from "../Form/RadioInput"
import Checkbox from "../Form/Checkbox"

export interface IOption {
  label: string
  value: string
}

interface FilterTypes {
  title: string
  name: string
  options: IOption[]
}

const CheckboxFilter = ({ title, name, options = [] }: FilterTypes) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    const search: any = {}

    searchParams.forEach((value, key) => {
      search[key] = value
    })

    const oldValue = searchParams.get(name)

    if (oldValue) {
      const isRemove = oldValue.split(",").includes(value)
      if (isRemove)
        search[name] = oldValue
          .split(",")
          .filter((el) => el !== value)
          .join(",")
      else search[name] = `${oldValue},${value}`
    } else search[name] = value

    if (!search[name]) delete search[name]

    const searchString = convertToSearchParamsString(search)

    router.push(`/flight?${searchString}`, { scroll: false })
  }

  return (
    <div>
      <header className='flex justify-between pb-2.5 lg:pb-3 mb-2.5 lg:mb-3 border-b border-b-gray-200'>
        <h4 className='text-sm lg:text-base leading-none font-medium text-brand-neutral-800'>{title}</h4>
      </header>
      <ul className='space-y-3.5'>
        {options.map((option, index) => (
          <li key={index} className='flex justify-between'>
            <Checkbox
              id={`${name}_${index}`}
              checked={!!searchParams.get(name)?.split(",")?.includes(option.value)}
              name={name}
              onChange={handleChange}
              label={option.label}
              value={option.value}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CheckboxFilter
