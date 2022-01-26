import PageTitle from "../component/pageTitle";

export default function Help(props) {
  return (
    <div>
      <PageTitle title="Help Page" />
      <div className="row">
        <div className="col-lg-12 card_height_100">
          <div className="white_card mb_20">
            <div className="white_card_body row">
              <div className="col-lg-12 card_height_100">
                <div className="white_card mb_20">
                  <div className="white_card_header centered">
                    <div className="box_header m-0">
                      <div className="main-title">
                        <h2 className="m-0">ASSETS MANAGEMENT SYSTEM</h2>
                        <h2 className="m-0">ASSETS-REG</h2>
                        <h3 className="m-0"> Record, Identify, Report</h3>
                      </div>
                    </div>
                  </div>
                  <div className="white_card_body centered">
                    <h2 className="m-0">REQUEST FOR ASSETS-REG</h2>
                    <h3>Form on the website</h3>
                    <span
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "50%",
                        justifyContent: "left",
                        alignItems: "flex-start",
                      }}
                    >
                      <span>The name of your company</span>
                      <span>What the ownership of your company</span>
                      <span>In which region is your company</span>
                      <span>In which district is your company</span>
                      <span>What is the name of the head of the company?</span>
                      <span>
                        What is the telephone number of the head of the company?
                      </span>
                    </span>
                    <p>----</p>
                    <span
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "50%",
                        justifyContent: "left",
                        alignItems: "flex-start",
                      }}
                    >
                      <span>Register your company's / institutions</span>
                      <span>Whats you name</span>
                      <span>Whats is your role at the company</span>
                      <span>
                        Your email address of the head of your company.
                      </span>
                      <span>Submit registration</span>
                    </span>
                    <p>----</p>
                    <h5>For your updates and downloads contact support team</h5>
                    <span>Email: alfuty09@gmail.com</span>
                    <span>Phone: 0547661420</span>
                    <span>Email: mubareeq@gmail.com</span>
                    <span>Phone: 0546920418</span>
                    <span>Website: -----</span>
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
