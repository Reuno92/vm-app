import {FC} from "react";
import {Alert} from "react-bootstrap";

const ListIsEmptyLowres: FC = () => {
    return (
        <Alert variant="info" className="mt-3">
            No video match found
        </Alert>
    );
}

export default ListIsEmptyLowres;
