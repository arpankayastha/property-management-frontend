import React, {useState} from "react"
import {gql, useLazyQuery} from '@apollo/client';
import {Col, Label, Modal, ModalBody, ModalFooter, Row, Spinner} from "reactstrap"
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css"
//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css"
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import moment from "moment";
import ReactTagInput from "@pathofdev/react-tag-input";

// import { Button } from "react-bootstrap";
const UserList = (props) => {
    const [inProgress, setInProgress] = useState(false)
    const [getDetail, details] = useLazyQuery(DOWNLOAD_REPORT, {
        fetchPolicy: "network-only" // Doesn't check cache before making a network request
    });
    const showInModel = props.showInModel ?? true;
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [emails, setEmails] = React.useState([])
    const [fromDate, setFromDate] = useState(moment().subtract(30, "days"));
    const [toDate, setToDate] = useState(moment());
    const [userType, setUserType] = useState("");

    const downloadCSV = async () => {

        if (!showInModel) {
            // do nothing
        } else {
            if (emails.length === 0) {
                toast.error("Please enter emails")
                return false
            }
            if (props.type === "user" && userType === "") {
                toast.error("Please select user type")
                return false
            }
        }

        try {
            setInProgress(true)
            await getDetail({
                variables: {
                    "argumentsInput": {
                        "sort": "id",
                        "sort_dir": "desc",
                        "reportType": props.type,
                        "slug": props.slug ? props.slug : "",
                        "emailIds": emails,
                        "filterType": props.type === "user" ? userType : "",
                        "startDate": !showInModel ? "" : fromDate,
                        "endDate": !showInModel ? "" : toDate
                    }
                }
            });
        } catch (e) {
            setInProgress(false)
        }
    }


    const handleDownloadCSV = () => {
        if (!showInModel) {
            downloadCSV();
        } else {
            handleShow();
        }
    }

    

    // const removeTag = indexToRemove => {
    //    setEmails(emails.filter((_, emails) => emails != indexToRemove));
    // }


    React.useEffect(() => {
        if (details.data && details.data.createReport && details.data.createReport.code === 200) {
            handleClose()
            if (details.data.createReport.data.isNow) {
                const {fileLink} = details.data.createReport.data;
                const link = document.createElement('a');
                link.href = fileLink;
                link.setAttribute(
                    'download',
                    `Report_user_${new Date().getTime()}.csv`,
                );

                // Append to html link element page
                document.body.appendChild(link);

                // Start download
                link.click();

                // Clean up and remove the link
                link.parentNode.removeChild(link);
                setInProgress(false)

            } else {
                toast.success(details.data.createReport.message)
                setInProgress(false)
            }
        } else {
            console.log(details.data)
            setInProgress(false)
        }

    }, [details]);


    //*************** */
    // const[selectionRange] = {
    //     startDate:new Date(),
    //     endDate:new Date(),
    //     key:'selection',
    // }

    const range = {
        "Today": [moment(), moment()],
        "Yesterday": [moment().subtract(1, "days"), moment().subtract(1, "days")],
        "Last 7 Days": [moment().subtract(6, "days"), moment()],
        "Last 30 Days": [moment().subtract(29, "days"), moment()],
        "This Month": [moment().startOf("month"), moment().endOf("month")],
        "Last Month": [
            moment()
                .subtract(1, "month")
                .startOf("month"),
            moment()
                .subtract(1, "month")
                .endOf("month")
        ],
        "Last Year": [
            moment()
                .subtract(1, "year")
                .startOf("year"),
            moment()
                .subtract(1, "year")
                .endOf("year")
        ],
        key: 'selection',
    };

    const setDates = (e, {startDate, endDate}) => {
        setFromDate(startDate.format("YYYY-MM-DD"))
        setToDate(endDate.format("YYYY-MM-DD"))
    };
// console.log(emails);
    return (
        <React.Fragment>
            {/* <ToastContainer /> */}
            <div className="d-sm-block d-none">
                <a className="btn btn-success" onClick={() => handleDownloadCSV()}>
                    <i className="uil-download-alt font-size-18 me-1 text-white"></i>{props.buttonText ? props.buttonText : 'Download CSV'}
                </a>
            </div>
            <div className="d-sm-none d-block">
                <a className="btn btn-success" onClick={() => handleDownloadCSV()}><i
                    className="uil-download-alt font-size-18 me-1 text-white"></i></a>
            </div>

            <Modal
                size="md"
                isOpen={show}
                toggle={handleClose}
                centered={true}
            >
                <div className="modal-header px-auto">
                    <h5 className="modal-title">Download Reports</h5>

                    <button
                        type="button"
                        onClick={handleClose}
                        className="close mt-2"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <React.Fragment>
                    <ModalBody>
                        <Row>
                            <Col md={8}>
                                <div className="mb-4">
                                    <h5 className="font-size-16">Select Date</h5>
                                    <DateRangePicker
                                        onApply={setDates}
                                        startDate={fromDate}
                                        endDate={toDate}
                                        ranges={range}
                                        alwaysShowCalendars={true}
                                        initialSettings={{startDate: fromDate, endDate: toDate}}
                                        // initialSettings={{ startDate:moment(fromDate).format('YYYY-MM-DD'), endDate:moment(toDate).format('YYYY-MM-DD')}}
                                    >
                                        <button>
                                            {moment(fromDate).format("LL")} to {moment(toDate).format("LL")}
                                        </button>
                                    </DateRangePicker>
                                </div>
                            </Col>
                            {props.type === "user" &&
                            <Col md={12}>
                                <div className="mb-4">
                                    <h5 className="font-size-16">Download for by user type</h5>

                                    <div class="form-check">
                                        <input class="form-check-input" type="radio"
                                               name="visiting"
                                               id="visiting"
                                               checked={userType === "visiting"}
                                               onClick={() => setUserType("visiting")}
                                        ></input>
                                        <label class="form-check-label fw-normal text-muted" for="visiting2">
                                            Visiting Users
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="ga_plus" id="ga_plus"
                                               checked={userType === "ga_plus"}
                                               onClick={() => setUserType("ga_plus")}
                                        ></input>
                                        <label class="form-check-label fw-normal text-muted" for="ga_plus1">
                                            Only GA+ Users
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="allUsers" id="allUsers"
                                               checked={userType === "all"}
                                               onClick={() => setUserType("all")}
                                        ></input>
                                        <label class="form-check-label fw-normal text-muted" for="allUsers1">
                                            All Users
                                        </label>
                                    </div>
                                </div>
                            </Col>
                            }
                            <Col md="12">
                                <div className="mb-3">
                                    <Label>Emails</Label>
                                    <ReactTagInput
                                        tags={emails}
                                        allowDeleteFromEmptyInput={true}
                                        onChange={(email) => {
                                            console.log(email)
                                            const re = /\S+@\S+\.\S+/;
                                            if (re.test(String(email).toLowerCase())) {
                                                setEmails(email)
                                            }
                                            if(email.length==0){
                                                setEmails(email)
                                            }
                                        }}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        {/* <a type="button" className="btn btn-primary" onClick={downloadCSV} >Download CSV</a> */}
                        {!inProgress ?
                            <a className="btn btn-primary" onClick={() => downloadCSV()}>
                                <i className="uil-download-alt font-size-12 me-1 text-white"></i>Download CSV
                            </a>
                            :
                            <a className="btn btn-primary btn-lg font-size-16">
                                <Spinner type="grow" className="me-1 align-middle spinner-grow-sm" color="light"/>
                                Processing...
                            </a>
                        }
                        <a type="button" onClick={handleClose} className="btn btn-secondary" data-dismiss="modal"
                           aria-label="close">Close</a>
                    </ModalFooter>
                </React.Fragment>

            </Modal>
        </React.Fragment>
    )
}
export default UserList


const DOWNLOAD_REPORT = gql`query createReport($argumentsInput:ArgumentsInput!){
    createReport(argumentsInput:$argumentsInput){
      code
      status
      message
      data{
        fileLink
        isNow
      }
    }
  }`