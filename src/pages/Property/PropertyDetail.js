import React, {useState} from "react"
import {Card, CardBody, CardTitle, Col, Container, Row} from "reactstrap";
import "@pathofdev/react-tag-input/build/index.css";
import 'react-toastify/dist/ReactToastify.css';
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
                    {defaultValues ?
                        <>
                            <Row>
                                <Col xl={12}>
                                    <Card>
                                        <CardBody>
                                            <CardTitle className="h3 border-bottom border-2 pb-3">Property
                                                Details</CardTitle>
                                            <Row>
                                                <Col xl={8}>
                                                    <p className="font-size-15 mb-1 border-bottom py-2 fw-semibold">Name
                                                        : <span
                                                            className="text-muted font-size-14 fw-normal">{defaultValues?.name}</span>
                                                    </p>
                                                    <p className="font-size-15 mb-1 pt-2 fw-semibold">Property ID
                                                        : <span
                                                            className="text-muted font-size-14 fw-normal">{defaultValues?.propertyId}</span>
                                                    </p>
                                                    <p className="font-size-15 mb-1 pt-2 fw-semibold">Hotel Name
                                                        : <span
                                                            className="text-muted font-size-14 fw-normal">{defaultValues?.hotel?.name}</span>
                                                    </p>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </>
                        :
                        <Row>
                            <Card className="vh-100 p-4 text-center">
                                <h5 className="mt-5">Loading...</h5>
                            </Card>
                        </Row>
                    }
                </Container>
            </div>
        </React.Fragment>
    )
}

export default PropertyDetail

