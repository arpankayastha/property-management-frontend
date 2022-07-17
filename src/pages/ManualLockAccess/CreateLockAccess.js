import React, {useState} from "react"

import {Button, Card, CardBody, Col, Container, Input, Label, Row, Spinner} from "reactstrap"
import {AvField, AvForm} from "availity-reactstrap-validation"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
//Import Breadcrumb
import 'react-toastify/dist/ReactToastify.css';
import {getList, post} from "../../functions/apiRequest";
import {toast} from "react-toastify";
import Select from "react-select";

const FormValidations = (props) => {
    const [inProgress, setInProgress] = useState(false)
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [defaultValues, setDefaultValues] = useState()

    const [selectedProperty, setSelectedProperty] = React.useState()
    const [properties, setProperties] = useState([]);

    React.useEffect(() => {
        if (properties.length === 0) {
            getList({
                pageNumber: 1,
                sizePerPage: 1000,
                sortField: null,
                sortOrder: null,
                searchText: null
            }, 'properties')
                .then(response => response.json())
                .then(response => {
                    if (response.success && response.data.properties.length) {
                        setProperties(response.data.properties)
                    } else {
                        toast.error("No properties available to assign with properties. Create property first.");
                        setTimeout(() => {
                            window.history.back();
                        }, 1500);
                    }
                });
        }
    }, []);

    const handleSubmit = async (event, errors, values) => {
        if (errors.length > 0) {
            document.querySelectorAll(`[name=${errors[0]}]`)[0].focus();
            return false
        }

        if (defaultValues && defaultValues.id) {
            values.id = parseInt(defaultValues.id)
        }

        if (selectedProperty) {
            values.propertyId = selectedProperty;
        }

        try {
            setInProgress(true);
            post(values, 'locks/manual-lock-access')
                .then(response => response.json())
                .then(data => {
                    setInProgress(false);
                    if (data.success) {
                        toast.success(data.message);
                        setTimeout(() => {
                            window.location.reload();
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
            <div className="page-content">
                <Container fluid={false}>
                    <h2>Assign Lock Access</h2>
                    <Row>
                        <Col xl="12">
                            <Card>
                                <CardBody>
                                    <AvForm className="needs-validation" onSubmit={handleSubmit} model={defaultValues}>
                                        <Row>
                                            <Col md="4">
                                                <div className="mb-3">
                                                    <Label htmlFor="name">Property</Label>
                                                    <Select
                                                        value={
                                                            properties.filter(option => option.id === selectedProperty)
                                                        }
                                                        options={properties}
                                                        name="propertyId"
                                                        className={`${inProgress ? 'select-error' : ''}`}
                                                        classNamePrefix="select"
                                                        validate={{required: {value: true}}}
                                                        getOptionLabel={(option) => option.name}
                                                        getOptionValue={(option) => option.id}
                                                        onChange={(data) => setSelectedProperty(data.id)}
                                                    />
                                                </div>
                                            </Col>
                                            <Col md="4">
                                                <div className="mb-3">
                                                    <Label htmlFor="name">Person Name</Label>
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
                                                    <Label htmlFor="contactNumber">Contact Number</Label>
                                                    <AvField
                                                        name="contactNumber"
                                                        placeholder="Contact Number"
                                                        type="phone"
                                                        errorMessage=" Please enter valid contact number."
                                                        className="form-control"
                                                        validate={{required: {value: true}}}
                                                        id="contactNumber"
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="6">
                                                <div className="mb-3">
                                                    <Label htmlFor="phone">Start Date</Label>
                                                    <Input
                                                        className="form-control"
                                                        type="datetime-local"
                                                        id="example-datetime-local-input"
                                                        name="startDate"
                                                        value={startDate}
                                                        onChange={(event) => {
                                                            setStartDate(event.target.value);
                                                        }
                                                        }
                                                    />
                                                </div>
                                            </Col>
                                            <Col md="6">
                                                <div className="mb-3">
                                                    <Label htmlFor="phone">End Date</Label>
                                                    <Input
                                                        className="form-control"
                                                        type="datetime-local"
                                                        id="example-datetime-local-input"
                                                        name="endDate"
                                                        value={endDate}
                                                        onChange={(event) => {
                                                            setEndDate(event.target.value);
                                                        }
                                                        }
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
