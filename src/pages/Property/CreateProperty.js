import React, {useState} from "react"

import {Button, Card, CardBody, Col, Container, Label, Row, Spinner} from "reactstrap"
import {AvField, AvForm} from "availity-reactstrap-validation"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
//Import Breadcrumb
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {get, getList} from "../../functions/apiRequest";

const FormValidations = (props) => {
    let {propertyId} = props.match.params;

    const [inProgress, setInProgress] = useState(false)
    const [defaultValues, setDefaultValues] = useState()
    const [hotels, setHotels] = useState([]);

    React.useEffect(() => {
        if (hotels.length === 0) {
            getList({
                pageNumber: 1,
                sizePerPage: 20,
                sortField: null,
                sortOrder: null,
                searchText: null
            }, 'hotels')
                .then(response => response.json())
                .then(response => {
                    if (response.success && response.data.hotels.length) {
                        setHotels(response.data.hotels)
                    } else {
                        toast.error("No hotels available to assign with properties. Create hotel first.");
                        setTimeout(() => {
                            window.history.back();
                        }, 1500);
                    }
                });
        }
    }, [propertyId]);

    React.useEffect(() => {
        if (propertyId) {
            get(propertyId, 'properties')
                .then(response => response.json())
                .then(response => {
                    if (response.success) {
                        setDefaultValues(response.data.property)
                    } else {
                        toast.error(response.message)
                    }
                });
        }
    }, [propertyId]);

    const handleSubmit = async (event, errors, values) => {
        if (errors.length > 0) {
            document.querySelectorAll(`[name=${errors[0]}]`)[0].focus();
            return false
        }

        if (defaultValues && defaultValues.id) {
            values.id = parseInt(defaultValues.id)
        }

        try {
            setInProgress(true)
            //
        } catch (e) {
            setInProgress(false)
        }
    }

    return (
        <React.Fragment>
            {/* <ToastContainer /> */}
            <div className="page-content">
                <Container fluid={false}>
                    <h2>{propertyId ? "Edit" : "Create"} Property</h2>
                    <Row>
                        <Col xl="12">
                            <Card>
                                <CardBody>
                                    <h4 className="card-title">Property</h4>
                                    <p className="card-title-desc">

                                    </p>
                                    {((propertyId && defaultValues) || !propertyId) &&
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
                                                    <Label htmlFor="propertyId">Property ID</Label>
                                                    <AvField
                                                        name="propertyId"
                                                        placeholder="Property ID"
                                                        type="propertyId"
                                                        errorMessage=" Please enter valid property id."
                                                        className="form-control"
                                                        validate={{required: {value: true}}}
                                                        id="propertyId"
                                                    />
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
