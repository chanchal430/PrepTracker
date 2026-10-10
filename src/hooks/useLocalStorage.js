import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useLocalStorage = (key, initialValue) => {

    // use lazy initializer so localstorage will only be read on first render
    const [value, setValue] = useState(() => {
        try {
            const saved = localStorage.getItem(key);
            return saved ? JSON.parse(saved) : initialValue;

        } catch (error) {
            toast.error(`Error Reading LocalStorage key ${key}`, error.message);
            return initialValue;
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}