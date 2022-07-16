import React, {useState} from "react"
import {Card, CardBody, CardTitle, Col, Container, Row} from "reactstrap";
import "@pathofdev/react-tag-input/build/index.css";
import 'react-toastify/dist/ReactToastify.css';
import {toast} from "react-toastify";
import {get} from "../../functions/apiRequest";

const HotelDetail = (props) => {
    let {hotelId} = props.match.params;
    const [defaultValues, setDefaultValues] = useState();

    React.useEffect(() => {
        get(hotelId, 'hotels')
            .then(response => response.json())
            .then(response => {
                if (response.success) {
                    setDefaultValues(response.data.hotel)
                } else {
                    toast.error(response.message)
                }
            });
    }, [hotelId]);

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
                                            <CardTitle className="h3 border-bottom border-2 pb-3">Hotel
                                                Details</CardTitle>
                                            <Row>
                                                <Col xl={12}>
                                                    <p className="font-size-15 mb-1 border-bottom py-2 fw-semibold">Name
                                                        : <span
                                                            className="text-muted font-size-14 fw-normal">{defaultValues?.name}</span>
                                                    </p>
                                                    <p className="font-size-15 mb-1 border-bottom py-2 fw-semibold">Location
                                                        : <span
                                                            className="text-muted font-size-14 fw-normal">{defaultValues?.location}</span>
                                                    </p>
                                                    <p className="font-size-15 mb-1 border-bottom py-2 fw-semibold">Address
                                                        Type : <span
                                                            className="text-muted font-size-14 fw-normal">{defaultValues?.address}</span>
                                                    </p>
                                                    <p className="font-size-15 mb-1 border-bottom py-2 fw-semibold">Contact
                                                        Person
                                                        : <span
                                                            className="text-muted font-size-14 fw-normal">{defaultValues?.contactPerson}</span>
                                                    </p>
                                                    <p className="font-size-15 mb-1 border-bottom py-2 fw-semibold">Contact
                                                        Number
                                                        : <span
                                                            className="text-muted font-size-14 fw-normal">{defaultValues?.contactNumber}</span>
                                                    </p>
                                                </Col>
                                            </Row>

                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col xl={12}>
                                    <Card>
                                        <CardBody>
                                            <CardTitle className="h3 border-bottom border-2 pb-3">Properties
                                                List</CardTitle>
                                            {defaultValues.properties && defaultValues.properties.length > 0 ?
                                                <Row>
                                                    <Col lg="12">
                                                        <Row>
                                                            <Col lg={12}>
                                                                <div className="bracket_show text-nowrap">
                                                                    <table className="table table-bordered border-2">
                                                                        <thead>
                                                                        <tr>
                                                                            <th className="text-start w-25">Index</th>
                                                                            <th className="text-start w-25">Name</th>
                                                                            <th className="text-start">Property ID</th>
                                                                        </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                        {defaultValues.properties.map((item, index) =>
                                                                            <tr key={index}>
                                                                                <td>
                                                                                    {index + 1}
                                                                                </td>
                                                                                <td>
                                                                                    <a href={`/property/${item.id}/general`}>
                                                                                        <p className="font-size-15 mb-1 py-2 fw-semibold"><span
                                                                                            className="text-muted font-size-14 fw-normal">{item?.name}</span>
                                                                                        </p>
                                                                                    </a>
                                                                                </td>
                                                                                <td>
                                                                                    <p className="font-size-15 mb-1 py-2 fw-semibold"><span
                                                                                        className="text-muted font-size-14 fw-normal">{item?.propertyId}</span>
                                                                                    </p>
                                                                                </td>
                                                                            </tr>
                                                                        )}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                                :
                                                <Card className="vh-100 p-4 text-center">
                                                    <h5 className="mt-5">Loading...</h5>
                                                </Card>
                                            }
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

export default HotelDetail

