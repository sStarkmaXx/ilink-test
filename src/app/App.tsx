import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'store/store';
import './App.css';
import { WithRouter } from './providers/WithRouter';

function App() {
  return (
    <BrowserRouter basename="/">
      <Provider store={store}>
        <div className="App">
          <div className="container">
            <WithRouter />
          </div>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
