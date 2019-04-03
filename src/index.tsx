import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './redux/reducers';
import Typing from './components/Typing';
import './style';
import { WordList } from './api/words/MockClient/words';
import MockWordsClient from './api/words/MockClient';
import IWordsClient from './api/words/IWordsClient';
import APIWordsClient from './api/words/ApiClient';

const store = createStore(reducers);

let client: IWordsClient;


if(process.env.SERVICE_TYPE === "api"){
   client = new APIWordsClient();
}else{
   client = new MockWordsClient();
}

ReactDOM.render(
   <Provider store={store}>
      <Typing wordClient={client} words={WordList} />
   </Provider>, 
   document.getElementById('root')
);