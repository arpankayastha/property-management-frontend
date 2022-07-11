import React from "react";

import {
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardImg,
  CardText,
  CardHeader,
  CardImgOverlay,
  CardFooter,
  CardDeck,
  Container,
  CardGroup,
} from "reactstrap";

// import images
import img1 from "../../assets/images/small/img-1.jpg";
import img2 from "../../assets/images/small/img-2.jpg";
import img3 from "../../assets/images/small/img-3.jpg";
import img4 from "../../assets/images/small/img-4.jpg";
import img5 from "../../assets/images/small/img-5.jpg";
import img6 from "../../assets/images/small/img-6.jpg";
import img7 from "../../assets/images/small/img-7.jpg";
import { Link } from "react-router-dom";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const UiCards = props => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="UI Elements" breadcrumbItem="Cards" />

          <Row>
            <Col mg={6} xl={3}>
              <Card>
                <CardImg top className="img-fluid" src={img1} alt="Card image cap" />
                <CardBody>
                  <CardTitle className="h4 mt-0">Card title</CardTitle>
                  <CardText>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </CardText>
                  <Link
                    to="#"
                    className="btn btn-primary waves-effect waves-light"
                  >
                    Button
                  </Link>
                </CardBody>
              </Card>
            </Col>
            <Col mg={6} xl={3}>
              <Card>
                <CardImg top className="img-fluid" src={img2} alt="Card image cap" />
                <CardBody>
                  <CardTitle className="h4 mt-0">Card title</CardTitle>
                  <CardText>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </CardText>
                </CardBody>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Cras justo odio</li>
                  <li className="list-group-item">Dapibus ac facilisis in</li>
                </ul>
                <CardBody>
                  <Link to="#" className="card-link">
                    Card link
                  </Link>{" "}
                  <Link to="#" className="card-link">
                    Another link
                  </Link>
                </CardBody>
              </Card>
            </Col>

            <Col mg={6} xl={3}>
              <Card>
                <CardImg top className="img-fluid" src={img3} alt="Card image cap" />
                <CardBody>
                  <CardText>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col md={6} xl={3}>
              <Card>
                <CardBody>
                  <CardTitle className="h4 mt-0">Card title</CardTitle>
                  <CardSubtitle className="h6 font-14 text-muted">
                    Support card subtitle
                  </CardSubtitle>
                </CardBody>
                <CardImg className="img-fluid" src={img4} alt="Card image cap" />
                <CardBody>
                  <CardText>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </CardText>
                  <Link to="#" className="card-link">
                    Card link
                  </Link>{" "}
                  <Link to="#" className="card-link">
                    Another link
                  </Link>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Card body>
                <CardTitle className="h3 mt-0">Special title treatment</CardTitle>
                <CardText>
                  With supporting text below as a natural lead-in to additional
                  content.
                </CardText>
                <Link
                  to="#"
                  className="btn btn-primary waves-effect waves-light"
                >
                  Go somewhere
                </Link>
              </Card>
            </Col>
            <Col md={6}>
              <Card body>
                <CardTitle className="h4 mt-0">Special title treatment</CardTitle>
                <CardText>
                  With supporting text below as a natural lead-in to additional
                  content.
                </CardText>
                <Link
                  to="#"
                  className="btn btn-primary waves-effect waves-light"
                >
                  Go somewhere
                </Link>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg={4}>
              <Card body>
                <CardTitle className="h4 mt-0">Special title treatment</CardTitle>
                <CardText>
                  With supporting text below as a natural lead-in to additional
                  content.
                </CardText>
                <Link
                  to="#"
                  className="btn btn-primary waves-effect waves-light"
                >
                  Go somewhere
                </Link>
              </Card>
            </Col>

            <Col lg={4}>
              <Card body className="text-center">
                <CardTitle className="h4 mt-0">Special title treatment</CardTitle>
                <CardText>
                  With supporting text below as a natural lead-in to additional
                  content.
                </CardText>
                <Link
                  to="#"
                  className="btn btn-primary waves-effect waves-light"
                >
                  Go somewhere
                </Link>
              </Card>
            </Col>

            <Col lg={4}>
              <Card body className="text-end">
                <CardTitle className="h4 mt-0">Special title treatment</CardTitle>
                <CardText>
                  With supporting text below as a natural lead-in to additional
                  content.
                </CardText>
                <Link
                  to="#"
                  className="btn btn-primary waves-effect waves-light"
                >
                  Go somewhere
                </Link>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg={4}>
              <Card>
                <CardHeader className="h4">Featured</CardHeader>
                <CardBody>
                  <CardTitle className="h4 mt-0">
                    Special title treatment
                  </CardTitle>
                  <CardText>
                    With supporting text below as a natural lead-in to
                    additional content.
                  </CardText>
                  <Link to="#" className="btn btn-primary">
                    Go somewhere
                  </Link>
                </CardBody>
              </Card>
            </Col>

            <Col lg={4}>
              <Card>
                <CardHeader>Quote</CardHeader>
                <CardBody>
                  <blockquote className="card-blockquote mb-0">
                    <CardText>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Integer posuere erat a ante.
                    </CardText>
                    <footer className="blockquote-footer mt-3 font-size-12">
                      {" "}Someone famous in{" "}
                      <cite title="Source Title">Source Title</cite>
                    </footer>
                  </blockquote>
                </CardBody>
              </Card>
            </Col>

            <Col lg={4}>
              <Card>
                <CardHeader>Featured</CardHeader>
                <CardBody>
                  <CardTitle className="h4 mt-0">
                    Special title treatment
                  </CardTitle>
                  <CardText>
                    With supporting text below as a natural lead-in to
                    additional content.
                  </CardText>
                  <Link
                    to="#"
                    className="btn btn-primary waves-effect waves-light"
                  >
                    Go somewhere
                  </Link>
                </CardBody>
                <CardFooter className="text-muted">2 days ago</CardFooter>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg={4}>
              <Card>
                <CardImg top className="img-fluid" src={img5} alt="Card image cap" />
                <CardBody>
                  <CardTitle className="h4 mt-0">Card title</CardTitle>
                  <CardText>
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </CardText>
                  <CardText>
                    <small className="text-muted">
                      Last updated 3 mins ago
                    </small>
                  </CardText>
                </CardBody>
              </Card>
            </Col>

            <Col lg={4}>
              <Card>
                <CardBody>
                  <CardTitle className="h4 mt-0">Card title</CardTitle>
                  <CardText>
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </CardText>
                  <CardText>
                    <small className="text-muted">
                      Last updated 3 mins ago
                    </small>
                  </CardText>
                </CardBody>
                <CardImg bottom className="img-fluid" src={img7} alt="Card image cap" />
              </Card>
            </Col>

            <Col lg={4}>
              <Card>
                <CardImg className="img-fluid" src={img6} alt="Card image cap" />
                <CardImgOverlay>
                  <CardTitle className="h4 text-white mt-0">Card title</CardTitle>
                  <CardText className="text-light">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </CardText>
                  <CardText>
                    <small className="text-white">
                      Last updated 3 mins ago
                    </small>
                  </CardText>
                </CardImgOverlay>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg={6}>
              <Card>
                <Row className="g-0 align-items-center">
                  <Col md={4}>
                    <CardImg className="img-fluid" src={img2} alt="Card image cap" />
                  </Col>
                  <Col md={8}>
                    <CardBody>
                      <CardTitle className="h5">Card title</CardTitle>
                      <CardText>
                        This is a wider card with supporting text below as a
                        natural lead-in to additional content.
                      </CardText>
                      <CardText>
                        <small className="text-muted">
                          Last updated 3 mins ago
                        </small>
                      </CardText>
                    </CardBody>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col lg={6}>
              <Card>
                <Row className="g-0 align-items-center">
                  <Col md={8}>
                    <CardBody>
                      <CardTitle className="h5">Card title</CardTitle>
                      <CardText>
                        This is a wider card with supporting text below as a
                        natural lead-in to additional content.
                      </CardText>
                      <CardText>
                        <small className="text-muted">
                          Last updated 3 mins ago
                        </small>
                      </CardText>
                    </CardBody>
                  </Col>
                  <Col md={4}>
                    <CardImg className="img-fluid" src={img3} alt="Card image cap" />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg={4}>
              <Card color="primary" className="text-white-50">
                <CardBody>
                  <h5 className="mt-0 mb-4 text-white">
                    <i className="uil uil-user me-3"></i> Primary Card
                  </h5>
                  <CardText>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </CardText>
                </CardBody>
              </Card>
            </Col>

            <Col lg={4}>
              <Card color="success" className="text-white-50">
                <CardBody>
                  <h5 className="mt-0 mb-4 text-white">
                    <i className="uil uil-check-circle me-3"></i> Success Card
                  </h5>
                  <CardText>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </CardText>
                </CardBody>
              </Card>
            </Col>

            <Col lg={4}>
              <Card color="info" className="text-white-50">
                <CardBody>
                  <h5 className="mt-0 mb-4 text-white">
                    <i className="uil uil-question-circle me-3"></i>Info
                    Card
                  </h5>
                  <CardText>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg={4}>
              <Card color="warning" className="text-white-50">
                <CardBody>
                  <h5 className="mt-0 mb-4 text-white">
                    <i className="uil uil-exclamation-triangle me-3"></i>Warning Card
                  </h5>
                  <CardText>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </CardText>
                </CardBody>
              </Card>
            </Col>

            <Col lg={4}>
              <Card color="danger" className="text-white-50">
                <CardBody>
                  <h5 className="mt-0 mb-4 text-white">
                    <i className="uil uil-exclamation-octagon me-3"></i>Danger Card
                  </h5>
                  <CardText>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </CardText>
                </CardBody>
              </Card>
            </Col>

            <Col lg={4}>
              <Card color="dark" className="text-light">
                <CardBody>
                  <h5 className="mt-0 mb-4 text-white">
                    <i className="uil uil-arrow-circle-right me-3"></i>Dark
                    Card
                  </h5>
                  <CardText>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg={4}>
              <Card outline color="primary" className="border">
                <CardHeader className="bg-transparent">
                  <h5 className="my-0 text-primary">
                    <i className="uil uil-user me-3"></i>Primary
                    outline Card
                  </h5>
                </CardHeader>
                <CardBody>
                  <CardTitle className="h5 mt-0">card title</CardTitle>
                  <CardText>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </CardText>
                </CardBody>
              </Card>
            </Col>

            <Col lg={4}>
              <Card outline color="danger" className="border">
                <CardHeader className="bg-transparent">
                  <h5 className="my-0 text-danger">
                    <i className="uil uil-exclamation-octagon me-3"></i>Danger outline
                    Card
                  </h5>
                </CardHeader>
                <CardBody>
                  <CardTitle className="h5 mt-0">card title</CardTitle>
                  <CardText>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </CardText>
                </CardBody>
              </Card>
            </Col>

            <Col lg={4}>
              <Card outline color="success" className="border">
                <CardHeader className="bg-transparent">
                  <h5 className="my-0 text-success">
                    <i className="uil uil-check-circle me-3"></i>Success Card
                  </h5>
                </CardHeader>
                <CardBody>
                  <CardTitle className="h5 mt-0">card title</CardTitle>
                  <CardText>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col className="col-12">
              <h4 className="my-3">Card groups</h4>
              <CardDeck className="card-deck-wrapper">
                <CardGroup>
                  <Card className="mb-4">
                    <CardImg top className="img-fluid" src={img4} alt="Card image cap" />
                    <CardBody>
                      <CardTitle className="h4 mt-0">Card title</CardTitle>
                      <CardText>
                        This is a longer card with supporting text below as a
                        natural lead-in to additional content. This content is a
                        little bit longer.
                      </CardText>
                      <CardText>
                        <small className="text-muted">
                          Last updated 3 mins ago
                        </small>
                      </CardText>
                    </CardBody>
                  </Card>
                  <Card className="mb-4">
                    <CardImg top className="img-fluid" src={img5} alt="Card image cap" />
                    <CardBody>
                      <CardTitle className="h4 mt-0">Card title</CardTitle>
                      <CardText>
                        This card has supporting text below as a natural lead-in
                        to additional content.
                      </CardText>
                      <CardText>
                        <small className="text-muted">
                          Last updated 3 mins ago
                        </small>
                      </CardText>
                    </CardBody>
                  </Card>
                  <Card className="mb-4">
                    <CardImg top className="img-fluid" src={img6} alt="Card image cap" />
                    <CardBody>
                      <CardTitle className="h4 mt-0">Card title</CardTitle>
                      <CardText>
                        This is a wider card with supporting text below as a
                        natural lead-in to additional content. This card has even
                        longer content than the first to show that equal height
                        action.
                      </CardText>
                      <CardText>
                        <small className="text-muted">
                          Last updated 3 mins ago
                        </small>
                      </CardText>
                    </CardBody>
                  </Card>
                </CardGroup>
              </CardDeck>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default UiCards;
