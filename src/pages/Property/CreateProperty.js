import React, {useState} from "react"

import {Button, Card, CardBody, Col, Container, Label, Row, Spinner} from "reactstrap"
import {AvField, AvForm, AvGroup, AvInput} from "availity-reactstrap-validation"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
//Import Breadcrumb
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {get, getList, post} from "../../functions/apiRequest";
import Select from "react-select";

const FormValidations = (props) => {
    let {propertyId} = props.match.params;

    const [inProgress, setInProgress] = useState(false)
    const [defaultValues, setDefaultValues] = useState();
    const [selectedHotel, setSelectedHotel] = React.useState()
    const [hotels, setHotels] = useState([]);

    React.useEffect(() => {
        if (hotels.length === 0) {
            getList({
                pageNumber: 1,
                sizePerPage: 1000,
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
    }, []);

    React.useEffect(() => {
        if (propertyId) {
            get(propertyId, 'properties')
                .then(response => response.json())
                .then(response => {
                    if (response.success) {
                        setDefaultValues(response.data.property);
                        if (response.data.property && response.data.property.hotel) {
                            setSelectedHotel(response.data.property.hotel.id);
                        }
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

        if (selectedHotel) {
            values.hotel = {id: selectedHotel}
        }

        try {
            setInProgress(true);
            post(values, 'properties')
                .then(response => response.json())
                .then(data => {
                    setInProgress(false)
                    if (data.success) {
                        toast.success(data.message);
                        setTimeout(() => {
                            props.history.push(`/property`);
                        }, 800);
                    } else {
                        toast.error(data.message)
                    }
                });
        } catch (e) {
            setInProgress(false);
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
                                            <Col md="6">
                                                <div className="mb-3">
                                                    <Label htmlFor="name">Hotel</Label>
                                                    <Select
                                                        value={
                                                            hotels.filter(option => option.id === selectedHotel)
                                                        }
                                                        options={hotels}
                                                        name="hotelId"
                                                        className={`${inProgress ? 'select-error' : ''}`}
                                                        classNamePrefix="select"
                                                        validate={{required: {value: true}}}
                                                        getOptionLabel={(option) => option.name}
                                                        getOptionValue={(option) => option.id}
                                                        onChange={(data) => setSelectedHotel(data.id)}
                                                    />
                                                </div>
                                            </Col>
                                            <Col md="6">
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
                                        </Row>
                                        <Row>
                                            <Col md="6">
                                                <div className="mb-3">
                                                    <Label htmlFor="propertyId">Property ID</Label>
                                                    <AvField
                                                        name="propertyId"
                                                        placeholder="Property ID"
                                                        type="text"
                                                        errorMessage=" Please enter valid property id."
                                                        className="form-control"
                                                        validate={{required: {value: true}}}
                                                        id="propertyId"
                                                    />
                                                </div>
                                            </Col>
                                            <Col md="6">
                                                <div className="mb-3">
                                                    <Label htmlFor="propertyId">Property Lock File</Label>
                                                    <AvField
                                                        name="propertyLockFile"
                                                        placeholder="Property Lock FILE URL"
                                                        type="url"
                                                        errorMessage=" Please enter valid property lock file url."
                                                        className="form-control"
                                                        validate={{required: {value: true}}}
                                                        id="propertyLockFile"
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
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
