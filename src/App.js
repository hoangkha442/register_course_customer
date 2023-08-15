import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import UserTemplate from './Templates/UserTemplate/UserTemplate';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<UserTemplate/>}>
            <Route index element={<HomePage />} />
            <Route path='/login' element={<LoginPage />}/>
            <Route path='/register' element={<RegisterPage />}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
