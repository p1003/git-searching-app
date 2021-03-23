import React from 'react';
import { MainView } from "./components/MainView"
import UserView from "./components/UserView"
import { Switch, Route } from 'react-router';

function App() {

    return (
        
        <Switch>
            <Route path="/:user">
                <UserView/>
            </Route>
            <Route>
                <MainView/>
            </Route>
        </Switch>
    );
}

export default App;
