import {FC, useCallback, useEffect, useRef} from 'react';
import data from '../../asset/test/PR_Ibrahim_Maalouf_30s_ENG_25nov.mp4';
import useFetchVideo from "../hoc/useFetchVideo.hoc";
import useVideoPlayer from "../hoc/player.hoc";
import { BsPlayFill, BsPauseFill, BsArrowCounterclockwise } from "react-icons/bs/"

const PlayerLowRes: FC<any> = () => {
    const videoElement = useRef(null);
    const { video, url } = useFetchVideo();

    useEffect( () => {
        console.log('test');
    }, [url, video])

    const {
        playerState,
        togglePlay,
        handleOnTimeUpdate,
        handleVideoProgress,
    } = useVideoPlayer(videoElement);

    function handleTime() {
        return playerState?.time
    }

    return (
        <section className="player text-white">
            <video
                className="w-100"
                src={video ?? data}
                ref={videoElement}
                autoPlay={false}
                onTimeUpdate={handleOnTimeUpdate}
            >
                {
                    video && (
                        <source src={video} type="video/mp4" />
                    )
                }
            </video>
            <div className="controls">
                <button onClick={( () => togglePlay() )}>
                    {
                        playerState?.isPlaying === "play" && (<BsPlayFill />)
                    }
                    {
                        playerState?.isPlaying === "pause" && (<BsPauseFill />)
                    }
                    {
                        playerState?.isPlaying === "replay" && (<BsArrowCounterclockwise />)
                    }
                </button>
                <span onClick={handleTime}>
                {
                    playerState?.time
                }
                </span>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={playerState.progress}
                    onChange={(e) => handleVideoProgress(e)}
                />
                <span>
                    {
                        playerState?.duration
                    }
                </span>
            </div>
        </section>
    );
}
export default PlayerLowRes;
