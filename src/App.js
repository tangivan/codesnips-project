import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import Signup from "./pages/Signup";
import "./styles/tailwind.css";

const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/Signup"));

function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading ...</p>}>
        <Switch>
          <Route path={ROUTES.LOGIN} component={Login} />
          <Route path={ROUTES.SIGN_UP} component={SignUp} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
