import React, {useCallback, useState} from "react"
import {Card, CardBody, Col, NavLink, Row} from "reactstrap"
import Table from "../../components/Common/Table";
import {Link, NavLink as RRNavLink} from 'react-router-dom';
import {checkPermissions, sortCaret} from '../../functions/functions'
import debounce from 'lodash.debounce';
import {toast} from "react-toastify";
import {getList} from "../../functions/apiRequest";
// import { Button } from "react-bootstrap";
const UserList = (props) => {
    const [user, setUser] = useState([])
    const [totalUser, setTotalUser] = useState(0)
    const [isSpinner, setIsSpinner] = useState(false)

    const params = new URLSearchParams(window.location.search)
    const pageNumber = params.get('page') ?? 1;
    const [state, setState] = useState({
        page: pageNumber ? parseInt(pageNumber) : 1,
        data: user,
        sizePerPage: 20
    })

    function getUserListFun(page, sizePerPage, searchText, sortField, sortOrder) {
        getList({
            pageNumber: page ?? 1,
            sizePerPage: sizePerPage ?? 20,
            sortField,
            sortOrder,
            searchText
        }, 'users')
            .then(response => response.json())
            .then(response => {
                console.log({response});
                if (response.success) {
                    setIsSpinner(false)
                    setUser(response.data.users)
                    setTotalUser(response.data.total_count)
                    setState({data: response.data.users})
                } else {
                    toast.error(response.message)
                }
            });
    }

    React.useEffect(() => {
        getUserListFun(state.page, state.sizePerPage, "", null, null)

        if (!checkPermissions("user_list")) {
            localStorage.clear()
            window.location.href = '/login'
        }
    }, []);

    const columns = [
        {
            dataField: 'id',
            text: 'ID',
            sort: true,
            headerAlign: 'left',
            align: 'left',
            sortCaret: sortCaret,
            headerStyle: {cursor: 'pointer'}
        },
        {
            dataField: 'name',
            text: 'Name',
            sort: true,
            formatter: userDetail,
            headerAlign: 'left',
            align: 'left',
            sortCaret: sortCaret,
            headerStyle: {cursor: 'pointer'}
        },
        {
            dataField: 'email',
            text: 'Email',
            sort: true,
            headerAlign: 'left',
            align: 'left',
            sortCaret: sortCaret,
            headerStyle: {cursor: 'pointer'}
        }
    ];

    function userDetail(cell, row, rowIndex, formatExtraData) {
        return (
            <>
                {checkPermissions("user_view") ?
                    <NavLink className="ps-0" tag={RRNavLink} to={`/user/${encodeURIComponent(row.id)}/general`}>
                        <span className="d-sm-block">  {row.name}</span>
                    </NavLink>
                    :
                    <div className="">
                        <span className="d-sm-block">{row.name}</span>
                    </div>
                }
            </>
        );
    }

    const delaySearch = useCallback(debounce(({page, sizePerPage, searchText, sortField, sortOrder}) => {
        getUserListFun(page, sizePerPage, searchText, sortField, sortOrder)
    }, 750));

    const handleTableChange = (type, {page, sizePerPage, sortField, sortOrder, searchText}) => {
        props.history.push(`user?page=${page}`)
        setIsSpinner(true)
        if (type === "search") {
            delaySearch({page, sizePerPage, searchText, sortField, sortOrder})
        } else {
            getUserListFun(page, sizePerPage, searchText, sortField, sortOrder)
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
                                            <h3 className="my-3">User </h3>
                                        </Col>
                                        <Col className="col-sm-6 col-12">
                                            <div className="d-sm-block d-none float-sm-end">
                                                <div className="d-sm-flex my-3">
                                                    {checkPermissions("user_add") &&
                                                    <Link as={Link} to={`user/create`} className="btn btn-primary me-2"><i
                                                        className="uil-file-plus font-size-18 me-1 text-white"/>Create</Link>
                                                    }
                                                </div>
                                            </div>
                                            <div className="d-sm-none d-block float-sm-end">
                                                <div className="d-flex mb-3">
                                                    {checkPermissions("user_add") &&
                                                    <Link className="btn btn-primary me-2" as={Link} to={`user/create`}><i
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
                                        totalSize={totalUser}
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
export default UserList
