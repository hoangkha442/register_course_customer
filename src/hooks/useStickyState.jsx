import { useEffect, useState } from "react"

function useStickyState(defaultValue, key){
    // defaultValue: red
    // key: persisted-color
    const [value, setValue] = useState(() => { 
        // kiem tra key tren localStorage
        const stickyValue = window.localStorage.getItem(key)
        return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue
    })
    useEffect(() => { 
        window.localStorage.setItem(key, JSON.stringify(value))
    },[value, key])
    return{ value, setValue }
}

export default useStickyState;