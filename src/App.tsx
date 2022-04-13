import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ResetPasswordPage } from './components/resetPasswordPage/ResetPasswordPage';
import { StartPage } from './components/startpage/StartPage';
import { AccountPage } from './components/accountPage/AccountPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={'ilink-test/'} element={<StartPage />} />
        <Route path={'/respas'} element={<ResetPasswordPage />} />
        <Route path={'/profile'} element={<AccountPage />} />
      </Routes>
    </div>
  );
}

export default App;
