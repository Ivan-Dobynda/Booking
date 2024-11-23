import RadioFilter, { IOption } from "./RadioFilter"

interface PropsType {
  options: IOption[]
}

export default function Airlines(props: PropsType) {
  return <RadioFilter title='Airlines' name='airline_iata_code' options={props.options} />
}
