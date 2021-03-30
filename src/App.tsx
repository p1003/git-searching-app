import { Switch, Route } from 'react-router';
import { MainView } from "./components/Views/MainView"
import { UserView } from "./components/Views/UserView"
import { RepoView } from './components/Views/RepoView';
import globalStyles from './global.module.css'

function App() {

    return (
        <div className={globalStyles.MainBackground}>
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