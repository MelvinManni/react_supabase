import React, { useContext, useEffect } from "react";
import { ItemsContext } from "../ItemsContext";
import { supabase } from "../supabaseClient";
import TodoItem from "./TodoItem";
import UpdateItem from "./UpdateItem";

export default function ActiveList() {
  const { getActiveItems, activeItems, loading } = useContext(ItemsContext);
  const [openModal, setOpenModal] = React.useState(false);
  const [updateData, setUpdateData] = React.useState({
    item: "",
    id: null,
  });
  useEffect(() => {
    supabase.auth.user() !== null && getActiveItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {loading ? (
        "Loading..."
      ) : activeItems.length < 1 ? (
        <p className="text-center m-5"> Nothing to display ☹️ </p>
      ) : (
        activeItems.map((item, index) => (
          <TodoItem
            handleEdit={(prevValue) => {
              setOpenModal(true);
              setUpdateData({
                item: prevValue.item,
                id: prevValue.id,
              });
            }}
            data={item}
            key={index.toString()}
          />
        ))
      )}

      <UpdateItem
        open={openModal}
        setOpen={setOpenModal}
        item={updateData.item}
        id={updateData.id}
      />
    </div>
  );
}
