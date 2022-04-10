
import './App.css';
import { Routes, Route } from 'react-router';
import Users from './user/pages/Users';
// import withRouter from './hoc/withRouter';
import NewPlace from './places/pages/NewPlaces';
import React from 'react';
import MainNavigation from './shared/components/Navigation/MainNavigation';

const App = ( ) => {
  const routes = (      <Routes>
    <Route path="/" 
      exact={true}
      element={<Users />}
    /> 
    <Route path="/places/new" 
    exact={true}
    element={<NewPlace />}
  />
   
  </Routes>)
  return (
    <div>
    <MainNavigation />
    {routes}
    </div>
  );
}

export default App;
