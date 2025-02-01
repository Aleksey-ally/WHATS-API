import {FC, useState} from 'react';
import Login from './components/Login/Login'
import Chat from './components/Chat/Chat';
// import 'index.css';

const App: FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [credentials, setCredentials] = useState<{ idInstance: string; apiTokenInstance: string } | null>(null);

    const handleLogin = (idInstance: string, apiTokenInstance: string) => {
        setCredentials({idInstance, apiTokenInstance});
        setIsLoggedIn(true);
    };

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