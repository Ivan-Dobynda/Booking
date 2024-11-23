'use client'
import useHTTP from "@/hooks/useHTTP"

export default function Test() {
    const {data} = useHTTP(`${process.env.NEXT_PUBLIC_API_URL}/airport`, {active: true})
    if(data) console.log(data)
    return <></>
}