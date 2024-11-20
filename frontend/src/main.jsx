import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import  { Toaster } from 'react-hot-toast';
import App from './App.jsx'
import { Provider } from 'react-redux';
import store from './redux/slice/store.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <Toaster />
      <App />
    </Provider>
  </StrictMode>,
)
