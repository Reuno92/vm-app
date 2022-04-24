import {FC, Fragment} from "react";
import {Alert, Button, ListGroup} from "react-bootstrap";
import useFetch from "../hoc/videoLowRes.hoc";

const ListLowRes: FC = () => {

    const { list, error } = useFetch('http://localhost:2500/api/v1/files/alllowres');

    const handleClick = (e: any) => {
        console.log(e);
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
                <ListGroup>
                    {
                        list.map( (item: string, index: number) => (
                            <ListGroup.Item className="d-flex justify-content-between align-items-center" key={index}>
                                {item} <Button onClick={ (e) => handleClick(e)}>See</Button>
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