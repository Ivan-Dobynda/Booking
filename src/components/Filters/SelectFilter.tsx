"use client"
import React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { convertToSearchParamsString } from "@/lib/helpers"
import SelectInput from "../Form/SelectInput"

export interface IOption {
  label: string
  value: string
}

interface FilterTypes {
  name: string
  options: IOption[]
  title: string

  defaultValue?: string
}

const SelectFilter = ({ title, name, options = [], defaultValue }: FilterTypes) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value

    const search: any = {}

    searchParams.forEach((value, key) => {
      search[key] = value
    })

    search[name] = value

    const searchString = convertToSearchParamsString(search)

    router.push(`/flight?${searchString}`, { scroll: false })
  }

  return (
    <div>
      <header className='flex justify-between pb-2.5 lg:pb-3 mb-2.5 lg:mb-3 border-b border-b-gray-200'>
        <h4 className='text-sm lg:text-base leading-none font-medium text-brand-neutral-800'>{title}</h4>
      </header>
      <ul className='space-y-3.5    '>
        <SelectInput
          name={name}
          onChange={handleChange}
          defaultValue={searchParams.get(name) || defaultValue || "DEFAULT"}
        >
          <option value='DEFAULT' disabled hidden>
            Choose here
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectInput>
      </ul>
    </div>
  )
}

export default SelectFilter
