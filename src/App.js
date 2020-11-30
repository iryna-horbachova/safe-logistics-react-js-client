import React from 'react';
import './index.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "./redux/store";


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

function App() {
  return (
      <Provider store={ store }>
          <Router>
              <Navbar />
              <div className="App">
                  <div className="container">
                      <Switch>
                        <Route exact path='/' component={Login}/>
                        <Route exact path='/sign-in' component={Login}/>
                        <Route exact path='/sign-up' component={Register}/>
                        <Route exact path='/add-driver' component={AddDriverForm}/>
                        <Route exact path='/add-route' component={AddRouteForm}/>
                        <Route exact path='/drivers' component={() => <Drivers url="http://127.0.0.1:8000/users/drivers/" />} />
                        <Route exact path='/routes' component={() => <Routes url="http://127.0.0.1:8000/routes/" />} />
                        <Route exact path='/designated-routes' component={() => <DesignatedRoutes url="http://127.0.0.1:8000/routes/designated/" />} />
                        <Route path='/priorities/:value' component={PrioritiesForm}/>
                        <Route path='/route/:route_id/driver/:driver_id' component={RouteDriver}/>
                        <Route path='/designated/:value' component={DesignatedRoute}/>
                        <Route exact path='/profile' component={Profile}/>
                      </Switch>
                </div>
              </div>
          </Router>
      </Provider>
  );
}

export default App;
