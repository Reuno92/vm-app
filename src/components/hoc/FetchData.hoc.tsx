import { useState, useEffect } from 'react';
import axios, {AxiosResponse} from "axios";

const useFetchData = (url: string) => {
    const [list, setList] = useState<Array<string>|undefined>(undefined);
    const [error, setError] = useState<boolean>(false);

    const refreshList = () => {
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

    return { list, error, refreshList };
}
export default useFetchData;

