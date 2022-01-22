import { useState } from "react";
import ItemCard from "../component/itemCard";
import PageTitle from "../component/pageTitle";
import AddUser from "./addUser";
import Details from "./details";

export default function Users(props) {
  const [user, setUser] = useState({});

  const users = props.data;
  const notify = props.notify;
  const msg = props.message;
  const type = props.type;
  const loading = props.loading;

  const _clicked = (data) => {
    props.move("details");
    setUser(data);
  };

  const _return = () => {
    props.move("users");
    setUser({});
  };

  const _handleBack = () => {
    props.back();
  };

  const __addUser = () => {
    props.move("addUser");
  };

  const _handleUserBack = () => {
    props.move("users");
  };

  const _handleClose = () => {
    props.onClose();
  };

  const _handleAddUser = async (data) => {
    props.addUsers(data);
  };

  const _handleDelete = (_id) => {
    props.delete(_id);
  };

  const _handleEditUser = (data) => {
    props.editUser(data);
  };

  const _handleChangeState = () => {
    props.onChangeState()
  }

  if (props.redirect === "details") {
    return (
      <Details
        user={user}
        back={_return}
        delete={_handleDelete}
        notify={notify}
        type={type}
        message={msg}
        loading={loading}
        editUser={_handleEditUser}
        changeState={_handleChangeState}
        stopLoading={() => props.stopLoading()}
      />
    );
  } else if (props.redirect === "users") {
    return (
      <div>
        <PageTitle title="Users" goBack={_handleBack} addUser={__addUser} />
        <div className="row">
          <div className="col-lg-12 card_height_100">
            <div className="white_card mb_20">
              <div className="white_card_body row">
                {users.length === 0 ? (
                  <span
                    style={{
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    No data found!
                  </span>
                ) : (
                  users.map((user, index) => {
                    return (
                      <ItemCard
                        clicked={_clicked}
                        title="users"
                        data={user}
                        key={index}
                      />
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (props.redirect === "addUser") {
    return (
      <AddUser
        back={_handleUserBack}
        onSaveUser={_handleAddUser}
        notify={notify}
        msg={msg}
        type={type}
        loading={loading}
        close={_handleClose}
      />
    );
  }
}
