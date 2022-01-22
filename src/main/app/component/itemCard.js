export default function ItemCard(props) {
  const data = props.data;

  const _clicked = (value) => {
    if (value === "users") {
      props.clicked(data);
    } else {
      props.clicked(data);
    }
  };

  const _renderTitle = () => {
    if (props.title === "users") {
      return data.FIRSTNAME + " " + data.LASTNAME;
    } else if (props.title === "departments") {
      return data.department;
    } else {
      return data.ASSETTYPE;
    }
  };

  return (
    <div className="col-md-3 mt-2">
      <div className="">
        <div className="board_card_list">
          <div className="card border-1">
            <div
              className="card-body"
              type="button"
              role="button"
              onClick={() => _clicked(props.title)}
            >
              <h5 className="f_s_16 f_w_500 mb-0">
                {_renderTitle()}
              </h5>
              <div className="row justify-content-center align-items-center">
                <div className="col-6 align-self-center">
                  <ul className="list-inline mb-0 d-flex align-items-center">
                    <li className="list-item d-inline-block mr-2">
                      <span className="d-flex align-items-center">
                        {props.title === "users" ? (
                          <span className="mr-2">Role:</span>
                        ) : (
                          <span className="mr-2">Quantity:</span>
                        )}
                        <span className="text-muted">
                          {props.title === "users"
                            ? data.ROLE
                            : data.assetCount}
                        </span>
                      </span>
                    </li>
                    <li className="list-item d-inline-block d-flex align-items-center" />
                  </ul>
                </div>
                {/*end col*/}
                <div className="col-6 align-self-center">
                  <span className="float-right">
                    {props.title === "users" ? (
                      <div className="thumb_34 ml-1 mt-0">
                        <i
                          className="fas fa-user-alt"
                          style={{ color: "Background", fontSize: 22 }}
                        ></i>
                      </div>
                    ) : (
                      <div className="thumb_34 ml-1 mt-0">
                        <i
                          className="fa fa-file-alt"
                          style={{ color: "Background", fontSize: 22 }}
                        ></i>
                      </div>
                    )}
                  </span>
                </div>
                {/*end col*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
