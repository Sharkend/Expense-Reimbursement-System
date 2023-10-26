import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ReimbursePage from './pages/ReimbursePage';
import ReimbursePageEmployee from './pages/ReimbursePageEmployee';
import EmployeePage from './pages/EmployeePage';
function App() {
  return (
    // <div className="App"></div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/reimbursement" element={<ReimbursePage />} />
        <Route path="/reimbursement/employee" element={<ReimbursePageEmployee />} />
        <Route path="/employees" element={<EmployeePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
