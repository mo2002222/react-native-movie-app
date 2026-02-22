import { useEffect, useState } from "react"

const useFetch = <T>(fetchFunc : ()=> Promise <T>, autoFetch = true ) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async ()=>{
        try {
            setLoading(true);
            setError(null);
            const result = await fetchFunc();
            setData(result);
        } catch (error) {
            //@ts-ignore
            setError(error instanceof Error ? error : new Error("an error occurred"))
        }finally{
            setLoading(false)
        }
    }

    const resetFunc = ()=>{
        setData(null);
        setError(null);
        setLoading(false);
    }

    useEffect(() => {
        if(autoFetch){
            fetchData();
        }
    },[])

    return {data, loading, error, refetch: fetchData, reset: resetFunc};

}

export default useFetch;