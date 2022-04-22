import {ChangeEvent, Component, FormEvent, Fragment} from "react";
import {Alert, Button, Form, InputGroup} from "react-bootstrap";
import setError from "../lib/setError";

const initState: { file: any, result: string|undefined, error: string|undefined } = {
    file: undefined,
    result: undefined,
    error: undefined
}

export class UploadClass extends Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = initState;
    }

    public componentDidMount() {}

    public componentWillUnmount() {}

    private handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let formData = new FormData();
        formData.append("file", this.state?.file);

        this.setState({
            ...this.state,
            result: undefined,
            error: undefined
        });

        fetch('http://localhost:2500/api/v1/uploads/video', {
            method: 'POST',
            body: formData,
        })
            .then( res => res.json() )
            .then( data => this.setState({...this.state, result: setError(data.status), error: undefined}) )
            .catch( (err: any) => this.setState({...this.state, error: setError(err?.status), result: undefined}) );
    }

    private handleFileInput(e: ChangeEvent<HTMLInputElement>): void {
        if (e?.target?.files) {
           this.setState({
               ...this.state,
               file: e?.target?.files[0]
           })
        }
    }

    private getResult(): JSX.Element {
        return (
            this.state.result && (
                <Alert variant="success">
                    { this.state.result }
                </Alert>
            )
        );
    }

    private getError(): JSX.Element {
        return (
            this.state.error && (
                <Alert variant="danger">
                    { this.state.danger }
                </Alert>
            )
        )
    }

    render() {
        return (
            <Fragment>
                <Form method="post" encType="multipart/form-data"
                      onSubmit={ (e: FormEvent<HTMLFormElement>) => this.handleSubmit(e)}>
                    <Form.Group>
                        <Form.Label htmlFor="file">Upload file</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="file"
                                id="file"
                                name="file"
                                accept="video/mp4, video/quicktime, video/mpeg"
                                onChange={ (e: ChangeEvent<HTMLInputElement>) => this.handleFileInput(e) }
                            />
                            <Button type="submit" variant="primary">
                                Submit
                            </Button>
                        </InputGroup>
                    </Form.Group>
                </Form>
                {
                    this.getResult()
                }
                {
                    this.getError()
                }
            </Fragment>
        )
    }
}
