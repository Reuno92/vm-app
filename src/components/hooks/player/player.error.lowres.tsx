import {Alert} from "react-bootstrap";
import {FC} from "react";

type Error = {
    error : any
}

const PlayerErrorLowres: FC<Error> = (props: Error) => {
    return (
        <Alert variant="danger">
            { props.error }
        </Alert>
    )
}

export default PlayerErrorLowres
