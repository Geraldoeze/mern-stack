
import './App.css';
import { Routes, Route, Navigate } from 'react-router';
import Users from './user/pages/Users';
import Auth from './user/pages/Auth';

import { AuthContext } from './shared/context/auth-context';

import NewPlace from './places/pages/NewPlaces';
import React, {useState, useCallback, useEffect} from 'react';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';

let logoutTimer;

const App = ( ) => {
  const [token, setToken] = useState(null);
  const [tokenExpDate, setTokenExpDate] = useState();
  const [userId, setUserId] = useState(false); 

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpDate(tokenExpirationDate);
    localStorage.setItem(
      'userData',
       JSON.stringify({
         userId: uid, 
         token: token,
         expiration: tokenExpirationDate.toISOString() }));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpDate(null);
    setUserId(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (token && tokenExpDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.token && 
      new Date(storedData.expiration) > new Date()) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);

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
        element= {
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
