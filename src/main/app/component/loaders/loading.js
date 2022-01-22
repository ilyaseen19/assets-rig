import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import Notifications from "../notifications";

export default function LoadingPage(props) {
  useEffect(() => {
    _move();
  }, []);

  const _move = () => {
    if (props.type === "loading") {
      props._fetchAll();
    }
  };

  if (props.loaded === "dashboard" || props.type === "dashboard") {
    return <Redirect to="/main/dashbaord" />;
  } else if (props.type === "loading") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div className="loader--roller theme_loder_1 mb_30">
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
          <span>Loading Data Please Wait....</span>
        </div>
        {props.notify ? (
          <Notifications
            type={props._type}
            message={props.message}
            onAction={props.close}
          />
        ) : (
          <span></span>
        )}
      </div>
    );
  } else if (props.move === "login" || props.type === "login") {
    return <Redirect to="/" />;
  }
}
