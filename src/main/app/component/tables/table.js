import { useState } from "react";
import Loaders from "../loaders/round";

export default function Table(props) {
  const [del, setDel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [markall, setMarkall] = useState(false);
  const [ids, setIds] = useState([]);

  const data = props.data;
  const assets = props.assets;

  const _handleChange = ({ id, value }) => {
    setDel(true);
    if (value) {
      ids.push(id);
      setIds(ids);
    } else {
      const itemIndex = ids.indexOf(id);
      ids.splice(itemIndex, 1);
      if (ids.length === 0) {
        setDel(false);
      }
    }
  };

  const _handleDel = async () => {
    setLoading(true);
    await props.del(ids);
    setLoading(false);
  };

  const _handleDelAll = async () => {
    setLoading(true);
    var delIds = [];
    await assets.forEach((item) => {
      delIds.push(item._id);
    });
    await props.del(delIds);
    setLoading(false);
  };

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
            {del ? (
              <th scope="col">
                {loading ? (
                  <Loaders loading={loading} />
                ) : (
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <i
                      className="fa fa-trash-alt mr-1"
                      type="button"
                      role="button"
                      onClick={() => _handleDel()}
                    ></i>
                  </span>
                )}
              </th>
            ) : (
              <th></th>
            )}
            {markall ? (
              <th scope="col">
                {loading ? (
                  <Loaders loading={loading} />
                ) : (
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <i
                      className="fa fa-trash-alt mr-1"
                      type="button"
                      role="button"
                      style={{ color: "red" }}
                      onClick={() => _handleDelAll()}
                    ></i>
                  </span>
                )}
              </th>
            ) : (
              <th></th>
            )}
            <th>
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setMarkall(true);
                    } else {
                      setMarkall(false);
                    }
                  }}
                />
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>No data found</tr>
          ) : (
            data.map((item) => {
              return (
                <tr key={item._id}>
                  <td scope="row">
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
                  </td>
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
                  <td>
                    {markall ? (
                      <input type="checkbox" checked={true} />
                    ) : (
                      <input
                        type="checkbox"
                        onChange={(e) =>
                          _handleChange({
                            id: item._id,
                            value: e.target.checked,
                          })
                        }
                      />
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
