import { useEffect, useState } from "react";
import ReactDOM from "react-dom";


interface PropsTypes {
    children?: React.ReactNode,
    id?: string
}

const Portal = (props: PropsTypes) => {
    const [elm, setElm] = useState<HTMLElement | null>(null);
    useEffect(() => {
        setElm(document.getElementById(props.id || "myportal"))
    }, [])
    return (
        <>
            {elm ? ReactDOM.createPortal(props.children, elm) : ""}
        </>
    );
}

export default Portal;