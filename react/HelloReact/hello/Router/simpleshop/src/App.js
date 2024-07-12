// Correct structure with only one top-level Router

// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListProduct from './sub/ListProduct';
import DetailProduct from './sub/DetailProduct';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ListProduct} />
        <Route path="/detail/:pid" component={DetailProduct} />
        {/* Other routes if needed */}
      </Switch>
    </Router>
  );
}

export default App;

