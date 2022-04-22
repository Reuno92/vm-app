import {Component, FormEvent, Fragment} from "react";
import {Button, Form, InputGroup} from "react-bootstrap";

export class UploadClass extends Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = { file: "" }
    }

    public componentDidMount() {}

    public componentWillUnmount() {}

    private handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

    }

    render() {
        return (
            <Fragment>
                <Form encType="multipart/form-data"
                      onSubmit={ (e: FormEvent<HTMLFormElement>) => this.handleSubmit(e)}>
                    <Form.Group>
                        <Form.Label htmlFor="file">Upload file</Form.Label>
                        <InputGroup>
                            <Form.Control type="file" id="file" name="file" accept="video/mp4, video/quicktime, video/mpeg" />
                            <Button type="submit" variant="primary">
                                Submit
                            </Button>
                        </InputGroup>
                    </Form.Group>

                </Form>
            </Fragment>
        )
    }
}
