import { Link } from "react-router-dom";

export default function TopBar() {
  return (
    <div>
      <div className="container-fluid no-gutters">
        <div className="row">
          <div className="col-lg-12 p-0 ">
            <div className="header_iner d-flex justify-content-between align-items-center">
              <div className="sidebar_icon d-lg-none">
                <i className="ti-menu" />
              </div>
              <div className="serach_field-area d-flex align-items-center" />
              <div className="header_right d-flex justify-content-between align-items-center">
                <div className="header_notification_warp d-flex align-items-center" />
                <div className="profile_info">
                  <img src="../assets/img/client_img.png" alt="#" />
                  <div className="profile_info_iner">
                    <div className="profile_author_name">
                      <p>Admin </p>
                      <h5>Dr. Robar Smith</h5>
                    </div>
                    <div className="profile_info_details">
                      <a href="#">My Profile </a>
                      <a href="#">Settings</a>
                      <span type="button" role="button">
                        <Link to="/">Log Out</Link>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
