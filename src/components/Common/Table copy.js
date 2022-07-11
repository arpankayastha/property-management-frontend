import React, { useEffect, useState } from "react"
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone, textFilter } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

const RemotePagination = ({ data, page, sizePerPage, onTableChange, totalSize, columns }) => {
  const { SearchBar } = Search;
  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      {" "}Showing {from} to {to} of {size} Results
    </span>
  );
  const options = {
    paginationSize: 4,
    pageStartIndex: 1,
    sizePerPage: 20,
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
    }, {
      text: 'All', value: totalSize
    }] // A numeric array is also available. the purpose of above example is custom the text
  };

  const expandRow = {
    renderer: row => <div>

        age: {row.id}

 
    </div>
};

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
                data={data}
                search
              >
                {toolkitprops => (
                  <div>
                    <SearchBar {...toolkitprops.searchProps} />
                    <BootstrapTable
                      remote
                      keyField="id"
                      onTableChange={onTableChange}
                      {...paginationTableProps}
                      {...toolkitprops.baseProps}
                      pagination={paginationFactory(options)}
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