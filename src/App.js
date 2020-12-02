import React from 'react';
import './index.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { withTranslation } from 'react-i18next';

import Drivers from "./components/drivers/Drivers";
import Routes from "./components/routes/Routes";
import DesignatedRoutes from "./components/routes/DesignatedRoutes";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from "./components/layouts/Navbar";
import AddRouteForm from "./components/routes/AddRouteForm";
import PrioritiesForm from "./components/routes/PrioritiesForm";
import AddDriverForm from "./components/drivers/AddDriverForm";
import RouteDriver from "./components/routes/RouteDriver";
import DesignatedRoute from "./components/routes/DesignatedRoute";
import Profile from "./components/main/Profile";
import LanguageSelection from "./components/layouts/LanguageSelection";
import EditDriverForm from "./components/drivers/EditDriverForm";

const ProfileComponent = withTranslation()(Profile)
const PrioritiesComponent = withTranslation()(PrioritiesForm)
const RouteDriverComponent = withTranslation()(RouteDriver)
const DesignatedRouteComponent = withTranslation()(DesignatedRoute)
const EditDriverComponent = withTranslation()(EditDriverForm)

function App() {
  return (
      <Provider store={ store }>
          <Router>
              <Navbar/>
              <LanguageSelection/>
              <div className="App">
                  <div className="container">
                      <Switch>
                        <Route exact path='/' component={Login}/>
                        <Route exact path='/sign-in' component={Login}/>
                        <Route exact path='/sign-up' component={Register}/>
                        <Route exact path='/driver/' component={AddDriverForm}/>
                        <Route exact path='/driver/:id' component={EditDriverComponent}/>
                        <Route exact path='/route/:id' component={AddRouteForm}/>
                        <Route exact path='/drivers' component={() => <Drivers url="http://127.0.0.1:8000/users/drivers/" />} />
                        <Route exact path='/routes' component={() => <Routes url="http://127.0.0.1:8000/routes/" />} />
                        <Route exact path='/designated-routes' component={() => <DesignatedRoutes url="http://127.0.0.1:8000/routes/designated/" />} />
                        <Route path='/priorities/:value' component={PrioritiesComponent}/>
                        <Route path='/route/:route_id/driver/:driver_id' component={RouteDriverComponent}/>
                        <Route path='/designated/:value' component={DesignatedRouteComponent}/>
                        <Route exact path='/profile' component={ProfileComponent}/>
                      </Switch>
                </div>
              </div>
          </Router>
      </Provider>
  );
}

export default App;
