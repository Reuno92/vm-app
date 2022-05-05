import {useEffect, useState} from 'react';
import axios, {AxiosResponse} from 'axios';

const useFetchVideo = () => {
    const [ url, setUrl ] = useState<string>('');
    const [ video, setVideo ] = useState<any>(null);
    const [ error, setError ] = useState<boolean>(false);


    useEffect(() => {
        const fetchVideo = () => {
            setError(false);
            axios.get(url, { headers: { "range": 'bytes=0-' } })
                .then(async (response: AxiosResponse<any>) => {
                    let source = await new Blob([response.data], {type: response.headers['content-type']});
                    let object = URL.createObjectURL(source);
                    setVideo(object);
                })
                .catch(() => setError(true));
        };

        if (url) {
            fetchVideo();
            console.log("received in fetch", url, video);
        }
    }, [url]);

    return { error, url, video, setUrl };
}


export default useFetchVideo;
