import React, {useState} from "react"
import {Card, CardBody, CardTitle, Col, Container, Row} from "reactstrap";
import "@pathofdev/react-tag-input/build/index.css";
import 'react-toastify/dist/ReactToastify.css';

import {checkPermissions} from '../../functions/functions'
import {toast} from "react-toastify";
import {get} from "../../functions/apiRequest";

const LockDetail = (props) => {
    let {lockId} = props.match.params;
    const [defaultValues, setDefaultValues] = useState();

    React.useEffect(() => {
        get(lockId, 'locks')
            .then(response => response.json())
            .then(response => {
                if (response.success) {
                    setDefaultValues(response.data.lock)
                } else {
                    toast.error(response.message)
                }
            });
    }, [lockId]);

    return (
        <React.Fragment>
            {/* <ToastContainer /> */}
            <div className="page-content">
                <Container fluid={true}>
                    <Row>
                        {defaultValues ?
                            <Col xl={12}>
                                <Card>
                                    <CardBody>
                                        <div className="d-flex flex-wrap flex-sm-nowrap mb-sm-0 mb-4">
                                            <div className="flex-grow-1">
                                                <div>
                                                    <div className="d-sm-flex align-items-top">
                                                        <div>
                                                            <a href="#"
                                                               className="fs-4 fw-medium text-dark">{defaultValues.name}</a>
                                                            <p className="font-size-15 text-muted mb-3">
                                                                @{defaultValues.name}
                                                            </p>
                                                            <p className="font-size-15 text-muted mb-3">
                                                                <i className="uil-envelope-alt fs-15 me-1 align-middle"/>{defaultValues.email}
                                                            </p>
                                                            <p className="font-size-15 text-muted mb-3">
                                                                <i className="uil-phone-alt fs-15 me-1 align-middle"/>{defaultValues.phone}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                            :
                            <Card className="vh-100 p-4 text-center">
                                <h5 className="mt-5">Loading...</h5>
                            </Card>
                        }

                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default LockDetail

