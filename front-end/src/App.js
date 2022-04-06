import logo from './logo.svg';
import './App.css';
import { Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Users from './user/pages/Users';
import withRouter from './hoc/withRouter';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" 
          exact={true}
          element={Users}
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
