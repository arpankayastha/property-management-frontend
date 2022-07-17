import React, {useCallback, useState} from "react"
import {Card, CardBody, Col, NavLink, Row} from "reactstrap"
import Table from "../../components/Common/Table";
import {Link, NavLink as RRNavLink} from 'react-router-dom';
import {checkPermissions, sortCaret} from '../../functions/functions'
import debounce from 'lodash.debounce';
import {toast} from "react-toastify";
import {deleteEntry, getList} from "../../functions/apiRequest";
import DeleteConfirm from "../../components/Common/DeleteConfirm";


const PropertyList = (props) => {
    const [property, setProperty] = useState([])
    const [totalProperty, setTotalProperty] = useState(0)
    const [isSpinner, setIsSpinner] = useState(false)
    const [inProgress, setInProgress] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState();

    const params = new URLSearchParams(window.location.search)
    const pageNumber = params.get('page') ?? 1;
    const [state, setState] = useState({
        page: pageNumber ? parseInt(pageNumber) : 1,
        data: property,
        sizePerPage: 20
    })

    function getPropertyListFun(page, sizePerPage, searchText, sortField, sortOrder) {
        getList({
            pageNumber: page ?? 1,
            sizePerPage: sizePerPage ?? 20,
            sortField,
            sortOrder,
            searchText
        }, 'properties')
            .then(response => response.json())
            .then(response => {
                if (response.success) {
                    setIsSpinner(false)
                    setProperty(response.data.properties)
                    setTotalProperty(response.data.total_count)
                    setState({data: response.data.properties})
                } else {
                    toast.error(response.message)
                }
            });
    }

    React.useEffect(() => {
        getPropertyListFun(state.page, state.sizePerPage, "", null, null)

        if (!checkPermissions("property_list")) {
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
            formatter: propertyDetail,
            headerAlign: 'left',
            align: 'left',
            sortCaret: sortCaret,
            headerStyle: {cursor: 'pointer'}
        },
        {
            dataField: 'hotel.name',
            text: 'Hotel',
            sort: true,
            formatter: hotelName,
            headerAlign: 'left',
            align: 'left',
            sortCaret: sortCaret,
            headerStyle: {cursor: 'pointer'}
        },
        {
            dataField: 'propertyId',
            text: 'Property ID',
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
            headerAlign: 'left',
            align: 'left',
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
                        to={`/property/${row.id}/edit`}
                    >
                        <i className="fas fa-edit"/>
                    </Link>
                    <DeleteConfirm
                        title={"Are you sure?"}
                        text={"Once deleted, you will not be able to recover this property data!"}
                        onConfirm={() => deleteItem(row.id, rowIndex)}
                    />
                </div>
            </>
        );
    }

    function propertyDetail(cell, row, rowIndex, formatExtraData) {
        return (
            <>
                {checkPermissions("property_view") ?
                    <NavLink className="ps-0" tag={RRNavLink} to={`/property/${encodeURIComponent(row.id)}/general`}>
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

    function hotelName(cell, row, rowIndex, formatExtraData) {
        return (
            <>
                <NavLink className="ps-0" tag={RRNavLink} to={`/hotel/${encodeURIComponent(row.hotel.id)}/general`}>
                    <span className="d-sm-block">  {row.hotel.name}</span>
                </NavLink>
            </>
        );
    }

    const deleteItem = async (id, index) => {
        if (inProgress) {
            return false
        } else {
            setDeleteIndex(index)
            try {
                setInProgress(true);
                deleteEntry(id, 'properties')
                    .then(response => response.json())
                    .then(response => {
                        if (response.success) {
                            setInProgress(false);
                            let list = [...state.data];
                            if (list && list.length > 0) {
                                list.splice(deleteIndex, 1);
                                setProperty(list)
                                setState({data: list})
                                setTotalProperty(totalProperty - 1)
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

    const delaySearch = useCallback(debounce(({page, sizePerPage, searchText, sortField, sortOrder}) => {
        getPropertyListFun(page, sizePerPage, searchText, sortField, sortOrder)
    }, 750));

    const handleTableChange = (type, {page, sizePerPage, sortField, sortOrder, searchText}) => {
        props.history.push(`property?page=${page}`)
        setIsSpinner(true)
        if (type === "search") {
            delaySearch({page, sizePerPage, searchText, sortField, sortOrder})
        } else {
            getPropertyListFun(page, sizePerPage, searchText, sortField, sortOrder)
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
                                            <h3 className="my-3">Property </h3>
                                        </Col>
                                        <Col className="col-sm-6 col-12">
                                            <div className="d-sm-block d-none float-sm-end">
                                                <div className="d-sm-flex my-3">
                                                    {checkPermissions("property_add") &&
                                                    <Link as={Link} to={`property/create`}
                                                          className="btn btn-primary me-2"><i
                                                        className="uil-file-plus font-size-18 me-1 text-white"/>Create</Link>
                                                    }
                                                </div>
                                            </div>
                                            <div className="d-sm-none d-block float-sm-end">
                                                <div className="d-flex mb-3">
                                                    {checkPermissions("property_add") &&
                                                    <Link className="btn btn-primary me-2" as={Link}
                                                          to={`property/create`}><i
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
                                        totalSize={totalProperty}
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
export default PropertyList
