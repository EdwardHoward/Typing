import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './redux/reducers';
import Typing from './components/Typing';
import './style';



const store = createStore(reducers);

ReactDOM.render(
   <Provider store={store}>
      <Typing />
   </Provider>, 
   document.getElementById('root')
);