import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div>
      <nav className="navbar">
      <div className="logo">
        <h1>TWITTER</h1>
      </div>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/posts">Posts</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
    <video height="600" width="100%" controls>
        <source src={require("./Video/video.mp4")} type="video/mp4" />{" "}
      </video>
    </div>
  );
}