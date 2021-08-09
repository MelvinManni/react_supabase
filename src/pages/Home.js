import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ActiveList from "../components/ActiveList";
import DoneList from "../components/DoneList";
import { ItemsContext } from "../ItemsContext";
import { supabase } from "../supabaseClient";

export default function Home() {
  const [item, setItem] = useState("");
  const [tab, setTab] = useState("active");
  const { addItem, adding } = useContext(ItemsContext);
  const history = useHistory();

  useEffect(() => {
    if (supabase.auth.user() === null) {
      history.replace("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      await addItem(item);
      setItem("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-xs-12 col-lg-8">
          <div className="card-title text-center mb-3">
            <h4>Todo Items</h4>
          </div>
          <div className="card">
            <div className="card-header">
              <form onSubmit={handleAddItem} className="d-flex">
                <div className="col flex-auto">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="item"
                    required
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    placeholder="Enter new item"
                  />
                </div>
                <div>
                  <button disabled={adding} className="btn btn-primary btn-lg fit">
                    {adding ? "Adding.." : "Add +"}
                  </button>
                </div>
              </form>
            </div>

            <div className="card-body">
              <div className="d-flex mb-4">
                <div className="col flex-auto">
                  <button
                    onClick={() => setTab("active")}
                    className={`br-0 w-100 btn btn-${
                      tab === "active" ? "success" : "secondary"
                    }`}
                  >
                    Active
                  </button>
                </div>
                <div className="col flex-auto">
                  <button
                    onClick={() => setTab("inactive")}
                    className={`br-0 w-100 btn btn-${
                      tab === "inactive" ? "success" : "secondary"
                    }`}
                  >
                    Completed
                  </button>
                </div>
              </div>

              <div>{tab === "active" ? <ActiveList /> : <DoneList />}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
