import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./images/logo_name1.png";
import dashIcon from "./images/img/menu-icon/dashboard.svg";
import assetIcon from "./images/img/menu-icon/3.svg";
import invIcon from "./images/img/menu-icon/4.svg";
import depIcon from "./images/img/menu-icon/11.svg";
import repIcon from "./images/img/menu-icon/5.svg";
import setIcon from "./images/img/menu-icon/6.svg";
import hlpIcon from "./images/img/menu-icon/9.svg";
import abtIcon from "./images/img/menu-icon/12.svg";

export default function Aside(props) {
  const [actDash, setDash] = useState("mm-active");
  const [ass, setAss] = useState("");
  const [inv, setInv] = useState("");
  const [rep, setRep] = useState("");
  const [dep, setDep] = useState("");
  const [sett, setSett] = useState("");
  const [faq, setFaq] = useState("");
  const [hlp, setHelp] = useState("");

  const toggle = (check) => {
    switch (check) {
      case "dash":
        setDash("mm-active");
        setAss("");
        setInv("");
        setDep("");
        setRep("");
        setSett("");
        setFaq("");
        setHelp("");
        break;
      case "ass":
        setDash("");
        setAss("mm-active");
        setInv("");
        setDep("");
        setRep("");
        setSett("");
        setFaq("");
        setHelp("");
        break;
      case "inv":
        setDash("");
        setAss("");
        setInv("mm-active");
        setDep("");
        setRep("");
        setSett("");
        setFaq("");
        setHelp("");
        break;
      case "dep":
        setDash("");
        setAss("");
        setInv("");
        setDep("mm-active");
        setRep("");
        setSett("");
        setFaq("");
        setHelp("");
        break;
      case "rep":
        setDash("");
        setAss("");
        setInv("");
        setDep("");
        setRep("mm-active");
        setSett("");
        setFaq("");
        setHelp("");
        break;
      case "set":
        setDash("");
        setAss("");
        setInv("");
        setDep("");
        setRep("");
        setSett("mm-active");
        setFaq("");
        setHelp("");
        break;
      case "faq":
        setDash("");
        setAss("");
        setInv("");
        setDep("");
        setRep("");
        setSett("");
        setFaq("mm-active");
        setHelp("");
        break;
      case "hlp":
        setDash("");
        setAss("");
        setInv("");
        setDep("");
        setRep("");
        setSett("");
        setFaq("");
        setHelp("mm-active");
        break;

      default:
        break;
    }
  };

  return (
    <nav className="sidebar vertical-scroll dark_sidebar ps-container ps-theme-default ps-active-y">
      <div className="logo d-flex justify-content-between">
        <span>
          <img src={logo} alt="logo" height={45} />
        </span>
      </div>
      <ul id="sidebar_menu">
        <li className={actDash}>
          <Link
            to="/main/dashbaord"
            className="has-arrow row"
            style={{
              width: "100%",
              justifyContent: "left",
              alignItems: "center",
              color: "white",
              marginLeft: 50,
              marginBottom: 20,
            }}
            aria-expanded="false"
            type="button"
            role="button"
            onClick={() => toggle("dash")}
          >
            <div className="icon_menu" style={{ marginRight: 10 }}>
              <img src={dashIcon} alt="logo" />
            </div>
            <span style={{ marginTop: 5 }}>Dashboard</span>
          </Link>
        </li>
        <li className={ass}>
          <Link
            to="/main/assets"
            className="has-arrow row"
            aria-expanded="false"
            style={{
              width: "100%",
              justifyContent: "left",
              alignItems: "center",
              color: "white",
              marginLeft: 50,
              marginBottom: 20,
            }}
            type="button"
            role="button"
            onClick={() => toggle("ass")}
          >
            <div className="icon_menu" style={{ marginRight: 10 }}>
              <img src={assetIcon} alt="logo" />
            </div>
            <span style={{ marginTop: 5 }}>Assets</span>
          </Link>
        </li>
        <li className={inv}>
          <Link
            to="/main/inventory"
            className="has-arrow row"
            aria-expanded="false"
            style={{
              width: "100%",
              justifyContent: "left",
              alignItems: "center",
              color: "white",
              marginLeft: 50,
              marginBottom: 20,
            }}
            type="button"
            role="button"
            onClick={() => toggle("inv")}
          >
            <div className="icon_menu" style={{ marginRight: 10 }}>
              <img src={invIcon} alt="logo" />
            </div>
            <span style={{ marginTop: 5 }}>Inventory</span>
          </Link>
        </li>
        <li className={dep}>
          <Link
            to="/main/departments"
            className="has-arrow row"
            aria-expanded="false"
            style={{
              width: "100%",
              justifyContent: "left",
              alignItems: "center",
              color: "white",
              marginLeft: 50,
              marginBottom: 20,
            }}
            type="button"
            role="button"
            onClick={() => toggle("dep")}
          >
            <div className="icon_menu" style={{ marginRight: 10 }}>
              <img src={depIcon} alt="logo" />
            </div>
            <span style={{ marginTop: 5 }}>Departments</span>
          </Link>
        </li>
        <li className={rep}>
          <Link
            to="/main/reports"
            className="has-arrow row"
            aria-expanded="false"
            style={{
              width: "100%",
              justifyContent: "left",
              alignItems: "center",
              color: "white",
              marginLeft: 50,
              marginBottom: 20,
            }}
            type="button"
            role="button"
            onClick={() => toggle("rep")}
          >
            <div className="icon_menu" style={{ marginRight: 10 }}>
              <img src={repIcon} alt="logo" />
            </div>
            <span style={{ marginTop: 5 }}>Reports</span>
          </Link>
        </li>
        <li className={sett}>
          <Link
            to="/main/settings"
            className="has-arrow row"
            aria-expanded="false"
            style={{
              width: "100%",
              justifyContent: "left",
              alignItems: "center",
              color: "white",
              marginLeft: 50,
              marginBottom: 20,
            }}
            type="button"
            role="button"
            onClick={() => toggle("set")}
          >
            <div className="icon_menu" style={{ marginRight: 10 }}>
              <img src={setIcon} alt="logo" />
            </div>
            <span style={{ marginTop: 5 }}>Settings</span>
          </Link>
        </li>
        <li className={hlp}>
          <Link
            to="/main/help"
            className="has-arrow row"
            aria-expanded="false"
            style={{
              width: "100%",
              justifyContent: "left",
              alignItems: "center",
              color: "white",
              marginLeft: 50,
              marginBottom: 20,
            }}
            type="button"
            role="button"
            onClick={() => toggle("hlp")}
          >
            <div className="icon_menu" style={{ marginRight: 10 }}>
              <img src={hlpIcon} alt="logo" />
            </div>
            <span style={{ marginTop: 5 }}>Help</span>
          </Link>
        </li>
        <li className={faq}>
          <Link
            to="/main/faq"
            className="has-arrow row"
            aria-expanded="false"
            style={{
              width: "100%",
              justifyContent: "left",
              alignItems: "center",
              color: "white",
              marginLeft: 50,
              marginBottom: 20,
            }}
            type="button"
            role="button"
            onClick={() => toggle("faq")}
          >
            <div className="icon_menu" style={{ marginRight: 10 }}>
              <img src={abtIcon} alt="logo" />
            </div>
            <span style={{ marginTop: 5 }}>About</span>
          </Link>
        </li>
      </ul>
      <span
        style={{
          display: "flex",
          width: "100%",
          paddingLeft: "30px",
          marginTop: "30px",
          flexDirection: "column",
        }}
      >
        <span
          style={{
            display: "flex",
            width: "100%",
            color: "GrayText",
            fontSize: 18,
            alignItems: "center",
            borderTop: "solid",
            borderColor: "grey",
            borderWidth: 1,
            marginRight: "10px",
            paddingLeft: "15px",
            paddingTop: "5px",
          }}
        >
          <a href="index.html">
            <i className="fa fa-sign-out-alt mr-1"></i>
            log out
          </a>
        </span>
        <span
          style={{
            marginTop: "10px",
            color: "GrayText",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            fontSize: 10,
          }}
        >
          <span>ASSETS REG MANAGEMENT SOFTWARE</span>
          <span>BETA VERSION 0.0.1</span>
        </span>
      </span>
    </nav>
  );
}
