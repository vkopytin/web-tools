import * as React from 'react';
import { Route } from 'react-router';
import { MainView } from './views/main';


const routes = <Route key="1" exact path="/*" component={MainView} />;

export { routes }
