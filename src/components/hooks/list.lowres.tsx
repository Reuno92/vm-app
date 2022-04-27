import {Dispatch, FC, Fragment, SetStateAction, useEffect} from "react";
import {Alert, Button, ListGroup} from "react-bootstrap";
import useFetchData from "../hoc/FetchData.hoc";
import useFetchVideo from "../hoc/useFetchVideo.hoc";

type ListLowResType = {
    isUpload: boolean,
    setIsUpload: Dispatch<SetStateAction<boolean>>,
}

const ListLowRes: FC<ListLowResType> = (props: ListLowResType) => {

    const { isUpload, setIsUpload } = props;
    const { list, error, refreshList } = useFetchData('http://localhost:2500/api/v1/files/alllowres');
    const { setUrl } = useFetchVideo()

    useEffect( () => {
        if (isUpload) {
            refreshList();
            setIsUpload(false);
        }
    }, [isUpload, refreshList, setIsUpload])

    const handleClick = (e: string) => {
        const url = 'http://localhost:2500/api/v1/files/onelowres?file=' + e
        setUrl(url);
    };

    const isEmpty = (): JSX.Element => {
        return (
            list && !error && list.length === 0 && (
                <Alert variant="info" className="mt-3">
                    No video match found
                </Alert>
            )
        ) as JSX.Element
    };

    const completedList = (): JSX.Element => {
        return (
            list && !error && list.length > 0 && (
                <Fragment>
                    <h2>Your Low Res Files: </h2>
                <ListGroup className="mb-5">
                    {
                        list.map( (item: string, index: number) => (
                            <ListGroup.Item className="d-flex justify-content-between align-items-center" key={index}>
                                <span className="text-truncate">{item}</span> <Button onClick={ () => handleClick(item)}>See</Button>
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>
                </Fragment>
            )
        ) as JSX.Element
    }

    const haveError = (): JSX.Element => {
        return (
            error && (
                <Alert variant="danger" className="mt-3">
                    Error with server. Please send mail to support@videomenthe.com
                </Alert>
            )
        ) as JSX.Element
    }

    return (
        <Fragment>
            {
                completedList()
            }

            {
                isEmpty()
            }

            {
                haveError()
            }
        </Fragment>
    )
}

export default ListLowRes
