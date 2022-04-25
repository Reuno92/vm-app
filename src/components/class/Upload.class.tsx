import {ChangeEvent, Component, FormEvent, Fragment} from 'react';
import {Alert, Button, Form, InputGroup, ProgressBar, Row, Col} from 'react-bootstrap';
import setError from '../../lib/setError';
import axios, { AxiosResponse } from 'axios';

const initState: { file: any, result: string | undefined, progress: number | undefined, error: string | undefined } = {
    file  : undefined,
    result: undefined,
    progress: undefined,
    error : undefined
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

        let formData: FormData = new FormData();
        formData.append("file", this.state?.file);

        this.setState({
            ...this.state,
            result: undefined,
            progress: undefined,
            error: undefined
        });

        axios.post('http://localhost:2500/api/v1/uploads/video', formData, {
            onUploadProgress: (data: any) => {
                this.setState({
                    ...this.state,
                    progress: Math.round((data?.loaded * 100) / data?.total)
                });
            }
        }).then( (response: AxiosResponse) => {
             this.setState({
                 ...this.state,
                 result: setError(response?.data?.status),
                 error: undefined
             });

             this.props?.upload(true);
        }).catch( (err: any) => {
            const ERROR = setError(err?.response?.data?.status);
            this.setState({
                ...this.state,
                error: ERROR,
                result: undefined,
            })
        });
    }

    private handleFileInput(e: ChangeEvent<HTMLInputElement>): void {
        if (e?.target?.files) {
           this.setState({
               ...this.state,
               file: e?.target?.files[0]
           })
        }
    }

    private getProgressBar(): JSX.Element {
        return (
            this.state.progress && (
                <Row className="align-items-center">
                    <Col lg={2}>
                        Upload Progress:
                    </Col>
                    <Col lg={10}>
                        <ProgressBar className="my-3" now={this.state.progress} label={`${this.state.progress}%`}/>
                    </Col>
                </Row>
            )
        );
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
                    { this.state.error }
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
                    this.getProgressBar()
                }
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
