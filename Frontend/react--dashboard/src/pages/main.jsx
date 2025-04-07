import React from "react";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <p>
        <Link to="/id/1">Click here to see brand 1</Link>
      </p>
      <p>
        <Link to="/id/2">Click here to see brand 2</Link>
      </p>
    </div>
  );
};

export default Main;
