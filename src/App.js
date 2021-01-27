import logo from './resources/icons/arrow-right.png';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Auth/Login';
import { Provider } from 'react-redux';
import store from './store';
import Toast from './components/Shared/Toast';
import MainPage from './components/MainPage';

const App = () => {
  return (
    <div className="container-fluid w-100 h-100">
    <Provider store={store}>
        <Toast/>
        <Router>
          <Route exact path="/" component={Login}/>
          <Switch>
            <Route exact path="/main" component={MainPage}/>
            <Route exact path="/login" component={Login}/>
          </Switch>
        </Router>
    </Provider>
    </div>
  );
}

export default App;
