import React, {useCallback, useState} from "react"
import {Card, CardBody, Col, NavLink, Row} from "reactstrap"
import Table from "../../components/Common/Table";
import {Link, NavLink as RRNavLink} from 'react-router-dom';
import {checkPermissions, sortCaret} from '../../functions/functions'
import debounce from 'lodash.debounce';
import {toast} from "react-toastify";
import {deleteEntry, getList} from "../../functions/apiRequest";
import DeleteConfirm from "../../components/Common/DeleteConfirm";


const HotelList = (props) => {
    const [hotel, setHotel] = useState([])
    const [totalHotel, setTotalHotel] = useState(0)
    const [isSpinner, setIsSpinner] = useState(false);
    const [inProgress, setInProgress] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState();


    const params = new URLSearchParams(window.location.search)
    const pageNumber = params.get('page') ?? 1;
    const [state, setState] = useState({
        page: pageNumber ? parseInt(pageNumber) : 1,
        data: hotel,
        sizePerPage: 20
    })

    function getHotelListFun(page, sizePerPage, searchText, sortField, sortOrder) {
        getList({
            pageNumber: page ?? 1,
            sizePerPage: sizePerPage ?? 20,
            sortField,
            sortOrder,
            searchText
        }, 'hotels')
            .then(response => response.json())
            .then(response => {
                if (response.success) {
                    setIsSpinner(false)
                    setHotel(response.data.hotels)
                    setTotalHotel(response.data.total_count)
                    setState({data: response.data.hotels})
                } else {
                    toast.error(response.message)
                }
            });
    }

    React.useEffect(() => {
        getHotelListFun(state.page, state.sizePerPage, "", null, null)

        if (!checkPermissions("hotel_list")) {
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
            formatter: hotelDetail,
            headerAlign: 'left',
            align: 'left',
            sortCaret: sortCaret,
            headerStyle: {cursor: 'pointer'}
        },
        {
            dataField: 'location',
            text: 'Location',
            sort: true,
            headerAlign: 'left',
            align: 'left',
            sortCaret: sortCaret,
            headerStyle: {cursor: 'pointer'}
        },
        {
            dataField: 'address',
            text: 'Address',
            sort: true,
            headerAlign: 'left',
            align: 'left',
            sortCaret: sortCaret,
            headerStyle: {cursor: 'pointer'}
        },
        {
            dataField: 'contactPerson',
            text: 'Contact Person',
            sort: true,
            headerAlign: 'left',
            align: 'left',
            sortCaret: sortCaret,
            headerStyle: {cursor: 'pointer'}
        },
        {
            dataField: 'contactNumber',
            text: 'Contact Number',
            sort: true,
            headerAlign: 'left',
            align: 'left',
            sortCaret: sortCaret,
            headerStyle: {cursor: 'pointer'}
        },
        {
            dataField: "action",
            text: "Action",
            formatter: actionEvent,
            sort: false,
            headerAlign: 'center',
            align: 'center',
            headerStyle: {cursor: 'pointer'}
        }
    ];

    function actionEvent(cell, row, rowIndex, formatExtraData) {
        return (
            <>
                <div className="d-flex">
                    <Link
                        className="btn btn-primary waves-effect waves-light me-2 mb-1"
                        as={Link}
                        to={`/hotel/${row.id}/edit`}
                    >
                        <i className="fas fa-edit"/>
                    </Link>
                    <DeleteConfirm
                        title={"Are you sure?"}
                        text={"Once deleted, you will not be able to recover this hotel data!"}
                        onConfirm={() => deleteItem(row.id, rowIndex)}
                    />
                </div>
            </>
        );
    }

    function hotelDetail(cell, row, rowIndex, formatExtraData) {
        return (
            <>
                {checkPermissions("hotel_view") ?
                    <NavLink className="ps-0" tag={RRNavLink} to={`/hotel/${encodeURIComponent(row.id)}/general`}>
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
        getHotelListFun(page, sizePerPage, searchText, sortField, sortOrder)
    }, 750));

    const handleTableChange = (type, {page, sizePerPage, sortField, sortOrder, searchText}) => {
        props.history.push(`hotel?page=${page}`)
        setIsSpinner(true)
        if (type === "search") {
            delaySearch({page, sizePerPage, searchText, sortField, sortOrder})
        } else {
            getHotelListFun(page, sizePerPage, searchText, sortField, sortOrder)
        }
    }

    const deleteItem = async (id, index) => {
        if (inProgress) {
            return false
        } else {
            setDeleteIndex(index)
            try {
                setInProgress(true);
                deleteEntry(id, 'hotels')
                    .then(response => response.json())
                    .then(response => {
                        if (response.success) {
                            setInProgress(false);
                            let list = [...state.data];
                            if (list && list.length > 0) {
                                list.splice(deleteIndex, 1);
                                setHotel(list)
                                setState({data: list})
                                setTotalHotel(totalHotel - 1)
                            }
                            toast.success(response.message);
                        } else {
                            toast.error(response.message);
                        }
                    });
            } catch (e) {
                toast.error(e.message);
                setInProgress(false);
            }
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
                                            <h3 className="my-3">Hotel </h3>
                                        </Col>
                                        <Col className="col-sm-6 col-12">
                                            <div className="d-sm-block d-none float-sm-end">
                                                <div className="d-sm-flex my-3">
                                                    {checkPermissions("hotel_add") &&
                                                    <Link as={Link} to={`hotel/create`}
                                                          className="btn btn-primary me-2"><i
                                                        className="uil-file-plus font-size-18 me-1 text-white"/>Create</Link>
                                                    }
                                                </div>
                                            </div>
                                            <div className="d-sm-none d-block float-sm-end">
                                                <div className="d-flex mb-3">
                                                    {checkPermissions("hotel_add") &&
                                                    <Link className="btn btn-primary me-2" as={Link}
                                                          to={`hotel/create`}><i
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
                                        totalSize={totalHotel}
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
export default HotelList
