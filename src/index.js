import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import rootReducer from './reducers/reducers';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(rootReducer)

ReactDOM.render(  
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById('root')
);

reportWebVitals();
