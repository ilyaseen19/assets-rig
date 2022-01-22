export default function PrintTable(props) {
  const data = props.data;
  return (
    <div className="QA_table mb_30">
      {/* table-responsive */}
      <table className="table lms_table_active ">
        <thead>
          <tr>
            <th scope="col">ASSET TYPE</th>
            <th scope="col">SERIAL NUMBER</th>
            <th scope="col">DEPARTMENT</th>
            <th scope="col">BRAND</th>
            <th scope="col">CONDITION</th>
            <th scope="col">D/P</th>
            <th scope="col">VALUE</th>
            <th scope="col">DATE</th>
          </tr>
        </thead>
        <tbody>
          {data === undefined || data === null ? (
            []
          ) : data.length === 0 ? (
            <tr>No data found</tr>
          ) : data === undefined || data === null ? (
            []
          ) : (
            data.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item.ASSETTYPE}</td>
                  <td>{item.SERIALNUMBER}</td>
                  <td>{item.DEPARTMENT}</td>
                  <td>{item.BRAND}</td>
                  <td>{item.CONDITION}</td>
                  <td>{item.DONATEDORPURCHASED}</td>
                  <td>{item.VALUE}</td>
                  <td>{item.DATEOFPURCHASEORDONATED}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
