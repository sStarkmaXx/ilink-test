import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { store } from 'store/store';
import './App.css';
import { WithRouter } from './providers/WithRouter';

function App() {
  return (
    <HashRouter basename="/">
      <Provider store={store}>
        <div className="App">
          <WithRouter />
        </div>
      </Provider>
    </HashRouter>
  );
}

export default App;
