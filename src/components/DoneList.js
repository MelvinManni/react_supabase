import React, { useContext, useEffect } from "react";
import { ItemsContext } from "../ItemsContext";
import { supabase } from "../supabaseClient";
import TodoItem from "./TodoItem";

export default function DoneList() {
  const { getInactiveItems, inactiveItems, loading } = useContext(ItemsContext);

  useEffect(() => {
    supabase.auth.user() !== null && getInactiveItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {loading ? (
        "Loading..."
      ) : inactiveItems.length < 1 ? (
        <p className="text-center m-5"> Nothing to display ☹️ </p>
      ) : (
        inactiveItems.map((item, index) => (
          <TodoItem data={item} key={index.toString()} />
        ))
      )}
    </div>
  );
}
