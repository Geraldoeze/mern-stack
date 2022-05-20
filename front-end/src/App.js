
import './App.css';
import { Routes, Route } from 'react-router';
import Users from './user/pages/Users';
// import withRouter from './hoc/withRouter';
import NewPlace from './places/pages/NewPlaces';
import React from 'react';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';

const App = ( ) => {
  const routes = ( 
  <main>     
  <Routes>
    <Route path="/" 
      exact={true}
      element={<Users />}
    /> 
    <Route path="/places/new" 
    exact={true}
    element={<NewPlace />}
   />
    <Route path="/:userId/places"
      exact={true}
      element={
      <UserPlaces />
      }
    />
     <Route path="/places/:placeId"
      exact={true}
      element={
      <UpdatePlace />
      }
    />
  </Routes>
  </main>
  )
  return (
    <div>
    <MainNavigation />
    {routes}
    </div>
  );
}

export default App;
