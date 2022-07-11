import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react"
import {Alert, Button, Card, CardBody, Col, Container, Row, Spinner} from "reactstrap"

// Redux
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"

// availity-reactstrap-validation
import {AvField, AvForm} from "availity-reactstrap-validation"

// actions
import {apiError, loginUser} from "../../store/actions"

// import images
import logo from "../../assets/images/logo.png"

//Import config
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {post} from "../../functions/apiRequest";

const Login = (props) => {
    const [inProgress, setInProgress] = useState(false)

    useEffect(() => {
        document.body.className = "authentication-bg";
        document.title = "Login |  Admin Dashboard";

        // remove classname when component will unmount
        return function cleanup() {
            document.body.className = "";
        };
    });

    const [error, setError] = useState()
    const [organizationDetail, setOrganizationDetail] = useState(null);
    let identifierSlug = window.location.host.split('.') ? window.location.host.split('.')[1] : '';

    const handleValidSubmit = async (event, values) => {
        try {
            setInProgress(true);
            post(values, 'auth/login')
                .then(response => response.json())
                .then(data => {
                    setInProgress(false)
                    if (data.success) {
                        localStorage.setItem("authUser", JSON.stringify(data.data))
                        localStorage.setItem('lut', data.data.session_token)
                        props.history.push(`/dashboard`)
                    } else {
                        toast.error(data.message)
                    }
                });
        } catch (e) {
            setError(e)
            setInProgress(false)
        }
    }

    return (
        <React.Fragment>
            <ToastContainer/>
            <div className="account-pages my-5 pt-sm-5">
                <Container>
                    <Row>
                        <Col lg={12}>
                            <div className="text-center">
                                <a className="mb-5 d-block auth-logo">
                                    <img src={logo} alt="" height="22" className="logo logo-dark"/>
                                </a>
                            </div>
                        </Col>
                    </Row>
                    <Row className="align-items-center justify-content-center">
                        <Col md={8} lg={6} xl={5}>
                            <Card>
                                <CardBody className="p-4">
                                    <div className="text-center mt-2">
                                        <h5 className="text-primary">Welcome Back !</h5>
                                        <p className="text-muted">Sign in to continue
                                            to {"Service"} admin.</p>
                                    </div>
                                    <div className="p-2 mt-4">
                                        <AvForm
                                            className="form-horizontal"
                                            onValidSubmit={(e, v) => {
                                                handleValidSubmit(e, v)
                                            }}
                                        >
                                            {props.error && typeof props.error === "string" ? (
                                                <Alert color="danger">{props.error}</Alert>
                                            ) : null}

                                            <div className="mb-3">
                                                <AvField
                                                    name="email"
                                                    label="Email"
                                                    className="form-control"
                                                    placeholder="Enter email"
                                                    type="text"
                                                    required
                                                />
                                            </div>

                                            <div className="mb-3">
                                                {/* <div className="float-end">
                          <Link to="/forgot-password" className="text-muted">Forgot password?</Link>
                        </div> */}
                                                <AvField
                                                    name="password"
                                                    label="Password"
                                                    type="password"
                                                    required
                                                    placeholder="Enter Password"
                                                />
                                            </div>

                                            {/* <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customControlInline"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customControlInline"
                        >
                          Remember me
                        </label>
                      </div> */}

                                            <div className="mt-3">
                                                {!inProgress ?
                                                    <Button color="primary" type="submit">
                                                        Log In
                                                    </Button>
                                                    :
                                                    <Button color="primary" disabled>
                                                        <Spinner type="grow"
                                                                 className="me-1 align-middle spinner-grow-sm "
                                                                 color="light"/>
                                                        Processing...
                                                    </Button>
                                                }
                                            </div>

                                        </AvForm>

                                    </div>
                                </CardBody>
                            </Card>
                            <div className="mt-5 text-center text-white">
                                <p>© {new Date().getFullYear()} {"Service"}.</p>
                            </div>
                        </Col>
                    </Row>

                </Container>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    const {error} = state.Login
    return {error}
}

export default withRouter(
    connect(mapStateToProps, {loginUser, apiError})(Login)
)

Login.propTypes = {
    error: PropTypes.any,
    history: PropTypes.object,
    loginUser: PropTypes.func
}