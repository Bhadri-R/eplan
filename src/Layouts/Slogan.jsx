import React from "react";
 

const Slogan = () => {
  return (
    <div className="slogan-container">
      <marquee behavior="scroll" direction="left">
        <span className="slogan-text">Smart Retirement Starts Here – Secure Your Future with ePlan!</span>
      </marquee>
    </div>
  );
};

export default Slogan;
