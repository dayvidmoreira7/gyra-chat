import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Pages from './pages';
const { 
    Home,
    Chat,
    NotFound
} = Pages;

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={() => <Home />} />
            <Route exact path="/chat" component={() => <Chat />} />
            <Route component={() => <NotFound />} />
        </Switch>
    </BrowserRouter>
);

export default Routes;