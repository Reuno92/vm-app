import {Dispatch, FC, Fragment, SetStateAction, useEffect} from "react";
import {Button, ListGroup} from "react-bootstrap";
import useFetchData from "../../hoc/FetchData.hoc";
import useFetchVideo from "../../hoc/useFetchVideo.hoc";
import ListIsEmptyLowres from "./list.isEmpty.lowres";
import ListErrorLowres from "./list.error.lowres";

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
                <ListIsEmptyLowres />
            )
        ) as JSX.Element
    };

    const haveError = (): JSX.Element => {
        return (
            error && (
                <ListErrorLowres />
            )
        ) as JSX.Element
    }

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
