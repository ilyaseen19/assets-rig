import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import ItemCard from "../component/itemCard";
import PageTitle from "../component/pageTitle";
import DepartDetails from "../others/departDetails";

export default function Departments(props) {
  const [mredirect, setmRedirect] = useState("departments");
  const [redirect, setRedirect] = useState(false);
  const [assets, setAssets] = useState([]);
  const [asset, setAsset] = useState({});

  const data = props.assets;

  useEffect(() => {
    group();
  }, []);

  const group = () => {
    let newArr = [];
    data.forEach((item) => {
      if (newArr.some((e) => e.department === item.DEPARTMENT)) {
        newArr.map((e) => {
          if (e.department === item.DEPARTMENT) {
            e.assetCount += 1;
            e.assets.push(item);
          }
        });
      } else {
        newArr.push({
          department: item.DEPARTMENT,
          assetCount: 1,
          assets: [item],
        });
      }
    });
    setAssets(newArr);
  };

  const _clicked = (data) => {
    setAsset(data);
    setRedirect(true);
  };

  if (mredirect === "departments") {
    return (
      <div>
        <PageTitle
          title="Departments"
          createAsset={props.onCreate}
          onSettingsClicked={() => setmRedirect("settings")}
        />
        <div className="row">
          <div className="col-lg-12 card_height_100">
            <div className="white_card mb_20">
              {redirect ? (
                <div className="white_card_body">
                  <DepartDetails
                    data={asset}
                    onBack={() => setRedirect(false)}
                  />
                </div>
              ) : (
                <div className="white_card_body">
                  <div className="row">
                    {assets.length === 0 ? (
                      <span>No Data Found</span>
                    ) : (
                      assets.map((item, index) => {
                        return (
                          <ItemCard
                            clicked={_clicked}
                            title="departments"
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
