import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ResetPasswordPage } from './components/resetPasswordPage/ResetPasswordPage';
import { StartPage } from './components/startpage/StartPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<StartPage />} />
        <Route path={'/respas'} element={<ResetPasswordPage />} />
      </Routes>
    </div>
  );
}

export default App;
