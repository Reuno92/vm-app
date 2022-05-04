import {useEffect, useState} from 'react';
import axios, {AxiosResponse} from 'axios';

const useFetchVideo = () => {
    const [ url, setUrl ] = useState<string>('');
    const [ video, setVideo ] = useState<any>(null);
    const [ error, setError ] = useState<boolean>(false);

    useEffect(() => {
        const fetchVideo = () => {
            setError(false);
            axios.get(url, {
                headers: {
                    "range": 'bytes=0-'
                }
            }).then( (response: AxiosResponse<any>) => {
                let source = new Blob( [response.data], { type: response.headers['content-type'] } );
                let object = URL.createObjectURL(source);
                setVideo(object);
            }).catch( () => setError(true));
        };

        return () => {
            if (url) {
                fetchVideo();
            }
            console.log("test: ", video);
        }

    }, [url]);

    return { error, url, video, setUrl };
}

export default useFetchVideo;
