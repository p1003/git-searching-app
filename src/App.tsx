import React, {useState} from 'react';
import { MainView } from "./components/MainView"
import UserView from "./components/UserView"
import RepoView from "./components/RepoView"

function App() {

    // const [currentView, setCurrentView] = useState(0);

    const viewMap = {
        0: MainView,
        1: RepoView,
        2: UserView,
    };

    const CurrentViewComponent = MainView;
    // const CurrentViewComponent = viewMap[currentView];
    return (
        <div className="App">
            <CurrentViewComponent/>
        </div>
    );
}

export default App;
