import {FC, useState} from 'react';
import Login from './components/Login/Login'
import Chat from './components/Chat/Chat';
import {accountAPI} from "./api/base-api";
import log = require("eslint-plugin-react/lib/util/log");
// import 'index.css';

const App: FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [credentials, setCredentials] = useState<{ idInstance: string; apiTokenInstance: string } | null>(null);

    const handleLogin = (idInstance: string, apiTokenInstance: string) => {
        setCredentials({idInstance, apiTokenInstance});
        setIsLoggedIn(true);
    };
    const ha = () => {
        accountAPI.getSettings()
            .then(() => setIsLoggedIn(true))
            .catch((e) => console.error(e))
    }
    return (
        <div>
            {!isLoggedIn ? (
                <Login onLogin={handleLogin}/>
            ) : (
                <Chat credentials={credentials!}/>
            )}
        </div>
    );
};

export default App;