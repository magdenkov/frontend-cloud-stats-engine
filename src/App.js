import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CloudStatsEngine from "./component/user/CloudStatsEngine";

function App() {
  return (
      <div className="container">
          <Router>
              <div className="col-md-6">
                  <h1 className="text-center" style={style}>Dаnоmiсs Cloud Stats Engine</h1>
                  <Switch>
                      <Route path="/" exact component={CloudStatsEngine} />
                      <Route path="/cloud-stats-engine" component={CloudStatsEngine} />
                  </Switch>
              </div>
          </Router>
      </div>
  );
}

const style = {
    color: 'red',
    margin: '10px'
}

export default App;
