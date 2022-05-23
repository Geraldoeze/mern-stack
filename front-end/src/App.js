
import './App.css';
import { Routes, Route, Navigate } from 'react-router';
import Users from './user/pages/Users';
import Auth from './user/pages/Auth';

import { AuthContext } from './shared/context/auth-context';

import NewPlace from './places/pages/NewPlaces';
import React, {useState, useCallback} from 'react';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';

const App = ( ) => {
  const [isLoggedIn, setIsLoggedIn] = useState();

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;  
  
  if (isLoggedIn) {
    routes=(
      <React.Fragment>
       <Route path="/" 
          exact="true"
          element={<Users />}
        /> 
        <Route path="/places/new" 
          exact="true"
           element={<NewPlace />}
        />
        <Route path="/:userId/places"
          exact="true"
          element={
          <UserPlaces />
          }
        />
        <Route path="/places/:placeId"
          exact="true"
           element={
          <UpdatePlace />
          }
        />
        <Route path="*"
          exact="true" 
          element={
          <Navigate to="/" />
          }
        />
      </React.Fragment>
    )
  } else {
    routes = (
      <React.Fragment>
      <Route path="/" 
        exact="true"
        element={<Users />}
      /> 
      <Route path="/:userId/places"
        exact="true"
        element={
        <UserPlaces />
        }
      />
      <Route path="/auth"
        exact="true"
        element={
        <Auth />
        }
      />
      <Route path="*"
        exact="true" 
        element={
        <Navigate to="/auth" />
        }
     />
      </React.Fragment>
    )
  }

  return (
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn, login: login, logout: logout}}>
    <MainNavigation />
     <main>
       <Routes>
        {routes}
      </Routes>
     </main>
    </AuthContext.Provider>
  );
}

export default App;
