import React from 'react';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Auth from './pages/Auth';
import { Contacts } from './pages/Contacts';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';


const App = () => {

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/auth" component={Auth} />
          <Route exact path="/contacts" component={Contacts} />
        </Switch>

      </BrowserRouter>

    </>
  )
};

export default App;
