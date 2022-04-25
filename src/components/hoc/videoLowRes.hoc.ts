import { useState, useEffect } from 'react';
import axios, {AxiosResponse} from "axios";

const useFetch = (url: string) => {
    const [list, setList] = useState<Array<string>|undefined>(undefined);
    const [error, setError] = useState<boolean>(false);

    const refresh = () => {
        setError(false);
        axios.get(url)
            .then((response: AxiosResponse<{status: string, result: any}>) => response.data.result)
            .then((result) => setList(result) )
            .catch( () => setError(true));
    }

    useEffect(() => {
        const fetchData = async () => {
            setError(false);
            axios.get(url)
                 .then((response: AxiosResponse<{status: string, result: any}>) => response.data.result)
                 .then((result) => setList(result) )
                 .catch( () => setError(true));
        }
        fetchData();
    }, []);

    return { list, error, refresh };
}
export default useFetch;

