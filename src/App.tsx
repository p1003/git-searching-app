import { Switch, Route } from 'react-router';
import { MainView } from "./components/Views/MainView"
import { UserView } from "./components/Views/UserView"
import { RepoView } from './components/Views/RepoView';
import styles from './App.module.css'

// https://www.pngarts.com/files/8/Black-Github-Logo-PNG-Image-Background.png
// https://www.pngarts.com/files/8/Github-Logo-Transparent-Background-PNG.png
function App() {

    return (
        <div className={styles.MainBackground}>
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