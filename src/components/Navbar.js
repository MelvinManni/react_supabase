import React, { useContext } from "react";
import { ItemsContext } from "../ItemsContext";

export default function Navbar({location}) {
  const { logOutAccount } = useContext(ItemsContext);
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div>
          <p className="navbar-brand">Todo App</p>
        </div>
        {location.pathname !== "/login" && (
          <div>
            <button onClick={logOutAccount} className=" btn btn-primary fit">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
