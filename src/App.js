import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";
import { Route, Switch, useHistory, withRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { supabase } from "./supabaseClient";

function App() {
  const history = useHistory();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session === null) {
        history.replace("/login");
      } else {
        history.replace("/");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const NavbarWithRouter = withRouter((props) => <Navbar {...props} />);
  return (
    <>
      <NavbarWithRouter exact />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </>
  );
}

export default App;
