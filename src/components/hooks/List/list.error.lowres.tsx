import {FC} from "react";
import {Alert} from "react-bootstrap";

const ListErrorLowres: FC = () => {
    return (
        <Alert variant="danger" className="mt-3">
            Error with server. Please send mail to support@videomenthe.com
        </Alert>
    );
}

export default ListErrorLowres;
