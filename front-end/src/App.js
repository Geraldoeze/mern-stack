
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
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);
    localStorage.setItem(
      'userData',
       JSON.stringify({userId: uid, token}));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
  }, []);

  let routes;  
  
  if (token) {
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
           element={<UpdatePlace />}
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
    <AuthContext.Provider 
      value={{
        isLoggedIn: !!token, //The !! in from of token converts token to true if there's a value or data type
        token: token,
        userId: userId,
        login: login,
        logout: logout}}>
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
