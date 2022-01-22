import Elipses from "./loaders/elipses";

export default function Notifications(props) {
  if (props.type === "warning") {
    return (
      <div className="alert alert-warning" role="alert">
        <div className="row">
          <div className="col-md-8">{props.message} ?</div>
          <div
            className="col-md-4"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <span
              className="ml-3"
              type="button"
              role="button"
              onClick={() => props.onAction("delete")}
            >
              Yes
            </span>
            <span
              className="ml-3"
              type="button"
              role="button"
              onClick={() => props.onAction("close")}
            >
              No
            </span>
          </div>
        </div>
      </div>
    );
  } else if (props.type === "danger") {
    return (
      <div className="alert alert-danger" role="alert">
        <div className="row">
          <div className="col-md-8">{props.message} ?</div>
          <div
            className="col-md-4"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <span
              className="ml-3"
              type="button"
              role="button"
              onClick={() => props.onAction("clicked")}
            >
              <i className="fa fa-times"></i>
            </span>
          </div>
        </div>
      </div>
    );
  } else if (props.type === "info_load") {
    return (
      <div className="alert alert-info" role="alert">
        <div className="row">
          <div className="col-md-8">{props.message}</div>
          <div
            className="col-md-4"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Elipses />
          </div>
        </div>
      </div>
    );
  } else if (props.type === "success") {
    return (
      <div className="alert alert-success" role="alert">
        <div className="row">
          <div className="col-md-8">{props.message}</div>
          <div
            className="col-md-4"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <span
              className="ml-3"
              type="button"
              role="button"
              onClick={props.onAction()}
            >
              <i className="fa fa-times"></i>
            </span>
          </div>
        </div>
      </div>
    );
  }
}
