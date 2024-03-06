import { Link } from "react-router-dom";
import "../stylesheets/Navbar.css";
import { useState } from "react";
import { useFetch } from "./useFetch";
import {ITodo} from './Todo'

const Navbar = () => {
  return (
    <div className="navbar">
      <h3>
        <Link to="/" id="nav-brand">
          Todo App
        </Link>
      </h3>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/add">Add Todo</Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar;
