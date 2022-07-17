import React, {useState} from "react"

import {Button, Card, CardBody, Col, Container, Label, Row, Spinner} from "reactstrap"
import {AvField, AvForm, AvGroup, AvInput} from "availity-reactstrap-validation"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import "@pathofdev/react-tag-input/build/index.css";
//Import Breadcrumb
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {get, post} from "../../functions/apiRequest";

const FormValidations = (props) => {
    let {hotelId} = props.match.params;

    const [inProgress, setInProgress] = useState(false)
    const [defaultValues, setDefaultValues] = useState()

    React.useEffect(() => {
        if (hotelId) {
            get(hotelId, 'hotels')
                .then(response => response.json())
                .then(response => {
                    if (response.success) {
                        setDefaultValues(response.data.hotel)
                    } else {
                        toast.error(response.message)
                    }
                });
        }
    }, [hotelId]);

    const handleSubmit = async (event, errors, values) => {
        if (errors.length > 0) {
            document.querySelectorAll(`[name=${errors[0]}]`)[0].focus();
            return false
        }

        if (defaultValues && defaultValues.id) {
            values.id = parseInt(defaultValues.id)
        }

        try {
            setInProgress(true);
            post(values, 'hotels')
                .then(response => response.json())
                .then(data => {
                    setInProgress(false)
                    if (data.success) {
                        toast.success(data.message);
                        setTimeout(() => {
                            props.history.push(`/hotel`);
                        }, 800);
                    } else {
                        toast.error(data.message)
                    }
                });
        } catch (e) {
            setInProgress(false)
        }
    }

    return (
        <React.Fragment>
            {/* <ToastContainer /> */}
            <div className="page-content">
                <Container fluid={false}>
                    <h2>{hotelId ? "Edit" : "Create"} Hotel</h2>
                    <Row>
                        <Col xl="12">
                            <Card>
                                <CardBody>
                                    <h4 className="card-title">Hotel</h4>
                                    <p className="card-title-desc">

                                    </p>
                                    {((hotelId && defaultValues) || !hotelId) &&
                                    <AvForm className="needs-validation" onSubmit={handleSubmit} model={defaultValues}>
                                        <Row>
                                            <Col md="4">
                                                <div className="mb-3">
                                                    <Label htmlFor="name">Name</Label>
                                                    <AvField
                                                        name="name"
                                                        placeholder="Name"
                                                        type="text"
                                                        errorMessage=" Please enter the name."
                                                        className="form-control"
                                                        validate={{required: {value: true}}}
                                                        id="name"
                                                    />
                                                </div>
                                            </Col>
                                            <Col md="4">
                                                <div className="mb-3">
                                                    <Label htmlFor="location">Location</Label>
                                                    <AvField
                                                        name="location"
                                                        placeholder="Location"
                                                        type="location"
                                                        errorMessage=" Please enter location."
                                                        className="form-control"
                                                        validate={{required: {value: true}}}
                                                        id="location"
                                                    />
                                                </div>
                                            </Col>
                                            <Col md="4">
                                                <div className="mb-3">
                                                    <Label htmlFor="address">Address</Label>
                                                    <AvField
                                                        name="address"
                                                        placeholder="address"
                                                        type="address"
                                                        errorMessage=" Please enter address."
                                                        className="form-control"
                                                        validate={{required: {value: true}}}
                                                        id="address"
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="4">
                                                <div className="mb-3">
                                                    <Label htmlFor="contactPerson">Contact Person</Label>
                                                    <AvField
                                                        name="contactPerson"
                                                        placeholder="Contact Person"
                                                        type="contactPerson"
                                                        errorMessage=" Please enter contact person detail."
                                                        className="form-control"
                                                        validate={{required: {value: true}}}
                                                        id="contactPerson"
                                                    />
                                                </div>
                                            </Col>
                                            <Col md="4">
                                                <div className="mb-3">
                                                    <Label htmlFor="contactNumber">Contact Number</Label>
                                                    <AvField
                                                        name="contactNumber"
                                                        placeholder="Contact Number"
                                                        type="contactNumber"
                                                        errorMessage=" Please enter contact number."
                                                        className="form-control"
                                                        validate={{required: {value: true}}}
                                                        id="contactNumber"
                                                    />
                                                </div>
                                            </Col>
                                            <Col md="4">
                                                <div className="mb-3">
                                                    <Label>Is Active?</Label>
                                                    <div className="form-check form-switch form-switch-lg">
                                                        <AvGroup check>
                                                            <AvInput type="checkbox" name="isActive"/>
                                                        </AvGroup>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        {!inProgress ?
                                            <Button color="primary" type="submit">
                                                Submit
                                            </Button>
                                            :
                                            <Button color="primary" disabled>
                                                <Spinner type="grow" className="me-1 align-middle spinner-grow-sm "
                                                         color="light"/>
                                                Processing...
                                            </Button>
                                        }
                                    </AvForm>
                                    }
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default FormValidations
