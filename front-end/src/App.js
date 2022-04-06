import logo from './logo.svg';
import './App.css';
import { Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Users from './user/pages/Users';
import withRouter from './hoc/withRouter';
import NewPlace from './places/pages/NewPlaces';

function App() {
  return (
    <Router>
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

export default withRouter(App);
