import React, { useState } from "react";
import { Link } from "react-router-dom";

const Origin = () => {
  const [origin, setOrigin] = useState(null);

  const handleChange = (event) => {
    setOrigin(event.target.value.toUpperCase());
  };
  return (
    <div className="pageContent" id="landing">
      <section className="landingBody">
        <h1 id="originHeader">What's your departure location?</h1>
        <p className="inputInstructions">
          PLEASE USE AIRPORT CODE, i.e. CLT for CHARLOTTE
        </p>
        <input
          style={{
            border: "none",
            width: "125px",
            outline: "none",
            paddingLeft: "10px",
            borderBottom: "4px solid black",
            margin: "45px",
            fontFamily: "Heebo",
            fontSize: "36pt",
            fontWeight: "600",
            textAlign: "center",
            letterSpacing: "10px",
          }}
          type="text"
          value={origin}
          onChange={handleChange}
          placeholder="CLT"
          maxLength={3}
        />
        <Link to="/booking">
          <button className="buttonMain">Next</button>
        </Link>
      </section>
    </div>
  );
};

export default Origin;
