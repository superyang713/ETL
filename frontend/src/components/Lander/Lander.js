import React from "react";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";

import "./Lander.css";
import banner from  "../../asset/banner.jpg";


const Lander = () => (
    <div className="lander">
      <h1>ETL Project</h1>
      <p><i>English where Teaching and Learning are met</i></p>
      <Image src={banner} className="banner" rounded/>
      <div>
        <Link to="/login" className="btn btn-info btn-lg">
          Teacher
        </Link>
        <Link to="/login" className="btn btn-info btn-lg">
          Learner
        </Link>
      </div>
    </div>
);

export default Lander;
