import React from "react";
function Footer() {
  return (
    <div
      className="text-center"
      style={{
        backgroundColor: "black",
        position: "relative",
        bottom: "0px",
        width: "100%",
      }}
    >
      <div className="py-2">
        <h5 style={{ color: "white", fontSize: "15px" }}>
          {" "}
          Designed &amp; Developed by{" "}
          <span style={{ color: "aqua" }}>
            Centre for Development of Advanced Computing Center In North East (C-DAC CINE), Silchar, Assam, India.
          </span>
        </h5>
        <h5 style={{ color: "white", fontSize: "15px" }}>
          Government of Maharashtra. All Rights Reserved © {Date().slice(11, 15)}
        </h5>
      </div>
    </div>
  );
}

export default Footer;
