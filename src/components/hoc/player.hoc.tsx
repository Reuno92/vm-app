import {RefObject, useEffect, useState} from "react";

type PLayerType = {
    isPlaying: 'play'|'pause'|'replay',
    progress: number,
    time: string,
    duration: string,
}
const init: PLayerType = {
    isPlaying: 'pause',
    progress: 0,
    time: "00:00:00:00",
    duration: "00:00:00:00",
}

const useVideoPlayer = (videoElement: RefObject<HTMLVideoElement>) => {
    // ...
    const [playerState, setPlayerState] = useState<PLayerType>({
        ...init,
        duration: (videoElement?.current) ? timer(videoElement?.current?.duration, 25) : "00:00:00:00"
    });
    const [timeMode, setTimeMode] = useState<boolean>(false);

    useEffect(() => {
        if (playerState?.time !== "00:00:00:00" && playerState?.time === playerState?.duration) {
            setPlayerState({
                ...playerState,
                isPlaying: "replay",
                time: "00:00:00:00"
            });
        }
    }, [playerState]);

    const togglePlay = (): void => {
        if (playerState.isPlaying === 'play') {
            videoElement?.current?.play();
            setPlayerState({
                ...playerState,
                isPlaying: 'pause'
            });
        }

        if (playerState?.isPlaying === 'pause') {
            videoElement?.current?.pause();
            setPlayerState({
                ...playerState,
                isPlaying: 'play'
            });
        }

        if (playerState?.isPlaying === 'replay') {
            videoElement?.current?.play();
            setPlayerState({
                ...playerState,
                isPlaying: 'pause'
            });
        }
    };

    const handleOnTimeUpdate = (): void => {
        const progress = videoElement?.current ? (videoElement?.current?.currentTime) / (videoElement?.current?.duration) * 100 : 0;
        const time = videoElement?.current ? timer(videoElement?.current?.currentTime, 25) : '00:00:00:00';
        const duration = videoElement?.current ? timer(videoElement?.current?.duration, 25) : "00:00:00:00";
        setPlayerState({
            ...playerState,
            progress,
            time,
            duration,
        });
    };

    const handleVideoProgress = (event: any): void => {
        const manualChange = Number(event?.target.value);
        if (videoElement?.current)
        videoElement.current.currentTime = (videoElement?.current?.duration / 100) * manualChange;
        setPlayerState({
            ...playerState,
            progress: manualChange
        });
    };

    /**
     * Timer Methods for calculate with framerate.
     * @param { number } time - time in seconds and must be in seconds…
     * @param { number } framerate - framerate
     */
    function timer(time: number, framerate: number = 25): string {
        const FRAMES = Math.floor((time % 1) * framerate).toString(10).padStart(2, "0");
        const HOURS = Math.floor(time / 3600).toString(10).padStart(2, "0");
        const MINUTES = Math.floor((time / 60) % 60).toString(10).padStart(2, "0");
        const SECONDS = Math.floor(time % 60).toString(10).padStart(2, "0");

        if (time) {
            return `${HOURS}:${MINUTES}:${SECONDS}:${FRAMES}`;
        }

        return '00:00:00:00';
    }

    return {playerState, togglePlay, handleOnTimeUpdate, handleVideoProgress, setTimeMode};
};

export default useVideoPlayer;
