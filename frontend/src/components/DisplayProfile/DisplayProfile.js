import React from "react";
import { Image } from "react-bootstrap";


const DisplayProfile = props => (
  <div>
    <p>{props.user.firstName}</p>
    <p>{props.user.role}</p>
    <Image src={props.matchImage} rounded/>
  </div>
);

export default DisplayProfile;
