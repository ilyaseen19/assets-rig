import PageTitle from "../component/pageTitle";

export default function RepDetails(props) {
  const data = props.data;
  console.log(data);
  return (
    <div>
      <PageTitle title="View Report" goBack={props.onBack} />
      <div className="row ">
        <div className="col-12 QA_section">
          <div className="card QA_table ">
            <div className="card-header">
              Asset Serial Number: <strong>{data.SerialNumber}</strong>
              <span className="float-right">
                {" "}
                <strong>Created By:</strong> name
              </span>
            </div>
            <div className="card-body">
              <div className="row mb-4">
                <div className="col-sm-6">
                  <h6>
                    Serial Number: <strong>{data.SerialNumber}</strong>
                  </h6>
                  <h6 className="mb-3">
                    ASSET TYPE: <strong>{data.AssetType}</strong>
                  </h6>
                  <div>
                    <strong>Created By:</strong>
                  </div>
                  <h6>
                    <strong>{data.name}</strong>
                  </h6>
                  <div>Date:</div>
                  <div>
                    <strong>{data.date}</strong>
                  </div>
                </div>
                <div className="col-sm-6">
                  <h6 className="mb-3">Report:</h6>
                  <div>
                    <strong>Report Message:</strong>
                  </div>
                  <h6>
                    <strong>{data.message}</strong>
                  </h6>
                  <div>
                    <strong>Additional Notes:</strong>
                  </div>
                  <h6>
                    <strong>{data.note}</strong>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
