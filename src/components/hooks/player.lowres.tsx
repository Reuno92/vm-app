import {FC, useEffect, useRef, useState} from 'react';
import {Alert, Button, Col, ProgressBar, Row} from 'react-bootstrap';
import data from '../../asset/test/PR_Ibrahim_Maalouf_30s_ENG_25nov.mp4';

const PlayerLowRes: FC<any> = () => {

    /**
     * Don't Move this lines…
     */
    let VIDEO_CONTAINER_REF = useRef<HTMLVideoElement>(null);
    const timer = (time: number | undefined): string => {
        if (time) {
            return ("0" + Math.floor(time / 3600)).slice(-2) + ':' + ("0" + Math.floor(time / 60)).slice(-2) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        }
        return "00:00:00"
    }

    /**
     * Player Button Play / Pause / Replay
     */
    const [playerState, setPlayerState] = useState<'play'|'pause'|'replay'>('play');

    /**
     * Timers
     */
    const [time, setTime] = useState<string | undefined>(timer(VIDEO_CONTAINER_REF?.current?.duration));
    const [currentTime, setCurrentTime] = useState<string | undefined>(timer(VIDEO_CONTAINER_REF?.current?.currentTime));
    const [timeMode, setTimeMode] = useState<'elapsed'|'remaining'>('elapsed');

    /**
     * Progress bar
     */
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        setTime(timer(VIDEO_CONTAINER_REF?.current?.duration));
        const actual = setInterval(() => {
            setCurrentTime(timer(VIDEO_CONTAINER_REF?.current?.currentTime));
        }, 1000);

        const eachTimes = setInterval( () => {
            if (VIDEO_CONTAINER_REF?.current?.currentTime && VIDEO_CONTAINER_REF?.current?.duration) {
                setProgress((VIDEO_CONTAINER_REF?.current?.currentTime / VIDEO_CONTAINER_REF?.current?.duration) * 100)
            }
        }, 750);

        return () => {
            clearInterval(actual);
            clearInterval(eachTimes);
        }
    }, []);

    useEffect( () => {
        if (time !== '00:00:00' && currentTime === time) {
            setPlayerState('replay');
        }
    }, [currentTime, time]);

    const handlePlay = (): void => {
        if (playerState === 'play') {
            setTime(timer(VIDEO_CONTAINER_REF?.current?.duration));
            VIDEO_CONTAINER_REF?.current?.play();
            setPlayerState('pause');
        }

        if (playerState === 'pause') {
            VIDEO_CONTAINER_REF?.current?.pause();
            setPlayerState('play')
        }

        if (playerState === 'replay') {
            VIDEO_CONTAINER_REF?.current?.play();
            setPlayerState('pause')
        }
    }

    const handlingTime = (): string | undefined => {
        if (timeMode === 'elapsed') {
            return currentTime;
        } else {
            if (VIDEO_CONTAINER_REF?.current?.duration && VIDEO_CONTAINER_REF?.current?.currentTime) {
                return timer((VIDEO_CONTAINER_REF?.current?.duration - VIDEO_CONTAINER_REF?.current?.currentTime))
            }
        }
        return currentTime
    }

    const noData = (): JSX.Element => {
        return (
            !data && (
                <Alert variant="info">
                    No video selected
                </Alert>
            )
        ) as JSX.Element
    }

    return (
        <section className="d-flex">
            {
                noData()
            }
            {
                data && (
                    <div className="flex-wrap">
                        <div className="d-flex justify-content-center">
                            <p className="position-absolute bg-danger text-white rounded-3 px-3 py-2 mt-1">
                                <b>Warning !</b> It's low resolution 🤮
                            </p>
                            <video ref={VIDEO_CONTAINER_REF} className="w-100">
                                <source src={data}/>
                            </video>
                        </div>

                        <Row className="controls my-3 align-items-center">
                            <Col lg={1} className="d-flex justify-content-between">
                                <Button
                                    variant="primary"
                                    onClick={() => handlePlay()}>
                                    {playerState}
                                </Button>
                            </Col>
                            <Col lg={3} className="d-flex justify-content-around">
                                <span>Time</span>
                                <span className="d-flex mb-0 align-items-center cursor-pointer" onClick={ () => setTimeMode( prev => prev === 'elapsed' ? 'remaining' : 'elapsed') }>
                                    <span className={`badge me-2 ${timeMode === 'elapsed' ? ' bg-primary' : ' bg-danger'}`}>{ timeMode }</span> { handlingTime() }
                                </span>
                                <span>/</span>
                                <span>Total</span>
                                <span>{time}</span>
                            </Col>
                            <Col lg={8}>
                                <ProgressBar
                                    className="w-100"
                                    striped
                                    variant={ progress <= 25 ? "info" : progress <= 50 ? "primary" : progress <= 75 ? "success" : progress <= 99 ? "warning" : "danger" }
                                    now={progress} />
                            </Col>
                        </Row>
                    </div>
                )
            }
        </section>
    );
}

export default PlayerLowRes;
