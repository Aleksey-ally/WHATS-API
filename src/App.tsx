import {FC, useState} from 'react';
import Login from './components/Login/Login'
import Chat from './components/Chat/Chat';
import {accountAPI} from "./api/base-api";
import log = require("eslint-plugin-react/lib/util/log");
// import 'index.css';

const App: FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [credentials, setCredentials] = useState<{ idInstance: string; apiTokenInstance: string } | null>(null);
    const [recipient, setRecipient] = useState('');

    const handleLogin = (idInstance: string, apiTokenInstance: string) => {
        setCredentials({idInstance, apiTokenInstance});
        setIsLoggedIn(true);
    };
    const ha = () => {
        accountAPI.getSettings()
            .then((res) => setIsLoggedIn(true))
            .catch((e) => console.log(e))
    }
    return (
        <div>
            {!isLoggedIn ? (
                <Login onLogin={ha}/>
            ) : (
                <Chat credentials={credentials!} recipient={recipient} setRecipient={setRecipient}/>
            )}
        </div>
    );
};

export default App;