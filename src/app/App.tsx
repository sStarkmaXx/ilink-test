import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { store } from 'store/store';
import './App.css';
import { WithRouter } from './providers/WithRouter';
import { ControlPanelPage } from '../pages/controlPanelPage/ControlPanelPage';

function App() {
  return (
    <HashRouter basename="/">
      <Provider store={store}>
        <div className="App">
          <div className="container">
            {/* <WithRouter /> */}
            <ControlPanelPage />
          </div>
        </div>
      </Provider>
    </HashRouter>
  );
}

export default App;
