import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Badge } from "react-bootstrap";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCard } from "./ContextReducer";


export default function Navbar() {
  let data = useCard();
  const [cartView, setCartView] = useState(false)
  const navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem("authToken");
    navigate("/login")
  }



  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid navbar-dark bg-success">
          <Link
            className="navbar-brand fs-1 fst-italic navbar-dark bg-success"
            to="/"
          >
            Gofood
          </Link>
          <div
            className="collapse navbar-collapse navbar-dark bg-success"
            id="navbarNav"
          >
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item bg-success ">
                <Link
                  className="nav-link active navbar-dark bg-success fs-5 mt-2"
                  aria-current="page"
                  to="/">Home
                </Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <li className="nav-item bg-success ">
                  <Link
                    className="nav-link active navbar-dark bg-success fs-5 mt-2"
                    aria-current="page" to="/myOrder">
                    My orders
                  </Link>
                </li>
              ) : (
                " "
              )}
            </ul>

            {!localStorage.getItem("authToken") ? (
              <div className="d-flex bg-success me-3 ">
                <Link className="btn bg-white text-success me-4" to="/login">
                  Login
                </Link>
                <Link className="btn bg-white text-success" to="/CreateUser">
                  Signup
                </Link>
              </div>
            ) : (
              <div className="bg-success">
                <div className="btn bg-white text-success mx-2" onClick={()=>setCartView(true)}>
                  My Cart {" "}
                  <Badge pill bg="danger text-white"> {data.length} </Badge>
                </div>

                {cartView? <Modal onClose={()=>setCartView(false)}>
                  <Cart/>
                </Modal> : null}
                <div className="btn bg-white text-danger mx-2 " onClick={handleLogout}>Logout</div>

              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
