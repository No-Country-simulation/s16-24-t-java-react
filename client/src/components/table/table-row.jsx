


function TableRow({ data }) {

  return (
    <tr className="text-center [&>td]:py-4 [&>td]:border-b [&>td]:border-primary-0">
      {Object.keys(data).map((key, index) => (
        <td key={key} className={`custom-td ${index === 0 ? 'first:border-l' : ''} ${index === Object.keys(data).length - 1 ? 'last:border-r' : ''}`}>
            {data[key]}
        </td>
      ))}
    </tr>
  )
}

export default TableRow

