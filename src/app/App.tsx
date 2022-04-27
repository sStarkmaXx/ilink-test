import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { WithRouter } from './providers/WithRouter';

function App() {
  return (
    <BrowserRouter basename="/">
      <div className="App">
        <div className="container">
          <WithRouter />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
