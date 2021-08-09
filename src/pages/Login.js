import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ItemsContext } from "../ItemsContext";
import { supabase } from "../supabaseClient";

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const { loading, logInAccount } = useContext(ItemsContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    logInAccount(email);
  };

  useEffect(() => {
    if (supabase.auth.user() !== null) {
      history.replace("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className=" col-12 col-lg-6">
          <div className="card">
            <div className="card-header">
              <h5 className="text-center text-uppercase">Log In</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    required
                    className="form-control form-control-lg w-100 mt-1"
                  />
                  <div className="form-text">
                    Enter your email to get your magic link
                  </div>
                </div>
                <button disabled={loading} type="submit" className="btn btn-primary btn-lg w-100 ">
                  {loading ? "Loading..." : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
