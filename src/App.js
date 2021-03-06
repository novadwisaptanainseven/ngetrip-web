import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./scss/style.scss";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
// const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

class App extends Component {
  render() {
    return (
      <Router>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route
              exact
              path="/ngetrip/login"
              name="Login Page"
              render={(props) => <Login {...props} />}
            />
            {/* <Route exact path="/ngetrip/register" name="Register Page" render={props => <Register {...props}/>} /> */}
            <Route
              exact
              path="/ngetrip/404"
              name="Page 404"
              render={(props) => <Page404 {...props} />}
            />
            <Route
              exact
              path="/ngetrip/500"
              name="Page 500"
              render={(props) => <Page500 {...props} />}
            />
            <Route
              path="/ngetrip/admin"
              name="Home"
              render={(props) => <TheLayout {...props} />}
            />
            <Redirect from="/dashboard/" to="/ngetrip/404" />
            <Route component={Page404} />
            {/* <Redirect from="/ngetrip/admin/*" to="/ngetrip/admin/dashboard" /> */}
          </Switch>
        </React.Suspense>
      </Router>
    );
  }
}

export default App;
