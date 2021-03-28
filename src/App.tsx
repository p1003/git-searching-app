import { Switch, Route } from 'react-router';
import { MainView } from "./components/MainView"
import { UserView } from "./components/UserView"
import { RepoView } from './components/RepoView';

function App() {

    return (
        <div>
            <Switch>
                <Route path="/:username/:repoName">
                    <RepoView />
                </Route>
                <Route path="/:username">
                    <UserView />
                </Route>
                <Route>
                    <MainView/>
                </Route>
            </Switch>
        </div>

    );
}

export default App;