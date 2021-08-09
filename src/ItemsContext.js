import React, { createContext, useState } from "react";
import { supabase } from "./supabaseClient";

// Initializing context
export const ItemsContext = createContext();

export function ItemsContextProvider({ children }) {
  const [activeItems, setActiveItems] = useState([]);
  const [inactiveItems, setInactiveItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);

  // Authentication function for logging in new/old user with supabase magic link
  const logInAccount = async (email) => {
    setLoading(true);
    try {
      // supabase method to send the magic link to the email provided
      const { error } = await supabase.auth.signIn({ email });

      if (error) throw error; //check if there was an error fetching the data and move the execution to the catch block

      alert("Check your email for your magic login link!");

    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Resets the session and logs out the current user
  const logOutAccount = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  // get all active items by the user
  const getActiveItems = async () => {
    setLoading(true);
    try {
      // get the user currently logged in
      const user = supabase.auth.user();

      const { error, data } = await supabase
        .from("todo") //the table you want to work with
        .select("item, done, id") //columns to select from the database
        .eq("userId", user?.id) //comparison function to return only data with the user id matching the current logged in user
        .eq("done", false) //check if the done column is equal to false
        .order("id", { ascending: false }); // sort the data so the last item comes on top;

      if (error) throw error; //check if there was an error fetching the data and move the execution to the catch block

      if (data) setActiveItems(data);

    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };


  // get all completed items by the user
  const getInactiveItems = async () => {
    setLoading(true);
    try {
      // get the user currently logged in
      const user = supabase.auth.user();

      const { error, data } = await supabase
        .from("todo") //the table you want to work with
        .select("item, done, id") //columns to select from the database
        .eq("userId", user?.id) //comparison function to return only data with the user id matching the current logged in user
        .eq("done", true) //check if the done column is equal to true
        .order("id", { ascending: false }); // sort the data so the last item comes on top

      if (error) throw error; //check if there was an error fetching the data and move the execution to the catch block

      if (data) setInactiveItems(data);

    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  // delete row from the database
  const deleteItem = async (id) => {
    try {
      const user = supabase.auth.user();

      const { error } = await supabase
        .from("todo")
        .delete() //delete the row
        .eq("id", id) //the id of row to delete
        .eq("userId", user?.id) //check if the item being deleted belongs to the user

      if (error) throw error;

      await getInactiveItems(); //get the new completed items list
      await getActiveItems(); //get the new active items list
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };


  // add new row to the database
  const addItem = async (item) => {
    setAdding(true);
    try {
      const user = supabase.auth.user();

      const { error } = await supabase
        .from("todo")
        .insert({ item, userId: user?.id }); //insert an object with the key value pair, the key being the column on the table

      if (error) throw error;

      await getActiveItems(); //get the new active items list

    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setAdding(false);
    }
  };

  // update column(s) on the database
  const updateItem = async ({ item, id }) => {
    setLoading(true);
    try {
      const user = supabase.auth.user();

      const { error } = await supabase
        .from("todo")
        .update({ item })
        .eq("userId", user?.id)
        .eq("id", id); //matching id of row to update

      if (error) throw error;

      await getActiveItems();
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };


    // change value of done to true
  const markAsDone = async (id) => {
    setLoading(true);
    try {
      const user = supabase.auth.user();
      const { error } = await supabase
        .from("todo")
        .update({ done: true })
        .eq("userId", user?.id)
        .eq("id", id); //match id to toggle

      if (error) throw error;

      await getActiveItems();
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

      // change value of done to false
  const markActive = async (id) => {
    setLoading(true);
    try {
      const user = supabase.auth.user();
      const { error } = await supabase
        .from("todo")
        .update({ done: false })
        .eq("userId", user?.id)
        .eq("id", id); //match id of row to toggle

      if (error) throw error;

      await getInactiveItems();
      
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ItemsContext.Provider
      value={{
        activeItems,
        inactiveItems,
        loading,
        adding,
        logInAccount,
        logOutAccount,
        getActiveItems,
        getInactiveItems,
        deleteItem,
        addItem,
        updateItem,
        markAsDone,
        markActive,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
}
