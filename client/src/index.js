import ReactDOM from 'react-dom/client';
import React, {createContext} from 'react';
import './index.css';
import App from './App';
import '@fortawesome/fontawesome-free/css/all.min.css';

import reportWebVitals from './reportWebVitals'
import Store from "./store/store";

const store = new Store()

export const Context = createContext({
    store: store
})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

reportWebVitals()