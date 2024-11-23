import { useSearchParams } from "next/navigation";
import TimeFilter, { StateType } from "./TimeFilter";
import { useRouter } from "next/navigation";

export default function TimeFilters() {
    const search = useSearchParams();
    const router = useRouter();
    const onTimeChange = (item: StateType, type: 'arrival_time' | 'departure_time' = 'arrival_time') => {
        const newSearch = new URLSearchParams(search);
        newSearch.set(type, item.value);
        router.replace(`${window.location.pathname}?${newSearch.toString()}`)
    };

    return (
        <>
            <TimeFilter title="Departure time" value={search.get('departure_time') || undefined} onChange={item => onTimeChange(item, 'departure_time')} />
            <TimeFilter title="Arrival time" value={search.get('arrival_time') || undefined} onChange={onTimeChange} />
        </>
    )
}