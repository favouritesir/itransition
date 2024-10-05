import React, { useState, useEffect, useMemo } from "react";
import { useTable, usePagination, useGlobalFilter, useRowSelect } from "react-table";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'; // Custom CSS file

// Define table columns
const COLUMNS = [
  {
    Header: '',
    accessor:'select',
    Cell: ({ row }) => (
      <input type="checkbox" {...row.getToggleRowSelectedProps()} />
    ),
  },
  { Header: 'Name', accessor: 'name' },
  { Header: 'Position', accessor: 'position' },
  { Header: 'e-Mail', accessor: 'email' },
  { Header: 'Last Login', accessor: 'lastLogin' },
  { Header: 'Status', accessor: 'status' }
];

// Global search filter component
const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <div className="search-bar">
      <input
        className="form-control"
        value={filter || ""}
        onChange={e => setFilter(e.target.value)}
        placeholder="Search here..."
      />
    </div>
  );
};

// Main Table component
const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state,
    selectedFlatRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    usePagination,
    useRowSelect
  );

  const { globalFilter } = state;

  // Handle bulk selection (header checkbox)
  const handleSelectAll = e => {
    if (e.target.checked) {
      page.forEach(row => row.toggleRowSelected(true));
    } else {
      page.forEach(row => row.toggleRowSelected(false));
    }
  };

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <div className="table-responsive">
        <table className="table table-striped table-bordered mt-3" {...getTableProps()}>
          <thead className="table-header">
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                    {column.Header === "" && (
                      <input type="checkbox" onChange={handleSelectAll} />
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Display selected rows for demo purposes */}
      <pre>
        <code>{JSON.stringify(selectedFlatRows.map(row => row.original), null, 2)}</code>
      </pre>
    </>
  );
};

// Main UserRegistry component
const UserRegistry = () => {
  const [tableData, setTableData] = useState([]);

  // Fetch data from server (hardcoded for example)
  useEffect(() => {
    const fetchData = async () => {
      const data = [
        { name: "Giacomo Guillizzoni", position: "CEO", email: "g.gulli@gmail.com", lastLogin: "12:10:07, 2 Oct, 2023", status: "Blocked" },
        { name: "John Lennon", position: "Musician", email: "john@imagine.com", lastLogin: "12:51:24, 2 Nov, 2022", status: "Active" },
        { name: "Mal Reynolds", position: "Captain", email: "firefly@serenity.com", lastLogin: "23:47:00, 14 Nov, 2022", status: "Active" },
        { name: "Marco Botton", position: "Office manager", email: "m.botton@gmail.com", lastLogin: "5:47:12, 4 Nov, 2022", status: "Active" },
        { name: "Mariah Maclachlan", position: "CIO", email: "m.mac@yahoo.com", lastLogin: "5:47:12, 14 Nov, 2022", status: "Active" },
        { name: "Valerie Liberty", position: "Cool Manager", email: "cool.v@gmail.com", lastLogin: "17:12:12, 1 Apr, 2021", status: "Blocked" }
      ];
      setTableData(data);
    };

    fetchData();
  }, []);

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => tableData, [tableData]);

  return (
    <div className="container mt-4">
      <h2>User Registry</h2>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default UserRegistry;
