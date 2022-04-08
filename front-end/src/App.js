
import './App.css';
import { Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Users from './user/pages/Users';
// import withRouter from './hoc/withRouter';
import NewPlace from './places/pages/NewPlaces';
import React from 'react';
import MainNavigation from './shared/components/Navigation/MainNavigation';

const App = ( ) => {
  return (
    <Router>
      <MainNavigation />
      <Routes>
        <Route path="/" 
          exact={true}
          element={<Users />}
        /> 
        <Route path="/places/new" 
        exact={true}
        element={<NewPlace />}
      />
        <Route 
          path='*'
          element={<Navigate to='/' replace />}
          />
      </Routes>
    </Router>
  );
}

export default App;
