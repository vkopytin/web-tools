import * as React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { BrowserRouter } from 'react-router-dom';


const template = (store, routes) => <Provider store={store}>
    <BrowserRouter>
        {routes}
    </BrowserRouter>
</Provider>

export { template };
