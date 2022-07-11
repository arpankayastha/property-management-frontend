import React, { useEffect, useState } from "react"
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone, textFilter } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import overlayFactory from 'react-bootstrap-table2-overlay';

const RemotePagination = ({ data, page, sizePerPage, onTableChange, dropup, totalSize, columns, noDataIndication, loading, isPagination = true, isSearch = true, }) => {
// console.log("loading=",loading?1:0)
  const [myload, setMyload] = useState(false);

  const { SearchBar } = Search;
  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      {" "}Showing {from} to {to} of {size} Results
    </span>
  );
  const options = {
    paginationSize: 4,
    pageStartIndex: 1,
    sizePerPage: sizePerPage,

    page: page,
    // alwaysShowAllBtns: true, // Always show next and previous button
    // withFirstAndLast: false, // Hide the going to First and Last page button
    // hideSizePerPage: true, // Hide the sizePerPage dropdown always
    // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    firstPageText: 'First',
    prePageText: 'Back',
    nextPageText: 'Next',
    lastPageText: 'Last',
    nextPageTitle: 'First page',
    prePageTitle: 'Pre page',
    firstPageTitle: 'Next page',
    lastPageTitle: 'Last page',
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    totalSize: totalSize,
    sizePerPageList: [{
      text: '20', value: 20
    }, {
      text: '30', value: 30
    },
    {
      text: '50', value: 50
    },
    {
      text: '100', value: 100
    }
      // , {
      //   text: 'All', value: totalSize
      // }
    ] // A numeric array is also available. the purpose of above example is custom the text
  };

  // const mySearchFunc = (callback) => {
  //   setMyload(callback);
  // }

  return (
    <div>
      <PaginationProvider
        pagination={
          paginationFactory({
            custom: true,
            page,
            sizePerPage,
            totalSize
          })
        }
      >
        {
          ({
            paginationTableProps
          }) => (
            <div>
                  <ToolkitProvider
                    keyField="id"
                    columns={columns}
                    data={ loading ? [] : data}
                    search
                  >
                    {toolkitprops => (
                      <div>
                        {/* <SearchBar {...toolkitprops.searchProps} /> */}

                        {isSearch && <MySearch  {...toolkitprops.searchProps} />}                        
                        <BootstrapTable
                          striped bordered hover
                          noDataIndication={loading ? 'Loading...' : noDataIndication}
                          // loading={loading}
                          overlay={overlayFactory()}
                          remote
                          keyField="id"
                          onTableChange={onTableChange}
                          {...paginationTableProps}
                          {...toolkitprops.baseProps}
                          {...(isPagination && { pagination: paginationFactory(options) })}
                          wrapperClasses="table-responsive"
                        />

                      </div>
                    )}
                  </ToolkitProvider>
            </div>
          )
        }
      </PaginationProvider>
    </div>
  )
}

export default RemotePagination


const MySearch = (props) => {
  let input;
  const handleClick = (event) => {
    const { value } = event.target;
    props.onSearch(value);

    // setTimeout(() => {
    //   props.mysearch(false);
    // }, 3000);
    // props.mysearch(true);
  };


  return (
    <label>
      <input
        className="form-control"
        ref={n => input = n}
        onChange={handleClick}
        type="text"
        placeholder="Search"
      />
    </label>
  );
};