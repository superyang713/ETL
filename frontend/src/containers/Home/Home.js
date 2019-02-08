import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";

import "./Home.css";
import banner from "../../asset/banner.jpg";


class Home extends Component {
  renderMainContent = () => (
    <h1>You have logged in!</h1>
  )

  renderLander() {
    return (
      <div className="Home">
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
      </div>
    );
    
  }
  
  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderMainContent() : this.renderLander()}
      </div>
    );
  }
}

export default Home;
