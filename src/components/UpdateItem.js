import React, { useContext } from "react";
import { ItemsContext } from "../ItemsContext";

export default function UpdateItem({ item, id, open, setOpen }) {
  const [newItem, setNewItem] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { updateItem } = useContext(ItemsContext);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateItem({ item: newItem, id });
    } catch (error) {
    } finally {
      setLoading(false);
      setNewItem("");
      setOpen(false);
    }
  };

  return (
    <>
      {open && (
        <div className="update-modal">
          <div className="col-12 col-md-6 col-xl-4">
            <div className="card">
              <div className="card-header d-flex justify-content-end">
                <button
                  onClick={() => {
                    setNewItem("");
                    setOpen(false);
                  }}
                  className="icon-btn text-danger"
                >
                  X
                </button>
              </div>
              <div className="card-body">
                <form onSubmit={handleUpdate}>
                  <div className="col w-100">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      name="item"
                      required
                      value={newItem || item}
                      onChange={(e) => setNewItem(e.target.value)}
                      placeholder="Enter new item"
                    />
                  </div>
                  <div>
                    <button
                      disabled={loading}
                      className="btn btn-primary w-100 mt-3"
                    >
                      {loading ? "Updating.." : "Update"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
