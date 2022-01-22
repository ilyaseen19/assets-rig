import PageTitle from "../component/pageTitle";

export default function Faq(props) {
  return (
    <div>
      <PageTitle title="About" />
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
                        <h2 className="m-0">Assets-RIG</h2>
                        <h3 className="m-0">MOTTO: Record, Identify, Report</h3>
                      </div>
                    </div>
                  </div>
                  <div className="white_card_body centered">
                    <span
                      style={{
                        width: "70%",
                      }}
                    >
                      Assets-Reg is a new application that allows easy record
                      keeping of assets, the application seeks to tackle the
                      inefficiencies in records keeping and easy identification
                      of assets in an Institution/ Organization
                    </span>
                    <h3 className="mt-3">BENEFITS</h3>
                    <span
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "50%",
                        justifyContent: "left",
                        alignItems: "flex-start",
                      }}
                    >
                      <span>1.Improved Record Keeping</span>
                      <span>2.Report Generating of Assets</span>
                      <span>3.Worth's of Assets</span>
                      <span>4.Easy Identification of Assets</span>
                      <span>5.QRcode app</span>
                    </span>
                    <h3 className="mt-3">CURRENT VERSION</h3>
                    <span>ASSETS RIG BETA 0.0.1</span>
                    <p>-----</p>
                    <span>POWERED BY</span>
                    <h5>CODE LAB FIRM</h5>
                    <h6 >https://codelabfirm.netlify.app</h6>
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
