import React, {useCallback, useState} from "react"
import {Card, CardBody, Col, NavLink, Row} from "reactstrap"
import Table from "../../components/Common/Table";
import {Link, NavLink as RRNavLink} from 'react-router-dom';
import {checkPermissions, sortCaret} from '../../functions/functions'
import debounce from 'lodash.debounce';
import {toast} from "react-toastify";
import {get, getList} from "../../functions/apiRequest";
import * as moment from 'moment';

const LockUsageList = (props) => {
    let {lockId} = props.match.params;
    const [lock, setLock] = useState([])
    const [totalLock, setTotalLock] = useState(0)
    const [isSpinner, setIsSpinner] = useState(false)

    const params = new URLSearchParams(window.location.search)
    const pageNumber = params.get('page') ?? 1;
    const [state, setState] = useState({
        page: pageNumber ? parseInt(pageNumber) : 1,
        data: lock,
        sizePerPage: 20
    })

    function getLockListFun(page, sizePerPage, searchText, sortField, sortOrder) {
        get(lockId, 'locks')
            .then(response => response.json())
            .then(response => {
                if (response.success) {
                    setIsSpinner(false)
                    setLock(response.data.lock.list)
                    setTotalLock(response.data.lock.total)
                    setState({data: response.data.lock.list})
                } else {
                    toast.error(response.message)
                }
            });
    }

    React.useEffect(() => {
        getLockListFun(state.page, state.sizePerPage, "", null, null)

        if (!checkPermissions("lock_list")) {
            localStorage.clear()
            window.location.href = '/login'
        }
    }, []);

    const columns = [
        {
            dataField: 'lockId',
            text: 'ID',
            sort: true,
            headerAlign: 'left',
            align: 'left',
            sortCaret: sortCaret,
            headerStyle: {cursor: 'pointer'}
        },
        {
            dataField: 'keyboardPwdName',
            text: 'Keyboard Pwd Name',
            sort: true,
            formatter: lockDetail,
            headerAlign: 'left',
            align: 'left',
            sortCaret: sortCaret,
            headerStyle: {cursor: 'pointer'}
        },
        {
            dataField: 'keyboardPwd',
            text: 'Keyboard Pwd',
            sort: true,
            headerAlign: 'left',
            align: 'left',
            sortCaret: sortCaret,
            headerStyle: {cursor: 'pointer'}
        },
        {
            dataField: 'senderUsername',
            text: 'Sender Username',
            sort: true,
            headerAlign: 'left',
            align: 'left',
            sortCaret: sortCaret,
            headerStyle: {cursor: 'pointer'}
        },
        {
            dataField: 'status',
            text: 'Status',
            sort: true,
            headerAlign: 'left',
            align: 'left',
            sortCaret: sortCaret,
            headerStyle: {cursor: 'pointer'}
        },
        {
            dataField: 'sendDate',
            text: 'Date',
            sort: true,
            formatter: lockDateDetail,
            headerAlign: 'left',
            align: 'left',
            sortCaret: sortCaret,
            headerStyle: {cursor: 'pointer'}
        },
        {
            dataField: 'endDate',
            text: 'Date',
            sort: true,
            formatter: lockEndDateDetail,
            headerAlign: 'left',
            align: 'left',
            sortCaret: sortCaret,
            headerStyle: {cursor: 'pointer'}
        },
    ];

    function lockDetail(cell, row, rowIndex, formatExtraData) {
        return (
            <>
                {checkPermissions("lock_view") ?
                    <NavLink className="ps-0" tag={RRNavLink} to={`/lock/${encodeURIComponent(row.lockId)}/general`}>
                        <span className="d-sm-block">  {row.keyboardPwdName}</span>
                    </NavLink>
                    :
                    <div className="">
                        <span className="d-sm-block">{row.keyboardPwdName}</span>
                    </div>
                }
            </>
        );
    }

    function lockDateDetail(cell, row, rowIndex, formatExtraData) {
        return (
            <>
                {checkPermissions("lock_view") &&
                <div className="">
                    <span className="d-sm-block">{moment(row.sendDate).format('YYYY-MM-DD HH:mm:ss')}</span>
                </div>
                }
            </>
        );
    }

    function lockEndDateDetail(cell, row, rowIndex, formatExtraData) {
        return (
            <>
                {checkPermissions("lock_view") &&
                <div className="">
                    <span className="d-sm-block">{moment(row.endDate).format('YYYY-MM-DD HH:mm:ss')}</span>
                </div>
                }
            </>
        );
    }

    const delaySearch = useCallback(debounce(({page, sizePerPage, searchText, sortField, sortOrder}) => {
        getLockListFun(page, sizePerPage, searchText, sortField, sortOrder)
    }, 750));

    const handleTableChange = (type, {page, sizePerPage, sortField, sortOrder, searchText}) => {
        props.history.push(`lock?page=${page}`)
        setIsSpinner(true)
        if (type === "search") {
            delaySearch({page, sizePerPage, searchText, sortField, sortOrder})
        } else {
            getLockListFun(page, sizePerPage, searchText, sortField, sortOrder)
        }
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <div className="container-fluid">
                    <Row>
                        <Col className="col-12">
                            <Card>
                                <CardBody>
                                    <Row className="align-items-center">
                                        <Col className="col-sm-6 col-12">
                                            <h3 className="my-3">Lock Details...</h3>
                                        </Col>
                                        <Col className="col-sm-6 col-12">
                                            <div className="d-sm-block d-none float-sm-end">
                                                <div className="d-sm-flex my-3">

                                                </div>
                                            </div>
                                            <div className="d-sm-none d-block float-sm-end">
                                                <div className="d-flex mb-3">
                                                    {checkPermissions("lock_add") &&
                                                    <Link className="btn btn-primary me-2" as={Link}
                                                          to={`lock/create`}><i
                                                        className="uil-file-plus font-size-18 me-1 text-white"/></Link>
                                                    }
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>

                                </CardBody>
                            </Card>
                        </Col>

                        <Col className="col-12">
                            <Card>
                                <CardBody>
                                    <Table
                                        data={state.data}
                                        page={state.page}
                                        sizePerPage={state.sizePerPage}
                                        totalSize={totalLock}
                                        onTableChange={handleTableChange}
                                        columns={columns}
                                        noDataIndication={'No Data Found'}
                                        loading={isSpinner}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </React.Fragment>
    )
}
export default LockUsageList
