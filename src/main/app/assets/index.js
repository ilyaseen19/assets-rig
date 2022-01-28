import { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { PrintAllAssets } from "../funtions/prints/allAssets";
import { Redirect } from "react-router";
import PageTitle from "../component/pageTitle";
import Table from "../component/tables/table";
import AssetDetails from "../others/assetDetails";

export default function Assets(props) {
  const [tdata, setTData] = useState([]);
  const [selectedPage, setSelectedd] = useState(0);
  const [redirect, setRedirect] = useState("asset");
  const [data, setData] = useState({});

  const assets = props.assets;
  const loading = props.loading;
  const departments = props.departments;
  const user = props.user;
  const type = props.type;
  const msg = props.msg;
  const notify = props.notify;

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  let indexMin = selectedPage * 5;
  let indexMax = indexMin + 5;
  let paginatedArray =
    assets === null || assets === undefined
      ? []
      : assets.filter((x, index) => index >= indexMin && index < indexMax);

  // handling search
  const _handleSearch = (value) => {
    let newArr = [];
    if (value !== "") {
      assets.forEach((item) => {
        if (
          item.SERIALNUMBER.toLocaleUpperCase().includes(value.toUpperCase())
        ) {
          newArr.push(item);
        }
      });
      setTData(newArr);
    } else {
      setTData(paginatedArray);
    }
  };

  useEffect(() => {
    setTData(paginatedArray);
  }, []);

  // handling pagination
  const _handlePaginate = (value) => {
    if (value === "next") {
      setSelectedd(selectedPage + 1);
      setTData(paginatedArray);
    } else if (value === "prev") {
      setSelectedd(selectedPage - 1);
      setTData(paginatedArray);
    }
  };

  const _handleRowClick = (item) => {
    setData(item);
    setRedirect("asset_details");
  };

  const _handleBackClick = () => {
    setData({});
    setRedirect("asset");
  };

  const _handleEditAsset = async (data) => {
    const res = await props.onEditAsset(data);
    if (res) {
      setData({});
      setTData(paginatedArray);
      setRedirect("asset");
    }
  };

  const _handleDel = async (id) => {
    const res = await props.onDel(id);
    if (res) {
      setData({});
      setTData(paginatedArray);
      setRedirect("asset");
    }
  };

  const _handleAddRep = async (data) => {
    await props.onAddRep(data);
    setTData(paginatedArray);
    setRedirect("asset_details");
  };

  const _handleAssetsValue = () => {
    var res = 0;
    assets.forEach((item) => {
      res = res + parseInt(item.VALUE);
    });
    return res;
  };

  const _handleDelMany = async (ids) => {
    await props.delMany(ids);
  };

  if (redirect === "asset_details") {
    return (
      <AssetDetails
        data={data}
        goBack={_handleBackClick}
        loading={loading}
        departments={departments}
        onEditAsset={_handleEditAsset}
        onDelete={_handleDel}
        onAddRep={_handleAddRep}
        user={user}
        notify={notify}
        msg={msg}
        type={type}
        stopLoading={() => props.stopLoading()}
      />
    );
  } else if (redirect === "asset") {
    return (
      <div>
        <PageTitle
          title="Assets"
          createAsset={props.onCreate}
          getAssets={props.getAssets}
          onSettingsClicked={() => setRedirect("settings")}
        />
        <PrintAllAssets
          ref={componentRef}
          assets={assets}
          value={_handleAssetsValue}
        />
        <div className="row">
          <div className="col-lg-12 card_height_100">
            <div className="white_card mb_20">
              <div className="white_card_header">
                <div className="box_header m-0">
                  <div className="main-title">
                    <h3 className="m-0">List Of Assets </h3>
                  </div>
                  <div className="float-lg-right float-none sales_renew_btns justify-content-end">
                    <span
                      style={{
                        marginRight: "10px",
                      }}
                    >
                      ASSETS REG
                    </span>
                    <span
                      type="button"
                      role="button"
                      style={{
                        marginRight: "10px",
                      }}
                      onClick={handlePrint}
                    >
                      <i title="print all assets" className="fa fa-print"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div className="white_card_body">
                <div>
                  <div className="form-group mb-0">
                    <input
                      type="Search"
                      className="form-control"
                      name="inputSearch"
                      id="inputSearch"
                      placeholder="Search Assets by serial number"
                      onChange={(e) => _handleSearch(e.target.value)}
                    />
                  </div>
                </div>
                <Table
                  data={tdata}
                  assets={assets}
                  onClick={_handleRowClick}
                  del={_handleDelMany}
                />
                <div className="col-lg-12">
                  <div className="white_box mb_30">
                    <nav aria-label="Page navigation example">
                      <ul className="pagination justify-content-center">
                        {selectedPage >= 1 ? (
                          <li
                            className="page-item"
                            type="button"
                            role="button"
                            onClick={() => _handlePaginate("prev")}
                          >
                            <span className="page-link">Previous</span>
                          </li>
                        ) : (
                          <li className="page-item disabled">
                            <span className="page-link" aria-disabled="true">
                              Previous
                            </span>
                          </li>
                        )}
                        {tdata.length === 0 ? (
                          <li className="page-item disabled">
                            <span className="page-link" aria-disabled="true">
                              Next
                            </span>
                          </li>
                        ) : (
                          <li
                            className="page-item"
                            type="button"
                            role="button"
                            onClick={() => _handlePaginate("next")}
                          >
                            <span className="page-link">Next</span>
                          </li>
                        )}
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (redirect === "settings") {
    return <Redirect to="/main/settings" />;
  }
}
