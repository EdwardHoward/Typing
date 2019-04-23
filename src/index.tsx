import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './redux/reducers';
import Typing from './components/Typing';
import './style';
import IWordsClient from './api/words/IWordsClient';

const store = createStore(reducers);

let client: IWordsClient;

async function start(){
   if(process.env.SERVICE_TYPE === "api"){
      const ApiWordsClient = await import(/* webpackChunkName: "api" */'./api/words/ApiClient');
      client = new ApiWordsClient.default();
   }else{
      const MockWordsClient = await import (/* webpackChunkName: "mock" */'./api/words/MockClient');
      client = new MockWordsClient.default();
   }
   
   ReactDOM.render(
      <Provider store={store}>
         <Typing client={client} />
      </Provider>, 
      document.getElementById('root')
   );
}

start();