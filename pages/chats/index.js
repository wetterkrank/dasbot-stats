import React from 'react';

import BTable from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTable } from 'react-table';

import Link from 'next/link';

import { getChatsList } from "../../util/dasbot";
import Layout from "../../components/layout";
import Date from "../../components/date";

export default function Chats({ chats }) {
  const data = React.useMemo(
    () => chats, []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'Chat ID',
        accessor: 'chat_id',
        Cell: ({ cell: { value} }) => 
          <Link href={`/chats/${value}`}>
            <a>{value}</a>
          </Link>
      },
      {
        Header: 'Last active',
        accessor: 'last_seen',
        Cell: ({ cell: { value} }) => Date({ dateString: value })
      },
      {
        Header: 'Subscribed?',
        accessor: 'subscribed',
        Cell: ({ cell: { value} }) => (value ? 'yes' : 'no')
      },
    ], []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data })

  return (
    <Layout>
      <Container className="mt-3">
        <h2>Dasbot users</h2>
        <BTable striped bordered size="sm" {...getTableProps()}>
          <thead>
            {// Loop over the header rows
            headerGroups.map(headerGroup => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}>
                {// Loop over the headers in each row
                headerGroup.headers.map(column => (
                  // Apply the header cell props
                  <th {...column.getHeaderProps()}>
                    {// Render the header
                    column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {/* Apply the table body props */}
          <tbody {...getTableBodyProps()}>
            {// Loop over the table rows
            rows.map(row => {
              // Prepare the row for display
              prepareRow(row)
              return (
                // Apply the row props
                <tr {...row.getRowProps()}>
                  {// Loop over the rows cells
                  row.cells.map(cell => {
                    // Apply the cell props
                    return (
                      <td {...cell.getCellProps()}>
                        {// Render the cell contents
                        cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </BTable>
      </Container>
    </Layout>
  );
}

export function getServerSideProps() {
  return getChatsList();
}
