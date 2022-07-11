import PropTypes from 'prop-types'
import React, { useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Media,
  Button,
} from "reactstrap"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

// Redux
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb"

import avatar from "../../assets/images/users/avatar-1.jpg"
// actions
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Changepassword = props => {
  const dispatch = useDispatch();
  const Profile = useSelector((state) => state.Profile);

  console.log(Profile.user)
 
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [idx, setidx] = useState(1)

 

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={false}>

            <Row>
                <Col lg="12">
                    {props.error && props.error ? (
                        <Alert color="danger">{props.error}</Alert>
                    ) : null}
                    {props.success && props.success ? (
                        <Alert color="success">{props.success}</Alert>
                    ) : null}

                    <Card>
                        <CardBody>
                            <div className="text-muted">
                                <h5 className="mb-0">Change Passsword</h5>                        
                            </div>
                        </CardBody>
                    </Card>
                </Col>
          </Row>

         

          <Card>
            <CardBody>
              <AvForm
                className="form-horizontal"
                onValidSubmit={(e, v) => {
                }}
              >
                <div className="form-group mb-3">
                  <AvField
                    name="email"
                    label="Email"
                    value={email}
                    className="form-control"
                    placeholder="mytest.qatesting+01@gmail.coml"
                    type="email"
                    disabled
                  />
                  <AvField name="idx" value={idx} type="hidden" />
                </div>

                <div className="form-group mb-3">
                  <AvField
                    name="password"
                    label="Old Password"
                    value={password}
                    className="form-control"
                    type="password"
                  />
                  <AvField name="idx" value={idx} type="hidden" />
                </div>

                <div className="form-group mb-3">
                  <AvField
                    name="password"
                    label="Password"
                    value={password}
                    className="form-control"
                    type="password"
                  />
                  <AvField name="idx" value={idx} type="hidden" />
                </div>

                <div className="form-group mb-3">
                  <AvField
                    name="passwordVerify"
                    label="Confirm Password"
                    value={password}
                    className="form-control"
                    type="password"
                  />
                  <AvField name="idx" value={idx} type="hidden" />
                </div>

                <div className="mt-4">
                  <Button type="submit" color="success">
                    Update Password
                  </Button>
                </div>
              </AvForm>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}
 

export default Changepassword
