import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import reportWebVitals from './reportWebVitals';
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac'
  }
};
const theme = extendTheme({ colors });
ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
