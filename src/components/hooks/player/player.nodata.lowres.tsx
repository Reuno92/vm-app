import {FC} from "react";


const PlayerNodataLowres: FC = () => {

    return (
        <section className="d-flex justify-content-center align-items-center flex-column w-100 vh-75 px-5 rounded-3 bg-dark text-light">
            <h1>No video selected</h1>
            <p>Please click on button <span className="btn btn-primary">See</span> in list for download your low resolution file.</p>
            <br />
            <p>If the list don't appears, you must upload at least one file on our server:</p>
            <ol className="">
                <li className="mb-2">Choose a file at upload on your device.</li>
                <li className="mb-2">Click on button <span className="btn btn-primary">Submit</span></li>
            </ol>
        </section>
    );
}

export default PlayerNodataLowres;
