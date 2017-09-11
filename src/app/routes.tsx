import * as React from 'react';
import { Route } from 'react-router';
import { MainView } from './views/main';


const routes = <Route exact path="/*" component={MainView} />;

export { routes }
