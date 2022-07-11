import React from "react";
import {Col, Container, Row,} from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";

const Dashboard = () => {
    const ref = React.createRef();

    return (
        <React.Fragment>
            <div className="page-content">
                <div ref={ref}>
                    <Container fluid id="dashcontent">
                        <Row className="align-items-center">
                            <Col className="col-12">
                                <div className="page-title-box">
                                    <h4 className="mb-0">Dashboard</h4>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Dashboard;