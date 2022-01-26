import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import ItemCard from "../component/itemCard";
import PageTitle from "../component/pageTitle";
import InvDetails from "../others/invDetails";

export default function Inventory(props) {
  const [ndata, setData] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [mredirect, setmRedirect] = useState("inventory");
  const [data, setdata] = useState({});

  const assets = props.assets;

  useEffect(() => {
    group();
  }, []);

  // handling sorting
  const group = () => {
    let newArr = [];
    assets.forEach((item) => {
      if (newArr.some((e) => e.ASSETTYPE === item.ASSETTYPE.split("-")[0])) {
        newArr.map((e) => {
          if (e.ASSETTYPE === item.ASSETTYPE.split("-")[0]) {
            e.assetCount += 1;
            let v = parseInt(e.value);
            let V = parseInt(item.VALUE);
            e.value = v + V;
            if (item.STATUS === "ACTIVE") {
              e.active += 1;
            } else if (item.STATUS === "IN-ACTIVE") {
              e.inActive += 1;
            }
          }
        });
      } else {
        newArr.push({
          ASSETTYPE: item.ASSETTYPE.split("-")[0],
          assetCount: 1,
          active: item.STATUS === "ACTIVE" ? 1 : 0,
          inActive: item.STATUS === "IN-ACTIVE" ? 1 : 0,
          value: item.VALUE,
        });
      }
    });
    setData(newArr);
  };

  // handling search
  const _handleSearch = (value) => {
    let newArr = [];
    if (value !== "") {
      ndata.forEach((item) => {
        if (item.ASSETTYPE.toLocaleUpperCase().includes(value.toUpperCase())) {
          newArr.push(item);
        }
      });
      setData(newArr);
    } else {
      group();
    }
  };
  // handling redirect
  const _clicked = (data) => {
    setdata(data);
    setRedirect(true);
  };

  const _handleBack = () => {
    setdata({});
    setRedirect(false);
  };

  if (mredirect === "inventory") {
    return (
      <div>
        <PageTitle
          title="Inventory"
          createAsset={props.onCreate}
          getAssets={props.getAssets}
          onSettingsClicked={() => setmRedirect("settings")}
        />
        <div className="row">
          <div className="col-lg-12 card_height_100">
            <div className="white_card mb_20">
              {redirect ? (
                <div className="white_card_body">
                  <InvDetails data={data} onBack={_handleBack} />
                </div>
              ) : (
                <div className="white_card_body">
                  <div>
                    <div className="form-group mb-0">
                      <input
                        type="Search"
                        className="form-control"
                        name="inputSearch"
                        id="inputSearch"
                        placeholder="Find Asset by name"
                        onChange={(e) => _handleSearch(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    {ndata.length === 0 ? (
                      <span>No Data Found</span>
                    ) : (
                      ndata.map((item, index) => {
                        return (
                          <ItemCard
                            clicked={_clicked}
                            title="inventory"
                            data={item}
                            key={index}
                          />
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Redirect to="/main/settings" />;
  }
}
