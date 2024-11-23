import { useEffect, useState } from "react"
import { toast } from "react-toastify"

interface ObjectType {
    [key: string]: any
}

export interface OptionsType {
    active?: boolean,
    params?: ObjectType,
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    data?: ObjectType
    token?: string
    headers?: HeadersInit,
    cb?: (res: any) => void,
    ecb?: (err: any) => void
}

interface StateType {
    loading?: boolean,
    data?: any,
    err?: string,
}

const useHTTP = (api: string, options: OptionsType = {}) => {
    const [state, setState] = useState<StateType>({ loading: options.active });
    const submit = async (api_ = api, { data, method = 'GET', cb, ecb } = options) => {
        if (!state.loading) setState({ loading: true, data: state.data });
        const url = new URL(typeof api_ === 'string' ? api_ : api, window.location.origin);
        if (options.params) {
            Object.entries(options.params).forEach(([key, value]) => {
                if (value !== undefined) {
                    url.searchParams.append(key, value.toString());
                }
            });
        }
        const init: RequestInit = {
            method,
            headers: options.headers
        }
        if (data) init.body = JSON.stringify(data)
        try {
            const res = await fetch(url.toString(), init), data = await res.json();
            if (!res.ok) throw Error(data.message)
            if(cb) cb(data)
            setState({ data });
        }
        catch (err: any) {
            if(ecb) ecb(err)
            console.log(err)
            toast.error(err.message)
            setState({ err: err.message })
        }
    }

    useEffect(() => {
        if (options.active) submit()
    }, [api, options.active])

    return { ...state, submit, setState };
}

export default useHTTP;