import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// import App from 'shared/App';
import MainHome from 'shared/MainHome';

const Root = () =>(
    <BrowserRouter>
      <MainHome />
    </BrowserRouter>
);

export default Root;