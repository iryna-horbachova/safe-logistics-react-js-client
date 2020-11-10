import React from 'react';
import './index.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Provider } from "react-redux";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/main/Dashboard";
import Navbar from "./components/layouts/Navbar";
import { store } from "./redux/store";
import Drivers from "./components/drivers/Drivers";
import AddDriverForm from "./components/drivers/AddDriverForm";

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
                        <Route exact path='/drivers' component={() => <Drivers url="http://127.0.0.1:8000/drivers/" />} />
                      </Switch>
                </div>
              </div>
          </Router>
      </Provider>
  );
}

export default App;
