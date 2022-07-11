import React, {useState} from "react"
import {Card, CardBody, CardTitle, Col, Container, Row} from "reactstrap";
import "@pathofdev/react-tag-input/build/index.css";
import 'react-toastify/dist/ReactToastify.css';

import {checkPermissions} from '../../functions/functions'
import {toast} from "react-toastify";
import {get} from "../../functions/apiRequest";

const PropertyDetail = (props) => {
    let {propertyId} = props.match.params;
    const [defaultValues, setDefaultValues] = useState();

    React.useEffect(() => {
        get(propertyId, 'properties')
            .then(response => response.json())
            .then(response => {
                if (response.success) {
                    setDefaultValues(response.data.property)
                } else {
                    toast.error(response.message)
                }
            });
    }, [propertyId]);

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
                                        {checkPermissions("property_edit") &&
                                        <CardTitle className="align-items-center justify-content-between">
                                            <a onClick={() => props.history.push(`/property/${encodeURIComponent(propertyId)}/edit`)}>
                                                <i className="uil-edit float-end d-inline-block pointer fs-4 me-1 pe-auto"/>
                                            </a>
                                        </CardTitle>
                                        }
                                        <div className="d-flex flex-wrap flex-sm-nowrap mb-sm-0 mb-4">
                                            <div className="me-4 mb-sm-5 mb-4">
                                                <div className="position-relative">
                                                    <div className="avatar-xl">
                                                        <span className="avatar-title bg-secondary rounded-3">
                                                            <i className="uil-property fs-1"></i>
                                                        </span>
                                                    </div>

                                                </div>
                                            </div>
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

export default PropertyDetail

