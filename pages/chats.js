import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useTable } from 'react-table';

import { getChatsList } from "../util/dasbot";
import Date from "../components/date";

export default function Chats({ chats }) {
  const Styles = styled.div`
    padding: 1rem;

    table {
      border-spacing: 0;
      border: 1px solid black;

      tr {
        :last-child {
          td {
            border-bottom: 0;
          }
        }
      }

      th,
      td {
        margin: 0;
        padding: 0.5rem;
        border-bottom: 1px solid black;
        border-right: 1px solid black;

        :last-child {
          border-right: 0;
        }
      }
    }
  `

  const data = React.useMemo(
    () => chats, []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'Chat ID',
        accessor: 'chat_id',
        Cell: ({ cell: { value} }) => 
          <Link href={`chats/${value}`}>
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
    <div>
      <h1>Dasbot users</h1>
      <Styles>
        <table {...getTableProps()}>
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
        </table>
      </Styles>
    </div>
  );
}

export function getServerSideProps() {
  return getChatsList();
}
