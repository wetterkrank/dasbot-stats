import BTable from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { useTable, useSortBy } from 'react-table';

import { getChat, getChatScores } from "../../util/dasbot";
import Layout from "../../components/layout";
import Date from "../../components/date";


export default function chatDetails ({ chatInfo, chatScores }) {
  const scoresData = React.useMemo(
    () => chatScores, []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'Word',
        accessor: 'word',
      },
      {
        Header: 'Score',
        accessor: 'score',
      },
      {
        Header: 'Review due',
        accessor: 'revisit',
        Cell: ({ cell: { value} }) => Date({ dateString: value })
      },
    ], []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: scoresData }, useSortBy)

  return (
    <Layout>
      <Container className="my-4">

        <h2>Chat #{chatInfo.chat_id}</h2>
        <p>
          Last active: <Date dateString={chatInfo.last_seen}></Date>
          <br/>
          Subscribed: {chatInfo.subscribed ? 'yes' : 'no'}
        </p>

        <BTable striped bordered size="sm" {...getTableProps()}>
          <thead>
            {// Loop over the header rows
            headerGroups.map(headerGroup => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}>
                {// Loop over the headers in each row
                headerGroup.headers.map(column => (
                  // Apply the header cell props
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {// Render the header
                    column.render('Header')}
                    {/* Add a sort direction indicator */}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
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
  )
};

// Runs on the server-side on each request; must be async
export async function getServerSideProps({ params }) {
  const id = parseInt(params.id);
  const chatInfo = await getChat(id); // TODO: parallelize these
  const chatScores = await getChatScores(id);

  return {
    props: {
      chatInfo: JSON.parse(JSON.stringify(chatInfo[0])), 
      chatScores: JSON.parse(JSON.stringify(chatScores)),
    }
  };
}