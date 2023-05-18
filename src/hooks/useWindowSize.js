import { useState,useEffect } from "react";

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        hwight: undefined
    });

    useEffect(() => {
        const fetchWindowSize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        fetchWindowSize();

        window.addEventListener("resize", fetchWindowSize);

        const cleanUp = () => {
            window.removeEventListener("resize", fetchWindowSize)
        }

        return cleanUp;
    }, [])

    return windowSize;
}

export default useWindowSize;