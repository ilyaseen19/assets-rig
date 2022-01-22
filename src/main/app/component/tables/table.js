export default function Table(props) {
  const data = props.data;
  return (
    <div className="QA_table mb_30">
      {/* table-responsive */}
      <table className="table lms_table_active ">
        <thead>
          <tr>
            <th scope="col">Asset Type</th>
            <th scope="col">Serial Number</th>
            <th scope="col">Department</th>
            <th scope="col">Brand</th>
            <th scope="col">Condition</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0
            ? <tr>No data found</tr>
            : data.map((item) => {
                return (
                  <tr key={item._id}>
                    <th scope="row">
                      {" "}
                      <span
                        type="button"
                        role="button"
                        style={{ color: "Highlight" }}
                        className="question_content"
                        onClick={() => props.onClick(item)}
                      >
                        {" "}
                        {item.ASSETTYPE}
                      </span>
                    </th>
                    <td>{item.SERIALNUMBER}</td>
                    <td>{item.DEPARTMENT}</td>
                    <td>{item.BRAND}</td>
                    <td>{item.CONDITION}</td>
                    {item.STATUS === "ACTIVE" ? (
                      <td>
                        <span className="badge badge-pill badge-success">
                          Active
                        </span>
                      </td>
                    ) : (
                      <td>
                        <span className="badge badge-pill badge-danger">
                          In-Active
                        </span>
                      </td>
                    )}
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
}
