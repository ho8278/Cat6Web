import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// import App from 'shared/App';
import MainHome from 'shared/MainHome';
import { CookiesProvider } from 'react-cookie';

const Root = () =>(
  <CookiesProvider>
    <BrowserRouter>
      <MainHome />
    </BrowserRouter>
  </CookiesProvider>
);

export default Root;