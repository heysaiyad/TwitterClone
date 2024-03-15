import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./css/home.css";
import Nav from "./Nav";

export default function Home() {
  return (
    <div>
      <Nav />
      <div className="img">
        <img src="https://www.simplilearn.com/ice9/free_resources_article_thumb/Importance_of_Social_Media_in_Todays_World.jpg" /> 
        <div className="centered-content">
          <h1 className="heading">Welcome to Our Social Media Site</h1>
          <p className="para">Connect, share, and grow with us.</p>
          <Link to="/registration" className="get-started-btn">Get Started</Link>
        </div>
      </div>
    </div>
  );
}